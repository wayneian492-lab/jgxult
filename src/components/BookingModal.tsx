/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Garage } from '../types';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  garage: Garage | null;
  onClose: () => void;
}

export default function BookingModal({ garage, onClose }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('09:00');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!garage) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !serviceDate) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-white border border-brand-gold/20 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-dark bg-brand-gold-light/40 border border-brand-gold/15 p-2 rounded-xl hover:bg-brand-gold-light/80 cursor-pointer transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {!bookingConfirmed ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-brand-amber uppercase tracking-wider block mb-1">Schedule Appointment</span>
              <h3 className="font-display font-extrabold text-2xl text-brand-dark">Book: {garage.name}</h3>
              <p className="text-xs text-brand-muted flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-brand-muted shrink-0" />
                <span>{garage.address}</span>
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wayne Kipkemboi"
                  className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
                />
              </div>

              {/* Phone (Specific to Kenya format) */}
              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">M-Pesa / Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0712 345 678"
                  className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={serviceDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full bg-white border border-brand-gold/25 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-amber transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">Preferred Time</label>
                  <select
                    value={serviceTime}
                    onChange={(e) => setServiceTime(e.target.value)}
                    className="w-full bg-white border border-brand-gold/25 rounded-xl px-3 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-amber transition-colors"
                  >
                    <option value="08:00">08:00 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl flex items-center gap-2.5 text-xs text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified partner guarantee. No pre-payment is required!</span>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-amber hover:bg-brand-amber-hover text-white font-mono font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-amber/15 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Appointment Booking</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-brand-dark">Booking Confirmed!</h3>
              <p className="text-sm text-brand-muted max-w-sm mx-auto">
                Your appointment has been successfully scheduled with <span className="text-brand-dark font-semibold">{garage.name}</span>.
              </p>
            </div>

            <div className="bg-brand-gold-light/20 rounded-2xl p-5 border border-brand-gold/15 max-w-sm mx-auto space-y-3 text-left text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-brand-muted">APPOINTMENT DATE:</span>
                <span className="text-brand-dark font-bold">{serviceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">CONFIRMED TIME:</span>
                <span className="text-brand-dark font-bold">{serviceTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">M-PESA ALERTS FOR:</span>
                <span className="text-brand-dark font-bold">{phone}</span>
              </div>
              <div className="flex justify-between border-t border-brand-gold/15 pt-3 text-[10px] text-brand-muted font-semibold leading-relaxed">
                <span>✓ A confirmation SMS with the mechanic details has been dispatched.</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-white hover:bg-brand-gold-light/60 border border-brand-gold/20 text-brand-dark font-mono text-xs font-bold py-3 px-6 rounded-xl cursor-pointer transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
