"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">
            Seller Login
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-6">

          <input
            type="email"
            placeholder="Email or Username"
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
          />

          <div className="flex justify-end text-sm">
            <Link href="/auth/forgot-password" className="text-cyan-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button className="w-full bg-cyan-600 text-white py-3 rounded-xl font-medium hover:bg-cyan-700 transition">
            Sign In
          </button>

          {/* SIGN UP LINK */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-cyan-600 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50 transition">
            Continue with Google
          </button>

        </div>

      </div>

      {/* GLOBAL INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          font-size: 14px;
        }

        .input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
        }
      `}</style>

    </div>
  );
}