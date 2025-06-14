import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';

interface IntroBuilderProps {
  onNavigate: (screen: 'home') => void;
}

const IntroBuilder: React.FC<IntroBuilderProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    creativeTypes: [] as string[],
    customCreativeType: '',
    inspirations: [] as string[],
    customInspiration: '',
    description: '',
    tones: [] as string[],
    customTone: ''
  });
  const [showResult, setShowResult] = useState(false);

  const creativeTypes = [
    'Singer', 'Actor', 'Writer', 'Dancer', 'Painter', 'Other'
  ];

  const inspirations = [
    'Emotions', 'Nature', 'Culture', 'Stories', 'Other'
  ];

  const tones = [
    'Bold', 'Honest', 'Poetic', 'Soft-Spoken', 'Other'
  ];

  const getCreativeTypes = () => {
    const types = formData.creativeTypes.filter(type => type !== 'Other');
    if (formData.creativeTypes.includes('Other') && formData.customCreativeType) {
      types.push(formData.customCreativeType);
    }
    return types;
  };

  const getInspirations = () => {
    const inspirationList = formData.inspirations.filter(inspiration => inspiration !== 'Other');
    if (formData.inspirations.includes('Other') && formData.customInspiration) {
      inspirationList.push(formData.customInspiration);
    }
    return inspirationList;
  };

  const getTones = () => {
    const toneList = formData.tones.filter(tone => tone !== 'Other');
    if (formData.tones.includes('Other') && formData.customTone) {
      toneList.push(formData.customTone);
    }
    return toneList;
  };

  const formatList = (items: string[]) => {
    if (items.length === 1) return items[0].toLowerCase();
    if (items.length === 2) return `${items[0].toLowerCase()} and ${items[1].toLowerCase()}`;
    return `${items.slice(0, -1).map(item => item.toLowerCase()).join(', ')}, and ${items[items.length - 1].toLowerCase()}`;
  };

  const formatDescription = (description: string) => {
    // Handle list-style descriptions with proper grammar
    if (description.includes(',')) {
      const traits = description.split(',').map(trait => trait.trim());
      if (traits.length > 1) {
        const formattedTraits = formatList(traits);
        return `Words like ${formattedTraits} capture how I move through the world`;
      }
    }
    return description;
  };

  const generateBio = () => {
    const creativeTypes = getCreativeTypes();
    const inspirationList = getInspirations();
    const toneList = getTones();
    const description = formatDescription(formData.description);

    const creativeTypeText = formatList(creativeTypes);
    const inspirationText = formatList(inspirationList);

    // Blend styles based on selected tones
    const hasPoetic = toneList.some(tone => tone.toLowerCase().includes('poetic'));
    const hasBold = toneList.some(tone => tone.toLowerCase().includes('bold'));
    const hasHonest = toneList.some(tone => tone.toLowerCase().includes('honest'));
    const hasSoftSpoken = toneList.some(tone => tone.toLowerCase().includes('soft'));

    // Create tone description that handles custom tones grammatically
    const formatToneDescription = () => {
      if (toneList.length === 1) {
        const tone = toneList[0].toLowerCase();
        // Handle custom tones with better grammar
        if (!['bold', 'honest', 'poetic', 'soft-spoken'].includes(tone)) {
          if (tone.includes('humor') || tone.includes('funny')) {
            return 'with humor guiding my perspective';
          }
          if (tone.includes('gentle') || tone.includes('calm')) {
            return 'in a gentle, thoughtful way';
          }
          return `with ${tone} shaping my expression`;
        }
        return `through a ${tone} lens`;
      }
      
      const formattedTones = formatList(toneList);
      return `blending ${formattedTones} perspectives`;
    };

    // Choose template based on dominant tone or blend
    if (hasPoetic && hasBold) {
      return `There's a rhythm in ${inspirationText} that fuels me as a ${creativeTypeText}. ${description}. I create ${formatToneDescription()}, letting raw energy meet artistic flow in everything I make.`;
    }
    
    if (hasPoetic) {
      return `There's a rhythm in ${inspirationText} that fuels me as a ${creativeTypeText}. ${description}. ${formatToneDescription().charAt(0).toUpperCase() + formatToneDescription().slice(1)}, I connect with others while staying rooted in who I am.`;
    }
    
    if (hasBold) {
      return `I'm a ${creativeTypeText} inspired by ${inspirationText}. ${description}. ${formatToneDescription().charAt(0).toUpperCase() + formatToneDescription().slice(1)}, I create work that's honest and alive.`;
    }
    
    if (hasHonest) {
      return `As a ${creativeTypeText}, my path has been shaped by ${inspirationText}. ${description}. ${formatToneDescription().charAt(0).toUpperCase() + formatToneDescription().slice(1)}, I bring authenticity to every piece of work I make.`;
    }
    
    if (hasSoftSpoken) {
      return `I'm a ${creativeTypeText} inspired by ${inspirationText}. ${description} feels true to how I create. ${formatToneDescription().charAt(0).toUpperCase() + formatToneDescription().slice(1)}, I find ways to connect quietly but meaningfully.`;
    }

    // Default template for custom tones or combinations
    return `Driven by ${inspirationText}, I create as a ${creativeTypeText}. ${description}. The way I tell my story — ${formatToneDescription()} — is what makes my voice mine.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasCreativeTypes = formData.creativeTypes.length > 0 && 
      (!formData.creativeTypes.includes('Other') || formData.customCreativeType);
    const hasInspirations = formData.inspirations.length > 0 && 
      (!formData.inspirations.includes('Other') || formData.customInspiration);
    const hasTones = formData.tones.length > 0 && 
      (!formData.tones.includes('Other') || formData.customTone);
    
    if (hasCreativeTypes && hasInspirations && formData.description && hasTones) {
      setShowResult(true);
    }
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ 
      creativeTypes: [],
      customCreativeType: '',
      inspirations: [],
      customInspiration: '',
      description: '', 
      tones: [],
      customTone: ''
    });
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

            {/* Creative Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What kind of creative are you? (Select all that apply)
              </label>
              <div className="space-y-2">
                {creativeTypes.map(type => (
                  <label key={type} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.creativeTypes.includes(type)}
                      onChange={(e) => handleCheckboxChange('creativeTypes', type, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-300"
                    />
                    <span className="text-gray-800">{type}</span>
                  </label>
                ))}
              </div>
              
              {formData.creativeTypes.includes('Other') && (
                <input
                  type="text"
                  value={formData.customCreativeType}
                  onChange={(e) => handleInputChange('customCreativeType', e.target.value)}
                  placeholder="Enter your creative type..."
                  className="w-full p-3 mt-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                  required
                />
              )}
            </div>

            {/* Inspirations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What inspires you? (Select all that apply)
              </label>
              <div className="space-y-2">
                {inspirations.map(inspiration => (
                  <label key={inspiration} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.inspirations.includes(inspiration)}
                      onChange={(e) => handleCheckboxChange('inspirations', inspiration, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-300"
                    />
                    <span className="text-gray-800">{inspiration}</span>
                  </label>
                ))}
              </div>
              
              {formData.inspirations.includes('Other') && (
                <input
                  type="text"
                  value={formData.customInspiration}
                  onChange={(e) => handleInputChange('customInspiration', e.target.value)}
                  placeholder="What inspires you?"
                  className="w-full p-3 mt-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                  required
                />
              )}
            </div>

            {/* Self Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you describe yourself?
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="passionate about storytelling, always curious, deeply empathetic..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Share what makes you unique</p>
            </div>

            {/* Tones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What tone best fits your voice or personality? (Select all that apply)
              </label>
              <div className="space-y-2">
                {tones.map(tone => (
                  <label key={tone} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.tones.includes(tone)}
                      onChange={(e) => handleCheckboxChange('tones', tone, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-300"
                    />
                    <span className="text-gray-800">{tone}</span>
                  </label>
                ))}
              </div>
              
              {formData.tones.includes('Other') && (
                <input
                  type="text"
                  value={formData.customTone}
                  onChange={(e) => handleInputChange('customTone', e.target.value)}
                  placeholder="Describe your tone..."
                  className="w-full p-3 mt-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-gray-800"
                  required
                />
              )}
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
                {generateBio()}
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