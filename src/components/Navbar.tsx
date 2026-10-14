'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
  BarChart3,
  Download,
  Check,
  Search,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface NavbarProps {
  currentStudentIndex: number;
  totalStudents: number;
  onPrevStudent: () => void;
  onNextStudent: () => void;
  onExportCsv: () => void;
  isExporting: boolean;
  exportSuccess: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStudentIndex,
  totalStudents,
  onPrevStudent,
  onNextStudent,
  onExportCsv,
  isExporting,
  exportSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'rubrics' | 'analytics'>('workspace');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs backdrop-blur-md">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Course Context */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-700 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-900/10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xl tracking-tight text-slate-900">TA<span className="text-blue-700 font-extrabold">+</span></span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80">
                    AI Grader
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-700">Intelligent Rubric Grading</p>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            {/* Course Selector */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100/70 transition-colors cursor-pointer">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <div className="text-xs">
                <span className="font-semibold text-slate-900">CS402</span>
                <span className="text-slate-700 font-medium ml-1">Data Mining & ML · Assignment 2</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'workspace'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Grading Workspace
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse ml-0.5" />
            </button>
            <button
              onClick={() => setActiveTab('rubrics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'rubrics'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Rubric Health (92%)
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Cohort Analytics
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Student Navigation Controls */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={onPrevStudent}
                disabled={currentStudentIndex <= 1}
                className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 rounded hover:bg-slate-200/60 transition-colors"
                title="Previous Student (Hotkey: J)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-2.5 text-xs font-medium text-slate-700 whitespace-nowrap">
                Student <span className="font-bold text-slate-900">{currentStudentIndex}</span> of {totalStudents}
              </div>
              <button
                onClick={onNextStudent}
                disabled={currentStudentIndex >= totalStudents}
                className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 rounded hover:bg-slate-200/60 transition-colors"
                title="Next Student (Hotkey: K)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Export to CSV Button */}
            <button
              onClick={onExportCsv}
              disabled={isExporting}
              className={`relative group inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all duration-200 shadow-xs ${
                exportSuccess
                  ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                  : 'bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white border-blue-950 shadow-blue-900/10'
              }`}
            >
              {exportSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>CSV Exported!</span>
                </>
              ) : isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Formatting CSV...</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
                  <span>Export to CSV</span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white/20 text-[10px] text-blue-100 font-mono">
                    CSV
                  </span>
                </>
              )}
            </button>

            {/* User Profile avatar */}
            <div className="flex items-center pl-1 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white">
                TA
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Progress sub-bar */}
      <div className="bg-slate-50/90 border-t border-slate-200/70 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-slate-700 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Class Batch Progress:
          </span>
          <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-700 h-2 rounded-full" style={{ width: '56.8%' }} />
          </div>
          <span className="font-semibold text-slate-900">142 / 250 (56.8%) Graded</span>
        </div>
        <div className="flex items-center gap-4 text-slate-700">
          <span className="hidden sm:inline">Avg TA Verification: <strong className="text-slate-800">42s / submission</strong></span>
          <span className="hidden md:inline text-emerald-700 font-medium">84% Time Saved vs Manual</span>
          <span className="font-mono text-[10px] bg-slate-200/80 px-1.5 py-0.5 rounded text-slate-600">Auto-save: Active</span>
        </div>
      </div>
    </header>
  );
};
