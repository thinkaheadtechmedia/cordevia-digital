import React, { useState } from 'react';
import { BlogPost } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Eye, 
  Users, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Activity,
  ArrowUpRight
} from 'lucide-react';

interface BlogMetricsDashboardProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  className?: string;
}

type Timeframe = '24h' | '30d' | 'all';

export const BlogMetricsDashboard: React.FC<BlogMetricsDashboardProps> = ({
  posts,
  onSelectPost,
  className = '',
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');
  const [isExpanded, setIsExpanded] = useState(true);

  // Timeframe multipliers for realistic simulation
  const multiplier = timeframe === '24h' ? 0.08 : timeframe === '30d' ? 0.65 : 1.0;

  // Compute aggregate simulated metrics
  const totalArticles = posts.length;
  const baseTotalViews = 248600;
  const simulatedViews = Math.round(baseTotalViews * multiplier);
  
  const liveReaders = timeframe === '24h' ? 114 : timeframe === '30d' ? 88 : 76;
  const avgDuration = '5m 48s';
  const retentionScore = '73.4%';

  // Calculate per-post simulated views deterministically
  const postMetrics = posts.map((post, idx) => {
    // Hash slug to stable numbers
    const hash = post.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const baseViews = 28000 + (hash % 24000) - (idx * 3200);
    const views = Math.max(12000, Math.round(baseViews * multiplier));
    const durationMinutes = 4 + (hash % 5);
    const durationSeconds = (hash * 7) % 60;
    const durationStr = `${durationMinutes}m ${durationSeconds < 10 ? '0' : ''}${durationSeconds}s`;
    const retention = `${68 + (hash % 22)}%`;

    return {
      post,
      views,
      durationStr,
      retention,
    };
  }).sort((a, b) => b.views - a.views);

  const topPost = postMetrics[0];

  return (
    <div className={`rounded-3xl bg-gradient-to-br from-[#0B1224] via-[#090E1B] to-[#070B14] border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/70 border border-cyan-800/60 text-cyan-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Content Intelligence & Performance Monitor
              </h2>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Tracking
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Simulated reader engagement, dwell time, and content velocity metrics
            </p>
          </div>
        </div>

        {/* Timeframe & Collapse Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTimeframe('24h')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeframe === '24h' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              24H Live
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeframe === '30d' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeframe('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                timeframe === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isExpanded ? 'Collapse dashboard' : 'Expand dashboard'}
            aria-label="Toggle metrics details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {/* Total Views */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Total Readership</span>
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            {simulatedViews.toLocaleString()}+
          </div>
          <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% velocity vs prev period</span>
          </div>
        </div>

        {/* Avg Reading Duration */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Avg Reading Duration</span>
            <Clock className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            {avgDuration}
          </div>
          <div className="text-[11px] text-teal-400 font-medium flex items-center gap-1 mt-1">
            <span>High deep-dwell ratio (E-E-A-T)</span>
          </div>
        </div>

        {/* Audience Retention Score */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Completion Rate</span>
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            {retentionScore}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <span>+12.6% above technical avg</span>
          </div>
        </div>

        {/* Live Active Readers */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium">Active Concurrent</span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight flex items-center gap-2">
            <span>{liveReaders}</span>
            <span className="text-xs text-emerald-400 font-normal font-sans flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              online now
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            <span>Across US, UK, EU, Africa & Asia</span>
          </div>
        </div>
      </div>

      {/* Expanded Per-Article Leaderboard */}
      {isExpanded && (
        <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Highest Velocity Research Publications</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Ranked by dwell time & impressions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {postMetrics.slice(0, 3).map((item, rank) => (
              <div
                key={item.post.id}
                onClick={() => onSelectPost(item.post)}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold">
                      #{rank + 1} Trending
                    </span>
                    <span className="text-slate-400 font-mono flex items-center gap-1 text-[11px]">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      {item.views.toLocaleString()} reads
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {item.post.title}
                  </h3>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-teal-400" />
                    {item.durationStr} avg
                  </span>
                  <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-0.5">
                    View <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
