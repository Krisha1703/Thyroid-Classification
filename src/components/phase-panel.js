"use client";
import React, { useState } from 'react';

const phases = [
  { id: 'root', label: 'CSV Root File', description: 'The original dataset you uploaded (CSV file).' },
  { id: 'split', label: 'Train/Test Split', description: 'Splits the dataset into training and testing parts.' },
  { id: 'adasyn', label: 'ADASYN', description: 'Balances the training data to improve learning.' },
  { id: 'scaler', label: 'Scaler', description: 'Normalizes feature values for better model performance.' },
  { id: 'selectkbest', label: 'SelectKBest', description: 'Keeps only the most useful features.' },
  { id: 'calibrated', label: 'Calibrated Classifier', description: 'Adjusts model confidence for better reliability.' },
  { id: 'rf', label: 'Random Forest', description: 'A tree-based model that makes predictions using multiple trees.' },
  { id: 'dt', label: 'Decision Tree', description: 'A simple tree-based model to make predictions step-by-step.' },
  { id: 'svm', label: 'SVM', description: 'A model that draws boundaries between different classes.' },
  { id: 'xgb', label: 'XGBoost', description: 'A powerful model that combines many small models for accuracy.' },
];

export default function PhasePanel({ selectedPhase, onSelect }) {
  return (
    <div className="w-full md:w-72 bg-gray-100 border-r border-gray-300 p-4 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Training Phases</h2>
      <ul className="space-y-2 flex-0">
        {phases.map(({ id, label }) => (
          <li
            key={id}
            onClick={() => onSelect(id)}
            className={`cursor-pointer px-4 py-2 rounded-md transition 
              ${
                selectedPhase === id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
          >
            {label}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-600 flex-1 overflow-auto">
        {phases.find(p => p.id === selectedPhase)?.description || 'Select a phase to see its explanation.'}
      </div>
    </div>
  );
}
