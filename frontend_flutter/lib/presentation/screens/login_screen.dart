import 'package:flutter/material.dart';
import 'package:get/state_manager.dart';
import 'package:innov_digital/domain/models/employer_model.dart';
import 'package:innov_digital/main.dart';
import 'package:innov_digital/presentation/app_colors.dart';
import 'package:innov_digital/presentation/controllers/auth_controller.dart';
import 'package:innov_digital/presentation/widgets/custom_button.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController passwordController = TextEditingController();

  TextEditingController firstNameController = TextEditingController();

  TextEditingController lastNameController = TextEditingController();

  TextEditingController emailController = TextEditingController();

  TextEditingController phoneNumberController = TextEditingController();

  // Global key for form state
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Reactive checkbox state using GetX
  bool agreeToTerms = false;

  @override
  void initState() {
    passwordController = TextEditingController();

    firstNameController = TextEditingController();

    lastNameController = TextEditingController();

    emailController = TextEditingController();

    phoneNumberController = TextEditingController();
    super.initState();
  }



  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Stack(
          children: [
            // Background image (blue grid)
            Positioned.fill(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    Image.asset(
                      'assets/sign_up_image.png', // Ensure this is defined in pubspec.yaml
                      fit: BoxFit.fill,
                    ),
                    Container(height: MediaQuery.of(context).size.height * 0.5),
                  ],
                ),
              ),
            ),
            // Foreground content
            Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: SingleChildScrollView(
                  child: Form(
                    key: _formKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Sign Up text
                        const Text(
                          'Log in',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: AppColors.whiteColor,
                          ),
                        ),
                        const SizedBox(height: 8),
                        // Log In link
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: const Text(
                            'Do not have an account? Sign Up',
                            style: TextStyle(
                              color: AppColors.whiteColor,
                              fontSize: 14,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        // Form container
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: AppColors.whiteColor,
                            borderRadius: BorderRadius.circular(10),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.blackColor.withOpacity(0.1),
                                blurRadius: 10,
                                offset: const Offset(0, 5),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              const SizedBox(height: 15),
                              // Email field
                              TextFormField(
                                controller: emailController,
                                decoration: InputDecoration(
                                  labelText: 'e-mail',
                                  labelStyle: TextStyle(
                                    color: AppColors.greyColor,
                                  ),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter your email';
                                  }
                                  if (!RegExp(
                                    r'^[^@]+@[^@]+\.[^@]+',
                                  ).hasMatch(value)) {
                                    return 'Please enter a valid email';
                                  }
                                  return null;
                                },
                                keyboardType: TextInputType.emailAddress,
                              ),
                              const SizedBox(height: 15),
                              // Password field
                              TextFormField(
                                controller: passwordController,
                                obscureText: true,
                                decoration: InputDecoration(
                                  labelText: 'password',
                                  labelStyle: TextStyle(
                                    color: AppColors.greyColor,
                                  ),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  suffixIcon: const Icon(Icons.visibility_off),
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a password';
                                  }
                                  if (value.length < 6) {
                                    return 'Password must be at least 6 characters';
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: 15),
                              // Terms and Privacy Policy checkbox
                              Row(
                                children: [
                                  Checkbox(
                                    value: agreeToTerms,
                                    onChanged: (value) {
                                      agreeToTerms = value ?? false;
                                      setState(() {});
                                    },
                                    activeColor: AppColors.primaryColor,
                                  ),
                                  const Expanded(
                                    child: Text(
                                      'I agree to the Terms of Service and Privacy Policy',
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: AppColors.greyColor,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 15),
                              // Sign Up button
                              GetBuilder<AuthController>(
                                builder:
                                    (controller) => CustomButton(
                                      buttonLabel: 'Log in',
                                      onPressed: () {
                                        if (_formKey.currentState!.validate() &&
                                            agreeToTerms) {
                                          controller.login(
                                            emailController.text,
                                            passwordController.text,
                                          );
                                        } else if (!agreeToTerms) {
                                          ScaffoldMessenger.of(
                                            context,
                                          ).showSnackBar(
                                            const SnackBar(
                                              content: Text(
                                                'Please agree to the Terms of Service',
                                              ),
                                            ),
                                          );
                                        }
                                      },
                                    ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

@override
void dispose() {
  passwordController.dispose();
  firstNameController.dispose();
  lastNameController.dispose();
  emailController.dispose();
  phoneNumberController.dispose();
  super.dispose();
}
}
