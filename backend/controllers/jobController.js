import Job from '../models/Job.js';
import Application from '../models/Application.js';

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer & Admin)
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      qualifications,
      responsibilities,
      jobType,
      location,
      salaryRange
    } = req.body;

    const job = await Job.create({
      title,
      description,
      qualifications,
      responsibilities,
      jobType,
      location,
      salaryRange,
      employer: req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all jobs with search and filters
// @route   GET /api/jobs
// @access  Public
export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, minSalary, maxSalary } = req.query;
    
    let query = { status: 'active' };

    // Keyword search
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Job type filter
    if (jobType) {
      query.jobType = jobType;
    }

    // Salary range filter
    if (minSalary || maxSalary) {
      query['salaryRange.min'] = {};
      if (minSalary) query['salaryRange.min'].$gte = Number(minSalary);
      if (maxSalary) query['salaryRange.max'] = { $lte: Number(maxSalary) };
    }

    const jobs = await Job.find(query)
      .populate('employer', 'name companyName email')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employer', 'name companyName companyDescription email website');

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get employer's jobs
// @route   GET /api/jobs/employer/my-jobs
// @access  Private (Employer only)
export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user._id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only)
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job owner
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const {
      title,
      description,
      qualifications,
      responsibilities,
      jobType,
      location,
      salaryRange,
      status
    } = req.body;

    job.title = title || job.title;
    job.description = description || job.description;
    job.qualifications = qualifications || job.qualifications;
    job.responsibilities = responsibilities || job.responsibilities;
    job.jobType = jobType || job.jobType;
    job.location = location || job.location;
    job.salaryRange = salaryRange || job.salaryRange;
    job.status = status || job.status;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job owner
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    
    // Also delete all applications for this job
    await Application.deleteMany({ job: req.params.id });

    res.json({ message: 'Job removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
