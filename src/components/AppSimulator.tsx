/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Truck, 
  Cpu, 
  ShieldCheck, 
  MapPin, 
  Smartphone, 
  Star, 
  User, 
  Clock, 
  ChevronRight, 
  QrCode, 
  CreditCard,
  Wifi,
  Battery,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

import smilingMechanicImg from '../assets/images/smiling_mechanic_tablet_1784113536332.jpg';

export default function AppSimulator() {
  const [activeScreen, setActiveScreen] = useState<'booking' | 'tracking' | 'parts' | 'payment'>('booking');
  const [eta, setEta] = useState(18);
  const [scanned, setScanned] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'pay' | 'success'>('pay');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Countdown timer for SOS Flatbed arrival simulation
  useEffect(() => {
    if (activeScreen === 'tracking' && eta > 5) {
      const interval = setInterval(() => {
        setEta(prev => prev - 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeScreen, eta]);

  return (
    <div className="border border-brand-gold/20 rounded-[32px] p-6 lg:p-10 shadow-2xl relative overflow-hidden bg-slate-100">
      {/* 95% Visible Background Image (User-requested, positioned on the left) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img 
          src={smilingMechanicImg} 
          alt="Smiling Mechanic with Tablet" 
          className="w-full h-full object-cover opacity-95 filter saturate-[1.05] brightness-[1.02] object-left-top lg:object-[15%_25%]"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant gradient overlays that keep the mechanic on the left 95% visible while maintaining text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/70 to-white/90 lg:from-white/10 lg:via-white/60 lg:to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Interactive Controller Grid */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-amber/10 border border-brand-amber/25 text-brand-amber text-xs font-mono font-bold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive App Simulator</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-dark leading-tight">
              Don’t Just Take Our Word. <span className="text-brand-amber">See How It Works.</span>
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
              Experience the core workflows of the mCarFix mobile platform. Tap the modules below to switch screens on the interactive phone mockup.
            </p>
          </div>

          {/* Selector Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            
            {/* Tab 1: Repair Booking */}
            <button
              onClick={() => { setActiveScreen('booking'); }}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                activeScreen === 'booking'
                  ? 'bg-white/95 border-brand-amber shadow-md'
                  : 'bg-white/70 backdrop-blur-[2px] border-brand-gold/15 hover:border-brand-amber/50 shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeScreen === 'booking' ? 'bg-brand-amber text-white' : 'bg-brand-gold-light text-brand-gold font-bold'}`}>
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block text-xs font-mono font-bold text-brand-gold">MODULE 01</span>
                <span className="block text-sm font-bold text-brand-dark">Transparent Mechanic Booking</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeScreen === 'booking' ? 'translate-x-1 text-brand-amber' : ''}`} />
            </button>

            {/* Tab 2: GPS Tracking */}
            <button
              onClick={() => { setActiveScreen('tracking'); }}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                activeScreen === 'tracking'
                  ? 'bg-white/95 border-brand-amber shadow-md'
                  : 'bg-white/70 backdrop-blur-[2px] border-brand-gold/15 hover:border-brand-amber/50 shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeScreen === 'tracking' ? 'bg-brand-amber text-white' : 'bg-brand-gold-light text-brand-gold font-bold'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block text-xs font-mono font-bold text-brand-gold">MODULE 02</span>
                <span className="block text-sm font-bold text-brand-dark">Live Roadside SOS GPS Tracker</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeScreen === 'tracking' ? 'translate-x-1 text-brand-amber' : ''}`} />
            </button>

            {/* Tab 3: Parts Scan */}
            <button
              onClick={() => { setActiveScreen('parts'); }}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                activeScreen === 'parts'
                  ? 'bg-white/95 border-brand-amber shadow-md'
                  : 'bg-white/70 backdrop-blur-[2px] border-brand-gold/15 hover:border-brand-amber/50 shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeScreen === 'parts' ? 'bg-brand-amber text-white' : 'bg-brand-gold-light text-brand-gold font-bold'}`}>
                <QrCode className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block text-xs font-mono font-bold text-brand-gold">MODULE 03</span>
                <span className="block text-sm font-bold text-brand-dark">OEM Spare Parts Scanner</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeScreen === 'parts' ? 'translate-x-1 text-brand-amber' : ''}`} />
            </button>

            {/* Tab 4: Secure Escrow Pay */}
            <button
              onClick={() => { setActiveScreen('payment'); }}
              className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                activeScreen === 'payment'
                  ? 'bg-white/95 border-brand-amber shadow-md'
                  : 'bg-white/70 backdrop-blur-[2px] border-brand-gold/15 hover:border-brand-amber/50 shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeScreen === 'payment' ? 'bg-brand-amber text-white' : 'bg-brand-gold-light text-brand-gold font-bold'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="block text-xs font-mono font-bold text-brand-gold">MODULE 04</span>
                <span className="block text-sm font-bold text-brand-dark">M-Pesa Escrow Safeguard</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeScreen === 'payment' ? 'translate-x-1 text-brand-amber' : ''}`} />
            </button>

          </div>
        </div>

        {/* Right Phone Mockup Canvas (Critique Item 4 & 6 & 7) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[340px] aspect-[9/19.5] bg-[#0d131f] border-[8px] border-slate-800 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            {/* Phone Top Notch / Speaker & Camera */}
            <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 flex justify-center items-center z-40">
              <div className="w-28 h-4 bg-black rounded-b-2xl flex items-center justify-between px-3 text-[10px] text-slate-400 font-sans">
                <span className="text-[9px] font-bold">09:41</span>
                <div className="w-3.5 h-1.5 bg-slate-700 rounded-full" />
                <div className="flex items-center gap-1">
                  <Wifi className="w-2.5 h-2.5" />
                  <Battery className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>

            {/* Phone App Content Frame */}
            <div className="flex-1 pt-8 px-4 pb-4 flex flex-col justify-between overflow-y-auto select-none">
              
              {/* Header inside simulated App */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-brand-amber/10 rounded border border-brand-amber/30 flex items-center justify-center text-[10px] font-black text-brand-amber">
                    m
                  </div>
                  <span className="text-xs font-extrabold text-white">mCar<span className="text-brand-amber">Fix</span> App</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-tight font-semibold">Live Server</span>
                </div>
              </div>

              {/* Dynamic screen renders */}
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  
                  {/* SCREEN 1: MECHANIC BOOKING */}
                  {activeScreen === 'booking' && (
                    <motion.div
                      key="booking"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Select Active Symptom</span>
                        
                        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-white font-bold">Toyota Fielder 1.5L</span>
                            <span className="text-[9px] font-mono text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded border border-brand-amber/20 font-bold">KDL 842Y</span>
                          </div>
                          <p className="text-[10px] text-slate-400">Selected service: <span className="text-slate-200 font-semibold">Suspension & Braking Fix</span></p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Guaranteed Max Price:</span>
                            <span className="text-brand-amber font-mono font-bold">KES 8,500</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] border-t border-slate-850/60 pt-1.5">
                            <span className="text-slate-400">Apex Auto Care Westlands:</span>
                            <span className="text-emerald-400 font-semibold font-mono">1.2 km away</span>
                          </div>
                        </div>

                        <div className="bg-brand-amber/5 border border-brand-amber/10 p-2.5 rounded-lg flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                          <p className="text-[9px] text-slate-400 leading-normal">
                            Our price guarantee covers labor and parts. If the garage quotes higher, mCarFix covers the difference.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        {bookingConfirmed ? (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-center space-y-1.5">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                            <span className="block text-[11px] font-bold text-emerald-400">Booking Confirmed!</span>
                            <span className="block text-[9px] text-slate-400 leading-tight">SMS ticket with directions sent to owner.</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setBookingConfirmed(true)}
                            className="w-full bg-brand-amber hover:bg-brand-amber-hover text-brand-dark font-mono font-bold text-xs py-3 rounded-xl cursor-pointer shadow-lg shadow-brand-amber/15 transition-all text-center uppercase tracking-wide"
                          >
                            Confirm Repair Booking
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 2: GPS DISPATCH TRACKER */}
                  {activeScreen === 'tracking' && (
                    <motion.div
                      key="tracking"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block font-bold">🚨 EMERGENCY ACTIVE</span>
                          <span className="text-[9px] font-mono text-slate-400 uppercase">Waiyaki Way, Nairobi</span>
                        </div>

                        {/* Animated Simulated Map Grid */}
                        <div className="h-28 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:10px_10px]" />
                          
                          {/* Pulsing Road Line */}
                          <div className="absolute h-1 bg-rose-500/25 w-full top-1/2 rotate-12" />
                          
                          {/* Breakdown Point */}
                          <div className="absolute top-1/3 left-1/3 z-10">
                            <span className="absolute -inset-1 bg-red-500/30 rounded-full animate-ping" />
                            <MapPin className="w-5 h-5 text-red-500" />
                          </div>

                          {/* Moving Flatbed Tow Truck Pin */}
                          <motion.div 
                            animate={{ x: [-50, 40], y: [15, -10] }} 
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="absolute z-20"
                          >
                            <div className="bg-brand-amber p-1.5 rounded-full shadow-lg border border-white">
                              <Truck className="w-3.5 h-3.5 text-brand-dark" />
                            </div>
                          </motion.div>

                          {/* Live Coordinates Accent */}
                          <div className="absolute bottom-1.5 right-1.5 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800 text-[8px] font-mono text-slate-400">
                            LAT: -1.2635 | LNG: 36.8041
                          </div>
                        </div>

                        <div className="bg-slate-900 p-2.5 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-medium">Assigned Responder:</span>
                            <span className="text-white font-bold">Kamau Dispatchers</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-medium">Flatbed Model:</span>
                            <span className="text-white font-mono text-[10px]">Isuzu FRR (KDC 741M)</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl flex items-center justify-between border border-slate-850">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase">Estimated Arrival</span>
                          <span className="block text-lg font-black text-brand-amber font-mono">{eta} MINS</span>
                        </div>
                        <a
                          href="tel:+25470000000"
                          className="bg-emerald-500 text-white font-bold text-[10px] px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-emerald-400 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Captain</span>
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 3: PARTS SCANNER */}
                  {activeScreen === 'parts' && (
                    <motion.div
                      key="parts"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">OEM Quality Scan</span>
                        
                        {/* Scanner Viewport */}
                        <div className="h-28 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
                          {scanned ? (
                            <div className="text-center space-y-1">
                              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                              <span className="text-[11px] text-white font-bold block">100% Genuine Certified</span>
                              <span className="text-[9px] text-slate-500 font-mono">ID: TOY-782419-GB</span>
                            </div>
                          ) : (
                            <div className="w-full h-full border-2 border-dashed border-brand-amber/30 rounded-xl relative flex flex-col items-center justify-center">
                              <QrCode className="w-8 h-8 text-brand-amber opacity-60" />
                              <span className="text-[9px] text-slate-500 font-mono mt-1">ALIGN PARTS BARCODE</span>
                              
                              {/* Laser Scan Line Animation */}
                              <div className="absolute w-full h-0.5 bg-brand-amber/60 top-1/2 left-0 animate-pulse" />
                            </div>
                          )}
                        </div>

                        {scanned && (
                          <div className="bg-slate-900 p-2.5 rounded-xl space-y-1 text-[10px]">
                            <div className="flex justify-between"><span className="text-slate-400">Component:</span><span className="text-white font-semibold">Subaru OEM Brake Pad Set</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Distributor:</span><span className="text-white font-semibold">Toyotsu Auto Mart Ke</span></div>
                            <div className="flex justify-between border-t border-slate-850 pt-1 mt-1"><span className="text-slate-400">Escrow Warranty:</span><span className="text-emerald-400 font-mono">6 Months Active</span></div>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setScanned(prev => !prev)}
                          className="w-full bg-slate-900 hover:bg-slate-850 text-white font-mono font-bold text-[10px] py-3 rounded-xl border border-slate-800 cursor-pointer text-center"
                        >
                          {scanned ? 'Reset Scanner' : 'Simulate Scan Code'}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 4: SAFEPAY ESCROW */}
                  {activeScreen === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-3 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Secure Repair Escrow</span>
                        
                        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400">Merchant:</span>
                            <span className="text-[11px] font-bold text-white">mCarFix Escrow Ledger</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400">Total KES:</span>
                            <span className="text-[12px] font-extrabold text-brand-amber font-mono">KES 8,500</span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl border border-brand-amber/15 bg-brand-amber/5 text-[9px] text-slate-400 leading-normal space-y-1.5">
                          <div className="flex items-center gap-1.5 text-brand-amber font-bold uppercase tracking-wider text-[8px]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Escrow Protection Active</span>
                          </div>
                          <p>
                            Your funds are deposited securely into mCarFix escrow. Funds are ONLY released to Apex Auto Care when you verify and scan the final diagnostic code upon completion.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        {paymentStep === 'success' ? (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-center space-y-1.5">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                            <span className="block text-[11px] font-bold text-emerald-400">M-Pesa Escrow Paid!</span>
                            <span className="block text-[9px] text-slate-400">Verification code sent via SMS.</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPaymentStep('success')}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-mono font-bold text-xs py-3 rounded-xl cursor-pointer shadow-lg shadow-emerald-500/15 transition-all text-center uppercase tracking-wide"
                          >
                            Pay with M-Pesa KES 8,500
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Home Indicator line */}
              <div className="mt-4 flex justify-center pt-2 border-t border-slate-900">
                <div className="w-16 h-1 bg-slate-800 rounded-full" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
