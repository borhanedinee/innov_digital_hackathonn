import 'dart:developer';

import 'package:get/get.dart';
import 'package:innov_digital/data/repositories/auth_repository.dart';
import 'package:innov_digital/domain/models/employer_model.dart';
import 'package:innov_digital/main.dart';
import 'package:innov_digital/presentation/screens/otp_screen.dart';

class AuthController extends GetxController {
  final AuthRepository _authRepository;
  AuthController(this._authRepository);

  EmployeeModel? currentEmployee;

  signUp(EmployeeModel employer) async {
    try {
      final data = await _authRepository.signUp(employer.toJson());
      if (data == null) {
        print('something went wrong');
        return;
      }
      currentEmployee = EmployeeModel.fromJson(data['data']);
      // secure token
      final token = data['token'];
      storage.write(key: 'token', value: token);
    } catch (e) {
      print('something went wrong');
    } finally {}
  }

  // log in
  login(String email, String password) async {
    try {
      // final data = await _authRepository.login(email, password);
      // if (data == null) {
      //   print('something went wrong');
      //   return;
      // }
      // currentEmployee = EmployeeModel.fromJson(data['data']);
      // // secure token
      // final token = data['token'];
      // storage.write(key: 'token', value: token);
      log("trigred") ; 
      
    } catch (e) {
      print('something went wrong');
      
    } finally {}
  }
}
