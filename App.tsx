
import React, { useState } from 'react';
import { AIApp } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import AppGallery from './components/AppGallery';
import AddAppModal from './components/AddAppModal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [apps, setApps] = useLocalStorage<AIApp[]>('aiApps', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const PRESET_COLORS = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
    'bg-indigo-500', 'bg-pink-500', 'bg-yellow-500', 'bg-teal-500'
  ];

  const handleAddApp = (newApp: Omit<AIApp, 'id' | 'iconBgColor'>) => {
    const randomColor = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
    setApps(prevApps => [...prevApps, { ...newApp, id: crypto.randomUUID(), iconBgColor: randomColor }]);
  };

  const handleDeleteApp = (appId: string) => {
    if(window.confirm('Are you sure you want to delete this app?')) {
        setApps(prevApps => prevApps.filter(app => app.id !== appId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">My AI Apps</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            <PlusIcon />
            Add New App
          </button>
        </div>
        
        <AppGallery apps={apps} onDelete={handleDeleteApp} />
      </main>
      
      <AddAppModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddApp}
      />
    </div>
  );
};

export default App;
