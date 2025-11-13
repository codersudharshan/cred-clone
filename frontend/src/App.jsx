import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Login from "./components/Auth/Login.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import "./index.css";

// Main App Content
const AppContent = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // If user is logged in, show Dashboard
  if (user) {
    return <Dashboard />;
  }

  // If not logged in, show Auth pages
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
          <p className="text-gray-400 mb-6">Registration coming soon!</p>
          <button
            onClick={() => setIsLogin(true)}
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
