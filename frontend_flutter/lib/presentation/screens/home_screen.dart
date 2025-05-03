import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:innov_digital/presentation/app_colors.dart';
import 'package:innov_digital/presentation/app_textStyles.dart';
import 'package:innov_digital/presentation/screens/notification_screen.dart';
import 'package:innov_digital/presentation/screens/upload_file_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: const Icon(Icons.shield, color: Colors.blue),
          title: const Text(
            'DocuShield',
            style: TextStyle(color: Colors.black),
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.notifications_none, color: Colors.black),
              onPressed: () {
                Get.to(NotificationsScreen()) ; 
              },
            ),
            IconButton(
              icon: const Icon(Icons.person_outline, color: Colors.black),
              onPressed: () {},
            ),
          ],
          backgroundColor: Colors.white,
          elevation: 0,
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => UploadFileScreen()),
            );
          },
          child: Icon(Icons.upload, color: AppColors.whiteColor),
          backgroundColor: AppColors.primaryColor,
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Search Bar
              TextField(
                decoration: InputDecoration(
                  hintText: 'Search documents...',
                  hintStyle: AppTextStyles.subtitle,
                  prefixIcon: const Icon(Icons.search, color: Colors.grey),
                  filled: true,
                  fillColor: Colors.blue.withOpacity(0.1),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              // Filter Tabs
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _buildFilterTab('All', true),
                    _buildFilterTab('External', false),
                    _buildFilterTab('Approved', false),
                    _buildFilterTab('Pending', false),
                    _buildFilterTab('Rejected', false),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              // Time Period Dropdown
              Row(
                children: [
                  DropdownButton<String>(
                    value: 'Last day',
                    items:
                        ['Last day', 'Last week', 'Last month']
                            .map(
                              (String value) => DropdownMenuItem<String>(
                                value: value,
                                child: Text(
                                  value,
                                  style: AppTextStyles.subtitle,
                                ),
                              ),
                            )
                            .toList(),
                    onChanged: (_) {},
                    underline: const SizedBox(),
                    icon: const Icon(Icons.arrow_drop_down, color: Colors.grey),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Document Sections
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Earlier This Year Section
                      Text('Earlier this year', style: AppTextStyles.title),
                      const SizedBox(height: 8),
                      _buildDocumentCard(
                        icon: Icons.picture_as_pdf,
                        iconColor: Colors.red,
                        title: 'Q2 Financial Report.pdf',
                        subtitle: 'Shared with 5 people',
                        size: '2.5 MB',
                        date: '14 apr',
                        status: 'Approved',
                        statusColor: Colors.green,
                      ),
                      _buildDocumentCard(
                        icon: Icons.picture_as_pdf,
                        iconColor: Colors.red,
                        title: 'Q2 Financial Report.pdf',
                        subtitle: 'Shared with 5 people',
                        size: '2.5 MB',
                        date: '14 apr',
                        status: 'Approved',
                        statusColor: Colors.green,
                      ),
                      _buildDocumentCard(
                        icon: Icons.description,
                        iconColor: Colors.grey,
                        title: 'Contract Draft v2.docx',
                        subtitle: 'Private',
                        size: '1.8 MB',
                        date: '14 apr',
                        status: 'Pending',
                        statusColor: Colors.yellow,
                      ),
                      _buildDocumentCard(
                        icon: Icons.picture_as_pdf,
                        iconColor: Colors.red,
                        title: 'Q2 Financial Report.pdf',
                        subtitle: 'Shared with 5 people',
                        size: '2.5 MB',
                        date: '14 apr',
                        status: 'Rejected',
                        statusColor: Colors.red,
                      ),
                      _buildDocumentCard(
                        icon: Icons.description,
                        iconColor: Colors.grey,
                        title: 'Contract Draft v2.docx',
                        subtitle: 'Private',
                        size: '1.8 MB',
                        date: '14 apr',
                        status: 'Approved',
                        statusColor: Colors.green,
                      ),
                      const SizedBox(height: 16),
                      // Older Section
                      Text('Older', style: AppTextStyles.title),
                      const SizedBox(height: 8),
                      _buildDocumentCard(
                        icon: Icons.picture_as_pdf,
                        iconColor: Colors.red,
                        title: 'Q2 Financial Report.pdf',
                        subtitle: 'Shared with 5 people',
                        size: '2.5 MB',
                        date: '14 apr',
                        status: 'Approved',
                        statusColor: Colors.green,
                      ),
                      _buildDocumentCard(
                        icon: Icons.picture_as_pdf,
                        iconColor: Colors.red,
                        title: 'Q2 Financial Report.pdf',
                        subtitle: 'Shared with 5 people',
                        size: '2.5 MB',
                        date: '14 apr',
                        status: 'Approved',
                        statusColor: Colors.green,
                      ),
                      _buildDocumentCard(
                        icon: Icons.description,
                        iconColor: Colors.grey,
                        title: 'Contract Draft v2.docx',
                        subtitle: 'Private',
                        size: '1.8 MB',
                        date: '14 apr',
                        status: 'Pending',
                        statusColor: Colors.yellow,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Helper widget for filter tabs
  Widget _buildFilterTab(String title, bool isSelected) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color:
            isSelected ? AppColors.primaryColor : Colors.grey.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        title,
        style: TextStyle(
          color: isSelected ? AppColors.whiteColor : AppColors.blackColor,
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  // Helper widget for document cards
  Widget _buildDocumentCard({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required String size,
    required String date,
    required String status,
    required Color statusColor,
  }) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.symmetric(vertical: 4),
      child: ListTile(
        leading: Icon(icon, color: iconColor, size: 40),
        title: Text(title, style: AppTextStyles.subtitle),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(subtitle, style: AppTextStyles.body),
            const SizedBox(height: 4),
            Row(
              children: [
                Text(size, style: AppTextStyles.body),
                const SizedBox(width: 8),
                Text(date, style: AppTextStyles.body),
              ],
            ),
          ],
        ),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: statusColor.withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            status,
            style: TextStyle(
              color: statusColor,
              fontSize: 12,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }
}
