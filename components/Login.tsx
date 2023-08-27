import React from "react";
import Link from "next/link";
const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        className="h-6 w-auto"
        src="/logo-no-background.png"
        alt="Your Company"
      />
      <div className="">
        <div className="flex space-x-4">
          <Link href="/api/auth/signin">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
