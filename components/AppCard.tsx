
import React from 'react';
import { AIApp } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';

interface AppCardProps {
  app: AIApp;
  onDelete: (appId: string) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onDelete }) => {
  const firstLetter = app.name.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-indigo-500/30 hover:-translate-y-1">
      <div className="p-6 flex-grow">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${app.iconBgColor}`}>
            <span className="text-2xl font-bold text-white">{firstLetter}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white truncate">{app.name}</h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-3 h-[60px]">{app.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800/50 p-4 flex justify-between items-center border-t border-gray-700">
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors"
        >
          <RocketLaunchIcon />
          Launch
        </a>
        <button
          onClick={() => onDelete(app.id)}
          aria-label="Delete app"
          className="p-2 text-gray-400 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default AppCard;
