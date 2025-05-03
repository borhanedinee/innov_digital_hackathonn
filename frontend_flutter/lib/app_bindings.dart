import 'package:get/get.dart';
import 'package:innov_digital/data/repositories/auth_repository.dart';
import 'package:innov_digital/presentation/controllers/auth_controller.dart';
import 'package:innov_digital/presentation/controllers/upload_file_controller.dart';

class AppBindings extends Bindings {
  @override
  void dependencies() {
    Get.put(AuthRepository());
    Get.lazyPut(() => AuthController(Get.find<AuthRepository>()), fenix: true);
    Get.lazyPut(() => UploadFileController(), fenix: true);
  }
}
