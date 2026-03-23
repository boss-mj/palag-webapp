"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Email/password login
  const handleLogin = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      window.location.href = "/dashboard"; // redirect on success
    } catch (err: any) {
      console.error(err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Ensure user document exists
      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);
      if (!snapshot.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          username: user.displayName?.replace(/\s+/g, "").toLowerCase() || "",
          role: "seller",
          isVerified: false,
          createdAt: serverTimestamp(),
        });
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError(
        "Google sign-in failed. Make sure your domain is authorized in Firebase."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">Seller Login</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <div className="flex justify-end text-sm">
            <Link
              href="/auth/forgot-password"
              className="text-cyan-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-xl font-medium hover:bg-cyan-700 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

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

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
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