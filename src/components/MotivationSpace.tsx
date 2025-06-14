import React, { useState } from 'react';
import { ArrowLeft, Heart, Sun, Zap, Compass, Cloud, Lightbulb } from 'lucide-react';

interface MotivationSpaceProps {
  onNavigate: (screen: 'home') => void;
}

const MotivationSpace: React.FC<MotivationSpaceProps> = ({ onNavigate }) => {
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [showAffirmation, setShowAffirmation] = useState(false);

  const feelings = [
    { 
      value: 'discouraged', 
      label: 'Discouraged', 
      icon: Heart,
      caption: 'Gentle steps are still steps forward.'
    },
    { 
      value: 'anxious', 
      label: 'Anxious', 
      icon: Zap,
      caption: "You don't need all the answers right now."
    },
    { 
      value: 'excited', 
      label: 'Excited', 
      icon: Sun,
      caption: 'Harness this moment — it\'s yours.'
    },
    { 
      value: 'hopeful', 
      label: 'Hopeful', 
      icon: Compass,
      caption: 'Hold on to that spark.'
    },
    { 
      value: 'overwhelmed', 
      label: 'Overwhelmed', 
      icon: Cloud,
      caption: 'One breath, one step at a time.'
    },
    { 
      value: 'inspired', 
      label: 'Inspired', 
      icon: Lightbulb,
      caption: 'This feeling is magic — capture it.'
    }
  ];

  const affirmations = {
    discouraged: [
      "Even the best stories have quiet chapters. This is one of yours.",
      "This moment doesn't define your whole story — it's just a page.",
      "Your voice hasn't disappeared — it's just resting. Give it time."
    ],
    anxious: [
      "You don't need all the answers right now — just the courage to keep going.",
      "Breathe. The pressure isn't stronger than your potential.",
      "It's okay to move gently. Even slow steps are still forward."
    ],
    excited: [
      "That energy is powerful — carry it into your next creation.",
      "Let your joy fuel your voice — the world's listening.",
      "You're on fire — stay grounded, and let your work shine."
    ],
    hopeful: [
      "Hold on to that spark — it's your guide through the fog.",
      "Hope is a quiet kind of power. Let it lead.",
      "You're already growing. Keep going."
    ],
    overwhelmed: [
      "You don't have to do it all at once. Start with one breath, one step.",
      "It's okay to pause. Rest is part of the rhythm, not a break from it.",
      "You're carrying a lot — be proud of how far you've come, even if it feels heavy."
    ],
    inspired: [
      "Run with this feeling — it doesn't have to be perfect to be powerful.",
      "When inspiration strikes, follow it like a melody. Let it take the lead.",
      "What you're feeling right now is magic — capture it before it fades."
    ]
  };

  const affirmationColors = {
    discouraged: 'from-rose-200 to-pink-200',
    anxious: 'from-blue-200 to-indigo-200',
    excited: 'from-yellow-200 to-orange-200',
    hopeful: 'from-green-200 to-teal-200',
    overwhelmed: 'from-purple-200 to-violet-200',
    inspired: 'from-amber-200 to-yellow-200'
  };

  const getRandomAffirmation = (feeling: string) => {
    const feelingAffirmations = affirmations[feeling as keyof typeof affirmations];
    const randomIndex = Math.floor(Math.random() * feelingAffirmations.length);
    return feelingAffirmations[randomIndex];
  };

  const getSelectedFeelingData = () => {
    return feelings.find(f => f.value === selectedFeeling);
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
                {React.createElement(getSelectedFeelingData()?.icon || Heart, {
                  className: "w-8 h-8 text-gray-700"
                })}
              </div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                For you, right now
              </h2>
            </div>

            <div className={`bg-gradient-to-br ${affirmationColors[selectedFeeling as keyof typeof affirmationColors]} p-8 rounded-2xl border-2 border-white/50 shadow-lg`}>
              <p className="text-gray-800 text-xl leading-relaxed font-medium">
                {getRandomAffirmation(selectedFeeling)}
              </p>
            </div>

            <div className="pt-6 space-y-3">
              <p className="text-sm text-gray-600 italic">
                {getSelectedFeelingData()?.caption}
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