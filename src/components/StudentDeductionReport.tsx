'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  FileCheck2,
  Quote,
  Send,
  Download,
  ExternalLink,
  HelpCircle,
  X,
  Sparkles,
  Printer,
  Share2,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { RubricEvidence, StudentSubmission } from '@/types/grading';

interface StudentDeductionReportProps {
  submission: StudentSubmission;
  rubricItems: RubricEvidence[];
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onPublishToStudent?: () => void;
  isPublished?: boolean;
}

export const StudentDeductionReport: React.FC<StudentDeductionReportProps> = ({
  submission,
  rubricItems,
  isOpenModal = false,
  onCloseModal,
  onPublishToStudent,
  isPublished = false,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'deductions' | 'all'>('deductions');

  const deductions = rubricItems.filter((item) => item.penaltyPoints > 0);
  const metItems = rubricItems.filter((item) => item.status === 'MET');
  const totalScore = rubricItems.reduce((acc, curr) => acc + curr.assignedScore, 0);
  const maxScore = rubricItems.reduce((acc, curr) => acc + curr.maxScore, 0);
  const totalDeductions = rubricItems.reduce((acc, curr) => acc + curr.penaltyPoints, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  const ReportContent = () => (
    <div className="space-y-6">
      
      {/* Official Academic Grade Header */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Official Feedback Report
              </span>
              <span className="text-xs text-slate-400">Evaluation Gradebook</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-1">
              Assignment 2: Student Deduction Breakdown
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Course: <span className="font-semibold text-white">{submission.courseCode} {submission.courseTitle}</span>
            </p>
          </div>

          {/* Student Final Score Card */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-3 sm:text-right backdrop-blur-sm">
            <span className="text-[11px] text-slate-300 block font-medium">Assigned Grade</span>
            <div className="text-2xl font-black text-white leading-tight">
              {totalScore} <span className="text-sm font-semibold text-slate-300">/ {maxScore} pts</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 mt-1">
              <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                Grade: {percentage >= 90 ? 'A' : percentage >= 80 ? 'B+' : percentage >= 70 ? 'B' : 'C'} ({percentage}%)
              </span>
              <span className="text-xs text-rose-300 font-semibold">
                -{totalDeductions} pts deducted
              </span>
            </div>
          </div>
        </div>

        {/* Student metadata row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-300">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student Name</span>
            <span className="font-semibold text-white">{submission.studentName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Student ID</span>
            <span className="font-mono text-white">{submission.studentId}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Evaluator</span>
            <span className="text-white">AI Assistant (Verified by Head TA)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Appeal Window</span>
            <span className="text-amber-300 font-medium">Closes Oct 19, 23:59</span>
          </div>
        </div>
      </div>

      {/* Appeal Prevention Trust Banner */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <Sparkles className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
            Transparent Evidence-Based Grading (Grade Appeal Minimizer)
          </h4>
          <p className="text-amber-900 mt-0.5 leading-relaxed">
            Every point deduction is backed by the <strong>exact verbatim quotation</strong> from your submitted manuscript and the corresponding course syllabus rubric clause. Please review the specific feedback and actionable remedies below before requesting TA office hours.
          </p>
        </div>
      </div>

      {/* Missed Checklist Items & Point Deductions (Required specification) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-rose-600" />
            Checklist Items Missed &amp; Deductions ({deductions.length} criteria)
          </h4>
          <span className="text-xs text-slate-700 font-medium">
            Total Penalty: <strong className="text-rose-700 font-bold">-{totalDeductions} points</strong>
          </span>
        </div>

        {deductions.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-rose-200/90 shadow-2xs p-4 sm:p-5 space-y-3 transition-all hover:border-rose-300"
          >
            {/* Header: Penalty points and criterion title */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{item.criterionTitle}</h5>
                  <span className="text-[11px] font-medium text-slate-700">{item.category}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-extrabold">
                  -{item.penaltyPoints}.0 pts
                </span>
                <span className="block text-[10px] text-slate-700 mt-0.5">
                  Awarded: {item.assignedScore} / {item.maxScore}
                </span>
              </div>
            </div>

            {/* Direct Quote Evidence from Essay (Required specification) */}
            <div className="bg-slate-50 border-l-4 border-rose-500 rounded-r-lg p-3 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                <Quote className="w-3.5 h-3.5 text-rose-600" />
                <span>Direct Quote from Your Submission:</span>
              </div>
              <blockquote className="italic font-serif text-slate-900 bg-white/90 p-2.5 rounded border border-slate-200 text-xs leading-relaxed">
                &ldquo;{item.evidenceQuote}&rdquo;
              </blockquote>
              <p className="text-[11px] text-slate-700 font-medium">
                {item.evidenceExplanation}
              </p>
            </div>

            {/* Rubric Violation Reason & Actionable Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                <strong className="text-slate-900 font-bold block mb-1">
                  Rubric Requirement Violated:
                </strong>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {item.aiRationale}
                </p>
              </div>

              <div className="bg-blue-50/70 p-3 rounded-lg border border-blue-200/80">
                <strong className="text-blue-950 font-bold block mb-1">
                  How to Earn Full Points Next Time:
                </strong>
                <p className="text-blue-900 leading-relaxed text-[11px]">
                  {item.id === 'rubric_1'
                    ? 'Always adopt discrete classification architectures (e.g. Logistic Regression with sigmoid activations, Decision Trees, or LightGBM) for discrete binary target labels rather than continuous OLS linear regression.'
                    : 'Ensure held-out validation loss curves and test confusion matrices are explicitly formatted into tables in Section 4 to prove absence of overfitting.'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Successfully Met Items Section */}
      <div className="space-y-3 pt-2">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Criteria Successfully Met ({metItems.length} criteria)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {metItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-emerald-200/80 p-3.5 text-xs space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-slate-900">{item.criterionTitle}</h5>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                  {item.assignedScore} / {item.maxScore} pts
                </span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed italic border-l-2 border-emerald-500 pl-2">
                &ldquo;{item.evidenceQuote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Footer / Actions */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-700 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-slate-500" />
          <span>Digitally signed &amp; timestamped evaluation record</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce text-blue-600' : ''}`} />
            <span>{downloading ? 'Generating PDF...' : 'Download Student PDF'}</span>
          </button>

          <button
            onClick={onPublishToStudent}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs ${
              isPublished
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-900 hover:bg-blue-800 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPublished ? 'Report Published' : 'Publish Report to Student'}</span>
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Permanent Inline Preview Card on the main page */}
      <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Preview Card Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Student Deduction Report Preview
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  Student View
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">
                Exact preview of feedback provided to <strong className="text-slate-800">{submission.studentName}</strong>. Direct evidence citations minimize grade appeals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onPublishToStudent}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-2xs ${
                isPublished
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isPublished ? 'Published' : 'Publish Report'}</span>
            </button>

            <button
              onClick={onCloseModal ? () => onCloseModal() : undefined}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Full Screen Modal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Inline Report View */}
        <div className="p-4 sm:p-6 bg-slate-50/40">
          <ReportContent />
        </div>
      </section>

      {/* 2. Full-Screen Interactive Modal Triggered by Header or Preview Button */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Top Bar */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Student Deduction Report · Modal Inspection
                  </h3>
                  <p className="text-[11px] text-slate-700">
                    Student Feedback View · Min-jun Kim (2021312894)
                  </p>
                </div>
              </div>

              <button
                onClick={onCloseModal}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <ReportContent />
            </div>

          </div>
        </div>
      )}
    </>
  );
};
