"use client";

import { useState } from "react";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    age: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Validation
  const validate = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.address ||
      !form.age ||
      !form.username ||
      !form.email ||
      !form.password
    )
      return "Please fill all required fields";

    if (Number(form.age) < 18) return "You must be at least 18 years old";

    if (form.password.length < 6) return "Password must be at least 6 characters";

    return null;
  };

  // Email/password registration
  const handleRegister = async () => {
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      try {
        // 2️⃣ Save user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName: form.firstName,
          middleName: form.middleName || "",
          lastName: form.lastName,
          address: form.address,
          age: Number(form.age),
          username: form.username,
          email: form.email,
          role: "seller",
          isVerified: false,
          createdAt: serverTimestamp(),
        });

        window.location.href = "/seller_dashboard";
      } catch (firestoreError) {
        console.error("Firestore failed", firestoreError);
        // Rollback Auth user
        await user.delete();
        setError("Failed to save profile. Please try again.");
      }
    } catch (authError: any) {
      console.error(authError);
      switch (authError.code) {
        case "auth/email-already-in-use":
          setError("Email is already registered");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters");
          break;
        default:
          setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        // Save user profile
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

      window.location.href = "/seller_dashboard";
    } catch (err: any) {
      console.error(err);
      setError("Google sign-in failed. Make sure your domain is authorized.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">


      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">

        {/* HEADER */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">Seller Registration</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Complete your details to start your vending business
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* PERSONAL INFO */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">PERSONAL INFORMATION</h3>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="input"
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Middle Name (Optional)"
                className="input"
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input"
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              <textarea
                placeholder="Address"
                className="input"
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <input
                type="number"
                placeholder="Age"
                className="input"
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">ACCOUNT DETAILS</h3>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Username"
                className="input"
                onChange={(e) => handleChange("username", e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input"
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>

          {/* ERROR */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* ACTIONS */}
        <div className="p-6 border-t space-y-3">
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-xl font-medium hover:bg-cyan-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-cyan-600 hover:underline">
              Sign in
            </Link>
          </p>

          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>
          <div className="flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">

            <Link href="../" className="text-cyan-600 hover:underline">
              Homepage
            </Link>
          </p>
        </div>

      </div>

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