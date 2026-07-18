/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIAGNOSTIC_DECISION_TREE } from '../types';
import { AlertCircle, Disc, Zap, Flame, Compass, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

interface DiagnosticsProps {
  onSOSClick: () => void;
}

export default function Diagnostics({ onSOSClick }: DiagnosticsProps) {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>('d1');

  const selectedData = DIAGNOSTIC_DECISION_TREE.find((d) => d.id === selectedSymptomId);

  // Return the correct lucide icon component based on name string
  const getIconComponent = (iconName: string, active: boolean) => {
    const props = { className: `w-5 h-5 ${active ? 'text-brand-amber' : 'text-slate-400'}` };
    if (iconName === 'Disc') return <Disc {...props} />;
    if (iconName === 'Zap') return <Zap {...props} />;
    if (iconName === 'Flame') return <Flame {...props} />;
    if (iconName === 'Compass') return <Compass {...props} />;
    return <Activity {...props} />;
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency.includes('Critical')) {
      return (
        <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20 text-xs font-semibold uppercase tracking-wider font-mono">
          CRITICAL - DO NOT DRIVE
        </span>
      );
    }
    if (urgency.includes('High')) {
      return (
        <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 text-xs font-semibold uppercase tracking-wider font-mono">
          HIGH URGENCY
        </span>
      );
    }
    return (
      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 text-xs font-semibold uppercase tracking-wider font-mono">
        MODERATE URGENCY
      </span>
    );
  };

  return (
    <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Symptom List Left (Lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block mb-1">Diagnostic Helper</span>
            <h3 className="font-display font-bold text-2xl text-brand-dark">Troubleshoot Symptoms</h3>
            <p className="text-sm text-brand-muted mt-1">
              Identify potential mechanical issues by selecting common vehicle warning signs.
            </p>
          </div>

          <div className="space-y-2">
            {DIAGNOSTIC_DECISION_TREE.map((item) => {
              const isActive = selectedSymptomId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSymptomId(item.id)}
                  className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition duration-300 cursor-pointer ${
                    isActive
                      ? 'border-brand-amber bg-brand-amber/5 text-brand-dark shadow-md'
                      : 'border-brand-gold/20 bg-brand-gold-light/40 text-brand-muted hover:border-brand-gold/40 hover:text-brand-dark'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-brand-amber/10 border-brand-amber/30' : 'bg-white border-brand-gold/20'}`}>
                    {getIconComponent(item.iconName, isActive)}
                  </div>
                  <span className="text-sm font-semibold flex-1 leading-snug">{item.symptom}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Results Panel Right (Lg: 7 cols) */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {selectedData ? (
              <motion.div
                key={selectedData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-brand-gold-light/20 rounded-2xl border border-brand-gold/15 p-6 md:p-8 space-y-6 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  {/* Title and Urgency */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/10 pb-5">
                    <div>
                      <span className="text-xs font-mono text-brand-muted uppercase tracking-wide">Reported Symptom</span>
                      <h4 className="font-display font-extrabold text-lg text-brand-dark mt-1 leading-snug">
                        {selectedData.symptom}
                      </h4>
                    </div>
                    <div>{getUrgencyBadge(selectedData.urgency)}</div>
                  </div>

                  {/* Diagnosis */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-brand-muted uppercase tracking-wider block">Potential Cause</span>
                    <p className="text-base text-brand-dark leading-relaxed font-sans font-medium">
                      {selectedData.diagnosis}
                    </p>
                  </div>

                  {/* Technical details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-brand-gold/15">
                      <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider block mb-1">Estimated Cost Range</span>
                      <p className="font-mono font-bold text-base text-brand-amber">{selectedData.estCostRange}</p>
                      <span className="text-[10px] text-brand-muted block mt-0.5">Includes parts and certified labor</span>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-brand-gold/15">
                      <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider block mb-1">Next Action Required</span>
                      <p className="font-sans font-semibold text-sm text-brand-dark">
                        {selectedData.urgency.includes('Critical') ? 'Tow to Garage' : 'Diagnostic Inspection'}
                      </p>
                      <span className="text-[10px] text-brand-muted block mt-0.5">Prevent cumulative engine damages</span>
                    </div>
                  </div>

                  {/* Safety Alert Column if critical */}
                  {selectedData.urgency.includes('Critical') && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3 text-xs leading-relaxed text-red-700">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <span className="font-bold block mb-0.5">Engine Catastrophe Risk</span>
                        Continuing to drive with this symptom can trigger cylinder head warpage or permanent engine block cracking. Request emergency towing support.
                      </div>
                    </div>
                  )}
                </div>

                {/* Booking/Towing triggers */}
                <div className="mt-8 border-t border-brand-gold/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-emerald-500/10 text-emerald-600 p-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-brand-muted font-medium">Guaranteed original spares with verification scan</span>
                  </div>

                  {selectedData.urgency.includes('Critical') ? (
                    <button
                      onClick={onSOSClick}
                      className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber-hover text-white text-xs font-bold font-mono px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-amber/15 transition duration-300 cursor-pointer hover:-translate-y-0.5"
                    >
                      <span>Request Immediate Towing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const element = document.getElementById('garages');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber-hover text-white text-xs font-bold font-mono px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-amber/10 transition cursor-pointer"
                    >
                      <span>Book Diagnostic Check</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
