import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:http/http.dart' as http;
import 'package:innov_digital/presentation/controllers/auth_controller.dart';
import 'package:innov_digital/services/encryption_services.dart';

class UploadFileController extends GetxController {
  Future<void> pickEncryptAndUploadFile(
    BuildContext context,
    String title,
    String backendUrl,
  ) async {
    try {
      // 1. Pick a file
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.any,
        allowMultiple: false,
      );

      // ❌ Fix: prevent return if file is selected
      if (result == null || result.files.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('No file selected')),
        );
        return;
      }

      // 2. Read the file
      File file = File(result.files.single.path!);
      List<int> fileBytes = await file.readAsBytes();

      // 3. Encrypt the file
      final key = encrypt.Key.fromSecureRandom(32);
      final iv = encrypt.IV.fromSecureRandom(16);
      final encrypter = encrypt.Encrypter(encrypt.AES(key));
      final encrypted = encrypter.encryptBytes(fileBytes, iv: iv);
      final encryptedBytes = encrypted.bytes;

      Uint8List encyptedFile =  EncryptionServices().encryptFileWithAES(encryptedBytes, key, iv);

      Uint8List signedFile = EncryptionServices().signFileWithRSAKeys(encyptedFile);



      var request = http.MultipartRequest('POST', Uri.parse(backendUrl));
      request.files.add(
        http.MultipartFile.fromBytes(
          'file', // Make sure your backend expects this field
          signedFile,
          filename: 'encrypted_${result.files.single.name}',
        ),
      );

      // 5. Attach encryption metadata
      request.fields['encryption_metadata'] = jsonEncode({
        'key': key.base64,
        'iv': iv.base64, // correct spelling
        'sender_id': Get.find<AuthController>().currentEmployee!.id,
        'title': title,
        'public_key' :  EncryptionServices().getPublicKey() 
      });

      // 6. Send the request
      var response = await request.send();

      // 7. Handle response
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('File uploaded successfully!')),
        );
      } else {
        final errorBody = await response.stream.bytesToString();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Upload failed: ${response.statusCode} - $errorBody'),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }
}
