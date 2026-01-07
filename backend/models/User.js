import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['jobseeker', 'employer'],
    required: [true, 'Please specify role']
  },
  // Job Seeker specific fields
  phone: {
    type: String,
    required: function() { return this.role === 'jobseeker'; }
  },
  resume: {
    type: String, // File path
    default: null
  },
  skills: [{
    type: String
  }],
  experience: {
    type: String,
    default: ''
  },
  // Employer specific fields
  companyName: {
    type: String,
    required: function() { return this.role === 'employer'; }
  },
  companyDescription: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
