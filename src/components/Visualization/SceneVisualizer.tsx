import React, { useState, useEffect } from 'react';
import { Camera, Loader, RefreshCw, Upload } from 'lucide-react';

const OPENAI_IMAGE_API_KEY = "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";

import { supabase } from '@/integrations/supabase/client';

const SceneVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State for UI controls
  const [sceneDescription, setSceneDescription] = useState(
    "A dramatic low-angle shot of the protagonist walking through an old market at dusk. Soft golden lighting filters through the market stalls, creating long shadows. The camera slowly tracks backward as the character moves forward with determination."
  );
  const [style, setStyle] = useState('cinematic');
  const [mood, setMood] = useState('dramatic');
  const [lighting, setLighting] = useState('golden-hour');
  const [recentScenes, setRecentScenes] = useState<any[]>([]);
  
  // Fetch recent generated scenes from Supabase
  useEffect(() => {
    async function fetchRecentScenes() {
      const { data } = await supabase
        .from('generated_scenes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentScenes(data || []);
    }
    fetchRecentScenes();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    const styleMap: Record<string, string> = {
      cinematic: "cinematic style",
      documentary: "documentary style",
      artistic: "artistic style",
      realistic: "realistic style",
    };
    const moodMap: Record<string, string> = {
      dramatic: "dramatic mood",
      suspenseful: "suspenseful mood",
      peaceful: "peaceful mood",
      tense: "tense mood",
    };
    const lightingMap: Record<string, string> = {
      "golden-hour": "golden hour lighting",
      "low-key": "low-key lighting",
      "high-key": "high-key lighting",
      "natural": "natural lighting"
    };

    const fullPrompt = [
      sceneDescription,
      styleMap[style],
      moodMap[mood],
      lightingMap[lighting],
    ].filter(Boolean).join(", ");

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_IMAGE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024"
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Image generation failed");
      }
      const data = await response.json();
      const imageUrl = data.data[0].url;

      setGeneratedImage(imageUrl);

      // Save generated scene to Supabase
      await supabase.from('generated_scenes').insert([
        {
          scene_description: sceneDescription,
          style,
          mood,
          lighting,
          image_url: imageUrl,
        }
      ]);
      // Refetch recent scenes
      const { data: refetched } = await supabase
        .from('generated_scenes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentScenes(refetched || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="cinema-card h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold">AI Scene Visualization</h3>
        <p className="text-sm text-muted-foreground">Create and visualize your scenes with AI</p>
      </div>
      
      <div className="p-4 flex-grow flex flex-col h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Input Panel */}
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Scene Description</label>
              <textarea 
                className="w-full h-40 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Describe your scene in detail (setting, mood, lighting, camera angle, etc.)"
                value={sceneDescription}
                onChange={e => setSceneDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Style</label>
              <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={style} onChange={e => setStyle(e.target.value)}>
                <option value="cinematic">Cinematic</option>
                <option value="documentary">Documentary</option>
                <option value="artistic">Artistic</option>
                <option value="realistic">Realistic</option>
              </select>
            </div>
            
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mood</label>
                <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={mood} onChange={e => setMood(e.target.value)}>
                  <option value="dramatic">Dramatic</option>
                  <option value="suspenseful">Suspenseful</option>
                  <option value="peaceful">Peaceful</option>
                  <option value="tense">Tense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lighting</label>
                <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={lighting} onChange={e => setLighting(e.target.value)}>
                  <option value="golden-hour">Golden Hour</option>
                  <option value="low-key">Low Key</option>
                  <option value="high-key">High Key</option>
                  <option value="natural">Natural</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-2 mt-auto">
              <button className="flex items-center justify-center gap-2 bg-cinema-navy text-white px-4 py-2 rounded-md hover:bg-cinema-navy/80 transition w-full">
                <Upload size={16} />
                <span>Import Reference</span>
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-cinema-highlight text-white px-4 py-2 rounded-md hover:bg-cinema-highlight/80 transition w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Camera size={16} />
                    <span>Generate Scene</span>
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-3 text-sm text-red-500 bg-red-100 rounded p-2">
                {error}
              </div>
            )}
          </div>
          
          {/* Preview Panel */}
          <div className="flex flex-col h-full">
            <div className="border border-dashed border-border rounded-md flex-grow flex flex-col items-center justify-center bg-card/50 overflow-hidden">
              {generatedImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={generatedImage} 
                    alt="Generated Scene" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">AI Generated Scene</span>
                      <button 
                        className="text-white bg-card/30 p-1 rounded-full hover:bg-card/50 transition"
                        onClick={() => setGeneratedImage(null)}
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Camera size={48} className="mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground">Your visualized scene will appear here</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    Describe your scene and click Generate
                  </p>
                </div>
              )}
            </div>
            {/* Recent generated scenes */}
            {recentScenes.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Recent Visualized Scenes</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {recentScenes.map(scene => (
                    <div key={scene.id} className="rounded border p-2 bg-card/70">
                      <div className="aspect-square rounded overflow-hidden mb-1 bg-muted">
                        {scene.image_url ? (
                          <img src={scene.image_url} alt={scene.scene_description} className="w-full h-full object-cover" />
                        ) : (
                          <div className="h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                        )}
                      </div>
                      <div className="text-xs truncate">{scene.scene_description}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{scene.style}, {scene.mood}, {scene.lighting}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* ... existing AI-powered scene analysis ... */}
            {generatedImage && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">Scene Analysis</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cinema-teal/10 text-cinema-teal border border-cinema-teal/20">
                    AI Powered
                  </span>
                </div>
                <div className="text-sm space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Emotional Impact:</span> Strong sense of determination and purpose. The low-angle creates a feeling of power.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Suggested Alternative:</span> Consider a tracking shot from the side to capture the character's profile against the market backdrop.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneVisualizer;
