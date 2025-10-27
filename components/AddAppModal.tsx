import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AIApp } from '../types';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: Omit<AIApp, 'id' | 'iconBgColor'>) => void;
}

const AddAppModal: React.FC<AddAppModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setName('');
      setUrl('');
      setDescription('');
    }
  }, [isOpen]);
  
  // Handle Escape key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    
    try {
        new URL(url);
    } catch (_) {
        alert("Please enter a valid URL. It must include the protocol (e.g., http:// or https://).");
        return;
    }

    onSave({ name: name.trim(), url: url.trim(), description: description.trim() });
    onClose();
  };
  
  if (!isOpen) return null;
  
  // Using a portal to render the modal at the top level of the DOM to avoid z-index issues
  return ReactDOM.createPortal(
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={onClose} // Close modal on backdrop click
    >
        <div 
            className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white" id="modal-title">Add New AI App</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors p-1 -m-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="appName" className="block text-sm font-medium text-gray-300 mb-1">App Name</label>
                            <input
                                type="text"
                                id="appName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., Story Generator"
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="appUrl" className="block text-sm font-medium text-gray-300 mb-1">App URL</label>
                            <input
                                type="url"
                                id="appUrl"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="https://..."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="appDescription" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                                id="appDescription"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Describe what this app does..."
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim() || !url.trim()}
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save App
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>,
    document.body
  );
};

export default AddAppModal;
