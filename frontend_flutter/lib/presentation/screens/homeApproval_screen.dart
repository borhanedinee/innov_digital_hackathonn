import 'package:flutter/material.dart';

class HomeApprovalscreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          leading: Icon(Icons.shield, color: Colors.blue),
          title: Text('DOCUSHIELD'),
          actions: [
            IconButton(
              icon: Icon(Icons.notifications, color: Colors.grey),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.person, color: Colors.grey),
              onPressed: () {},
            ),
          ],
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'Search documents...',
                  prefixIcon: Icon(Icons.search),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                    borderSide: BorderSide.none,
                  ),
                  filled: true,
                  fillColor: Colors.grey[200],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue[100],
                  foregroundColor: Colors.blue,
                  minimumSize: Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.add),
                    SizedBox(width: 8),
                    Text('Send documents'),
                  ],
                ),
              ),
            ),
            TabBar(
              labelColor: Colors.blue,
              unselectedLabelColor: Colors.grey,
              indicatorColor: Colors.blue,
              tabs: [Tab(text: 'Recent'), Tab(text: 'External')],
            ),
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 16.0,
                vertical: 8.0,
              ),
              child: Row(
                children: [
                  DropdownButton<String>(
                    value: 'Last day',
                    items:
                        <String>['Last day', 'Last week', 'Last month'].map((
                          String value,
                        ) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                    onChanged: (_) {},
                  ),
                  Spacer(),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16.0,
                      vertical: 8.0,
                    ),
                    child: Text(
                      'TODAY',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  DocumentCard(
                    icon: Icons.picture_as_pdf,
                    title: 'Contract_2025.pdf',
                    sender: 'Ahmed Reda',
                    time: '10 min',
                    status: 'Safe & Verified',
                    statusColor: Colors.green,
                    actions: ['APPROVE', 'DENY'],
                  ),
                  DocumentCard(
                    icon: Icons.description,
                    title: 'Proposal.docx',
                    sender: 'Walid',
                    time: '2h',
                    status: 'Safe & Verified',
                    statusColor: Colors.green,
                    actions: ['APPROVE', 'FORWARD'],
                  ),
                  DocumentCard(
                    icon: Icons.table_chart,
                    title: 'Budget_2025.xlsx',
                    sender: 'Salim',
                    time: '3h',
                    status: 'Safe & Verified',
                    statusColor: Colors.green,
                    actions: ['APPROVE', 'DENY'],
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16.0,
                      vertical: 8.0,
                    ),
                    child: Text(
                      'OLDER',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  DocumentCard(
                    icon: Icons.picture_as_pdf,
                    title: 'Contract_2025.pdf',
                    sender: 'Ahmed Reda',
                    time: '10 min',
                    status: 'Tampered',
                    statusColor: Colors.orange,
                    actions: ['DELETE'],
                  ),
                  DocumentCard(
                    icon: Icons.description,
                    title: 'Proposal.docx',
                    sender: 'Walid',
                    time: '2h',
                    status: 'Safe & Verified',
                    statusColor: Colors.green,
                    actions: ['APPROVE', 'DENY'],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class DocumentCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String sender;
  final String time;
  final String status;
  final Color statusColor;
  final List<String> actions;

  const DocumentCard({
    required this.icon,
    required this.title,
    required this.sender,
    required this.time,
    required this.status,
    required this.statusColor,
    required this.actions,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
                ),
                Text("10 min", style: TextStyle(fontSize: 16.0)),
              ],
            ),
            SizedBox(height: 4.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'From: $sender',
                  style: TextStyle(color: Colors.grey, fontSize: 14.0),
                ),
                Row(
              children: [
                Icon(Icons.check_circle, color: statusColor, size: 16.0),
                SizedBox(width: 4.0),
                Text(
                  status,
                  style: TextStyle(color: statusColor, fontSize: 14.0),
                ),
                 
              ],
            ),
              ],
            ),
            SizedBox(height: 4.0),
            
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      // Handle approve
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                      minimumSize: const Size(100, 40),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: const Text('APPROVE'),
                  ),
                ),
                SizedBox(width: 10,) , 
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      // Handle deny
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                      minimumSize: const Size(100, 40),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: const Text('DENY'),
                  ),
                ),
              ],
            ),
          ],
        ),

        // Column(
        //   children: [
        //     Text(
        //       time,
        //       style: TextStyle(
        //         color: Colors.grey,
        //         fontSize: 12.0,
        //       ),
        //     ),
        //     SizedBox(height: 8.0),
        //     // Row(
        //     //   children: actions.map((action) {
        //     //     return Padding(
        //     //       padding: const EdgeInsets.symmetric(horizontal: 4.0),
        //     //       child: ElevatedButton(
        //     //         onPressed: () {},
        //     //         style: ElevatedButton.styleFrom(
        //     //           backgroundColor: action == 'APPROVE'
        //     //               ? Colors.green
        //     //               : action == 'DENY' || action == 'DELETE'
        //     //                   ? Colors.red
        //     //                   : Colors.grey,
        //     //           foregroundColor: Colors.white,
        //     //           minimumSize: Size(80, 30),
        //     //           shape: RoundedRectangleBorder(
        //     //             borderRadius: BorderRadius.circular(8.0),
        //     //           ),
        //     //         ),
        //     //         child: Text(action),
        //     //       ),
        //     //     );
        //     //   }).toList(),
        //     // ),
        //   ],
        // ),
      ),
    );
  }
}
