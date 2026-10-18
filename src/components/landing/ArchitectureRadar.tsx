"use client";

import { useState } from "react";
import {
  Server,
  Globe,
  Smartphone,
  BookOpen,
  Terminal,
  Shield,
  Database,
  Cpu,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  role: string;
  tech: string;
  protocol: string;
  icon: typeof Server;
  x: number;
  y: number;
}

const NODES: NodeData[] = [
  {
    id: "backend",
    name: "SCRIPE Backend",
    role: "Core Modular Monolith & CQRS",
    tech: ".NET 9, AstraFlow, EF Core",
    protocol: "Result<T>, Outbox Pattern, PBAC",
    icon: Server,
    x: 50,
    y: 50,
  },
  {
    id: "frontend",
    name: "SCRIPE Frontend",
    role: "Operational Web Portal",
    tech: "Next.js 16, React 19, Tailwind",
    protocol: "MVVM, @core/ui, Clean Architecture",
    icon: Globe,
    x: 20,
    y: 25,
  },
  {
    id: "coach",
    name: "SCRIPE Coach App",
    role: "Pitch-Side Mobile Intelligence",
    tech: "Flutter, Dart, Offline-First",
    protocol: "Real-time Sync, Biometrics",
    icon: Smartphone,
    x: 80,
    y: 25,
  },
  {
    id: "docs",
    name: "SCRIPE Docs Portal",
    role: "Isolated Knowledge Engine",
    tech: "Next.js 16, 7 Languages (RTL)",
    protocol: "Pure Engine, Static Edge Sync",
    icon: BookOpen,
    x: 20,
    y: 75,
  },
  {
    id: "cli",
    name: "SCRIPE Dev Tools",
    role: "Developer CLI & Generators",
    tech: "Node.js (scripe.js), TypeScript",
    protocol: "Multi-DB Migrations, Docs Sync",
    icon: Terminal,
    x: 80,
    y: 75,
  },
];

export function ArchitectureRadar() {
  const [activeNode, setActiveNode] = useState<NodeData>(NODES[0]);

  return (
    <div className="relative rounded-2xl border border-border bg-card/90 text-card-foreground backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-sm">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,255,0,0.08),transparent_70%)] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Radar Visualizer SVG */}
        <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Concentric Radar Rings */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              className="text-border opacity-70"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="currentColor"
              className="text-border opacity-80"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="18"
              fill="none"
              stroke="currentColor"
              className="text-primary opacity-30"
              strokeWidth="0.75"
            />

            {/* Crosshairs */}
            <line
              x1="50"
              y1="6"
              x2="50"
              y2="94"
              stroke="currentColor"
              className="text-border opacity-60"
              strokeWidth="0.5"
              strokeDasharray="1 2"
            />
            <line
              x1="6"
              y1="50"
              x2="94"
              y2="50"
              stroke="currentColor"
              className="text-border opacity-60"
              strokeWidth="0.5"
              strokeDasharray="1 2"
            />

            {/* Sweep Beam (respects prefers-reduced-motion) */}
            <g className="radar-sweep">
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="6"
                stroke="hsl(var(--primary))"
                strokeWidth="0.75"
              />
              <path
                d="M 50 50 L 50 6 A 44 44 0 0 1 81 19 Z"
                fill="url(#radarGradient)"
                opacity="0.25"
              />
            </g>

            {/* Gradient definition */}
            <defs>
              <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.4"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            {/* Connection Lines to Center */}
            {NODES.slice(1).map((node) => (
              <line
                key={`line-${node.id}`}
                x1={node.x}
                y1={node.y}
                x2="50"
                y2="50"
                stroke={
                  activeNode.id === node.id || activeNode.id === "backend"
                    ? "hsl(var(--primary))"
                    : "currentColor"
                }
                className={
                  activeNode.id === node.id || activeNode.id === "backend"
                    ? "opacity-60"
                    : "text-border opacity-50"
                }
                strokeWidth={activeNode.id === node.id ? "1" : "0.5"}
                strokeDasharray="1.5 2"
              />
            ))}
          </svg>

          {/* Interactive HTML Node Markers */}
          {NODES.map((node) => {
            const Icon = node.icon;
            const isCenter = node.id === "backend";
            const isActive = activeNode.id === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setActiveNode(node)}
                style={{
                  position: "absolute",
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`group relative flex items-center justify-center rounded-xl transition-all ${
                  isCenter
                    ? "h-14 w-14 bg-card border-2 border-primary shadow-[0_0_25px_rgba(198,255,0,0.35)] z-20"
                    : isActive
                      ? "h-11 w-11 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(198,255,0,0.4)] z-20"
                      : "h-10 w-10 bg-card border border-border text-muted-foreground hover:border-primary/60 hover:text-foreground z-10"
                }`}
                aria-label={node.name}
              >
                <Icon
                  size={isCenter ? 24 : 18}
                  className={
                    isCenter
                      ? "text-primary"
                      : isActive
                        ? "text-primary-foreground"
                        : "text-foreground/80"
                  }
                />
                {isCenter && (
                  <span className="absolute -bottom-6 text-[10px] font-mono uppercase tracking-wider text-primary font-bold whitespace-nowrap">
                    CORE MONOLITH
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Node Specs Card */}
        <div className="flex-1 w-full max-w-lg flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4 w-fit">
            <Cpu size={13} />
            <span>INTERACTIVE ECOSYSTEM RADAR</span>
          </div>

          <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">
            {activeNode.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            {activeNode.role}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Database size={12} className="text-primary" />
                <span>Technology Stack</span>
              </div>
              <div className="text-sm font-medium text-foreground">
                {activeNode.tech}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Shield size={12} className="text-primary" />
                <span>Architecture Protocol</span>
              </div>
              <div className="text-sm font-medium text-foreground">
                {activeNode.protocol}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>
              Click any node in the radar to inspect its architecture boundary
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
