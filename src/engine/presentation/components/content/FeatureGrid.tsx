"use client";

import { useDocsI18n } from "../../providers/DocsI18nProvider";
import type { FeatureGridItem } from "../../../domain/entities/DocSection";
import {
  Shield,
  Lock,
  Key,
  Users,
  Database,
  Server,
  Globe,
  Zap,
  Layers,
  Code,
  Settings,
  BarChart3,
  Bell,
  FileText,
  Cloud,
  Building2,
  Puzzle,
  Rocket,
  Eye,
  Search,
  Link2,
  RefreshCw,
  CheckCircle2,
  Star,
  Box,
  Terminal,
  GitBranch,
  Workflow,
  Palette,
  Megaphone,
  Layers as DefaultIcon,
  type LucideIcon,
} from "lucide-react";

interface FeatureGridProps {
  items: FeatureGridItem[];
  columns?: 2 | 3 | 4;
}

// Map icon name → Lucide SVG Icon Component for consistent design token rendering
const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  lock: Lock,
  key: Key,
  users: Users,
  database: Database,
  server: Server,
  globe: Globe,
  zap: Zap,
  layers: Layers,
  code: Code,
  settings: Settings,
  chart: BarChart3,
  bell: Bell,
  file: FileText,
  cloud: Cloud,
  building: Building2,
  puzzle: Puzzle,
  rocket: Rocket,
  eye: Eye,
  search: Search,
  link: Link2,
  refresh: RefreshCw,
  check: CheckCircle2,
  star: Star,
  box: Box,
  terminal: Terminal,
  git: GitBranch,
  workflow: Workflow,
  palette: Palette,
  megaphone: Megaphone,
};

/**
 * FeatureGrid — Responsive grid of feature cards with icon, title, and description.
 * Used for feature highlights, capability overviews, and module summaries.
 */
export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  const { t } = useDocsI18n();

  return (
    <ul
      className="docs-feature-grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {items.map((item, idx) => {
        const IconComponent = iconMap[item.icon] || DefaultIcon;
        return (
          <li key={idx} className="docs-feature-card">
            <span className="docs-feature-icon text-primary" aria-hidden="true">
              <IconComponent size={20} strokeWidth={2} />
            </span>
            <h4 className="docs-feature-title">{t(item.titleKey)}</h4>
            <p className="docs-feature-description">{t(item.descriptionKey)}</p>
          </li>
        );
      })}
    </ul>
  );
}
