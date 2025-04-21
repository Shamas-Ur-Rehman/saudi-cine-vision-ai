
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import SceneVisualizer from '../components/Visualization/SceneVisualizer';

const SceneVisualization = () => {
  return (
    <AppLayout>
      <div className="pt-8 md:pt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#212442] dark:text-white">Scene Visualization</h1>
          <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-[#162038] text-[#97D2F4] border border-[#29304b]">
            <span className="h-2 w-2 rounded-full bg-[#03E9F4] animate-pulse"></span>
            <span>AI Processing Ready</span>
          </div>
        </div>
        <SceneVisualizer />
      </div>
    </AppLayout>
  );
};

export default SceneVisualization;
