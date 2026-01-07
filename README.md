# portal
# Job Listing Portal - MERN Stack

A full-stack job portal connecting employers and job seekers with secure authentication, role-based access, and an intuitive user interface.

## Features

### 🔐 Authentication & Authorization
- User registration and login using JWT
- Role-based access (Job Seeker / Employer)
- Secure password hashing using bcrypt
- Protected routes for dashboards

### 👨‍💼 Employer Features
- Create, edit, and delete job listings
- View applicants for each job
- Change application status (Pending / Accepted / Rejected)
- Dashboard with job statistics

### 👨‍🎓 Job Seeker Features
- Search jobs using keywords
- Filter jobs by location, job type, and salary range
- Apply for jobs with cover letter
- Track application status
- Upload and manage resume
- Profile management

## Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Icons

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt.js for password hashing
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd pms
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. **Create uploads directory**
```bash
mkdir -p uploads/resumes
```

5. **Start Backend Server**
```bash
npm run dev
```

6. **Frontend Setup**
```bash
cd ../frontend
npm install
```

7. **Start Frontend Development Server**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
pms/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleCheck.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   ├── uploads/
│   │   └── resumes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── employer/
│   │   │   │   ├── EmployerDashboard.jsx
│   │   │   │   ├── PostJob.jsx
│   │   │   │   ├── ManageJobs.jsx
│   │   │   │   └── JobApplicants.jsx
│   │   │   └── jobseeker/
│   │   │       ├── JobSeekerDashboard.jsx
│   │   │       ├── JobSearch.jsx
│   │   │       ├── JobDetails.jsx
│   │   │       ├── MyApplications.jsx
│   │   │       └── Profile.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `POST /api/auth/upload-resume` - Upload resume (Job Seeker only)

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Employer only)
- `PUT /api/jobs/:id` - Update job (Employer only)
- `DELETE /api/jobs/:id` - Delete job (Employer only)
- `GET /api/jobs/employer/my-jobs` - Get employer's jobs (Employer only)

### Applications
- `POST /api/applications` - Apply for job (Job Seeker only)
- `GET /api/applications/my-applications` - Get user's applications (Job Seeker only)
- `GET /api/applications/job/:jobId` - Get job applications (Employer only)
- `PUT /api/applications/:id/status` - Update application status (Employer only)

## Default Users

You can create test accounts:

**Employer Account:**
- Role: Employer
- Company Name: Your Company

**Job Seeker Account:**
- Role: Job Seeker
- Phone: Required
- Skills: Optional
- Resume: Upload after registration

## License

MIT
