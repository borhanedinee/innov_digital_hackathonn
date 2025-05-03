import 'package:flutter/material.dart';
import 'package:innov_digital/presentation/app_colors.dart';
import 'package:innov_digital/presentation/app_textStyles.dart';
import 'package:innov_digital/presentation/screens/biometrics_screen.dart';
import 'package:innov_digital/presentation/screens/home_screen.dart';

class OTPScreen extends StatefulWidget {
  OTPScreen({Key? key}) : super(key: key);

  @override
  State<OTPScreen> createState() => _OTPScreenState();
}

class _OTPScreenState extends State<OTPScreen> {
  final List<TextEditingController> otpControllers = List.generate(
    6,
    (_) => TextEditingController(),
  );

  final List<FocusNode> focusNodes = List.generate(6, (_) => FocusNode());

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 40.0),
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    // Phone icon
                    Image.asset('assets/phone.gif', height: 200, width: 200),

                    const SizedBox(height: 20),
                    // Title
                    Text(
                      'Enter authentication code',
                      style: AppTextStyles.title,
                    ),
                    const SizedBox(height: 10),
                    // Subtitle with phone number
                    Text(
                      'Enter the 6-digit that we have sent via the phone number +62 813-8172-5977',
                      style: AppTextStyles.subtitle,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 30),
                    // OTP input fields
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: List.generate(6, (index) {
                        return SizedBox(
                          width: 40,
                          height: 50,
                          child: TextFormField(
                            controller: otpControllers[index],
                            focusNode: focusNodes[index],
                            keyboardType: TextInputType.number,
                            textAlign: TextAlign.center,
                            maxLength: 1,
                            decoration: InputDecoration(
                              counterText: '',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                            ),
                            onChanged: (value) {
                              if (value.length == 1 && index < 5) {
                                focusNodes[index].unfocus();
                                FocusScope.of(
                                  context,
                                ).requestFocus(focusNodes[index + 1]);
                              }
                              if (value.isEmpty && index > 0) {
                                focusNodes[index].unfocus();
                                FocusScope.of(
                                  context,
                                ).requestFocus(focusNodes[index - 1]);
                              }
                            },
                          ),
                        );
                      }),
                    ),
                  ],
                ),
                SizedBox(height: 300),
                // Bottom section with buttons
                Column(
                  children: [
                    // Continue button
                    ValueListenableBuilder<TextEditingValue>(
                      valueListenable: otpControllers[0],
                      builder:
                          (context, _, __) => ValueListenableBuilder(
                            valueListenable: otpControllers[1],
                            builder:
                                (context, _, __) => ValueListenableBuilder(
                                  valueListenable: otpControllers[2],
                                  builder:
                                      (
                                        context,
                                        _,
                                        __,
                                      ) => ValueListenableBuilder(
                                        valueListenable: otpControllers[3],
                                        builder:
                                            (
                                              context,
                                              _,
                                              __,
                                            ) => ValueListenableBuilder(
                                              valueListenable:
                                                  otpControllers[4],
                                              builder:
                                                  (
                                                    context,
                                                    _,
                                                    __,
                                                  ) => ValueListenableBuilder(
                                                    valueListenable:
                                                        otpControllers[5],
                                                    builder: (context, _, __) {
                                                      bool isFilled =
                                                          otpControllers.every(
                                                            (controller) =>
                                                                controller
                                                                    .text
                                                                    .length ==
                                                                1,
                                                          );
                                                      return SizedBox(
                                                        width: double.infinity,
                                                        child: ElevatedButton(
                                                          onPressed:
                                                              isFilled
                                                                  ? () {
                                                                    Navigator.pushReplacement(
                                                                      context,
                                                                      MaterialPageRoute(
                                                                        builder:
                                                                            (
                                                                              context,
                                                                            ) =>
                                                                                BiometricScreen(),
                                                                      ),
                                                                    );
                                                                  }
                                                                  : null,
                                                          style: ElevatedButton.styleFrom(
                                                            backgroundColor:
                                                                AppColors
                                                                    .primaryColor,
                                                            padding:
                                                                const EdgeInsets.symmetric(
                                                                  vertical: 15,
                                                                ),
                                                            shape: RoundedRectangleBorder(
                                                              borderRadius:
                                                                  BorderRadius.circular(
                                                                    8,
                                                                  ),
                                                            ),
                                                          ),
                                                          child: Text(
                                                            'Continue',
                                                            style:
                                                                AppTextStyles
                                                                    .button,
                                                          ),
                                                        ),
                                                      );
                                                    },
                                                  ),
                                            ),
                                      ),
                                ),
                          ),
                    ),
                    const SizedBox(height: 10),
                    // Back text
                    Text(
                      'Back',
                      style: AppTextStyles.link.copyWith(
                        color: AppColors.blackColor,
                        decoration: TextDecoration.none,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
