import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  coverLetter: {
    type: String,
    default: ''
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  }],
  offerLetter: {
    content: {
      type: String,
      default: ''
    },
    sentAt: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Sent', 'Accepted', 'Declined'],
      default: 'Sent'
    },
    salary: String,
    joiningDate: Date
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
