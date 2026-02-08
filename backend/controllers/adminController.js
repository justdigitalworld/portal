import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import bcrypt from 'bcryptjs';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCompanies = await User.countDocuments({ role: 'employer' });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    
    // Revenue logic: $100 per job, $50 per accepted app
    const acceptedAppsCount = await Application.countDocuments({ status: 'Accepted' });
    const revenue = (totalJobs * 100) + (acceptedAppsCount * 50);

    // Get some recent activity (last 5 jobs)
    const recentJobs = await Job.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('employer', 'name companyName');

    res.json({
      stats: {
        totalUsers,
        totalCompanies,
        totalJobs,
        totalApplications,
        revenue
      },
      recentJobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a job seeker
// @route   POST /api/admin/jobseeker
// @access  Private (Admin only)
export const createJobSeeker = async (req, res) => {
  try {
    const { name, email, password, phone, skills, experience } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'jobseeker',
      phone,
      skills: skills || [],
      experience: experience || ''
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};