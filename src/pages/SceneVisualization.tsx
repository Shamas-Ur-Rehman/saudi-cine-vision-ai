
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import SceneVisualizer from '../components/Visualization/SceneVisualizer';

const SceneVisualization = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Scene Visualization</h1>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20">
            <span className="h-2 w-2 rounded-full bg-cinema-highlight animate-pulse"></span>
            <span>AI Processing Ready</span>
          </div>
        </div>
        <SceneVisualizer />
      </div>
    </AppLayout>
  );
};

export default SceneVisualization;
