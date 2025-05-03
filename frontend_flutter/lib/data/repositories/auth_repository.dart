import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:innov_digital/utils/constants.dart';

class AuthRepository {
  signUp(Map userData) async {
    try {
      final encodedBody = json.encode(userData);
      final response = await http.post(
        Uri.parse('$BASE_URL/auth/signup'),
        body: encodedBody,
        headers: HEADERS,
      );
      if (response.statusCode == 201) {
        print('object');
        return;
      }
      final jsonResponse = json.decode(response.body);
      return jsonResponse;
    } catch (e) {
      rethrow;
    }
  }

  // login
  login(String email, String password) async {
    try {
      final encodedBody = json.encode({'email': email, 'password': password});
      final response = await http.post(
        Uri.parse('$BASE_URL/auth/login'),
        body: encodedBody,
        headers: HEADERS,
      );
      if (response.statusCode == 201) {
        print('object');
        return;
      }
      final jsonResponse = json.decode(response.body);
      return jsonResponse;
    } catch (e) {
      rethrow;
    }
  }
}
