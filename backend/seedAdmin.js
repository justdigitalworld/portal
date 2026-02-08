import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('⚠️  Admin user already exists');
            console.log('Email: admin@example.com');
            console.log('Password: (The password you set previously)');
            process.exit();
        }

        const admin = await User.create({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin',
            // Mock required fields for other roles to satisfy schema if needed (though role-based validation handles this)
            phone: '1234567890', 
            companyName: 'Admin Corp' 
        });

        console.log('✅ Admin user created successfully');
        console.log('Email: admin@example.com');
        console.log('Password: password123');
        
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
