/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Calendar, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface CarProfile {
  id: string;
  model: string;
  plate: string;
  nextServiceType: string;
  dueDate: string;
  notified: boolean;
}

export default function MaintenanceReminder() {
  const [profiles, setProfiles] = useState<CarProfile[]>([]);
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [serviceType, setServiceType] = useState('Full Service');
  const [monthsAhead, setMonthsAhead] = useState('3');
  const [successMsg, setSuccessMsg] = useState('');

  // Initial load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mcarfix_profiles');
    if (saved) {
      try {
        setProfiles(JSON.parse(saved));
      } catch (e) {
        // use fallback if parse fail
      }
    } else {
      // Seed initial dummy profile
      const seed: CarProfile[] = [
        {
          id: 'seed-1',
          model: 'Toyota Rav4',
          plate: 'KDC 789B',
          nextServiceType: 'Brake Fluid Flush',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
          notified: false,
        },
      ];
      setProfiles(seed);
      localStorage.setItem('mcarfix_profiles', JSON.stringify(seed));
    }
  }, []);

  // Save updates to localStorage
  const saveProfiles = (updated: CarProfile[]) => {
    setProfiles(updated);
    localStorage.setItem('mcarfix_profiles', JSON.stringify(updated));
  };

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !plate.trim()) return;

    // Calculate due date
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + parseInt(monthsAhead));
    const formattedDate = targetDate.toISOString().split('T')[0];

    const newProfile: CarProfile = {
      id: `car-${Date.now()}`,
      model: model.trim(),
      plate: plate.toUpperCase().trim(),
      nextServiceType: serviceType,
      dueDate: formattedDate,
      notified: false,
    };

    const updated = [newProfile, ...profiles];
    saveProfiles(updated);

    // Clear inputs
    setModel('');
    setPlate('');
    setSuccessMsg(`Reminder scheduled successfully for ${newProfile.model}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDeleteProfile = (id: string) => {
    const updated = profiles.filter((p) => p.id !== id);
    saveProfiles(updated);
  };

  const handleRequestTestNotification = (profile: CarProfile) => {
    // Simulate setting up an alert
    const updated = profiles.map((p) => {
      if (p.id === profile.id) {
        return { ...p, notified: true };
      }
      return p;
    });
    saveProfiles(updated);
    setSuccessMsg(`SMS alert configured on ${profile.dueDate} for vehicle ${profile.plate}!`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  // Check if dates are close
  const isClose = (dateStr: string) => {
    const diffTime = new Date(dateStr).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };

  return (
    <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form panel Left (Lg: 5 cols) */}
        <form onSubmit={handleAddProfile} className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block mb-1">Interactive Tool</span>
            <h3 className="font-display font-bold text-2xl text-brand-dark">Maintenance Reminders</h3>
            <p className="text-sm text-brand-muted mt-1">
              Add your vehicle registration details and receive notifications before your oil, tyres, or insurance expires.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Car Make / Model</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Subaru Forester, Mazda Demio"
                className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Plate Number</label>
                <input
                  type="text"
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder="e.g. KDL 234G"
                  className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber uppercase transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Alert Interval</label>
                <select
                  value={monthsAhead}
                  onChange={(e) => setMonthsAhead(e.target.value)}
                  className="w-full bg-white border border-brand-gold/25 rounded-xl px-3 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-amber transition-colors"
                >
                  <option value="1">1 Month (Urgent)</option>
                  <option value="3">3 Months (Medium)</option>
                  <option value="6">6 Months (Standard)</option>
                  <option value="12">1 Year (Annual)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Service Type</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-white border border-brand-gold/25 rounded-xl px-3 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-amber transition-colors"
              >
                <option value="Engine Oil & Filters">Engine Oil & Filters Change</option>
                <option value="Brake System Tune-up">Brake System Tune-up</option>
                <option value="Suspension & Wheel Alignment">Suspension & Wheel Alignment</option>
                <option value="NTSA Motor Insurance Renewal">NTSA Motor Insurance Renewal</option>
                <option value="Comprehensive Car Wash Detailing">Comprehensive Car Wash Detailing</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-amber hover:bg-brand-amber-hover text-white font-mono font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-amber/10 transition hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Active Reminder</span>
          </button>

          {/* Toast Msg */}
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-700"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <p>{successMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Saved Reminders list Right (Lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-brand-gold/10 pb-3">
            <h4 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-amber" />
              <span>Your Registered Vehicles ({profiles.length})</span>
            </h4>
            <span className="text-[10px] font-mono text-brand-muted">SAVED LOCALLY</span>
          </div>

          <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {profiles.length > 0 ? (
                profiles.map((profile) => {
                  const urgent = isClose(profile.dueDate);
                  return (
                    <motion.div
                      key={profile.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition duration-300 ${
                        urgent 
                          ? 'bg-brand-amber/5 border-brand-amber/30' 
                          : 'bg-brand-gold-light/20 border-brand-gold/15 hover:bg-brand-gold-light/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-display font-bold text-sm text-brand-dark">{profile.model}</span>
                          <span className="bg-brand-gold-light text-brand-dark font-mono text-[10px] px-2 py-0.5 rounded border border-brand-gold/15 font-semibold uppercase">
                            {profile.plate}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-muted">
                          <span className="font-medium text-brand-dark">{profile.nextServiceType}</span>
                          <span className="text-brand-muted">•</span>
                          <span className="flex items-center gap-1 font-mono">
                            Due: <span className="font-bold text-brand-dark">{profile.dueDate}</span>
                          </span>
                        </div>
                        
                        {urgent && (
                          <div className="flex items-center gap-1.5 text-[10px] text-brand-amber bg-brand-amber/5 border border-brand-amber/20 px-2 py-0.5 rounded-md mt-1.5 w-max">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Due within 30 days</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-brand-gold/10 pt-3 sm:pt-0">
                        <button
                          onClick={() => handleRequestTestNotification(profile)}
                          className={`flex-1 sm:flex-none text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            profile.notified
                              ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                              : 'bg-white hover:bg-brand-gold-light/60 text-brand-dark border border-brand-gold/20'
                          }`}
                        >
                          <Bell className={`w-3.5 h-3.5 ${profile.notified ? 'text-emerald-600' : 'animate-bounce text-brand-amber'}`} />
                          <span>{profile.notified ? 'Alert Configured' : 'Get SMS Alert'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="p-2 bg-white hover:bg-rose-500/10 border border-brand-gold/20 hover:border-rose-500/30 text-brand-muted hover:text-rose-600 rounded-lg transition cursor-pointer"
                          title="Delete profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-10 border border-dashed border-brand-gold/20 rounded-2xl bg-brand-gold-light/10">
                  <Bell className="w-7 h-7 text-brand-gold mx-auto mb-2" />
                  <p className="text-xs text-brand-muted">No active vehicles registered for service schedules.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
