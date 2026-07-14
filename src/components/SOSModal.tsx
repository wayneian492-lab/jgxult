/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Navigation, Phone, CheckCircle2, Truck, Activity, Bell } from 'lucide-react';

interface SOSModalProps {
  onClose: () => void;
}

export default function SOSModal({ onClose }: SOSModalProps) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Nairobi Westlands');
  const [issue, setIssue] = useState('towing');
  const [carDetails, setCarDetails] = useState('');
  const [eta, setEta] = useState(25);

  // Simulate an ETA countdown once dispatched
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setEta((prev) => (prev > 1 ? prev - 1 : 1));
      }, 30000); // countdown simulation
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !location) return;
    
    // Switch to step 2: "Scanning for nearby responders..."
    setStep(2);
    
    // Automatically transition to step 3: "Partner Dispatched!" after 3 seconds
    setTimeout(() => {
      setStep(3);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-white border border-brand-gold/20 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-dark bg-brand-gold-light/40 border border-brand-gold/15 p-2 rounded-xl hover:bg-brand-gold-light/80 cursor-pointer transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleDispatch}
              className="p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="bg-brand-amber/10 text-brand-amber p-2.5 rounded-xl border border-brand-amber/30">
                  <ShieldAlert className="w-6 h-6 animate-pulse text-brand-amber" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-brand-amber uppercase tracking-widest block">EMERGENCY ASSISTANCE</span>
                  <h3 className="font-display font-extrabold text-xl text-brand-dark">24/7 Roadside dispatch</h3>
                </div>
              </div>

              <div className="space-y-4">
                {/* Contact phone */}
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0722 000 000"
                    className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Your Current Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Near Thika Road Mall, Westlands, etc."
                    className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>

                {/* Vehicle Model & Plate */}
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Car Model & Registration</label>
                  <input
                    type="text"
                    required
                    value={carDetails}
                    onChange={(e) => setCarDetails(e.target.value)}
                    placeholder="e.g. White Subaru KDC 567Y"
                    className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>

                {/* Emergency Issue Type */}
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-2">Issue Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'towing', label: 'Towing Service' },
                      { id: 'battery', label: 'Battery Jumpstart' },
                      { id: 'tyre', label: 'Puncture / Flat Tyre' },
                      { id: 'mechanical', label: 'Mechanical Failure' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIssue(item.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          issue === item.id
                            ? 'border-brand-amber bg-brand-amber/10 text-brand-amber font-extrabold'
                            : 'border-brand-gold/20 bg-brand-gold-light/40 text-brand-muted hover:border-brand-gold/40 hover:text-brand-dark'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-brand-amber/5 border border-brand-amber/15 rounded-xl text-[11px] leading-relaxed text-amber-800 flex gap-2">
                <ShieldAlert className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                <p>
                  Dispatchers will call you within 90 seconds to verify coordinates and lock-in dispatch. Zero dispatch fee for active subscribers.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-amber hover:bg-brand-amber-hover text-white font-mono font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-amber/15 transition-all hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4 animate-pulse" />
                <span>Confirm Dispatch SOS</span>
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center space-y-8 py-16"
            >
              {/* Radar Simulation Animation */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-brand-amber/10 animate-ping" />
                <span className="absolute inset-4 rounded-full bg-brand-amber/20 animate-ping border border-brand-amber/30" />
                <div className="bg-brand-amber text-white p-4 rounded-full border border-white/20 shadow-xl relative z-10">
                  <Activity className="w-10 h-10 animate-pulse text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-brand-dark">Scanning for Responders...</h3>
                <p className="text-xs text-brand-muted max-w-xs mx-auto">
                  Locating verified flatbed towing partners and mobile mechanics within 5 km of <span className="text-brand-dark font-bold">{location}</span>.
                </p>
              </div>

              <div className="font-mono text-[10px] text-brand-muted flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-ping" />
                <span>Triangulating telemetry signals...</span>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center space-y-6"
            >
              <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-emerald-500/20">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-brand-dark">Emergency Dispatch Active!</h3>
                <p className="text-sm text-brand-muted max-w-sm mx-auto">
                  The flatbed responder from <span className="text-brand-dark font-semibold">Nairobi Tow Experts</span> has been dispatched to your location.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto bg-brand-gold-light/20 p-4 rounded-2xl border border-brand-gold/15 text-left">
                <div>
                  <span className="text-[10px] font-mono text-brand-muted uppercase block">ESTIMATED ETA:</span>
                  <span className="font-mono font-bold text-lg text-brand-amber">{eta} Mins</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-muted uppercase block">VEHICLE ROUTED:</span>
                  <span className="font-mono font-bold text-sm text-brand-dark">{carDetails || 'Your Vehicle'}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-[11px] text-brand-muted max-w-sm mx-auto text-left leading-relaxed font-medium">
                <Bell className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The driver will call you on <span className="text-brand-dark font-semibold">{phone}</span> as they clear Thika Road highway. Stay safe!</span>
              </div>

              <button
                onClick={onClose}
                className="bg-white hover:bg-brand-gold-light/60 border border-brand-gold/20 text-brand-dark font-mono text-xs font-bold py-3 px-6 rounded-xl cursor-pointer transition-colors"
              >
                Dismiss Tracking Screen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
