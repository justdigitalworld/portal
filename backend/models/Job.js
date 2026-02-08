import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  qualifications: {
    type: String,
    required: [true, 'Please provide qualifications']
  },
  responsibilities: {
    type: String,
    required: [true, 'Please provide responsibilities']
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Remote', 'hybrid'],
    required: [true, 'Please specify job type']
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  salaryRange: {
    min: {
      type: Number,
      required: [true, 'Please provide minimum salary']
    },
    max: {
      type: Number,
      required: [true, 'Please provide maximum salary']
    }
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  applicationsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search optimization
jobSchema.index({ title: 'text', description: 'text', location: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;
