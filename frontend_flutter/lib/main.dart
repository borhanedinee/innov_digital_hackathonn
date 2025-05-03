import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:innov_digital/app_bindings.dart';
import 'package:innov_digital/presentation/screens/homeApproval_screen.dart';
import 'package:innov_digital/presentation/screens/home_screen.dart';
import 'package:innov_digital/presentation/screens/signup_screen.dart';
import 'package:innov_digital/presentation/screens/splash_screen.dart';

void main() {
  runApp(const MyApp());
}

late Size size;
final storage = FlutterSecureStorage();

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.

  @override
  Widget build(BuildContext context) {
    size = MediaQuery.of(context).size;
    return GetMaterialApp(
      initialBinding: AppBindings(),
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: SplashScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
