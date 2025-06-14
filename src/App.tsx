import React, { useState } from 'react';
import HomePage from './components/HomePage';
import IntroBuilder from './components/IntroBuilder';
import MotivationSpace from './components/MotivationSpace';

type Screen = 'home' | 'intro' | 'motivation';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomePage onNavigate={navigateToScreen} />;
      case 'intro':
        return <IntroBuilder onNavigate={navigateToScreen} />;
      case 'motivation':
        return <MotivationSpace onNavigate={navigateToScreen} />;
      default:
        return <HomePage onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-purple-50">
      {renderScreen()}
    </div>
  );
}

export default App;