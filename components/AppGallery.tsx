
import React from 'react';
import { AIApp } from '../types';
import AppCard from './AppCard';

interface AppGalleryProps {
  apps: AIApp[];
  onDelete: (appId: string) => void;
}

const AppGallery: React.FC<AppGalleryProps> = ({ apps, onDelete }) => {
  if (apps.length === 0) {
    return (
      <div className="text-center py-20 px-6 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-white">No AI Apps Found</h3>
        <p className="mt-1 text-sm text-gray-400">Get started by adding your first AI application.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map(app => (
        <AppCard key={app.id} app={app} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AppGallery;
