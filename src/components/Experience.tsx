import React, { useState } from 'react';
import { Briefcase, CheckCircle2, GraduationCap, Calendar, BookOpen, Clock, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playClickSound } from '../utils/sound';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'curriculum'>('milestones');

  const semesterCurriculum = [
    {
      semester: "Year 1 · Foundational Engineering",
      status: "Completed",
      statusColor: "emerald",
      courses: [
        { name: "Programming in C Language", desc: "Pointers, memory allocation, arrays, structs and algorithms" },
        { name: "Discrete Mathematics & Calculus", desc: "Linear algebra, matrix operations, logic and graph theory" },
        { name: "Engineering Physics & Computing", desc: "Computational problem solving and digital logic circuits" },
        { name: "Linux Environment & Git Basics", desc: "Bash commands, version control, branching, repository management" },
      ]
    },
    {
      semester: "Year 2 · Core CSE & AIML Focus (Current)",
      status: "In Progress",
      statusColor: "red",
      courses: [
        { name: "Python for Data Science & AI", desc: "NumPy, Pandas, Scikit-learn, object-oriented software design" },
        { name: "Data Structures & Algorithms (DSA)", desc: "Linked lists, stacks, queues, binary trees, sorting & search algorithms" },
        { name: "Machine Learning Foundations", desc: "Linear regression, logistic classifiers, KNN, gradient descent, metrics" },
        { name: "Web Development Technologies", desc: "Responsive HTML5/CSS3, JavaScript (ES6+), React foundations, APIs" },
      ]
    },
    {
      semester: "Year 3 & 4 · Advanced AI & Specialization",
      status: "Upcoming",
      statusColor: "neutral",
      courses: [
        { name: "Deep Learning & Neural Networks", desc: "Convolutional Neural Networks (CNN), RNN, PyTorch / TensorFlow" },
        { name: "Natural Language Processing (NLP)", desc: "Text processing, sentiment classification, transformer architectures" },
        { name: "Computer Vision & Edge AI", desc: "Object detection, YOLO models, real-time image segmentation" },
        { name: "Industry Internship & Capstone", desc: "Real-world engineering internship and production capstone deployment" },
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 border-t border-neutral-200 dark:border-rose-950/70 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Mode Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-tech font-semibold tracking-widest uppercase text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_8px_#dc2626]" />
              <span>Academic Progression · Joy University</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Education & Academic Track
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-xl text-sm md:text-base font-sans">
              Curriculum milestones, practical labs, and coursework at NIAT X Joy University.
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100/90 dark:bg-rose-950/30 backdrop-blur-md rounded-xl shrink-0 border border-neutral-200 dark:border-rose-950/60">
            <button
              onClick={() => {
                playClickSound(700);
                setActiveTab('milestones');
              }}
              className={`px-3.5 py-1.5 text-xs font-tech uppercase tracking-wider font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'milestones'
                  ? 'bg-red-600 text-white shadow-sm shadow-red-950/50'
                  : 'text-neutral-600 dark:text-rose-200/70 hover:text-red-500'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Academic Experience</span>
            </button>
            <button
              onClick={() => {
                playClickSound(700);
                setActiveTab('curriculum');
              }}
              className={`px-3.5 py-1.5 text-xs font-tech uppercase tracking-wider font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'curriculum'
                  ? 'bg-red-600 text-white shadow-sm shadow-red-950/50'
                  : 'text-neutral-600 dark:text-rose-200/70 hover:text-red-500'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Curriculum Roadmap</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Academic Milestones & Experience */}
        {activeTab === 'milestones' && (
          <div className="space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/70 shadow-sm hover:border-red-600/60 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_8px_30px_-6px_rgba(220,38,38,0.2)]"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-4 border-b border-neutral-100 dark:border-rose-950/60">
                  <div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-tech font-semibold text-red-600 dark:text-red-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    <span>{exp.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  {exp.summary}
                </p>

                {/* Key Achievements */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-xs font-tech font-semibold uppercase tracking-wider text-neutral-400">
                    Core Coursework & Lab Takeaways
                  </div>
                  {exp.achievements.map((ach, achIdx) => (
                    <div key={achIdx} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="font-sans">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Tags */}
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-rose-950/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span className="text-neutral-400 font-tech">Tools:</span>
                  {exp.technologies.map((tech, techIdx) => (
                    <React.Fragment key={tech}>
                      <span className="text-neutral-800 dark:text-rose-200">{tech}</span>
                      {techIdx < exp.technologies.length - 1 && (
                        <span className="text-neutral-300 dark:text-rose-950" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Interactive Curriculum Roadmap */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {semesterCurriculum.map((sem, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/70 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-rose-950/60">
                    <span className="font-tech text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-rose-200/70">
                      Phase 0{sIdx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-tech font-bold uppercase px-2 py-0.5 rounded-full ${
                        sem.status === 'Completed'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                          : sem.status === 'In Progress'
                          ? 'bg-rose-950/80 text-red-400 border border-rose-800'
                          : 'bg-neutral-100 dark:bg-black/60 text-neutral-400 border border-neutral-300 dark:border-rose-950/60'
                      }`}
                    >
                      {sem.status}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-4">
                    {sem.semester}
                  </h3>

                  <div className="space-y-3">
                    {sem.courses.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200/60 dark:border-rose-950/50 space-y-1"
                      >
                        <div className="font-tech text-xs font-semibold text-neutral-900 dark:text-white">
                          {course.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                          {course.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-200/60 dark:border-rose-950/60 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                  <span>NIAT X Joy Univ CSE</span>
                  <span>4 Subjects</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
