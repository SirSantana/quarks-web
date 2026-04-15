"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Plus, 
  Youtube, 
  Facebook, 
  Lightbulb, 
  Languages, 
  Scissors, 
  Move, 
  Trash2, 
  ChevronRight 
} from "lucide-react";

// --- Mock Content Generator ---
const getMockContent = (type, topic) => {
  const topics = topic || "Tesla Model S Plaid Review";
  
  switch (type) {
    case "idea":
      return {
        hook: `Why the ${topics} is actually a terrible daily driver (and why I love it).`,
        body: `Focus on the yoke steering and the sheer acceleration that makes passengers sick.`
      };
    case "script":
      return {
        intro: `[0:00] Standing next to the ${topics}. "Speed isn't everything... or is it?"`,
        segments: [
          "The Design: Polarizing but efficient.",
          "The Launch: 0-60 in 'I forgot my name'.",
          "The Verdict: Worth the $100k?"
        ]
      };
    case "clips":
      return [
        { title: "The G-Force Test", hook: "Watch his glasses fly off!" },
        { title: "Interior Quality", hook: "Is this really a luxury car?" },
        { title: "Auto-Shift Feature", hook: "It knows where you want to go." }
      ];
    case "facebook":
      return {
        post: `Just spent 48 hours with the ${topics}. 🏎️💨\n\nHonestly? My neck hurts, my range anxiety is gone, and I never want to drive a gas car again. \n\nCheck out the full breakdown below!`,
        cta: "What should I test next? 👇",
        tags: "#Automotive #ElectricCars #TechReview"
      };
    case "translation":
      return "Translated version: This vehicle represents the pinnacle of modern engineering and performance, specifically tailored for the enthusiast market.";
    default:
      return {};
  }
};

