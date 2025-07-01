import useSWR from "swr";
import { useRouter } from "next/navigation";
import { CredentialResponse } from "@react-oauth/google";
import api from "@/lib/api";

// The User interface remains the same
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  avatarUrl?: string;
}

// The fetcher function for SWR. It uses our configured axios instance.
// SWR will automatically pass the key ('/api/v1/auth/me') as the 'url' argument.
const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function useAuth() {
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>("/api/v1/auth/me", fetcher, {
    // SWR options
    revalidateOnFocus: false, // Optional: disable revalidating on window focus
    shouldRetryOnError: false, // Don't retry on 401/403 errors
  });

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/api/v1/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    // After logging in, we tell SWR to re-fetch the user data.
    // SWR will update the `user` object everywhere it's used.
    await mutate();
    router.push("/dashboard");
  };

  const loginWithGoogle = async (credentialResponse: CredentialResponse) => {
    const { data } = await api.post("/api/v1/auth/google", {
      token: credentialResponse.credential,
    });
    localStorage.setItem("token", data.token);
    await mutate();
    router.push("/dashboard");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    // We tell SWR to clear the user data immediately (optimistic update)
    // and not to re-fetch.
    await mutate(undefined, false);
    router.push("/login");
  };

  // Other functions like register, forgotPassword etc. don't need to change much
  // as they don't directly manipulate the logged-in user state.
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    // This function can remain as an API call without mutation,
    // as registration typically requires email verification before login.
    return api.post("/api/v1/auth/register", { username, email, password });
  };

  // --- ADD THIS FUNCTION ---
  const verifyEmail = async (token: string) => {
    // This API call should return a new JWT for the now-verified user.
    const res = await api.put(`/api/v1/auth/verifyemail/${token}`);

    // Store the new token from the response
    localStorage.setItem("token", res.data.token);

    // Tell SWR to re-fetch the user data. SWR will now use the new token
    // because our axios interceptor automatically adds it to requests.
    // This will update the `user` object everywhere in the app.
    await mutate();
  };

  // You can add back forgotPassword, resetPassword etc. here in the same async/await style.
  // They don't need to call `mutate`.

  return {
    user,
    isLoading,
    isError: !!error, // A boolean flag for convenience
    login,
    logout,
    verifyEmail,
    loginWithGoogle,
    register,
    mutate, // Expose mutate for advanced cases if needed
  };
}
