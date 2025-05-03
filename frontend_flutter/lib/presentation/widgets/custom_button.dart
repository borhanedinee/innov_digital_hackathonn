import 'package:flutter/material.dart';
import 'package:innov_digital/presentation/app_colors.dart';
import 'package:innov_digital/presentation/app_textStyles.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({Key? key, required this.buttonLabel, this.onPressed})
    : super(key: key);

  final String buttonLabel;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 15),
          backgroundColor: AppColors.primaryColor,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        child: Text(buttonLabel, style: AppTextStyles.button),
      ),
    );
  }
}
