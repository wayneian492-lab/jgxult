import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const NAIROBI_POINTS = [
  { name: 'Westlands Hub', position: { lat: -1.2635, lng: 36.8037 }, color: '#ff5e00' },
  { name: 'Ind. Area Hub', position: { lat: -1.3120, lng: 36.8450 }, color: '#10b981' },
  { name: 'Ngong Road Hub', position: { lat: -1.3005, lng: 36.7825 }, color: '#c5a85c' },
];

import { 
  Activity, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  Database, 
  Smartphone, 
  Lock, 
  CheckCircle2, 
  Server,
  ArrowRight,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';
import redAudiHud from '../assets/images/red_audi_hud_1783926323190.jpg';

type TabId = 'cad' | 'telemetry' | 'escrow';

export default function InteractiveHUD() {
  const [activeTab, setActiveTab] = useState<TabId>('cad');
  const [telemetryPulse, setTelemetryPulse] = useState(0);
  const [escrowStep, setEscrowStep] = useState(1);
  const [selectedSensor, setSelectedSensor] = useState<string>('Engine ECU');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Simulated live diagnostic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryPulse(p => (p + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Listen for Escape key to close expanded view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sensors = [
    { name: 'Engine ECU', status: 'Optimal', temp: '92°C', pressure: '4.2 Bar', code: 'P0101-OK' },
    { name: 'Radar Sensor', status: 'Active', temp: '29°C', pressure: 'N/A', code: 'R0120-OK' },
    { name: 'LED Headlights', status: 'Normal', temp: '40°C', pressure: 'N/A', code: 'L0440-OK' },
    { name: 'Brake Caliper', status: 'Optimal', temp: '78°C', pressure: '85 Bar', code: 'B0215-OK' },
    { name: 'ADAS Camera', status: 'Active', temp: '32°C', pressure: 'N/A', code: 'A0302-OK' },
    { name: 'Transmission TCU', status: 'Optimal', temp: '81°C', pressure: '2.8 Bar', code: 'T0402-OK' },
    { name: 'Airbags SRS', status: 'Active', temp: '24°C', pressure: 'N/A', code: 'S0012-OK' },
    { name: 'Fuel System', status: 'Optimal', temp: '45°C', pressure: '140 Bar', code: 'F0812-OK' },
    { name: 'ABS Controller', status: 'Optimal', temp: '48°C', pressure: '120 Bar', code: 'C0220-OK' },
    { name: 'Tail Lights', status: 'Normal', temp: '34°C', pressure: 'N/A', code: 'L0512-OK' },
  ];

  const currentSensorData = sensors.find(s => s.name === selectedSensor) || sensors[0];

  if (isMinimized) {
    return (
      <motion.div
        layoutId="interactive-hud-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="w-full max-w-[340px] mx-auto lg:ml-auto"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full bg-[#0a0d1a] border border-brand-gold/25 hover:border-brand-amber/80 rounded-2xl p-4 flex items-center gap-4 transition duration-200 cursor-pointer text-left shadow-[0_0_20px_rgba(197,168,92,0.06)] hover:shadow-[0_0_30px_rgba(255,94,0,0.15)] select-none group relative overflow-hidden"
          title="Click to expand Interactive Telemetry HUD"
        >
          {/* Holographic glowing grid lines */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ 
                 backgroundImage: `radial-gradient(circle, #c5a85c 1px, transparent 1px)`, 
                 backgroundSize: '12px 12px' 
               }} 
          />
          
          {/* Radar pulsing ring with a small red car mini thumbnail */}
          <div className="relative w-12 h-12 bg-black/60 rounded-xl border border-brand-gold/20 flex items-center justify-center shrink-0 overflow-hidden">
            {/* Pulsing ring */}
            <div className="absolute inset-1 rounded-full border border-brand-amber/30 animate-ping opacity-75" />
            {/* Subtle radar sweep */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-brand-amber/15 to-transparent animate-spin" style={{ animationDuration: '3s' }} />
            
            <img 
              src={redAudiHud} 
              alt="HUD thumbnail" 
              className="w-9 h-9 object-contain relative z-10 opacity-90 group-hover:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
              <span className="text-[8px] font-mono tracking-widest text-brand-gold font-bold uppercase">M-HUD // ACTIVE</span>
            </div>
            <h4 className="font-display font-extrabold text-xs text-white mt-0.5 uppercase tracking-tight">
              Interactive CAD HUD
            </h4>
            <span className="text-[10px] font-mono text-brand-muted block mt-0.5 group-hover:text-brand-amber transition-colors">
              TAP TO EXPAND HUD ✦
            </span>
          </div>

          {/* Expand Indicator Icon */}
          <div className="text-brand-gold group-hover:text-brand-amber transition-colors shrink-0">
            <Maximize2 className="w-4 h-4" />
          </div>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId="interactive-hud-wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="w-full bg-white border border-brand-gold/20 shadow-2xl rounded-3xl overflow-hidden font-sans relative"
    >
      {/* HUD Header with Autodesk drafting layout style */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between gap-3 border-b border-brand-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,168,92,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-amber animate-ping shrink-0" />
            <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase truncate">mCarFix Live Control HUD</span>
          </div>
          <h3 className="font-display font-extrabold text-sm sm:text-lg text-white mt-0.5 tracking-tight truncate">Digital Automotive Ecosystem</h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-brand-gold/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
            <Server className="w-3.5 h-3.5 text-brand-amber" />
            <span>SYS_STATUS: ACTIVE</span>
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/15 hover:from-orange-500/25 hover:to-red-600/30 border border-orange-500/30 hover:border-orange-500/70 text-orange-400 hover:text-orange-200 transition duration-200 flex items-center justify-center cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.15)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] select-none group shrink-0"
            title="Minimize / Close HUD"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300 text-orange-400 group-hover:text-orange-300" />
          </button>
        </div>
      </div>

      {/* Modern Slim Engineering Tabs */}
      <div className="grid grid-cols-3 border-b border-brand-gold/15 bg-brand-gold-light/40 font-mono text-[11px] font-semibold text-brand-muted text-center">
        <button
          onClick={() => setActiveTab('cad')}
          className={`py-3.5 px-2 border-r border-brand-gold/15 transition cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeTab === 'cad'
              ? 'bg-white text-brand-amber font-extrabold shadow-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-amber'
              : 'hover:bg-white/40 hover:text-brand-dark'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">01 //</span> CAD DIAGNOSTIC
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`py-3.5 px-2 border-r border-brand-gold/15 transition cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeTab === 'telemetry'
              ? 'bg-white text-brand-amber font-extrabold shadow-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-amber'
              : 'hover:bg-white/40 hover:text-brand-dark'
          }`}
        >
          <Activity className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">02 //</span> GARAGE HUD
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          className={`py-3.5 px-2 transition cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
            activeTab === 'escrow'
              ? 'bg-white text-brand-amber font-extrabold shadow-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-amber'
              : 'hover:bg-white/40 hover:text-brand-dark'
          }`}
        >
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">03 //</span> ESCROW LEDGER
        </button>
      </div>

      {/* Main Content Pane */}
      <div className="p-6 h-[380px] bg-white relative overflow-hidden flex flex-col justify-between">
        
        {/* Underlay drafting grid paper texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(circle, #c5a85c 1px, transparent 1px)`, 
               backgroundSize: '16px 16px' 
             }} 
        />

        <AnimatePresence mode="wait">
          {activeTab === 'cad' && (
            <motion.div
              key="cad"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-between space-y-4"
            >
              {/* Interactive Vector CAD car chassis sketch */}
              <div className="relative flex-1 bg-zinc-950 border border-brand-gold/20 rounded-2xl p-0 flex flex-col items-center justify-center overflow-hidden min-h-[250px] shadow-inner">
                <div className="absolute top-3 left-3 text-[10px] font-mono text-brand-gold bg-brand-dark/95 border border-brand-gold/20 px-2 py-0.5 rounded-md font-bold z-10 shadow">
                  VECTOR_RENDER // ENGINE_Z_AXIS
                </div>

                {/* Compact view Expand Button */}
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="absolute top-3 right-3 text-[9px] font-mono text-brand-gold bg-brand-dark/95 border border-brand-gold/25 hover:border-brand-amber hover:text-white px-2 py-1 rounded-md font-bold z-30 shadow flex items-center gap-1.5 transition duration-200 cursor-pointer"
                  title="Expand to Detailed Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-brand-amber" />
                  <span>EXPAND DETAILED VIEW</span>
                </button>

                {/* Full-size container that takes 100% of the box, with high-tech dark background */}
                <div className="relative w-full h-full min-h-[250px] flex items-center justify-center p-4 bg-zinc-950">
                  
                  {/* Red Audi Sedan CAD Model Image - changed object-cover to object-contain so car fits completely without cropping */}
                  <img 
                    src={redAudiHud} 
                    alt="Red Sport Sedan CAD Model" 
                    className="w-full h-full max-h-[230px] object-contain opacity-95 select-none transition duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark elegant overlay tint so text tags pop out clearly */}
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                  {/* Interactive Tags overlaying the car parts - clean, well-spaced, compact tags that do not clutter */}
                  <div className="absolute inset-0 z-20">
                    
                    {/* Tag 1: Radar Sensor */}
                    <button 
                      onClick={() => setSelectedSensor('Radar Sensor')}
                      style={{ left: '10%', top: '65%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Radar Sensor'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Radar Sensor' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">1. Radar</span>
                    </button>

                    {/* Tag 2: LED Headlights */}
                    <button 
                      onClick={() => setSelectedSensor('LED Headlights')}
                      style={{ left: '14%', top: '51%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'LED Headlights'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'LED Headlights' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">2. LED</span>
                    </button>

                    {/* Tag 3: Engine ECU */}
                    <button 
                      onClick={() => setSelectedSensor('Engine ECU')}
                      style={{ left: '26%', top: '46%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Engine ECU'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Engine ECU' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">3. ECU</span>
                    </button>

                    {/* Tag 4: Brake Caliper */}
                    <button 
                      onClick={() => setSelectedSensor('Brake Caliper')}
                      style={{ left: '30%', top: '72%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Brake Caliper'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Brake Caliper' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">4. Brake</span>
                    </button>

                    {/* Tag 5: ADAS Camera */}
                    <button 
                      onClick={() => setSelectedSensor('ADAS Camera')}
                      style={{ left: '46%', top: '30%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'ADAS Camera'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'ADAS Camera' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">5. ADAS</span>
                    </button>

                    {/* Tag 6: Transmission TCU */}
                    <button 
                      onClick={() => setSelectedSensor('Transmission TCU')}
                      style={{ left: '46%', top: '65%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Transmission TCU'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Transmission TCU' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">6. TCU</span>
                    </button>

                    {/* Tag 7: Airbags SRS */}
                    <button 
                      onClick={() => setSelectedSensor('Airbags SRS')}
                      style={{ left: '58%', top: '38%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Airbags SRS'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Airbags SRS' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">7. SRS</span>
                    </button>

                    {/* Tag 8: Fuel System */}
                    <button 
                      onClick={() => setSelectedSensor('Fuel System')}
                      style={{ left: '68%', top: '66%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Fuel System'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Fuel System' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">8. Fuel</span>
                    </button>

                    {/* Tag 9: ABS Controller */}
                    <button 
                      onClick={() => setSelectedSensor('ABS Controller')}
                      style={{ left: '78%', top: '70%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'ABS Controller'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'ABS Controller' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">9. ABS</span>
                    </button>

                    {/* Tag 10: Tail Lights */}
                    <button 
                      onClick={() => setSelectedSensor('Tail Lights')}
                      style={{ left: '88%', top: '48%' }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded border shadow-md font-sans transition duration-200 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                        selectedSensor === 'Tail Lights'
                          ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-1 ring-brand-amber/40 shadow-brand-amber/10'
                          : 'bg-white/95 text-brand-dark/95 border-brand-gold/20 hover:border-brand-amber hover:bg-white text-opacity-90'
                      }`}
                    >
                      <span className={`w-1 h-1 rounded-full ${selectedSensor === 'Tail Lights' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-extrabold text-[6.5px] sm:text-[8px] tracking-tight">10. Tail</span>
                    </button>

                  </div>

                </div>

                {/* Radar sweep animation */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand-amber/15 to-transparent animate-pulse pointer-events-none transform -skew-x-12 translate-x-full" 
                     style={{ animationDuration: '4s' }} />

                {/* Micro instructions */}
                <div className="absolute bottom-3 right-3 text-[10px] font-mono font-semibold text-brand-gold bg-brand-dark/95 border border-brand-gold/20 px-2.5 py-0.5 rounded-md z-10 shadow">
                  ✦ Click parts tags to inspect telemetry
                </div>
              </div>

              {/* Live Technical Metadata Block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-brand-gold-light p-3.5 border border-brand-gold/15 rounded-xl">
                <div>
                  <span className="text-[9px] font-mono text-brand-muted uppercase block">NODE SELECT</span>
                  <span className="text-xs font-bold text-brand-dark font-mono">{currentSensorData.name}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-brand-muted uppercase block">DIAGNOSTIC STATUS</span>
                  <span className="text-xs font-extrabold text-emerald-600 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {currentSensorData.status}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-brand-muted uppercase block">SYS PARAMETERS</span>
                  <span className="text-xs font-bold text-brand-dark font-mono">
                    {currentSensorData.temp} / {currentSensorData.pressure}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-brand-muted uppercase block">SYS_OBD2_CODE</span>
                  <span className="text-xs font-bold text-brand-amber font-mono">{currentSensorData.code}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-between space-y-4"
            >
              {/* Simulated Garage Telemetry Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {/* Visual Nairobi Map Grid Sim */}
                <div className="bg-brand-gold-light/40 border border-brand-gold/15 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="text-[9px] font-mono text-brand-gold font-bold mb-2">
                    GEOLOCATION_MATRIX // NAIROBI_CORRIDOR
                  </div>
                  
                  {/* Realistic Interactive Google Map */}
                  {hasValidKey ? (
                    <div className="relative w-full h-40 bg-zinc-100 border border-brand-gold/15 rounded-xl overflow-hidden shadow-inner">
                      <APIProvider apiKey={API_KEY} version="weekly">
                        <Map
                          defaultCenter={{ lat: -1.2921, lng: 36.8219 }}
                          defaultZoom={11}
                          mapId="DEMO_MAP_ID"
                          gestureHandling={'cooperative'}
                          disableDefaultUI={true}
                          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                          style={{ width: '100%', height: '100%' }}
                        >
                          {NAIROBI_POINTS.map((pt, i) => (
                            <AdvancedMarker key={i} position={pt.position} title={pt.name}>
                              <Pin background={pt.color} glyphColor="#fff" borderColor="#fff" />
                            </AdvancedMarker>
                          ))}
                        </Map>
                      </APIProvider>
                    </div>
                  ) : (
                    <div className="relative w-full h-40 bg-zinc-900 border border-brand-gold/10 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 text-center shadow-inner group">
                      {/* Grid overlay for Blueprint feel */}
                      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#c5a85c_1px,transparent_1px),linear-gradient(to_bottom,#c5a85c_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
                      
                      <div className="z-10 space-y-1.5 max-w-[280px]">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-amber/15 border border-brand-amber/30 text-brand-amber text-[8px] font-mono font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
                          <span>Google Maps Integration</span>
                        </div>
                        <h4 className="text-[11px] font-extrabold text-white leading-tight font-display tracking-tight">Nairobi Real-Time Corridor</h4>
                        <p className="text-[9px] text-zinc-400 leading-normal">
                          Paste your API key in <strong>Settings ⚙️ (top-right)</strong> → <strong>Secrets</strong> as <code>GOOGLE_MAPS_PLATFORM_KEY</code> to enable live navigation immediately.
                        </p>
                        <a 
                          href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block text-[9px] font-mono font-bold text-brand-gold hover:text-brand-amber underline transition-colors"
                        >
                          Get API Key ↗
                        </a>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] font-mono text-brand-muted mt-2 text-right">
                    GPS SATELLITES LOCKED // COMPASS: 1.04"S, 36.8"E
                  </p>
                </div>

                {/* Telemetry live stats feed */}
                <div className="space-y-3">
                  <div className="bg-brand-gold-light border border-brand-gold/15 p-3 rounded-xl flex items-start gap-3">
                    <div className="bg-brand-amber/10 text-brand-amber p-1.5 rounded-lg border border-brand-amber/25">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-brand-muted uppercase block">Active Dispatch Unit</span>
                      <span className="text-xs font-bold text-brand-dark block">Westlands Mobile Responder</span>
                      <span className="text-[10px] font-mono text-emerald-600 mt-0.5 block">Response Time: 12.4 Mins (Avg)</span>
                    </div>
                  </div>

                  <div className="bg-brand-gold-light border border-brand-gold/15 p-3 rounded-xl flex items-start gap-3">
                    <div className="bg-emerald-500/10 text-emerald-600 p-1.5 rounded-lg border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-brand-muted uppercase block">Anti-Counterfeit Spares</span>
                      <span className="text-xs font-bold text-brand-dark block">RFID Spare Verification Engine</span>
                      <span className="text-[10px] font-mono text-brand-gold font-bold mt-0.5 block">Scan Ledger: SECURE_CHAIN_OK</span>
                    </div>
                  </div>

                  <div className="bg-brand-gold-light border border-brand-gold/15 p-3 rounded-xl flex items-start gap-3">
                    <div className="bg-brand-gold-light text-brand-dark p-1.5 rounded-lg border border-brand-gold/20">
                      <Smartphone className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-brand-muted uppercase block">Connected Car Clients</span>
                      <span className="text-xs font-bold text-brand-dark block">Nairobi Hub Connected Gateways</span>
                      <span className="text-[10px] font-mono text-brand-amber font-bold mt-0.5 block">Active Sessions: 4,512 Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'escrow' && (
            <motion.div
              key="escrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-between space-y-4"
            >
              {/* Interactive Escrow Workflow Tracker */}
              <div className="space-y-4 flex-1">
                <div className="text-[9px] font-mono text-brand-gold font-bold">
                  TRANSACTION CONTRACT ENGINE // MPESA_ESCROW_CHANNEL_01
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { step: 1, label: '01. Hold Fund', desc: 'Secure Escrow Lock' },
                    { step: 2, label: '02. Verify Spares', desc: 'RFID Validation Scan' },
                    { step: 3, label: '03. Release Fund', desc: 'Sign-off Disbursement' },
                  ].map((s) => {
                    const isPassed = escrowStep >= s.step;
                    const isCurrent = escrowStep === s.step;
                    return (
                      <button
                        key={s.step}
                        onClick={() => setEscrowStep(s.step)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                          isCurrent 
                            ? 'bg-brand-amber/5 border-brand-amber shadow-md' 
                            : isPassed 
                            ? 'bg-emerald-500/5 border-emerald-500/30' 
                            : 'bg-brand-gold-light/40 border-brand-gold/15'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-[9px] font-mono font-extrabold tracking-tight ${isCurrent ? 'text-brand-amber' : isPassed ? 'text-emerald-600' : 'text-brand-muted'}`}>
                            {s.label}
                          </span>
                          {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] font-bold text-brand-dark leading-tight">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Workflow Simulation Details */}
                <div className="bg-brand-gold-light/40 border border-brand-gold/15 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-brand-muted uppercase block">ACTIVE CONTRACT STATUS</span>
                    <p className="text-xs text-brand-dark font-sans leading-relaxed">
                      {escrowStep === 1 && "Funds locked on booking inside verified KCB/M-Pesa Escrow Wallet. Mechanic commences work with payment guaranteed."}
                      {escrowStep === 2 && "Mechanic scans spare parts packaging RFID via mCarFix app. System validates authentic OEM codes against supplier ledger."}
                      {escrowStep === 3 && "Customer approves completed work on client app. Funds are automatically routed from escrow to mechanic's payout wallet."}
                    </p>
                  </div>

                  <div className="bg-white border border-brand-gold/15 p-3 rounded-xl font-mono text-[10px] text-brand-dark shrink-0 w-full sm:w-auto">
                    <div className="flex justify-between gap-4 mb-1">
                      <span className="text-brand-muted uppercase">WALLET:</span>
                      <span className="font-bold text-brand-amber">KES 14,500</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-brand-muted uppercase">CONTRACT:</span>
                      <span className="font-bold text-emerald-600">VERIFIED ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info line */}
        <div className="border-t border-brand-gold/10 pt-3 mt-4 flex items-center justify-between gap-4 text-[10px] font-mono text-brand-muted">
          <span>HUD TERMINAL v4.11 // COMPILED SECURE</span>
          <span className="text-brand-gold font-bold">100% RELIABILITY IN EAST AFRICA</span>
        </div>
      </div>

      {/* Expanded Detailed CAD View Modal with 10 accurate well-spaced name tags */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#04060d]/95 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-zinc-950 border-2 border-brand-gold/30 rounded-3xl overflow-hidden flex flex-col p-5 sm:p-8 shadow-[0_0_50px_rgba(197,168,92,0.15)]"
            >
              {/* Engineering Blueprint grid lines */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                   style={{ 
                     backgroundImage: `radial-gradient(circle, #c5a85c 1.5px, transparent 1.5px)`, 
                     backgroundSize: '24px 24px' 
                   }} 
              />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-brand-gold/15 pb-4 mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold uppercase">DETAILED VIRTUAL WORKSTATION</span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1 tracking-tight">
                    10-Node Chassis Telemetry Diagram
                  </h3>
                </div>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full bg-brand-dark/80 border border-brand-gold/30 text-brand-gold hover:text-white hover:border-brand-amber transition cursor-pointer shadow-lg z-10"
                  aria-label="Close detailed view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Frame with 10 exact clean well-spaced tags */}
              <div className="relative flex-1 bg-black/40 border border-brand-gold/15 rounded-2xl flex items-center justify-center p-6 md:p-12 overflow-hidden min-h-[320px] md:min-h-[420px] shadow-inner">
                {/* Tech scan lines */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent animate-bounce pointer-events-none" style={{ animationDuration: '6s' }} />
                
                <img 
                  src={redAudiHud} 
                  alt="Red Sport Sedan CAD Model Detailed View" 
                  className="w-full h-auto max-h-[380px] object-contain opacity-95 select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Darker contrast layer */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Expanded Tags */}
                <div className="absolute inset-0 z-20">
                  {/* Tag 1: Radar Sensor */}
                  <button 
                    onClick={() => setSelectedSensor('Radar Sensor')}
                    style={{ left: '10%', top: '65%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Radar Sensor'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Radar Sensor' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">1. Radar Sensor</span>
                  </button>

                  {/* Tag 2: LED Headlights */}
                  <button 
                    onClick={() => setSelectedSensor('LED Headlights')}
                    style={{ left: '14%', top: '51%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'LED Headlights'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'LED Headlights' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">2. LED Headlights</span>
                  </button>

                  {/* Tag 3: Engine ECU */}
                  <button 
                    onClick={() => setSelectedSensor('Engine ECU')}
                    style={{ left: '26%', top: '46%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Engine ECU'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Engine ECU' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">3. Engine ECU</span>
                  </button>

                  {/* Tag 4: Brake Caliper */}
                  <button 
                    onClick={() => setSelectedSensor('Brake Caliper')}
                    style={{ left: '30%', top: '72%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Brake Caliper'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Brake Caliper' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">4. Brake Caliper</span>
                  </button>

                  {/* Tag 5: ADAS Camera */}
                  <button 
                    onClick={() => setSelectedSensor('ADAS Camera')}
                    style={{ left: '46%', top: '30%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'ADAS Camera'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'ADAS Camera' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">5. ADAS Camera</span>
                  </button>

                  {/* Tag 6: Transmission TCU */}
                  <button 
                    onClick={() => setSelectedSensor('Transmission TCU')}
                    style={{ left: '46%', top: '65%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Transmission TCU'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Transmission TCU' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">6. TCU Module</span>
                  </button>

                  {/* Tag 7: Airbags SRS */}
                  <button 
                    onClick={() => setSelectedSensor('Airbags SRS')}
                    style={{ left: '58%', top: '38%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Airbags SRS'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Airbags SRS' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">7. Airbags SRS</span>
                  </button>

                  {/* Tag 8: Fuel System */}
                  <button 
                    onClick={() => setSelectedSensor('Fuel System')}
                    style={{ left: '68%', top: '66%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Fuel System'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Fuel System' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">8. Fuel System</span>
                  </button>

                  {/* Tag 9: ABS Controller */}
                  <button 
                    onClick={() => setSelectedSensor('ABS Controller')}
                    style={{ left: '78%', top: '70%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'ABS Controller'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'ABS Controller' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">9. ABS Module</span>
                  </button>

                  {/* Tag 10: Tail Lights */}
                  <button 
                    onClick={() => setSelectedSensor('Tail Lights')}
                    style={{ left: '88%', top: '48%' }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border shadow-xl font-sans transition duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      selectedSensor === 'Tail Lights'
                        ? 'bg-brand-dark text-white border-brand-amber scale-105 ring-2 ring-brand-amber/40 shadow-brand-amber/25'
                        : 'bg-white/95 text-brand-dark/95 border-brand-gold/30 hover:border-brand-amber hover:bg-white text-opacity-95'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedSensor === 'Tail Lights' ? 'bg-brand-amber animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-tight">10. Tail Lights</span>
                  </button>
                </div>
              </div>

              {/* Live Technical Metadata Block - Expanded & Detailed */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 bg-[#0a0d1a] p-5 border border-brand-gold/25 rounded-2xl relative z-10">
                <div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">NODE SELECT</span>
                  <span className="text-sm font-bold text-white font-mono">{currentSensorData.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">DIAGNOSTIC STATUS</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    {currentSensorData.status}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">TEMPERATURE</span>
                  <span className="text-sm font-bold text-white font-mono">{currentSensorData.temp}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">SYS PRESSURE</span>
                  <span className="text-sm font-bold text-white font-mono">{currentSensorData.pressure}</span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-1">SYS_OBD2_CODE</span>
                  <span className="text-sm font-bold text-brand-amber font-mono">{currentSensorData.code}</span>
                </div>
              </div>

              {/* Bottom control hints */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-brand-muted gap-2 border-t border-white/5 pt-4 relative z-10">
                <span>✦ BLUEPRINT WORKSPACE ACTIVE // COMPONENT: {currentSensorData.name}</span>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-brand-amber font-extrabold hover:text-white transition-colors cursor-pointer"
                >
                  CLICK "X" OR RE-CLICK TAGS TO CLOSE DIAGNOSTICS
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
