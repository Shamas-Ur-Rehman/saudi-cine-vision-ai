
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import DashboardStats from '../components/Dashboard/DashboardStats';
import SceneVisualizer from '../components/Visualization/SceneVisualizer';
import ScriptManager from '../components/Scripts/ScriptManager';
import Scheduler from '../components/Communication/Scheduler';
import Chatbot from '../components/AI/Chatbot';
import FeatureCard from '../components/UI/FeatureCard';
import { Camera, FileText, Calendar, Users, MessageSquare, BarChart, Zap, Globe } from 'lucide-react';

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome to Saudi Cine Brain</h1>
            <p className="text-muted-foreground">Your intelligent filmmaking assistant powered by AI</p>
          </div>
          <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-cinema-navy/10 border border-cinema-navy/20 animate-pulse-slow">
            <span className="h-2 w-2 rounded-full bg-cinema-highlight"></span>
            <span>AI Scene Analysis Running</span>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats />

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Featured Section */}
            <div className="relative overflow-hidden cinema-card p-6 border border-cinema-highlight/30 cinema-glow animate-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-cinema-navy/80 to-cinema-dark-blue/90 z-0"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2 text-white">AI-Powered Scene Visualization</h2>
                <p className="text-white/80 mb-4">
                  Transform your directorial vision into visual concepts using our advanced AI technology.
                </p>
                <button className="px-4 py-2 bg-cinema-highlight text-white rounded-md hover:bg-cinema-highlight/80 transition">
                  Try it now
                </button>
              </div>
            </div>
            
            {/* Scene Visualizer */}
            <div className="h-[500px]">
              <SceneVisualizer />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Access Grid */}
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                title="Script Manager"
                description="Access and distribute scripts to your crew"
                icon={<FileText size={20} />}
              />
              <FeatureCard
                title="Production Schedule"
                description="Manage filming timeline and coordination"
                icon={<Calendar size={20} />}
              />
              <FeatureCard
                title="Crew Management"
                description="Organize and communicate with your team"
                icon={<Users size={20} />}
                comingSoon
              />
              <FeatureCard
                title="AI Assistant"
                description="Get intelligent responses to production questions"
                icon={<MessageSquare size={20} />}
              />
            </div>
            
            {/* Script Manager Preview */}
            <div className="h-[350px]">
              <Scheduler />
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px]">
            <ScriptManager />
          </div>
          <div className="h-[400px]">
            <Chatbot />
          </div>
        </div>
        
        {/* Feature Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="Real-Time AI Analysis"
            description="Our AI evaluates emotions and suggests optimal shots based on actors' performances"
            icon={<Zap size={20} />}
            className="bg-gradient-to-br from-card to-card/90 border-cinema-teal/20"
            comingSoon
          />
          <FeatureCard
            title="Production Analytics"
            description="Track efficiency and visualize your production workflow with detailed analytics"
            icon={<BarChart size={20} />}
            className="bg-gradient-to-br from-card to-card/90 border-cinema-highlight/20"
            comingSoon
          />
          <FeatureCard
            title="Multi-Language Support"
            description="Automatic language conversion based on geographic location for international crews"
            icon={<Globe size={20} />}
            className="bg-gradient-to-br from-card to-card/90 border-cinema-gold/20"
            comingSoon
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
