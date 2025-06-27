// hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CredentialResponse } from "@react-oauth/google"; // ==> ADD IMPORT

import api from "@/lib/api";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path

  const [auth, setAuth] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    initialized: false,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const pathIsPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    // If the path is public, we don't need to check for a user.
    // Just initialize the auth state and stop.
    if (pathIsPublic) {
      setAuth({
        user: null,
        loading: false,
        error: null,
        initialized: true,
      });
      return; // Stop execution here
    }

    // --- This part now only runs on PROTECTED routes ---
    const loadUser = async () => {
      // Check for token first. If it doesn't exist, don't bother making an API call.
      const token = localStorage.getItem("token");
      if (!token) {
        setAuth({ user: null, loading: false, error: null, initialized: true });
        router.push("/login"); // Redirect if no token and on a private page
        return;
      }

      try {
        const res = await api.get("/api/v1/auth/me");
        setAuth({
          user: res.data.data,
          loading: false,
          error: null,
          initialized: true,
        });
      } catch (err) {
        // This happens if the token is invalid/expired
        localStorage.removeItem("token");
        setAuth({
          user: null,
          loading: false,
          error: null,
          initialized: true,
        });
        router.push("/login"); // Redirect to login if token is bad
      }
    };

    loadUser();
  }, [pathname, router]);

  const register = async (
    username: string,
    email: string,
    password: string,
    role = "user"
  ) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await api.post("/api/v1/auth/register", {
        // Add "/api" prefix here
        username,
        email,
        password,
        role,
      });

      setAuth((prev) => ({ ...prev, loading: false, error: null }));

      // localStorage.setItem("token", res.data.token);
      // setAuth({
      //   user: res.data.data,
      //   loading: false,
      //   error: null,
      //   initialized: true,
      // });

      // router.push("/dashboard");

      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || "Registration failed";
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error; // Re-throw to handle in component
    }
  };

  const login = async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await api.post("/api/v1/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      setAuth({
        user: res.data.data,
        loading: false,
        error: null,
        initialized: true,
      });

      router.push("/dashboard");
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || "Invalid credentials",
      }));
    }
  };

  const loginWithGoogle = async (credentialResponse: CredentialResponse) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await api.post("/api/v1/auth/google", {
        token: credentialResponse.credential, // The id_token is in the 'credential' field
      });

      localStorage.setItem("token", res.data.token);

      // Fetch user data after getting the app token
      const userRes = await api.get("/api/v1/auth/me");

      setAuth({
        user: userRes.data.data,
        loading: false,
        error: null,
        initialized: true,
      });

      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Google login failed.";
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const verifyEmail = useCallback(async (token: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await api.put(`/api/v1/auth/verifyemail/${token}`);
      localStorage.setItem("token", res.data.token);

      // You can make this slightly more efficient by not calling /me again
      // if your /verifyemail endpoint returns the user object. But let's
      // fix the loop first. This logic is functionally correct.
      const userRes = await api.get("/api/v1/auth/me");

      setAuth({
        user: userRes.data.data,
        loading: false,
        error: null,
        initialized: true,
      });

      // No need to redirect from here. The page component will handle it
      // when the `user` object becomes available. Let's remove this line
      // to give the component full control.
      // router.push("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Verification failed. The link may be invalid or expired.";
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      user: null,
      loading: false,
      error: null,
      initialized: true,
    });
    router.push("/login");
  };

  const forgotPassword = async (email: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await api.post("/api/v1/auth/forgotpassword", { email });
      setAuth((prev) => ({ ...prev, loading: false }));
      return true;
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || "Password reset failed",
      }));
      return false;
    }
  };

  const resetPassword = async (resetToken: string, password: string) => {
    setAuth((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await api.put(`/api/v1/auth/resetpassword/${resetToken}`, {
        password,
      });

      localStorage.setItem("token", res.data.token);
      setAuth({
        user: res.data.data,
        loading: false,
        error: null,
        initialized: true,
      });

      router.push("/dashboard");
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || "Password reset failed",
      }));
    }
  };

  return {
    ...auth,
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    loginWithGoogle,
  };
}
