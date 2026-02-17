const getNewDoctorApplicationEmail = (name, email, phone, specialization, experience, qualifications) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Doctor Application</title>
  <style>
      body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
      .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; }
      .header { background-color: #007bff; color: #fff; padding: 15px; border-radius: 5px 5px 0 0; text-align: center; }
      .content { padding: 20px; }
      .content h2 { color: #007bff; }
      .content p { line-height: 1.6; }
      .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
      <div class="header"><h1>New Doctor Application Received</h1></div>
      <div class="content">
          <h2>Application Details</h2>
          <p><strong>Applicant Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${phone}</p>
          <p><strong>Specialization:</strong> ${specialization}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Qualification:</strong> ${qualifications}</p>
          <p><strong>Documents Submitted:</strong></p>
          <ul>
              <li>Resume/CV</li>
              <li>Medical License</li>
              <li>Degree Certificates</li>
          </ul>
          <p>Please review the application and documents at your earliest convenience.</p>
      </div>
      <div class="footer"><p>This email was sent automatically. Please do not reply.</p></div>
  </div>
</body>
</html>
`;

const getApplicationAcceptedEmail = () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Doctor Application Accepted</title>
<style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    .header { background-color: #28a745; color: #fff; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; }
    .content h2 { color: #28a745; font-size: 20px; }
    .content p { line-height: 1.6; margin: 15px 0; }
    .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #666; }
</style>
</head>
<body>
<div class="container">
    <div class="header"><h1>Application Accepted!</h1></div>
    <div class="content">
        <h2>Congratulations!</h2>
        <p>We are excited to inform you that your application to join our platform as a doctor has been <strong>accepted</strong>. Welcome to our community of healthcare professionals!</p>
        <p>You can now access your account and start managing your profile, scheduling appointments, and connecting with patients.</p>
    </div>
    <div class="footer">
        <p>This email was sent automatically. Please do not reply.</p>
        <p>If you have any questions or need assistance, please contact our support team.</p>
    </div>
</div>
</body>
</html>
`;

module.exports = {
getNewDoctorApplicationEmail,
getApplicationAcceptedEmail,
};
