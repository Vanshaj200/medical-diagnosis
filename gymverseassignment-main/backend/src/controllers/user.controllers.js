const config = require('../conf/config');
const { getNewDoctorApplicationEmail, getApplicationAcceptedEmail } = require('../utils/emailTemplates');
const { uploadOnCloudinary, deleteFromCloudinary } = require('../middlewares/cloudinary');
const User = require('../models/user.model')
const Doctor = require('../models/doctor.model')
const { Resend } = require('resend')
const resend = new Resend(config.resendApiKey)
// Import the models
const Workout = require("../models/workout.model"); // Assuming workoutSchema is defined elsewhere
const Activity = require('../models/activity.model')
const Goal = require("../models/goals.model")



const userAuth = async (req, res) => {
  try {
    const { authId, fullname, email } = req.body;

    // Validate request body
    if (!authId || !email) {
      return res.status(400).json({ message: 'authId and email are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ authId });

    if (existingUser) {
      // User exists, handle login logic here
      return res.status(200).json({
        message: 'User logged in successfully',
        user: existingUser,
      });
    } else {
      // User does not exist, handle registration logic here
      const newUser = new User({
        authId,
        fullname: fullname || 'Anonymous', // Default value if fullname is not provided
        email,
      });

      await newUser.save();

      return res.status(201).json({
        message: 'User registered successfully',
        user: newUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}


const getUsers = async (req, res) => {
  try {
    const data = await User.find()
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

const createProfile = async (req, res) => {
  try {
    // Validate request body and files
    const { name, phone, qualifications, experience, specialization, email, calId } = req.body;
    const profileImage = req.files['profileImage']?.[0];
    const pdfDocument = req.files['pdfDocument']?.[0];

    if (!name || !phone || !qualifications || !experience || !specialization || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!profileImage || !pdfDocument) {
      return res.status(400).json({ error: 'Profile image or document not provided' });
    }

    // Extract file paths
    const profileImgPath = profileImage.path;
    const documentsPath = pdfDocument.path;

    // Extract authId from request parameters
    const { authId } = req.params;

    // Find existing user
    const existingUser = await User.findOne({ authId });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has a doctor profile
    const existingDoctorProfile = await Doctor.findOne({ _id: existingUser.doctorId });
    if (existingDoctorProfile) {
      return res.status(400).json({ error: 'Doctor profile already exists for this user' });
    }

    // Upload files to Cloudinary
    const profileImg = await uploadOnCloudinary(profileImgPath);
    const documents = await uploadOnCloudinary(documentsPath);

    // Create a new doctor profile
    const doctor = await Doctor.create({
      name,
      qualifications,
      experience,
      calId,
      specialization,
      profileImg: profileImg.url,
      documents: documents.url,
    });

    // Update user with new doctorId and phone
    const userData = await User.findByIdAndUpdate(
      existingUser._id,
      {
        phone,
        doctorId: doctor._id,
      },
      { new: true }
    );

    // Add a new entry to the inbox for all admin users
    await User.updateMany(
      {
        $or: [
          { role: 'admin' },
          { isAdmin: true }
        ]
      },
      {
        $push: {
          inbox: {
            text: `${name} has applied.`,
            doctorId: existingUser._id,
          },
        },
      }
    );
    

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'delivered@resend.dev',
      to: ['kunalkhandelwal108@gmail.com'],
      subject: 'New Doctor Application Received',
      html: getNewDoctorApplicationEmail(name, email, phone, specialization, experience, qualifications),
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Return the created doctor and updated user data
    res.status(200).json({ doctor, userData, emailResponse: data });
    // console.log({ doctor, userData, emailResponse: data, admin });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const {authId} = req.params
    const data = await User.findOne({authId}).populate('doctorId')
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

const getAllRequests = async (req, res) => {
  try {
    // Fetch all admin users and populate the inbox field and its doctorId
    const admins = await User.find({ role: 'admin' })
      .populate({
        path: 'inbox.doctorId', // Populate doctorId inside inbox
        model: 'User'           // Ensure this is the correct model name
      })
      .populate({
        path: 'doctorId', // Populate the doctorId field of the User model
        model: 'doctor'  // Ensure this is the correct model name
      });

    // Extract and return all inboxes
    const inboxes = admins.flatMap(admin => admin.inbox);

    // Further populate the nested doctorId field in the inbox
    const populatedInboxes = await Promise.all(
      inboxes.map(async (inbox) => {
        const populatedInbox = await User.populate(inbox, {
          path: 'doctorId.doctorId',
          model: 'doctor' // Ensure this is the correct model name
        });
        return populatedInbox;
      })
    );

    res.json(populatedInboxes);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'An error occurred while fetching requests' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const inboxId = req.params.inboxId;
    const {docAdminId, docId} = req.body



    // Find all users with role: "admin" or isAdmin: true
    const admins = await User.find({
      $or: [{ role: "admin" }, { isAdmin: true }]
    });

    // Iterate over each admin to remove the inbox object with the specified id
    for (let admin of admins) {
      // Find the index of the object in the inbox array that matches the inboxId
      const inboxIndex = admin.inbox.findIndex(item => item.id === inboxId);

      // If an object with the specified id is found, remove it
      if (inboxIndex !== -1) {
        admin.inbox.splice(inboxIndex, 1);
        await admin.save();  // Save the updated user document
      }
    }

    const doctor = await User.findByIdAndUpdate(docAdminId, {isDoctor:false})
    const docData = await Doctor.findByIdAndDelete(docId)

    // Send a success response
    res.status(200).json({ message: 'Inbox item successfully deleted for all admins', doctor, docData });
    console.log({ message: 'Inbox item successfully deleted for all admins', doctor, docData })

   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const acceptDoctor = async (req, res) => {
  try {
    const doctorId = req.params.inboxId;

    // Update the doctor by setting isAdmin to true
    const updatedDoctor = await User.findByIdAndUpdate(
      doctorId, 
      { isDoctor: true }, 
      { new: true } // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'delivered@resend.dev',
      to: ['kunalkhandelwal108@gmail.com'],
      subject: 'Application Approved',
      html: getApplicationAcceptedEmail(),
    });
    res.json({data, doctorId});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({isDoctor:true}).populate('doctorId')
    res.json(doctors)
  } catch (error) {
    console.log(error)
  }
}

const updateDoctorProfile = async (req, res) => {
  try {
    const { authId } = req.params;
    const data = req.body;

    // Find the doctor by authId in the User collection
    const doctor = await User.findOne({ authId });

    // If the doctor is not found, return a 404 error
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const doctorId = doctor.doctorId;

    // Find the detailed doctor profile in the Doctor collection by doctorId
    const finalDoctor = await Doctor.findById(doctorId);

    // If the detailed doctor profile is not found, return a 404 error
    if (!finalDoctor) {
      return res.status(404).json({ message: 'Detailed doctor profile not found' });
    }

    // Update the detailed doctor profile with the provided data
    Object.keys(data).forEach(key => {
      if (finalDoctor[key] !== undefined) {
        finalDoctor[key] = data[key];
      }
    });

    // Save the updated doctor profile
    const updatedDoctor = await finalDoctor.save();

    // Return the updated doctor profile as a response
    return res.status(200).json({
      message: 'Profile updated successfully',
      doctor: updatedDoctor,
    });

  } catch (error) {
    console.error('Error updating doctor profile:', error);

    // Return a 500 status code for any server errors
    return res.status(500).json({
      message: 'An error occurred while updating the profile',
      error: error.message,
    });
  }
};





// Endpoint to get user stats
const dashboard = async (req, res) => {
  const userId = req.params.userId;

  // Get the start and end of the current week (Monday to Sunday) using plain JavaScript
  const today = new Date();
  const dayOfWeek = today.getDay(); // Get the current day of the week (0 for Sunday, 6 for Saturday)
  
  // Calculate the start of the week (Monday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

  // Calculate the end of the week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59

  try {
    // 1. Fetch total calories burned and total time spent from Workout for the current week
    const [workoutSummary] = await Workout.aggregate([
      { 
        $match: { 
          userId: userId,
          date: { $gte: startOfWeek, $lte: endOfWeek } // Filter by current week
        } 
      },
      {
        $group: {
          _id: null,
          totalCaloriesBurned: { $sum: "$caloriesBurned" },
          totalTimeSpent: { $sum: "$duration" }
        }
      }
    ]);

    // 2. Fetch total distance covered and total steps taken from Activity for the current week
    const [activitySummary] = await Activity.aggregate([
      { 
        $match: { 
          userId: userId,
          date: { $gte: startOfWeek, $lte: endOfWeek } // Filter by current week
        }
      },
      {
        $group: {
          _id: null,
          totalDistance: { $sum: "$distance" },
          totalSteps: { $sum: "$steps" }
        }
      }
    ]);

    // 3. Fetch total achieved and not achieved goals (irrespective of time)
    const achievedGoals = await Goal.countDocuments({ 
      userId: userId, 
      isAchieved: true,
    });

    const notAchievedGoals = await Goal.countDocuments({ 
      userId: userId, 
      isAchieved: false,
    });

    // Prepare response
    res.json({
      totalCaloriesBurned: workoutSummary ? workoutSummary.totalCaloriesBurned : 0,
      totalTimeSpent: workoutSummary ? workoutSummary.totalTimeSpent : 0,
      totalDistance: activitySummary ? activitySummary.totalDistance : 0,
      totalSteps: activitySummary ? activitySummary.totalSteps : 0,
      achievedGoals,
      notAchievedGoals
    });

  } catch (error) {
    console.error('Error in dashboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  userAuth,
  getUsers,
  createProfile,
  getAllRequests,
  deleteDoctor,
  acceptDoctor,
  getAllDoctors,
  getUserProfile,
  updateDoctorProfile, dashboard
}