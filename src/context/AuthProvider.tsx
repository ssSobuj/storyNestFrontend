"use client";

import React, { createContext, useContext } from "react";
import useAuth, { User } from "@/hooks/useAuth";
import { CredentialResponse } from "@react-oauth/google";

// Define the new shape of the context data from our useAuth hook
interface AuthContextType {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credentialResponse: CredentialResponse) => Promise<void>;
  logout: () => Promise<void>;
  // Add other functions if you need them globally
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
