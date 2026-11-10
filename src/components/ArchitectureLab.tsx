import React, { useState, useMemo, useEffect } from 'react';
import { Sliders, Cpu, Play, Pause, RotateCcw, Brain, BarChart2, BookOpen, CheckCircle2 } from 'lucide-react';

export const ArchitectureLab: React.FC = () => {
  const [labMode, setLabMode] = useState<'ml' | 'sorting'>('ml');

  // ML Hyperparameters
  const [learningRate, setLearningRate] = useState<number>(0.05);
  const [epochs, setEpochs] = useState<number>(100);
  const [datasetSize, setDatasetSize] = useState<number>(300);
  const [noiseLevel, setNoiseLevel] = useState<number>(15);

  // Sorting Visualizer State
  const [array, setArray] = useState<number[]>([45, 18, 88, 23, 62, 12, 94, 38, 55, 71]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortAlgo, setSortAlgo] = useState<'bubble' | 'selection'>('bubble');
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);

  // Calculate ML Training Metrics
  const mlMetrics = useMemo(() => {
    // Simulated loss decay based on learning rate and epochs
    let effectiveConvergence = 1;
    let status = 'Training Converged';

    if (learningRate > 0.08) {
      status = 'Overshooting / High LR Oscillations';
      effectiveConvergence = 0.72;
    } else if (learningRate < 0.01) {
      status = 'Underfitting / Low LR Slow Convergence';
      effectiveConvergence = 0.81;
    } else {
      status = 'Optimal Convergence';
      effectiveConvergence = 0.95;
    }

    const epochFactor = Math.min(1.0, epochs / 120);
    const accuracy = Math.min(96.8, Math.max(62.0, (75 + epochFactor * 18 * effectiveConvergence - noiseLevel * 0.3))).toFixed(1);
    const finalLoss = Math.max(0.04, (0.85 / (1 + epochs * learningRate * 0.8) + (noiseLevel / 200))).toFixed(3);

    return {
      accuracy,
      finalLoss,
      status,
      samples: datasetSize,
      convergenceScore: Math.round(effectiveConvergence * 100)
    };
  }, [learningRate, epochs, datasetSize, noiseLevel]);

  // Reset array for sorting
  const resetArray = () => {
    setArray([45, 18, 88, 23, 62, 12, 94, 38, 55, 71]);
    setActiveIndices([]);
    setComparisons(0);
    setSwaps(0);
    setIsSorting(false);
  };

  // Step-by-step bubble sort
  const runBubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        await new Promise((r) => setTimeout(r, 180));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
        }
      }
    }
    setActiveIndices([]);
    setIsSorting(false);
  };

  return (
    <section id="architecture" className="py-24 border-t border-neutral-200 dark:border-rose-950/70 bg-neutral-50/60 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-tech font-semibold tracking-widest uppercase text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_8px_#dc2626]" />
              <span>CSE (AI & ML) Hands-on Lab</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Interactive Coding & ML Workbench
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl text-sm md:text-base font-sans">
              Explore hands-on concepts studied in my CSE (AI & ML) curriculum at NIAT X Joy University: machine learning gradient optimization and foundational sorting algorithms.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-neutral-100/90 dark:bg-rose-950/30 backdrop-blur-md rounded-xl shrink-0 border border-neutral-200 dark:border-rose-950/60">
            <button
              onClick={() => setLabMode('ml')}
              className={`px-3.5 py-1.5 text-xs font-tech uppercase tracking-wider font-semibold rounded-lg transition-all whitespace-nowrap ${
                labMode === 'ml'
                  ? 'bg-red-600 text-white shadow-sm shadow-red-950/50'
                  : 'text-neutral-600 dark:text-rose-200/70 hover:text-red-500'
              }`}
            >
              ML Gradient Lab
            </button>
            <button
              onClick={() => setLabMode('sorting')}
              className={`px-3.5 py-1.5 text-xs font-tech uppercase tracking-wider font-semibold rounded-lg transition-all whitespace-nowrap ${
                labMode === 'sorting'
                  ? 'bg-red-600 text-white shadow-sm shadow-red-950/50'
                  : 'text-neutral-600 dark:text-rose-200/70 hover:text-red-500'
              }`}
            >
              Sorting Visualizer
            </button>
          </div>
        </div>

        {labMode === 'ml' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Dials (5 cols) */}
            <div className="lg:col-span-5 space-y-6 bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md p-6 rounded-2xl border border-neutral-200 dark:border-rose-950/80 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-rose-950/70">
                <span className="font-display text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-red-500" /> Model Hyperparameters
                </span>
                <span className="text-xs text-red-400 font-mono">CSE AIML Track</span>
              </div>

              {/* Learning Rate Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label className="font-medium text-neutral-700 dark:text-neutral-300">
                    Learning Rate (α)
                  </label>
                  <span className="font-mono font-medium text-red-600 dark:text-red-400 tabular-nums">
                    {learningRate}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.1"
                  step="0.005"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-rose-950 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>0.005 (Slow)</span>
                  <span>0.05 (Balanced)</span>
                  <span>0.1 (High)</span>
                </div>
              </div>

              {/* Epochs Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label className="font-medium text-neutral-700 dark:text-neutral-300">
                    Training Epochs
                  </label>
                  <span className="font-mono font-medium text-red-600 dark:text-red-400 tabular-nums">
                    {epochs} Epochs
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={epochs}
                  onChange={(e) => setEpochs(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-rose-950 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>20</span>
                  <span>150</span>
                  <span>300</span>
                </div>
              </div>

              {/* Noise Level */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label className="font-medium text-neutral-700 dark:text-neutral-300">
                    Dataset Variance / Noise
                  </label>
                  <span className="font-mono font-medium text-red-600 dark:text-red-400 tabular-nums">
                    {noiseLevel}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 dark:bg-rose-950 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Educational Concept Card */}
              <div className="p-3.5 bg-neutral-100 dark:bg-rose-950/25 rounded-xl text-xs text-neutral-600 dark:text-rose-200/80 leading-relaxed border border-neutral-200/50 dark:border-rose-950/70">
                <span className="font-semibold text-neutral-900 dark:text-white">Classroom Concept: </span>
                {learningRate > 0.08
                  ? 'A learning rate that is too high causes gradient descent to overshoot the global minimum, oscillating back and forth.'
                  : learningRate < 0.015
                  ? 'A very small learning rate ensures stable convergence but requires hundreds of epochs to reach the minimum loss.'
                  : 'Well-tuned learning rate yields smooth loss reduction and balanced generalization.'}
              </div>
            </div>

            {/* Results & Visualization (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Output Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80">
                  <div className="text-xs font-tech uppercase tracking-wider text-neutral-500 dark:text-rose-300/70">Model Accuracy</div>
                  <div className="font-display text-2xl font-extrabold text-red-500 dark:text-red-400 tabular-nums mt-1">
                    {mlMetrics.accuracy}%
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Test validation</div>
                </div>

                <div className="p-4 rounded-xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80">
                  <div className="text-xs font-tech uppercase tracking-wider text-neutral-500 dark:text-rose-300/70">Final Loss (MSE)</div>
                  <div className="font-display text-2xl font-extrabold text-neutral-900 dark:text-white tabular-nums mt-1">
                    {mlMetrics.finalLoss}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Mean squared error</div>
                </div>

                <div className="p-4 rounded-xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80">
                  <div className="text-xs font-tech uppercase tracking-wider text-neutral-500 dark:text-rose-300/70">Training Samples</div>
                  <div className="font-display text-2xl font-extrabold text-neutral-900 dark:text-white tabular-nums mt-1">
                    {datasetSize}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Synthetic batch</div>
                </div>

                <div className="p-4 rounded-xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80">
                  <div className="text-xs font-tech uppercase tracking-wider text-neutral-500 dark:text-rose-300/70">Optimization</div>
                  <div className="font-display text-base font-bold text-red-500 dark:text-red-400 mt-2 truncate">
                    {mlMetrics.status.split('/')[0]}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Optimizer state</div>
                </div>
              </div>

              {/* Loss Curve Graphic */}
              <div className="p-6 bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-rose-950/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-rose-300/70">
                    Simulated Loss Convergence Curve
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Epoch 1 → {epochs}
                  </span>
                </div>

                <div className="h-44 w-full flex items-end justify-between gap-1 pt-6 px-2 border-b border-l border-neutral-200 dark:border-rose-950">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const stepProgress = idx / 23;
                    const barHeight = Math.max(
                      14,
                      Math.min(
                        96,
                        100 * Math.exp(-stepProgress * epochs * learningRate * 0.4) +
                          (Math.sin(idx * 2) * noiseLevel * 0.4)
                      )
                    );
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-rose-950 to-red-600 rounded-t-sm hover:brightness-125 transition-all"
                        style={{ height: `${barHeight}%` }}
                        title={`Step ${idx + 1}: ~${barHeight.toFixed(0)}% loss`}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-mono">
                  <span>Start (High Error)</span>
                  <span>Gradient Descent Steps</span>
                  <span>Trained Model</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Sorting Visualizer */
          <div className="bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md p-8 rounded-2xl border border-neutral-200 dark:border-rose-950/80 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-rose-950/70">
              <div>
                <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                  Bubble Sort Execution Trace
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Visualizing pairwise comparisons and swaps in real time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={runBubbleSort}
                  disabled={isSorting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-rose-950 transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isSorting ? 'Sorting...' : 'Start Sort'}</span>
                </button>

                <button
                  onClick={resetArray}
                  disabled={isSorting}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-rose-950/40 border border-neutral-200 dark:border-rose-950 transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Visual Bars Container */}
            <div className="h-48 flex items-end justify-between gap-3 px-4 pt-4 border-b border-neutral-200 dark:border-rose-950">
              {array.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400">
                      {val}
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-150 ${
                        isActive
                          ? 'bg-white shadow-md shadow-white/30 scale-y-105'
                          : 'bg-red-600/90 dark:bg-red-700'
                      }`}
                      style={{ height: `${val * 1.6}px` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Telemetry Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <div className="text-xs text-neutral-500">Comparisons</div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  {comparisons}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <div className="text-xs text-neutral-500">Element Swaps</div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  {swaps}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <div className="text-xs text-neutral-500">Time Complexity</div>
                <div className="text-xl font-bold font-mono text-red-500 dark:text-red-400 mt-0.5">
                  O(n²)
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-rose-950/20 border border-neutral-200 dark:border-rose-950/60">
                <div className="text-xs text-neutral-500">Space Complexity</div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-0.5">
                  O(1)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
