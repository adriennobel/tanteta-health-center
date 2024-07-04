# Tanteta Health Center Appointment App

## Overview

The Tanteta Health Center Appointment App is designed to facilitate the scheduling of appointments between patients and doctors. Patients can create an account, log in, and book appointments with available doctors. Each doctor has a specialty and set availability, making it easy for patients to find the right doctor for their needs.

## Features

- User Authentication: Patients can sign up and log in.
- Appointment Scheduling: Book, view, and manage appointments.
- Doctor Specialties: Filter doctors by their specialties.
- User Profile: View and update user information.
- Reports: Generate reports of scheduled appointments.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

You will also need to set up a MongoDB database:

1. Create a free tier account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Set up a cluster and create a new database named `mainDB`.
3. Obtain the MongoDB URI connection string for your `.env` file.

## Installation

Follow these steps to run the application locally:

1. **Clone the Repository**
  ```bash
  git clone https://github.com/your-repo/tanteta-health-center-app.git
  cd tanteta-health-center-app
  ```

2. **Install Dependencies**
  ```bash
  npm install
  ```

3. **Set Up Environment Variables**
- Create a .env file in the back-end directory of the project and add the required environment variables like your mongoDB URI:
  ```env
  URI=your_mongodb_uri
  ```

4. **Run the Application**
- Start the application in development mode:
  ```bash
  npm run host
  ```
- Open your browser and navigate to http://localhost:5173 to view the application.

## Usage
### Logging In
- Open the application and click the "Log in" button in the top right corner.
- Enter your email and password to log in.
### Signing Up
- On the login page, click on the link that says “Need an account?”.
- Fill in the required fields (email, password, first name, last name, phone number) and click "Sign Up".
### Scheduling a Visit
- Click on the “Schedule a Visit” tab.
- Select a doctor and choose an available date and time slot.
- Click “Confirm” to schedule your visit.
- Viewing and Managing Appointments
- View your scheduled appointments on the main landing page.
- Click on an appointment to see details or to edit/cancel it.
### Generating Reports
- Navigate to the “Reports” tab from the main landing page.
- Select the date range and type of report you want to generate.
- Click “Generate Report” to view the report.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests.