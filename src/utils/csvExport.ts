import { RubricEvidence, StudentSubmission } from '@/types/grading';

export function exportToCsv(
  submission: StudentSubmission,
  rubricItems: RubricEvidence[]
) {
  const totalScore = rubricItems.reduce((acc, curr) => acc + curr.assignedScore, 0);
  const maxScore = rubricItems.reduce((acc, curr) => acc + curr.maxScore, 0);

  const deductions = rubricItems
    .filter((r) => r.penaltyPoints > 0)
    .map((r) => `${r.criterionTitle} (-${r.penaltyPoints}pts)`)
    .join('; ');

  const headers = [
    'Student ID',
    'Student Name',
    'Course Code',
    'Assignment Title',
    'Total Score',
    'Max Score',
    'Percentage',
    'Evaluation Status',
    'Deduction Reasons',
    'Evidence Quotations',
    'Export Timestamp',
  ];

  const evidenceQuotes = rubricItems
    .map((r) => `[${r.criterionTitle}]: "${r.evidenceQuote.replace(/"/g, '""')}"`)
    .join(' | ');

  const rowData = [
    `"${submission.studentId}"`,
    `"${submission.studentName}"`,
    `"${submission.courseCode}"`,
    `"${submission.assignmentTitle.replace(/"/g, '""')}"`,
    totalScore,
    maxScore,
    `${Math.round((totalScore / maxScore) * 100)}%`,
    `"TA_VERIFIED"`,
    `"${deductions.replace(/"/g, '""')}"`,
    `"${evidenceQuotes.replace(/"/g, '""')}"`,
    `"${new Date().toISOString()}"`,
  ];

  const csvContent = '\uFEFF' + [headers.join(','), rowData.join(',')].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `Grades_${submission.courseCode}_${submission.studentId}_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
