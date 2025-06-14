import React, { useState } from 'react';
import { ArrowLeft, Heart, Sun, Zap, Compass } from 'lucide-react';

interface MotivationSpaceProps {
  onNavigate: (screen: 'home') => void;
}

const MotivationSpace: React.FC<MotivationSpaceProps> = ({ onNavigate }) => {
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [showAffirmation, setShowAffirmation] = useState(false);

  const feelings = [
    { value: 'discouraged', label: 'Discouraged', icon: Heart },
    { value: 'anxious', label: 'Anxious', icon: Zap },
    { value: 'excited', label: 'Excited', icon: Sun },
    { value: 'hopeful', label: 'Hopeful', icon: Compass }
  ];

  const affirmations = {
    discouraged: "Even the best stories have quiet chapters. This is one of yours.",
    anxious: "You are more than one moment.",
    excited: "Your energy is your gift — share it.",
    hopeful: "You're already growing. Keep going."
  };

  const affirmationColors = {
    discouraged: 'from-rose-200 to-pink-200',
    anxious: 'from-blue-200 to-indigo-200',
    excited: 'from-yellow-200 to-orange-200',
    hopeful: 'from-green-200 to-teal-200'
  };

  const handleFeelingSelect = (feeling: string) => {
    setSelectedFeeling(feeling);
    setShowAffirmation(true);
  };

  const resetSelection = () => {
    setSelectedFeeling('');
    setShowAffirmation(false);
  };

  return (
    <div className="min-h-screen px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Motivation Space</h1>
        <div className="w-12"></div>
      </div>

      <div className="max-w-md mx-auto">
        {!showAffirmation ? (
          /* Feeling Selection */
          <div className="text-center space-y-6">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                How are you feeling today?
              </h2>
              <p className="text-gray-600 text-sm">
                It's okay to not be okay. Let's find the right words for you.
              </p>
            </div>

            <div className="space-y-3">
              {feelings.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleFeelingSelect(value)}
                  className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-800 font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Affirmation Display */
          <div className="text-center space-y-6">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${affirmationColors[selectedFeeling as keyof typeof affirmationColors]} rounded-full mb-4`}>
                {React.createElement(feelings.find(f => f.value === selectedFeeling)?.icon || Heart, {
                  className: "w-8 h-8 text-gray-700"
                })}
              </div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                For you, right now
              </h2>
            </div>

            <div className={`bg-gradient-to-br ${affirmationColors[selectedFeeling as keyof typeof affirmationColors]} p-8 rounded-2xl border-2 border-white/50 shadow-lg`}>
              <p className="text-gray-800 text-xl leading-relaxed font-medium italic">
                "{affirmations[selectedFeeling as keyof typeof affirmations]}"
              </p>
            </div>

            <div className="pt-6 space-y-3">
              <p className="text-sm text-gray-600 italic">
                Take a deep breath. You've got this.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={resetSelection}
                  className="w-full bg-gradient-to-r from-purple-200 to-pink-200 hover:from-purple-300 hover:to-pink-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Check In Again
                </button>
                
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationSpace;