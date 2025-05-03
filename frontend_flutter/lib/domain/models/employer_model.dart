class EmployeeModel {
  final int? id;
  final String employeeName;
  final String email;
  final String phone;
  final String role;
  final int active;
  final String? slug;
  final String password;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  EmployeeModel({
    required this.id,
    required this.employeeName,
    required this.email,
    required this.phone,
    required this.role,
    required this.active,
    required this.slug,
    required this.password,
    required this.createdAt,
    required this.updatedAt,
  });

  factory EmployeeModel.fromJson(Map<String, dynamic> json) {
    return EmployeeModel(
      id: json['id'],
      employeeName: json['name'],
      email: json['email'],
      phone: json['phone'],
      role: json['role'],
      active: json['active'],
      slug: json['slug'],
      password: json['password'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': employeeName,
      'email': email,
      'phone': phone,
      'role': role,
      'active': active,
      'slug': slug,
      'password': password,
      'createdAt': createdAt?.toIso8601String() ?? DateTime.now(),
      'updatedAt': updatedAt?.toIso8601String() ?? DateTime.now(),
    };
  }
}