// --- Main Page Component ---
export default function NodeCanvas() {
  const [nodes, setNodes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // --- Node Actions ---
  const addNode = (type, parentId = null) => {
    const id = Math.random().toString(36).substr(2, 9);
    let position = { x: window.innerWidth / 2 - 150, y: 400 };

    if (parentId) {
      const parent = nodes.find((n) => n.id === parentId);
      if (parent) {
        position = { x: parent.position.x + 350, y: parent.position.y + 50 };
      }
    }

    const newNode = {
      id,
      type,
      title: `${type.toUpperCase()}: ${inputValue || "New Project"}`,
      content: getMockContent(type, inputValue),
      position,
      parentId,
    };

    setNodes((prev) => [...prev, newNode]);
  };

  const removeNode = (id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
  };

  // --- Drag & Drop Logic ---
  const handleMouseDown = (e, id) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    
    setDraggingNodeId(id);
    setDragOffset({
      x: e.clientX - node.position.x,
      y: e.clientY - node.position.y,
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!draggingNodeId) return;

    setNodes((prev) =>
      prev.map((node) =>
        node.id === draggingNodeId
          ? {
              ...node,
              position: {
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
              },
            }
          : node
      )
    );
  }, [draggingNodeId, dragOffset]);

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingNodeId, handleMouseMove]);

  return (
    <main className="relative w-full h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 pointer-events-none z-0 w-full h-full">
        {nodes.map((node) => {
          if (!node.parentId) return null;
          const parent = nodes.find((n) => n.id === node.parentId);
          if (!parent) return null;
          return (
            <line
              key={`line-${node.id}`}
              x1={parent.position.x + 150}
              y1={parent.position.y + 100}
              x2={node.position.x + 150}
              y2={node.position.y + 100}
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          );
        })}
      </svg>

      {/* Centered Input Area */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
          <input
            type="text"
            placeholder="Enter automotive topic (e.g. Porsche 911 GT3 RS)..."
            className="w-full text-xl font-medium outline-none mb-6 p-2 border-b border-slate-100 focus:border-blue-500 transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => addNode("idea")}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-all font-semibold text-sm"
            >
              <Lightbulb size={16} /> Idea + Hook
            </button>
            <button 
              onClick={() => addNode("script")}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full hover:bg-red-100 transition-all font-semibold text-sm"
            >
              <Youtube size={16} /> YouTube Script
            </button>
            <button 
              onClick={() => addNode("facebook")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-all font-semibold text-sm"
            >
              <Facebook size={16} /> FB Post
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div ref={canvasRef} className="w-full h-full relative">
        {nodes.map((node) => (
          <NodeWrapper
            key={node.id}
            node={node}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
            onDelete={() => removeNode(node.id)}
            onGenerate={(type) => addNode(type, node.id)}
          />
        ))}
      </div>

      {/* Instructions Overlay */}
      <div className="absolute bottom-6 right-6 text-slate-400 text-xs font-medium uppercase tracking-widest bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
        Drag nodes to organize • Creative Canvas v1.0
      </div>
    </main>
  );
}

// --- Node Wrapper Component ---
function NodeWrapper({ node, onMouseDown, onDelete, onGenerate }) {
  const nodeStyles = {
    idea: "border-t-4 border-amber-400",
    script: "border-t-4 border-red-500",
    clips: "border-t-4 border-purple-500",
    facebook: "border-t-4 border-blue-600",
    translation: "border-t-4 border-emerald-500",
  };

  return (
    <div
      style={{ left: node.position.x, top: node.position.y }}
      className={`absolute w-80 bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col z-10 select-none transition-shadow hover:shadow-2xl ${nodeStyles[node.type]}`}
    >
      {/* Draggable Header */}
      <div 
        onMouseDown={onMouseDown}
        className="flex items-center justify-between p-3 border-b border-slate-50 cursor-grab active:cursor-grabbing bg-slate-50/50 rounded-t-xl"
      >
        <div className="flex items-center gap-2 text-slate-500">
          <Move size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{node.type}</span>
        </div>
        <button onClick={onDelete} className="text-slate-300 hover:text-red-500 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>

      {/* Node Body */}
      <div className="p-5 overflow-y-auto max-h-96">
        <h3 className="font-bold text-slate-800 mb-3 text-sm leading-tight">{node.title}</h3>
        
        {node.type === "idea" && (
          <div className="space-y-3">
            <div className="p-2 bg-amber-50 rounded text-xs text-amber-900 border border-amber-100 italic">
              "{node.content.hook}"
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{node.content.body}</p>
            <ActionButton icon={<Youtube size={12}/>} label="Gen Script" onClick={() => onGenerate("script")} />
          </div>
        )}

        {node.type === "script" && (
          <div className="space-y-3 text-xs">
            <p className="font-semibold text-slate-400">INTRO</p>
            <p className="text-slate-600 bg-slate-50 p-2 rounded">{node.content.intro}</p>
            <p className="font-semibold text-slate-400">SEGMENTS</p>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              {node.content.segments.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              <ActionButton icon={<Scissors size={12}/>} label="Shorts" onClick={() => onGenerate("clips")} />
              <ActionButton icon={<Facebook size={12}/>} label="FB Post" onClick={() => onGenerate("facebook")} />
            </div>
          </div>
        )}

        {node.type === "clips" && (
          <div className="space-y-3">
            {node.content.map((clip, i) => (
              <div key={i} className="p-2 border border-purple-100 rounded bg-purple-50/30">
                <p className="text-[10px] font-bold text-purple-600 uppercase">Clip {i+1}</p>
                <p className="text-xs font-semibold text-slate-700">{clip.title}</p>
                <p className="text-[11px] text-slate-500">{clip.hook}</p>
              </div>
            ))}
            <ActionButton icon={<Plus size={12}/>} label="Regenerate" onClick={() => {}} />
          </div>
        )}

        {node.type === "facebook" && (
          <div className="space-y-3 text-xs">
            <div className="whitespace-pre-wrap text-slate-700 p-2 bg-blue-50/30 rounded border border-blue-50">
              {node.content.post}
            </div>
            <p className="font-bold text-blue-600">{node.content.cta}</p>
            <p className="text-slate-400 italic">{node.content.tags}</p>
          </div>
        )}

        {node.type === "translation" && (
          <div className="p-3 bg-emerald-50 rounded text-xs text-emerald-800 border border-emerald-100 leading-relaxed">
            {node.content}
          </div>
        )}

        {/* Action Bottom */}
        {node.type !== "translation" && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button 
              onClick={() => onGenerate("translation")}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors"
            >
              <Languages size={12} /> Translate Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Action Button Sub-component ---
function ActionButton({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-[10px] font-bold hover:bg-slate-700 transition-all shadow-sm active:scale-95"
    >
      {icon}
      {label}
      <ChevronRight size={10} />
    </button>
  );
}