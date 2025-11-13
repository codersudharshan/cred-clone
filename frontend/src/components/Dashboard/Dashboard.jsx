import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import apiService from "../../services/apiService";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [creditScore, setCreditScore] = useState(750);
  const [cards, setCards] = useState([]);
  const [rewards, setRewards] = useState(0);

  // Mock data - replace with actual API calls later
  useEffect(() => {
    // Simulate loading data
    setCards([
      {
        id: 1,
        bank: "HDFC Bank",
        number: "**** 4832",
        type: "VISA",
        limit: "₹1,50,000",
      },
      {
        id: 2,
        bank: "ICICI Bank",
        number: "**** 6712",
        type: "MasterCard",
        limit: "₹2,00,000",
      },
      {
        id: 3,
        bank: "SBI Card",
        number: "**** 8912",
        type: "VISA",
        limit: "₹1,00,000",
      },
    ]);
    setRewards(2500);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          CRED
        </div>

        <div className="hidden md:flex space-x-8 items-center">
          <button className="hover:text-green-400 transition-colors text-sm font-medium">
            credit score
          </button>
          <button className="hover:text-green-400 transition-colors text-sm font-medium">
            CRED pay
          </button>
          <button className="hover:text-green-400 transition-colors text-sm font-medium">
            products
          </button>
          <button className="hover:text-green-400 transition-colors text-sm font-medium">
            rewards
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm bg-gray-800 px-3 py-1 rounded-full">
            👋 {user?.name || user?.email}
          </div>
          <button
            onClick={logout}
            className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "Member"}!
          </h1>
          <p className="text-gray-400">Here's your financial overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {creditScore}
            </div>
            <p className="text-gray-400">Credit Score</p>
            <div className="mt-2 text-sm text-green-400">Excellent ✓</div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">
              ${rewards}
            </div>
            <p className="text-gray-400">Available Rewards</p>
            <div className="mt-2 text-sm text-green-400">Redeem now</div>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {cards.length}
            </div>
            <p className="text-gray-400">Active Cards</p>
            <div className="mt-2 text-sm text-green-400">Manage cards</div>
          </div>
        </div>

        {/* Credit Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Cards */}
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Your Credit Cards</h2>
            <div className="space-y-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-green-400 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{card.bank}</h3>
                      <p className="text-gray-400 text-sm">
                        {card.number} • {card.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Limit</p>
                      <p className="font-semibold">{card.limit}</p>
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                    Pay Bill
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full border border-gray-600 hover:border-green-400 text-white py-3 rounded-lg font-semibold transition-all duration-300">
              + Add New Card
            </button>
          </div>

          {/* Quick Actions & Rewards */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl mb-2">💳</div>
                  <div className="text-sm font-semibold">Pay Bills</div>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl mb-2">🎁</div>
                  <div className="text-sm font-semibold">Rewards</div>
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-semibold">Analytics</div>
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-semibold">Settings</div>
                </button>
              </div>
            </div>

            {/* Recent Rewards */}
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Recent Rewards</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold">Amazon Voucher</p>
                    <p className="text-sm text-gray-400">Earned on 15 Sep</p>
                  </div>
                  <span className="text-green-400 font-semibold">$50</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold">Flipkart Points</p>
                    <p className="text-sm text-gray-400">Earned on 12 Sep</p>
                  </div>
                  <span className="text-green-400 font-semibold">
                    1,200 pts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
