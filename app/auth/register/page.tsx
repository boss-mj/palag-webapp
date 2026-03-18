"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [idFile, setIdFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">
            Seller Registration
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Complete your details to start your vending business
          </p>
        </div>

        <div className="p-6 space-y-6">

          {/* PERSONAL INFO */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              PERSONAL INFORMATION
            </h3>

            <div className="grid gap-3">

              <input type="text" placeholder="First Name" className="input" />
              <input type="text" placeholder="Middle Name (Optional)" className="input" />
              <input type="text" placeholder="Last Name" className="input" />

              <textarea placeholder="Address" className="input" />

              <input type="number" placeholder="Age" className="input" />

            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              ACCOUNT DETAILS
            </h3>

            <div className="grid gap-3">
              <input type="text" placeholder="Username" className="input" />
              <input type="email" placeholder="Email" className="input" />
              <input type="password" placeholder="Password" className="input" />
            </div>
          </div>

          {/* VERIFICATION */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              IDENTITY VERIFICATION
            </h3>

            <div className="space-y-4">

              {/* ID Upload */}
              <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-cyan-500 transition">
                <p className="text-sm text-gray-500 mb-2">
                  Upload Valid ID
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="idUpload"
                />

                <label
                  htmlFor="idUpload"
                  className="cursor-pointer text-cyan-600 font-medium"
                >
                  Click to upload
                </label>

                {idFile && (
                  <p className="text-xs text-gray-400 mt-2">
                    {idFile.name}
                  </p>
                )}
              </div>

              {/* SELFIE */}
              <div className="border rounded-xl p-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Take Selfie
                </span>

                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="text-sm"
                />
              </div>

              {/* VIDEO */}
              <div className="border rounded-xl p-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Record Video Verification
                </span>

                <input
                  type="file"
                  accept="video/*"
                  capture
                  className="text-sm"
                />
              </div>

            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="p-6 border-t space-y-3">

          <button className="w-full bg-cyan-600 text-white py-3 rounded-xl font-medium hover:bg-cyan-700 transition">
            Create Account
          </button>

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