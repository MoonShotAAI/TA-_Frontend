'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Sliders,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { ConsistencyHealthMetrics } from '@/types/grading';

interface RubricConsistencyWidgetProps {
  metrics: ConsistencyHealthMetrics;
  onRuleClarified?: () => void;
}

export const RubricConsistencyWidget: React.FC<RubricConsistencyWidgetProps> = ({
  metrics,
  onRuleClarified,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [score, setScore] = useState(metrics.overallScore);
  const [showDetails, setShowDetails] = useState(false);
  const [clarifiedRule, setClarifiedRule] = useState(false);

  const handleSimulateRuns = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setScore((prev) => (clarifiedRule ? 98 : 94));
    }, 900);
  };

  const handleApplyClarification = () => {
    setClarifiedRule(true);
    setScore(98);
    if (onRuleClarified) onRuleClarified();
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200">
      {/* Top Banner Row */}
      <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Section: Score Badge & AI Message */}
        <div className="flex items-start gap-4 flex-1">
          {/* Consistency Circular/Pill Score Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-0.5 shadow-sm flex flex-col items-center justify-center text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Health</span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none text-white">
                {score}%
              </span>
              <span className="text-[9px] font-medium text-emerald-300 flex items-center gap-0.5 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 inline" /> {clarifiedRule ? 'Optimized' : 'Tested'}
              </span>
            </div>
          </div>

          {/* Diagnostic Context & AI Feedback Message */}
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm sm:text-base">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Rubric Consistency Health</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Pre-Grading Validation Passed
              </span>
              <span className="text-xs text-slate-700 font-medium hidden sm:inline">
                {metrics.sampleRunsTested} sample runs simulated
              </span>
            </div>

            {/* Core AI Feedback Message (Required specification) */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs text-slate-800 flex items-start gap-2 leading-relaxed">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-800">
                  {clarifiedRule ? (
                    <span className="text-emerald-800 font-semibold">
                      ✓ Rubric rule clarified! Penalty boundaries for &apos;Logical Flow&apos; are now unambiguous. Standard deviation across sample runs dropped from ±1.5 pts to &lt;0.1 pts.
                    </span>
                  ) : (
                    <span>
                      &ldquo;Checklist criteria are clear. However, the <strong className="text-amber-800 underline decoration-amber-300 font-semibold">&apos;Logical Flow&apos;</strong> criterion caused low-confidence in 3 sample runs. Consider clarifying the penalty rules.&rdquo;
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-slate-700 mt-0.5">
                  Pre-testing detects grading bias and ambiguity across student cohorts before mass grading begins.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Actions & Controls */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto justify-end pt-1 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {!clarifiedRule && (
            <button
              onClick={handleApplyClarification}
              className="px-3 py-2 text-xs font-bold rounded-lg bg-amber-50 text-amber-900 border border-amber-300/80 hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-xs"
              title="Apply AI Suggested Clarification to Rubric"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Clarify Penalty Rules</span>
            </button>
          )}

          <button
            onClick={handleSimulateRuns}
            disabled={isSimulating}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSimulating ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isSimulating ? 'Simulating 10 Runs...' : 'Re-test 10 Sample Runs'}</span>
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-2.5 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <span>{showDetails ? 'Hide Diagnostics' : 'View Diagnostics'}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Expanded Diagnostics Drawer */}
      {showDetails && (
        <div className="border-t border-slate-200 bg-slate-50/60 p-4 sm:p-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide block">Model Stability</span>
              <div className="text-base font-bold text-slate-900 mt-1 flex items-center justify-between">
                <span>99.2% Deterministic</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold">Stable</span>
              </div>
              <p className="text-[11px] text-slate-700 mt-1">Negligible score drift across repeated evaluations on identical texts.</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide block">Inter-Run Variance</span>
              <div className="text-base font-bold text-slate-900 mt-1 flex items-center justify-between">
                <span>σ = ±{clarifiedRule ? '0.08' : '0.18'} pts</span>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono font-bold">&lt; 0.25 (Safe)</span>
              </div>
              <p className="text-[11px] text-slate-700 mt-1">Variance across prompt permutations within allowable academic bound.</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide block">Flagged Rule</span>
              <div className="text-base font-bold text-slate-900 mt-1 flex items-center justify-between">
                <span className="truncate pr-1">Logical Flow</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${clarifiedRule ? 'text-emerald-700 bg-emerald-50' : 'text-amber-800 bg-amber-50'}`}>
                  {clarifiedRule ? 'Resolved' : '3 Discrepancies'}
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-1">Clarified penalty threshold reduces TA grading override frequency.</p>
            </div>

            {/* Metric 4 */}
            <div className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide block">Confidence Benchmark</span>
              <div className="text-base font-bold text-slate-900 mt-1 flex items-center justify-between">
                <span>94.8% Average</span>
                <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-mono font-bold">Top 5%</span>
              </div>
              <p className="text-[11px] text-slate-700 mt-1">High confidence guarantees instant TA evidence verification.</p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
