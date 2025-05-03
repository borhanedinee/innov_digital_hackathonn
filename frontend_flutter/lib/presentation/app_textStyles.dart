import 'package:flutter/material.dart';
import 'package:innov_digital/presentation/app_colors.dart';

class AppTextStyles {
  static const TextStyle heading1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: AppColors.whiteColor,
  );

  static const TextStyle link = TextStyle(
    fontSize: 14,
    color: AppColors.whiteColor,
    decoration: TextDecoration.underline,
  );

  static const TextStyle label = TextStyle(
    fontSize: 14,
    color: AppColors.greyColor,
  );

  static const TextStyle body = TextStyle(
    fontSize: 12,
    color: AppColors.greyColor,
  );

  static const TextStyle button = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: AppColors.whiteColor,
  );

  static const TextStyle title = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w500,
    color: AppColors.blackColor,
  );

  static const TextStyle subtitle = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    color: AppColors.greyColor,
  );
}
