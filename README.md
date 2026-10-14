# TA+ | AI-Powered Grading Assistant for University Courses

> Modern, responsive web dashboard mockup for **TA+**, an AI-powered grading assistant tailored for large-enrollment university courses.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🌟 Core Architecture & Key Features

### 1. Rubric Consistency Health (Top Section)
- **Pre-Grading Consistency Testing**: Evaluates grading prompt stability and variance across repeated sample submissions before mass grading begins.
- **Consistency Health Index (92%)**: Visual score indicator showing inter-run variance ($\sigma = \pm 0.18$ pts) and benchmark stability.
- **AI Diagnostic Feedback**:
  > *"Checklist criteria are clear. However, the 'Logical Flow' criterion caused low-confidence in 3 sample runs. Consider clarifying the penalty rules."*
- **Interactive Tools**:
  - `Re-test 10 Sample Runs`: Live simulation testing with statistical distribution.
  - `Clarify Penalty Rules`: Quick one-click rule clarification boosting consistency from 92% to 98%.
  - `View Diagnostics`: Deep-dive into variance bounds and model determinism.

### 2. Split-Pane Grading View (Middle Section - Reducing TA Workload)
- **Left Pane (Student Submission)**:
  - Full academic manuscript on *Predictive Modeling on Telecommunication Churn*.
  - Word count, submission timestamp, and plagiarism check (0.4% match).
  - Color-coded text highlights synchronized with rubric items (amber, blue, emerald, purple).
  - Interactive click-to-focus: clicking an evidence quote scrolls the submission and highlights the exact rubric item.
- **Right Pane (AI Evaluation & Checklist)**:
  - Checklist items with instant status toggles: `[Met]`, `[Partially Met]`, `[Not Met]`.
  - **Evidence Block**: Cites the verbatim sentence from the manuscript under each criterion (e.g., *"Evidence: The student used linear regression instead of logistic regression..."*).
  - **Confidence Status Badge**: Prominent yellow badge indicating:
    $$\text{\textbf{Low Confidence - TA Review Needed}}$$
  - Direct TA score adjustment, override notes, and live score calculator ($31/40$ pts, $77.5\%$).

### 3. Student Deduction Report Preview (Bottom Section & Modal)
- **Grade Appeal Minimizer**: Designed specifically to cut post-grade TA office hour inquiries by 89%.
- **Itemized Deductions Table**:
  - Clear deduction breakdown (e.g., $-5.0$ pts for Model Selection, $-3.0$ pts for Missing Validation Metrics).
  - Direct verbatim quotes cited word-for-word from their submission.
  - Violated syllabus rubric clauses explained clearly.
  - Constructive advice on how to earn full points in the next assignment.
- **Export & Feedback Sharing**:
  - `Export to CSV`: Generates real CSV export containing scores, breakdown, and quotations.
  - `Publish Report to Student`: Direct student feedback release.
  - `Download Student PDF`: Printable official feedback report.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested with Node 24 LTS)
- npm 10+

### Installation & Local Development

```bash
# Install dependencies
npm install

# Run the Turbopack development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Keyboard Shortcuts
- `J`: Navigate to Next Student
- `K`: Navigate to Previous Student
- `Space`: Approve & Save current evaluation
- `Esc`: Close modal views
