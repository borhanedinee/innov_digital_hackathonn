import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart' as encrypt;
import 'package:pointycastle/export.dart' as pc;

class EncryptionServices {
  late pc.AsymmetricKeyPair<pc.PublicKey, pc.PrivateKey> _rsaKeyPair;

  /// Generate RSA Key Pair
  Future<void> generateRSAkeys() async {
    final keyParams = pc.RSAKeyGeneratorParameters(BigInt.from(65537), 2048, 5);
    final secureRandom = pc.FortunaRandom();

    final random = Random.secure();
    final seeds = List<int>.generate(32, (_) => random.nextInt(255));
    secureRandom.seed(pc.KeyParameter(Uint8List.fromList(seeds)));

    final generator = pc.RSAKeyGenerator()
      ..init(pc.ParametersWithRandom(keyParams, secureRandom));

    _rsaKeyPair = generator.generateKeyPair();
  }




  /// Encrypt file bytes with AES
  Uint8List encryptFileWithAES(Uint8List fileBytes, encrypt.Key key, encrypt.IV iv) {
    final aes = encrypt.Encrypter(encrypt.AES(key, mode: encrypt.AESMode.cbc));
    final encrypted = aes.encryptBytes(fileBytes, iv: iv);
    return Uint8List.fromList(encrypted.bytes);
  }


  /// Sign the SHA256 hash of a file using RSA private key
  Uint8List signFileWithRSAKeys(Uint8List fileBytes) {
    final hash = sha256.convert(fileBytes).bytes;

    final signer = pc.RSASigner(pc.SHA256Digest(), '0609608648016503040201')
      ..init(true, pc.PrivateKeyParameter<pc.RSAPrivateKey>(_rsaKeyPair.privateKey));

    final signature = signer.generateSignature(Uint8List.fromList(hash));
    return Uint8List.fromList(signature.bytes);
  }

  /// Generate SHA256 hash of a file
  String createFileHash(Uint8List fileBytes) {
    final digest = sha256.convert(fileBytes);
    return digest.toString(); // Hex string
  }


  pc.PublicKey getPublicKey() {
    final pub = _rsaKeyPair.publicKey;
    return pub;
  }
}
