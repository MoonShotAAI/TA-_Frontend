'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { RubricConsistencyWidget } from '@/components/RubricConsistencyWidget';
import { SplitPaneGradingView } from '@/components/SplitPaneGradingView';
import { StudentDeductionReport } from '@/components/StudentDeductionReport';
import { Toast } from '@/components/Toast';
import {
  mockConsistencyHealth,
  mockStudentSubmission,
  initialRubricItems,
} from '@/data/mockGradingData';
import { RubricEvidence, StudentSubmission } from '@/types/grading';
import { exportToCsv } from '@/utils/csvExport';
import {
  Sparkles,
  Command,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

export default function GradingWorkspacePage() {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(42);
  const totalStudents = 250;

  const [submission, setSubmission] = useState<StudentSubmission>(mockStudentSubmission);
  const [rubricItems, setRubricItems] = useState<RubricEvidence[]>(initialRubricItems);
  const [isDeductionModalOpen, setIsDeductionModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isPublishedToStudent, setIsPublishedToStudent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'warning'>('success');

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'j' || e.key === 'J') {
        handleNextStudent();
      } else if (e.key === 'k' || e.key === 'K') {
        handlePrevStudent();
      } else if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        handleApproveSubmission();
      } else if (e.key === 'Escape') {
        setIsDeductionModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStudentIndex, rubricItems]);

  const handlePrevStudent = () => {
    if (currentStudentIndex > 1) {
      setCurrentStudentIndex((prev) => prev - 1);
      setIsApproved(false);
      setIsPublishedToStudent(false);
      showToast(`Navigated to Student #${currentStudentIndex - 1}`, 'info');
    }
  };

  const handleNextStudent = () => {
    if (currentStudentIndex < totalStudents) {
      setCurrentStudentIndex((prev) => prev + 1);
      setIsApproved(false);
      setIsPublishedToStudent(false);
      showToast(`Navigated to Student #${currentStudentIndex + 1}`, 'info');
    }
  };

  const handleUpdateRubricItem = (updated: RubricEvidence) => {
    setRubricItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    showToast(`Updated '${updated.criterionTitle}' status to ${updated.status}`, 'info');
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportToCsv(submission, rubricItems);
      setIsExporting(false);
      setExportSuccess(true);
      showToast('Gradebook CSV export generated & downloaded!', 'success');
      setTimeout(() => setExportSuccess(false), 3000);
    }, 700);
  };

  const handleApproveSubmission = () => {
    setIsApproved(true);
    showToast(`✓ Evaluation approved for ${submission.studentName} (${submission.studentId})!`, 'success');
  };

  const handlePublishToStudent = () => {
    setIsPublishedToStudent(true);
    showToast(`Deduction breakdown successfully published for ${submission.studentName}.`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        currentStudentIndex={currentStudentIndex}
        totalStudents={totalStudents}
        onPrevStudent={handlePrevStudent}
        onNextStudent={handleNextStudent}
        onExportCsv={handleExportCsv}
        isExporting={isExporting}
        exportSuccess={exportSuccess}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Workspace Quick Context Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Grading Workspace
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-xs font-medium text-slate-600">
                Single Submission Review Mode
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
              Assignment 2: Predictive Modeling for Customer Retention
            </h1>
          </div>

          {/* Keyboard Shortcuts Hint Badge */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 bg-white border border-slate-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Command className="w-3 h-3" /> Shortcuts:
            </span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px] font-mono">J</kbd> Next</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px] font-mono">K</kbd> Prev</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px] font-mono">Space</kbd> Approve</span>
          </div>
        </div>

        {/* ========================================================
            FEATURE 1: RUBRIC CONSISTENCY WIDGET (TOP SECTION)
           ======================================================== */}
        <RubricConsistencyWidget
          metrics={mockConsistencyHealth}
          onRuleClarified={() => {
            showToast('Rubric rule updated: Logical Flow penalty criteria clarified for cohort!', 'success');
          }}
        />

        {/* ========================================================
            FEATURE 2: SPLIT-PANE GRADING VIEW (MIDDLE SECTION)
           ======================================================== */}
        <SplitPaneGradingView
          submission={submission}
          rubricItems={rubricItems}
          onUpdateRubricItem={handleUpdateRubricItem}
          onOpenDeductionReport={() => setIsDeductionModalOpen(true)}
          onApproveSubmission={handleApproveSubmission}
          isApproved={isApproved}
        />

        {/* ========================================================
            FEATURE 3: STUDENT DEDUCTION REPORT PREVIEW (BOTTOM SECTION)
           ======================================================== */}
        <StudentDeductionReport
          submission={submission}
          rubricItems={rubricItems}
          isOpenModal={isDeductionModalOpen}
          onCloseModal={() => setIsDeductionModalOpen(false)}
          onPublishToStudent={handlePublishToStudent}
          isPublished={isPublishedToStudent}
        />

      </main>

      {/* Global Interactive Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-900" />
            <span className="font-bold text-slate-800">TA+ Academic Assistant</span>
            <span>· Automated Rubric Evaluation Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Deterministic Rubric Testing Engine</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
