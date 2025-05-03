import 'package:flutter/material.dart';
import 'package:innov_digital/presentation/app_textStyles.dart';
import 'package:local_auth/local_auth.dart';
import 'package:innov_digital/presentation/app_colors.dart';
import 'package:innov_digital/presentation/screens/home_screen.dart';

class BiometricScreen extends StatelessWidget {
  final LocalAuthentication _localAuth = LocalAuthentication();

  BiometricScreen({Key? key}) : super(key: key);

  // Check if biometric authentication is available
  Future<bool> _checkBiometricAvailability(BuildContext context) async {
    try {
      bool canCheckBiometrics = await _localAuth.canCheckBiometrics;
      bool isDeviceSupported = await _localAuth.isDeviceSupported();

      if (!canCheckBiometrics || !isDeviceSupported) {
        _showErrorDialog(
          context,
          'Biometric authentication is not available on this device.',
        );
        return false;
      }

      List<BiometricType> availableBiometrics =
          await _localAuth.getAvailableBiometrics();
      if (!availableBiometrics.contains(BiometricType.fingerprint) &&
          !availableBiometrics.contains(BiometricType.face)) {
        _showErrorDialog(
          context,
          'No biometrics (fingerprint or face) enrolled. Please set up biometrics in your device settings.',
        );
        return false;
      }

      return true;
    } catch (e) {
      _showErrorDialog(context, 'Error checking biometrics: $e');
      return false;
    }
  }

  // Prompt for biometric authentication
  Future<bool> _authenticateWithBiometrics(BuildContext context) async {
    try {
      bool authenticated = await _localAuth.authenticate(
        localizedReason:
            'Please authenticate using your fingerprint to proceed',
        options: const AuthenticationOptions(
          biometricOnly: true, // Restrict to biometrics (no PIN fallback)
          stickyAuth: true, // Keep dialog active if app goes to background
        ),
      );
      return authenticated;
    } catch (e) {
      _showErrorDialog(context, 'Biometric authentication error: $e');
      return false;
    }
  }

  // Show error dialog for user feedback
  void _showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Biometric Error'),
            content: Text(message),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('OK'),
              ),
            ],
          ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 40.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Fingerprint icon
              const Icon(Icons.fingerprint, size: 80, color: Colors.black),
              const SizedBox(height: 20),
              // Title
              Text('Biometric Authentication', style: AppTextStyles.title),
              const SizedBox(height: 10),
              // Subtitle
              Text(
                'Please use your fingerprint to authenticate and access the app',
                style: AppTextStyles.subtitle,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              // Authenticate button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () async {
                    // Check if biometrics are available
                    // bool isBiometricAvailable =
                    //     await _checkBiometricAvailability(context);
                    // if (!isBiometricAvailable) return;

                    // // Request biometric authentication
                    // bool isAuthenticated = await _authenticateWithBiometrics(
                    //   context,
                    // );
                    // if (isAuthenticated) {
                    //   Navigator.pushReplacement(
                    //     context,
                    //     MaterialPageRoute(
                    //       builder: (context) => const HomeScreen(),
                    //     ),
                    //   );
                    // } else {
                    //   ScaffoldMessenger.of(context).showSnackBar(
                    //     const SnackBar(
                    //       content: Text(
                    //         'Authentication failed. Please try again.',
                    //       ),
                    //     ),
                    //   );
                    // }
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const HomeScreen(),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primaryColor,
                    padding: const EdgeInsets.symmetric(vertical: 15),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    'Authenticate with Fingerprint',
                    style: AppTextStyles.button,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
