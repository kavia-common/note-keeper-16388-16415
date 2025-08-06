import React, { createContext, useContext, useState, useEffect } from "react";

// USER DATA TYPE
export type User = {
  email: string;
  token: string;
};

// Context type
interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// PUBLIC_INTERFACE
// React Auth Context (with backend connectivity placeholder)
const AuthContext = createContext<AuthContextProps>(null!);

// PUBLIC_INTERFACE
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Try to load user from localStorage
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (_email: string, _password: string) => {
    // TODO: Replace mock login with real backend call
    if (_email && _password) {
      const fakeToken = "demo-token";
      const userObj = { email: _email, token: fakeToken };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
