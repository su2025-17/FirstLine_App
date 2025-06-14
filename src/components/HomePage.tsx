import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (screen: 'intro' | 'motivation') => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center max-w-md w-full">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">First Line</h1>
          <p className="text-sm text-gray-600">For creative souls</p>
        </div>

        {/* Greeting */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Hi there, creative soul.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Take a moment to connect with yourself and find the inspiration you need.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('intro')}
            className="w-full bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-gray-800 font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Start My Intro</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('motivation')}
            className="w-full bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 text-gray-800 font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>I Need Motivation</span>
            </div>
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-12">
          <p className="text-xs text-gray-500 italic">
            Your creativity matters. Your voice has value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;