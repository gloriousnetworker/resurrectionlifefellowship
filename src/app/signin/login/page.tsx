"use client";

import Image from 'next/image';
import LoginCard from '@/components/signin/LoginCard';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#15104D]">
            {/* Left Section - Image */}
            <div className="w-full md:w-1/2">
                <Image
                    src="/signin_images/Login_image.png" // Ensure this path is correct
                    alt="Login Image"
                    width={500} // Adjust width as needed
                    height={500} // Adjust height as needed
                    className="w-full h-auto object-cover rounded-lg"
                    priority // Adds priority loading for better LCP
                />
            </div>

            {/* Right Section - Login Card */}
            <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
                <LoginCard />
            </div>
        </div>
    );
}
