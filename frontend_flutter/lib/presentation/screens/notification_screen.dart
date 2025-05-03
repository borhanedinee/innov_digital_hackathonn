import 'package:flutter/material.dart';

class NotificationsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Icon(Icons.arrow_back),
        title: Text('Notifications'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Text(
              'TODAY',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.grey,
              ),
            ),
          ),
          NotificationCard(
            icon: Icons.check_circle,
            iconColor: Colors.green,
            title: 'DOCUMENT APPROVED!',
            subtitle: 'The document you sent to MOBLIS has been approved by the admin',
            time: '8min',
            backgroundColor: Colors.green.withOpacity(0.1),
          ),
          NotificationCard(
            icon: Icons.send,
            iconColor: Colors.blue,
            title: 'SENDING DONE!',
            subtitle: 'Your document has reached its destination, wait for the approval',
            time: '1d ago',
            backgroundColor: Colors.blue.withOpacity(0.1),
          ),
          NotificationCard(
            icon: Icons.cancel,
            iconColor: Colors.red,
            title: 'DOCUMENT REJECTED!',
            subtitle: 'The admin of CISCO has rejected your document, see the feedback.',
            time: '1d ago',
            backgroundColor: Colors.red.withOpacity(0.1),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Text(
              'OLDER',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.grey,
              ),
            ),
          ),
          NotificationCard(
            icon: Icons.check_circle,
            iconColor: Colors.green,
            title: 'DOCUMENT APPROVED!',
            subtitle: 'The document you sent to Algérie POSTE has been approved by the admin',
            time: '8min',
            backgroundColor: Colors.green.withOpacity(0.1),
            hasBorder: true,
          ),
        ],
      ),
    );
  }
}

class NotificationCard extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String title;
  final String subtitle;
  final String time;
  final Color backgroundColor;
  final bool hasBorder;

  const NotificationCard({
    required this.icon,
    required this.iconColor,
    required this.title,
    required this.subtitle,
    required this.time,
    required this.backgroundColor,
    this.hasBorder = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
      padding: EdgeInsets.all(12.0),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12.0),
        border: hasBorder ? Border.all(color: Colors.blue, width: 2.0) : null,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            color: iconColor,
            size: 30.0,
          ),
          SizedBox(width: 12.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16.0,
                  ),
                ),
                SizedBox(height: 4.0),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: Colors.black87,
                    fontSize: 14.0,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(width: 8.0),
          Text(
            time,
            style: TextStyle(
              color: Colors.grey,
              fontSize: 12.0,
            ),
          ),
        ],
      ),
    );
  }
}