import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';

interface IntroBuilderProps {
  onNavigate: (screen: 'home') => void;
}

const IntroBuilder: React.FC<IntroBuilderProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    creativeType: '',
    inspiration: '',
    words: '',
    tone: ''
  });
  const [showResult, setShowResult] = useState(false);

  const creativeTypes = [
    'Singer', 'Actor', 'Writer', 'Dancer', 'Visual Artist', 
    'Musician', 'Photographer', 'Filmmaker', 'Poet', 'Designer'
  ];

  const inspirations = [
    'Emotions', 'Nature', 'Culture', 'People', 'Stories', 
    'Music', 'Colors', 'Dreams', 'Memories', 'Change'
  ];

  const tones = [
    'Bold', 'Poetic', 'Honest', 'Gentle', 'Fierce', 
    'Playful', 'Mysterious', 'Warm', 'Raw', 'Hopeful'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.creativeType && formData.inspiration && formData.words && formData.tone) {
      setShowResult(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ creativeType: '', inspiration: '', words: '', tone: '' });
    setShowResult(false);
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
        <h1 className="text-lg font-semibold text-gray-800">Intro Builder</h1>
        <div className="w-12"></div>
      </div>

      <div className="max-w-md mx-auto">
        {!showResult ? (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">
                Let's craft your introduction
              </h2>
              <p className="text-gray-600 text-sm">
                Tell us about yourself and we'll help you express it beautifully.
              </p>
            </div>

            {/* Creative Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What kind of creative are you?
              </label>
              <select
                value={formData.creativeType}
                onChange={(e) => handleInputChange('creativeType', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                required
              >
                <option value="">Choose your creative path...</option>
                {creativeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Inspiration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What inspires you?
              </label>
              <select
                value={formData.inspiration}
                onChange={(e) => handleInputChange('inspiration', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                required
              >
                <option value="">Select your inspiration...</option>
                {inspirations.map(inspiration => (
                  <option key={inspiration} value={inspiration}>{inspiration}</option>
                ))}
              </select>
            </div>

            {/* Three Words */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe yourself in three words
              </label>
              <input
                type="text"
                value={formData.words}
                onChange={(e) => handleInputChange('words', e.target.value)}
                placeholder="creative, passionate, authentic..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What tone fits your style?
              </label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                required
              >
                <option value="">Choose your tone...</option>
                {tones.map(tone => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Create My Intro
            </button>
          </form>
        ) : (
          /* Result */
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Your Creative Introduction
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
              <p className="text-gray-800 text-lg leading-relaxed font-medium">
                "I'm a <span className="text-purple-600 font-semibold">{formData.creativeType.toLowerCase()}</span> inspired by{' '}
                <span className="text-blue-600 font-semibold">{formData.inspiration.toLowerCase()}</span>. I'm{' '}
                <span className="text-pink-600 font-semibold">{formData.words}</span>, and I express myself through a{' '}
                <span className="text-indigo-600 font-semibold">{formData.tone.toLowerCase()}</span> lens."
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-300"
              >
                Create Another Intro
              </button>
              
              <button
                onClick={() => onNavigate('home')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroBuilder;