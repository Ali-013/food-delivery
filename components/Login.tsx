"use client";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { fugaz } from "@/utils/appFonts";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const { signup, login } = useAuth(); // Assuming you have a useAuth hook for authentication
  const [authenticating, setAuthenticating] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      // Handle login or registration logic here
      if (isRegistering) {
        setAuthenticating(true);
        await signup(email, password);
      } else {
        setAuthenticating(true);
        await login(email, password);
      }
    } catch (error) {
      console.error("Error during authentication", error);
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`text-xl sm-text-5xl md-text-6xl ${fugaz.className}`}>
        {isRegistering ? "Register" : "Log In"}
      </h3>
      {isRegistering ? (
        <p>You&#39;re one step away!!! </p>
      ) : (
        <p>Welcome back!</p>
      )}
      <input
        className='max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3  hover:border-indigo-600 focus:border-indigo-600 border rounded-full outline-none border-solid border-indigo-400'
        placeholder='Email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 hover:border-indigo-600 focus:border-indigo-600 border rounded-full outline-none border-solid border-indigo-400'
        placeholder='password'
        type='password'
      />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button
          onClick={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
          dark={false}
        />
      </div>
      <p className='text-center'>
        {isRegistering
          ? "Already have an account ? "
          : `Don't have an account? `}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className='text-indigo-600 hover:cursor-pointer hover:underline'
        >
          {isRegistering ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
