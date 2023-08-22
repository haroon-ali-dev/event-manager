# Event Manager
This full-stack application empowers admins to efficiently track member event attendance.

## Demo
https://github.com/haroon-ali-dev/event-manager/assets/87202358/0ca71947-394a-480f-bb2f-55a6f37a1586

## Problem
Managing attendance records for events can be an arduous task, prone to errors and inefficiencies. Admins often grapple with manual record-keeping, leading to inaccuracies, misplaced data, and time-consuming processes. The lack of a streamlined system can result in missed opportunities, improper resource allocation, and frustrated members.

## Solution
This application addresses these challenges head-on by providing a comprehensive solution for admins to effortlessly manage and monitor member attendance at events, eliminating the headaches associated with traditional methods.

## Features
- Secure login.
- Manage members. View, create, update, delete and search.
- On member creation, a member ID and a QR code is generated and sent to the member by email.
- Manage events. View, create, update, delete and search.
- When it's event time, members can show the QR code on their mobile devices. Admins can use the website on their mobile devices to check-in members to events by using the phone camera to scan the QR codes.

## Utilizations
- Fully responsive.
- Authentication with Auth0.
- Data overwrite protection using optimistic locking in PostgreSQL.
- Application deployed to AWS using AWS Elastic Beanstalk, AWS EC2, AWS Load Balancer, AWS S3, AWS CloudFront and GitHub Actions.
- Database deployed to AWS RDS.

## Tech Stack
HTML, CSS, JavaScript, React.js, Node.js, PostgreSQL, AWS Elastic Beanstalk, AWS EC2, AWS Load Balancer, AWS S3, AWS CloudFront, AWS RDS, GitHub Actions.

## Automated Tests
- End-to-End tests with Cypress.

## Deployment
- Application deployed to AWS.
- Database deployed to AWS.

## Deployment Links
- Deployed Application: https://d3n27sahgwxchw.cloudfront.net
