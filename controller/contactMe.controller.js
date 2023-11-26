
// Import the sendMail function
const sendMail = require("../utils/sendMail");

// Controller for handling contact form submissions
exports.contactMe = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    // Check if any of the required fields is missing
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send email using the sendMail function
    sendMail({
      from: email, // Use the client's email as the 'from' address
      to: process.env.EMAIL_USER,
      subject: "Message from Client",
      text: `<h2>Email from ${fullName} (${email})</h2>
             <h3>${message}</h3>`,
    });

    // Respond with a success message
    return res.status(200).json({
      success: true,
      status:200,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};