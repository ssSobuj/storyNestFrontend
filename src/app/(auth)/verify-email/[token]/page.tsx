"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth"; // Adjust path if needed

const VerifyEmailPage = () => {
  const { verifyEmail, loading, error, user } = useAuth();
  const params = useParams();
  const router = useRouter();

  const hasVerified = useRef(false);

  useEffect(() => {
    // The user is already verified and logged in, redirect them
    if (user) {
      router.push("/dashboard");
      return;
    }

    if (hasVerified.current) {
      return;
    }

    const token = params.token;
    if (typeof token === "string" && token) {
      verifyEmail(token).catch((err) => {
        // The error is already set in the useAuth state,
        // so we can just log it here if we want.
        console.error("Verification failed:", err);
      });
    }
  }, [params.token, user, verifyEmail, router]);

  // Display different states to the user
  if (loading) {
    return <div>Verifying your email, please wait...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Verification Failed</h1>
        <p>{error}</p>
        <p>
          Please try to <a href="/login">log in</a> or{" "}
          <a href="/register">register</a> again.
        </p>
      </div>
    );
  }

  // This content will be shown briefly before the redirect on success
  return (
    <div>Verification successful! Redirecting you to the dashboard...</div>
  );
};

export default VerifyEmailPage;
