/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Phone, 
  Truck, 
  Activity, 
  Cpu, 
  Disc, 
  Droplets, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  User, 
  ArrowRight,
  ShieldAlert,
  BellRing,
  Home,
  DollarSign,
  Link as LinkIcon,
  Calendar,
  Play,
  Menu,
  X,
  Layers,
  HelpCircle,
  Info,
  Map,
  MessageSquare,
  Mail
} from 'lucide-react';

import Navbar from './components/Navbar';
import CostEstimator from './components/CostEstimator';
import GarageFinder from './components/GarageFinder';
import Diagnostics from './components/Diagnostics';
import MaintenanceReminder from './components/MaintenanceReminder';
import BookingModal from './components/BookingModal';
import SOSModal from './components/SOSModal';
import AppSimulator from './components/AppSimulator';
import InteractiveHUD from './components/InteractiveHUD';
import LinkShortener from './components/LinkShortener';
import { Garage, MOCK_TESTIMONIALS, POPULAR_SERVICES } from './types';

// Asset paths
import mcarfixLogo from './assets/images/mcarfix_logo.svg';
import heroImg from './assets/images/kenyan_garage_hero_workspace_1784112765366.jpg';
import diagnosticsBgImg from './assets/images/garage_diagnostics_session_1784113397868.jpg';
import mercedesSuvImg from './assets/images/mercedes_suv_front_1784114603495.jpg';
import sparePartsImg from './assets/images/kenyan_spare_parts_1783421247627.jpg';
import roadsideImg from './assets/images/kenyan_roadside_1783421263692.jpg';

export default function App() {
  const [activeSOS, setActiveSOS] = useState(false);
  const [selectedGarageToBook, setSelectedGarageToBook] = useState<Garage | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [desktopSidebarExpanded, setDesktopSidebarExpanded] = useState(true);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart;

    if (diff > 70 && touchStart < 90) {
      setSidebarOpen(true);
    } else if (diff < -70) {
      setSidebarOpen(false);
    }
    setTouchStart(null);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleNavigate = (targetId: string) => {
    if (targetId === 'hero') {
      setActiveTab('home');
    } else {
      setActiveTab(targetId);
    }
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    handleNavigate(sectionId);
  };

  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-brand-amber" };
    if (iconName === 'Wrench') return <Wrench {...props} />;
    if (iconName === 'ShieldAlert') return <ShieldAlert {...props} />;
    if (iconName === 'Truck') return <Truck {...props} />;
    if (iconName === 'Activity') return <Activity {...props} />;
    if (iconName === 'Cpu') return <Cpu {...props} />;
    if (iconName === 'Disc') return <Disc {...props} />;
    if (iconName === 'Droplets') return <Droplets {...props} />;
    if (iconName === 'FileText') return <FileText {...props} />;
    return <Wrench {...props} />;
  };

  const faqs = [
    {
      q: 'How does mCarFix verify garages and mechanics?',
      a: 'We perform strict physical and commercial audits of every garage before verification. This includes checking technician certifications, diagnostic equipment capability, and sourcing agreements to verify they only use original OEM spare parts.'
    },
    {
      q: 'What do I do if my vehicle breaks down late at night?',
      a: 'Simply click our "Emergency Assistance" button anywhere on the platform or call our 24/7 hotline (0700 mCarFix). Our GPS dispatch engine instantly routes the nearest verified flatbed tow truck or diagnostic responder to your precise location.'
    },
    {
      q: 'Is there any warranty on repair works booked via mCarFix?',
      a: 'Yes! Every booking completed via the mCarFix directory comes with an automatic 6-month warranty on both certified labor and parts. If any issues reappear, the partner garage will resolve them free of charge.'
    },
    {
      q: 'Can I purchase spare parts directly through the app?',
      a: 'Yes, our verified parts network allows you to request specific components (OEM or premium aftermarket). The components are delivered directly to your selected garage and come with original warranty tags for verification scanning.'
    }
  ];

  const sidebarTabs = [
    { id: 'home', label: 'Dashboard Hub', description: 'mCarFix Core Portal', icon: Home },
    { id: 'garages', label: 'Verified Garages', description: 'Nairobi Smart Map & Booking', icon: MapPin },
    { id: 'estimator', label: 'Cost Estimator', description: 'Pre-Negotiated Maintenance Rates', icon: DollarSign },
    { id: 'diagnostics', label: 'Diagnostic Helper', description: 'OBD-II Code Expert Solver', icon: Cpu },
    { id: 'services', label: 'Premium Services', description: 'Oils, Batteries, Tires & Spares Grid', icon: Wrench },
    { id: 'simulator', label: 'Live App Demo', description: 'Interactive App Screens & HUD', icon: Play },
    { id: 'shortener', label: 'Smart Link Engine', description: 'mcflink.com Shortener & Diagnostics Share', icon: LinkIcon },
    { id: 'schedules', label: 'Maintenance Log', description: 'Vehicle Service History Reminder Diaries', icon: Calendar },
    { id: 'how-it-works', label: 'How it Works & FAQs', description: 'Verification Auditing & Expert Answers', icon: FileText }
  ];

  const currentTabInfo = sidebarTabs.find(tab => tab.id === activeTab) || sidebarTabs[0];

  return (
    <div 
      onTouchStart={handleTouchStart} 
      onTouchEnd={handleTouchEnd}
      className="min-h-screen bg-brand-cream text-brand-dark flex font-sans selection:bg-brand-amber selection:text-white"
    >
      
      {/* 1. DESKTOP PERMANENT SIDEBAR */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 bg-[#0c1020] border-r border-brand-gold/15 text-slate-100 z-30 select-none overflow-y-auto overflow-x-hidden custom-scrollbar w-72 shadow-[10px_0_40px_rgba(0,0,0,0.5)]"
      >
        {/* Floating expand hint icon visible when sidebar is collapsed */}
        {!desktopSidebarExpanded && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-12 bg-[#0c1020] border-y border-r border-brand-gold/25 rounded-r-xl flex items-center justify-center text-brand-gold shadow-md shadow-black/40 animate-pulse pointer-events-none z-40">
            <ChevronRight className="w-3.5 h-3.5 text-brand-amber" />
          </div>
        )}

        {/* Brand / Logo Header */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3 justify-start">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-brand-gold/20 flex items-center justify-center p-0.5 shrink-0 shadow-md">
            <img 
              src={mcarfixLogo} 
              alt="mCarFix Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className={`transition-all duration-300 ease-in-out origin-left min-w-0 ${
            desktopSidebarExpanded 
              ? 'opacity-100 translate-x-0 max-w-[180px] visible' 
              : 'opacity-0 -translate-x-3 max-w-0 overflow-hidden invisible pointer-events-none'
          }`}>
            <span className="font-display font-black text-lg tracking-wider text-white block whitespace-nowrap">m<span className="text-brand-amber">Car</span>Fix</span>
            <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-semibold block whitespace-nowrap">Kenya Platform</span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          <div className={`px-3 mb-2 transition-all duration-300 ease-in-out ${
            desktopSidebarExpanded 
              ? 'opacity-100 max-h-8 visible' 
              : 'opacity-0 max-h-0 overflow-hidden invisible pointer-events-none'
          }`}>
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase whitespace-nowrap">Interactive Portals</span>
          </div>
          {sidebarTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                className={`w-full flex items-center rounded-xl transition-all duration-300 ease-in-out group cursor-pointer py-3 ${
                  desktopSidebarExpanded 
                    ? 'px-3.5 gap-3.5 justify-start text-left' 
                    : 'px-0 gap-0 justify-center text-center'
                } ${
                  isActive
                    ? 'bg-brand-amber text-white shadow-lg shadow-brand-amber/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
                }`}
                title={!desktopSidebarExpanded ? tab.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-brand-gold group-hover:text-brand-amber'}`} />
                <div className={`transition-all duration-300 ease-in-out origin-left min-w-0 ${
                  desktopSidebarExpanded 
                    ? 'opacity-100 translate-x-0 max-w-[200px] visible' 
                    : 'opacity-0 -translate-x-3 max-w-0 overflow-hidden invisible pointer-events-none'
                }`}>
                  <span className="text-xs font-display block leading-tight whitespace-nowrap">{tab.label}</span>
                  <span className={`text-[10px] font-normal block truncate whitespace-nowrap ${isActive ? 'text-white/70' : 'text-slate-500'}`}>{tab.description}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Emergency Area */}
        <div className="p-4 border-t border-white/5 bg-[#080b16] space-y-3">
          <button
            onClick={() => setActiveSOS(true)}
            className={`rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-mono text-[11px] font-extrabold uppercase tracking-widest flex items-center transition-all duration-300 ease-in-out shadow-md shadow-red-900/20 cursor-pointer h-11 ${
              desktopSidebarExpanded ? 'w-full px-6 gap-2.5 justify-start' : 'w-10 px-2.5 justify-center'
            }`}
            title="Emergency SOS"
          >
            <ShieldAlert className="w-5 h-5 animate-pulse text-white shrink-0" />
            <span className={`transition-all duration-300 ease-in-out origin-left whitespace-nowrap ${
              desktopSidebarExpanded 
                ? 'opacity-100 translate-x-0 max-w-[150px] visible' 
                : 'opacity-0 -translate-x-3 max-w-0 overflow-hidden invisible pointer-events-none'
            }`}>
              Emergency SOS
            </span>
          </button>
          
          <div className={`transition-all duration-300 ease-in-out flex flex-col gap-1 text-[10px] text-slate-500 font-mono w-full ${
            desktopSidebarExpanded 
              ? 'opacity-100 max-h-24 visible mt-1 border-t border-white/5 pt-2' 
              : 'opacity-0 max-h-0 overflow-hidden invisible pointer-events-none mt-0'
          }`}>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold whitespace-nowrap">Customer Support</span>
            <a href="tel:+254704804932" className="text-brand-gold font-bold hover:text-brand-amber transition-colors whitespace-nowrap flex items-center gap-1">
              <Phone className="w-3 h-3 shrink-0 text-brand-amber" />
              <span>+254 704 804932</span>
            </a>
            <a href="mailto:support@mcarfix.com" className="text-slate-400 hover:text-brand-amber transition-colors truncate block">
              support@mcarfix.com
            </a>
          </div>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER SIDEBAR WITH SWIPE CAPABILITIES */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-40 md:hidden cursor-pointer"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#0c1020] border-r border-brand-gold/15 text-slate-100 z-50 flex flex-col md:hidden select-none"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-brand-gold/20 flex items-center justify-center p-0.5 shadow-md">
                    <img 
                      src={mcarfixLogo} 
                      alt="mCarFix Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-display font-black text-lg tracking-wider text-white block">m<span className="text-brand-amber">Car</span>Fix</span>
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-semibold block">Kenya Platform</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer navigation */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="px-3 mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">Interactive Portals</span>
                  <span className="text-[9px] font-mono font-semibold text-brand-gold/50">Swipe ← to Close</span>
                </div>
                {sidebarTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleNavigate(tab.id)}
                      className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-left transition duration-200 group cursor-pointer ${
                        isActive
                          ? 'bg-brand-amber text-white shadow-lg shadow-brand-amber/20 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
                      }`}
                    >
                      <Icon className={`w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-brand-gold group-hover:text-brand-amber'}`} />
                      <div className="min-w-0">
                        <span className="text-xs font-display block leading-tight">{tab.label}</span>
                        <span className={`text-[10px] font-normal block truncate ${isActive ? 'text-white/70' : 'text-slate-500'}`}>{tab.description}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="p-4 border-t border-white/5 bg-[#080b16] space-y-3">
                <button
                  onClick={() => {
                    setActiveSOS(true);
                    setSidebarOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-mono text-[11px] font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-md shadow-red-900/20 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 animate-pulse text-white" />
                  <span>Emergency SOS</span>
                </button>
                
                <div className="flex flex-col gap-1 text-[10px] font-mono border-t border-white/5 pt-2 mt-1">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Customer Support</span>
                  <a href="tel:+254704804932" className="text-brand-gold hover:text-brand-amber font-bold transition-colors flex items-center gap-1">
                    <Phone className="w-3 h-3 shrink-0 text-brand-amber" />
                    <span>+254 704 804932</span>
                  </a>
                  <a href="mailto:support@mcarfix.com" className="text-slate-400 hover:text-brand-amber transition-colors truncate block">
                    support@mcarfix.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. MAIN WORKSPACE CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-72 relative">
        
        {/* MOBILE STICKY HEADER */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between h-16 bg-[#0c1020] border-b border-brand-gold/15 px-6 text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 -ml-1 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-white flex items-center justify-center p-0.5">
                <img src={mcarfixLogo} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display font-bold text-sm tracking-wide text-white">{currentTabInfo.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSOS(true)}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm transition cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              <span>SOS</span>
            </button>
          </div>
        </header>

        {/* DESKTOP HEADER (STAYS FIXED AT TOP OF WORKSPACE CONTENT) */}
        <header className="hidden md:flex relative sticky top-0 z-20 items-center justify-between h-20 bg-gradient-to-r from-sky-100/80 via-sky-50/90 to-sky-100/50 backdrop-blur-md border-b border-sky-200/80 shadow-[0_4px_25px_rgba(14,165,233,0.12)] px-8 select-none overflow-hidden">
          {/* Shining Fade Light effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/5 via-transparent to-sky-400/5 pointer-events-none" />
          <div className="absolute top-0 w-48 h-full bg-gradient-to-r from-transparent via-white/55 to-transparent -skew-x-12 pointer-events-none animate-shine" />

          <div className="relative z-10 space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-brand-amber font-bold uppercase tracking-widest">mCarFix Premium Hub</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-brand-dark tracking-tight flex items-center gap-2">
              <currentTabInfo.icon className="w-6 h-6 text-brand-amber shrink-0" />
              <span>{currentTabInfo.label}</span>
            </h1>
          </div>

          <div className="relative z-10 flex items-center gap-5">
            {/* Quick status banner */}
            <div className="flex items-center gap-2 bg-brand-gold-light/60 border border-brand-gold/15 py-1.5 px-3 rounded-xl text-[10px] font-mono font-bold text-brand-muted">
              <span>GPS Dispatcher:</span>
              <span className="text-brand-amber font-extrabold">Active (Nairobi Central)</span>
            </div>

            <div className="flex items-center gap-3 border-l border-sky-200/50 pl-4 font-mono">
              <button
                onClick={() => {
                  window.location.href = "tel:+254704804932";
                }}
                className="flex items-center gap-2.5 bg-rose-50/95 hover:bg-rose-100/95 border border-rose-200/80 hover:border-rose-400/80 px-3 py-1.5 rounded-xl transition shadow-sm hover:shadow-md group text-left cursor-pointer shrink-0"
                title="Call Customer Support"
              >
                <div className="bg-rose-100 p-1.5 rounded-lg group-hover:bg-rose-200 transition-colors text-rose-600 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] uppercase tracking-widest text-rose-500 font-extrabold block">Support Call</span>
                  <span className="text-[11px] font-extrabold text-rose-700 group-hover:text-rose-900 transition-colors mt-0.5 whitespace-nowrap">+254 704 804932</span>
                </div>
              </button>

              <button
                onClick={() => {
                  window.location.href = "mailto:support@mcarfix.com";
                }}
                className="flex items-center gap-2.5 bg-white/95 hover:bg-white border border-slate-200/80 hover:border-slate-400/80 px-3 py-1.5 rounded-xl transition shadow-sm hover:shadow-md group text-left cursor-pointer"
                title="Email Customer Support"
              >
                <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-slate-200 transition-colors text-slate-500 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-widest text-slate-400 font-extrabold block">Support Email</span>
                  <span className="text-[11px] font-extrabold text-slate-700 group-hover:text-slate-900 transition-colors mt-0.5">support@mcarfix.com</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setActiveSOS(true)}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/10 transition hover:scale-[1.02] cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>Emergency SOS</span>
            </button>
          </div>
        </header>

        {/* Mobile Swipe-in visual guide overlay (disappears on interaction) */}
        <div className="md:hidden pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-20">
          <div className="bg-[#0c1020]/80 backdrop-blur-md text-[9px] text-white py-2 px-1 rounded-r-lg border border-l-0 border-brand-gold/20 flex flex-col items-center gap-1.5 font-mono shadow-md opacity-70">
            <span className="writing-mode-vertical uppercase tracking-widest text-[8px]">Swipe</span>
            <span className="animate-bounce">→</span>
          </div>
        </div>

        {/* Selected Tab Content Viewport */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0"
              >
                <header id="hero" className="relative overflow-hidden py-16 lg:py-24 border-b border-sky-100 bg-gradient-to-b from-sky-100/40 via-sky-50/20 to-white text-brand-dark">
                  {/* Visually Stunning Background Garage Image */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    <img 
                      src={heroImg} 
                      alt="Verified Modern Garage Workspace with Mechanics" 
                      className="w-full h-full object-cover opacity-90 filter saturate-[1.05] brightness-[1.02] blur-[4px]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Premium light transparent overlays that blend beautifully while keeping the image 90% visible and keeping text readable */}
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-100/60 via-transparent to-sky-50/80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-100/35 via-transparent to-sky-100/35" />
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />

                    {/* Animated subtle high-tech scanning rings & glowing blueprint particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.25, 1],
                          opacity: [0.12, 0.28, 0.12],
                          x: [0, 25, 0],
                          y: [0, -20, 0]
                        }}
                        transition={{ 
                          duration: 14, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full border border-sky-300/15 bg-sky-400/5 blur-xl"
                      />
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.15, 1],
                          opacity: [0.08, 0.20, 0.08],
                          x: [0, -30, 0],
                          y: [0, 25, 0]
                        }}
                        transition={{ 
                          duration: 18, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-cyan-300/15 bg-cyan-400/5 blur-2xl"
                      />
                      {/* Animated slow-scanning radar line */}
                      <motion.div 
                        animate={{ 
                          y: ["-100%", "200%"]
                        }}
                        transition={{ 
                          duration: 9, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"
                      />
                    </div>
                  </div>

                  {/* Precision Autodesk Blueprint Grid Lines & Coordinates */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Subtle grid pattern background */}
                    <div className="absolute inset-0 opacity-[0.015]" 
                         style={{ 
                           backgroundImage: `radial-gradient(circle, #ff5e00 1px, transparent 1px)`, 
                           backgroundSize: '24px 24px' 
                         }} 
                     />
                    {/* Vertical thin engineering lines */}
                    <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-brand-gold/10" />
                    <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-brand-gold/10 hidden md:block" />
                    <div className="absolute left-[70%] top-0 bottom-0 w-[1px] bg-brand-gold/10 hidden md:block" />
                    <div className="absolute left-[92%] top-0 bottom-0 w-[1px] bg-brand-gold/10" />
                    
                    {/* Horizontal thin engineering lines */}
                    <div className="absolute left-0 right-0 top-[15%] h-[1px] bg-brand-gold/10" />
                    <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-brand-gold/10" />
                    <div className="absolute left-0 right-0 top-[85%] h-[1px] bg-brand-gold/10" />
                    
                    {/* Precision Blueprint Corner Markers */}
                    <div className="absolute left-4 top-4 font-mono text-[9px] text-brand-gold/40 tracking-wider">SEC_DRAFT_HUD_2026 // GRID_A</div>
                    <div className="absolute right-4 bottom-4 font-mono text-[9px] text-brand-gold/40 tracking-wider">SYSTEM_CONNECTED_STABLE</div>
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-[8px] text-brand-gold/30 hidden md:block uppercase tracking-widest">
                      LAT: 1.2921° S | LON: 36.8219° E (NAIROBI_HUB)
                    </div>
                  </div>

                  {/* Premium ambient glows */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.15),transparent_50%)] pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none" />
                  
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Left Content Column */}
                      <div className="lg:col-span-7 space-y-8 text-center lg:text-left relative">
                        {/* Vertical blueprint bracket on desktop to frame the text like design blueprints */}
                        <div className="absolute -left-6 top-2 bottom-2 w-[2px] bg-brand-amber/25 hidden lg:block" />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-4"
                        >
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber/10 border border-brand-amber/25 text-brand-amber text-xs font-mono font-bold tracking-wider uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Kenya’s Elite Automotive Platform</span>
                          </div>

                          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[56px] tracking-tight text-brand-dark leading-[1.05]">
                            The Digital Blueprint <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-gold">
                              For Automotive Care
                            </span>
                          </h1>

                          <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                            Book trusted mechanics, dispatch roadside emergency teams, trace authentic OEM spare parts, and verify diagnostic reports on East Africa's most advanced digital ecosystem.
                          </p>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                          <button
                            onClick={() => handleScrollToSection('garages')}
                            className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber-hover text-white font-mono text-xs font-extrabold py-4 px-8 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-amber/15 hover:-translate-y-0.5 transition duration-300 tracking-wider uppercase"
                          >
                            <span>Book Verified Mechanic</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleScrollToSection('simulator')}
                            className="w-full sm:w-auto bg-transparent hover:bg-brand-gold-light/90 text-brand-dark font-mono text-xs font-extrabold py-4 px-8 rounded-xl border border-brand-gold/25 flex items-center justify-center gap-2 cursor-pointer transition duration-300 tracking-wider uppercase shadow-sm hover:border-brand-gold/40"
                          >
                            <span>Watch App Demo</span>
                          </button>
                        </motion.div>

                        {/* Trust Signal Highlights */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="pt-6 border-t border-brand-gold/15 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center lg:text-left"
                        >
                          <div>
                            <p className="font-display font-extrabold text-2xl text-brand-amber tracking-tight font-mono">12,000+</p>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-brand-muted mt-1">Vehicles Serviced</p>
                          </div>
                          <div>
                            <p className="font-display font-extrabold text-2xl text-emerald-600 tracking-tight font-mono">450+</p>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-brand-muted mt-1">Verified Garages</p>
                          </div>
                          <div>
                            <p className="font-display font-extrabold text-2xl text-brand-dark tracking-tight font-mono">4.9 ★</p>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-brand-muted mt-1">Average Rating</p>
                          </div>
                          <div>
                            <p className="font-display font-extrabold text-2xl text-brand-gold tracking-tight font-mono font-bold">100%</p>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-brand-muted mt-1">Trusted in Kenya</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Right Interactive CAD HUD Column */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative"
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-brand-amber/10 to-brand-gold/10 blur-2xl rounded-3xl opacity-60 pointer-events-none" />
                        <InteractiveHUD />
                      </motion.div>

                    </div>
                  </div>
                </header>

                {/* Brand Trust/Partners Bar */}
                <section className="bg-brand-gold-light/40 border-b border-brand-gold/15 py-8 text-center">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold mb-4">
                      In Partnership with Verified Insurers & Lubricant Networks Across East Africa
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-brand-muted font-mono text-sm font-semibold uppercase tracking-wider">
                      <span className="hover:text-brand-amber transition-colors">AA KENYA</span>
                      <span className="hover:text-brand-amber transition-colors">TOTALENERGIES KENYA</span>
                      <span className="hover:text-brand-amber transition-colors">KCB BANK GROUP</span>
                      <span className="hover:text-brand-amber transition-colors">JUBILEE INSURANCE</span>
                    </div>
                  </div>
                </section>

                {/* Narrative Section: The Problem & The Solution */}
                <section className="py-24 bg-transparent border-b border-brand-gold/15 overflow-hidden relative">
                  {/* Visually Stunning Background Image */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    <img 
                      src={diagnosticsBgImg} 
                      alt="Garage Diagnostics Workspace and Discussion" 
                      className="w-full h-full object-cover opacity-90 filter saturate-[1.05] brightness-[1.02] blur-[4px]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle light transparent overlays that blend beautifully while keeping the image 90% visible and keeping text readable */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/60 via-transparent to-brand-cream/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/60 via-transparent to-brand-cream/60" />
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                  </div>
                  
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-16 relative z-10">
                    
                    {/* Asymmetrical elegant statement */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                      
                      {/* Left Column: Typographic Focus */}
                      <div className="lg:col-span-6 space-y-6">
                        <span className="text-[11px] font-mono font-bold text-brand-amber tracking-widest uppercase block">
                          THE AUTOMOTIVE STANDARD
                        </span>
                        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-brand-dark leading-tight">
                          Vehicle care should be anchored in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-amber to-brand-gold">absolute trust.</span>
                        </h2>
                        <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-light">
                          For too long, car maintenance has been a gamble. Unpredictable towing fees, opaque pricing, and the worry of counterfeit spares have made roadside issues stressful. mCarFix changes the narrative by introducing transparency, verification, and instant accountability on every drive.
                        </p>
                      </div>

                      {/* Right Column: High-End Details */}
                      <div className="lg:col-span-6 space-y-8 pt-4 lg:pt-0">
                        <div className="space-y-4">
                          <h3 className="font-display font-bold text-lg sm:text-xl text-brand-dark">
                            A Unified Digital Platform for Kenya’s Roads
                          </h3>
                          <p className="text-brand-muted text-sm leading-relaxed font-light">
                            We pre-audit workshops, certify original parts distributors, and maintain a 24/7 heavy-duty towing fleet so you can focus on the destination, not the worry of getting stranded.
                          </p>
                        </div>

                        {/* Clean Row Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-brand-gold/10">
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-brand-amber block">01 / ESTIMA</span>
                            <span className="text-xs font-bold text-brand-dark block">Upfront Pricing</span>
                            <span className="text-[11px] text-brand-muted leading-relaxed font-light block">Standardized local repair cost estimates.</span>
                          </div>
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-brand-amber block">02 / ESCROW</span>
                            <span className="text-xs font-bold text-brand-dark block">Secure Escrow</span>
                            <span className="text-[11px] text-brand-muted leading-relaxed font-light block">Funds released only when repairs are verified.</span>
                          </div>
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-brand-amber block">03 / FLEET</span>
                            <span className="text-xs font-bold text-brand-dark block">GPS Dispatch</span>
                            <span className="text-[11px] text-brand-muted leading-relaxed font-light block">Active roadside rescue across Nairobi and beyond.</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Live Recent Operations */}
                    <div className="bg-brand-gold-light/40 border border-brand-gold/15 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between overflow-hidden shadow-sm">
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="text-[9px] font-mono font-bold tracking-widest text-brand-gold uppercase">RECENT OPERATIONS LOG</span>
                      </div>
                      
                      {/* Live Ticker Items */}
                      <div className="flex-1 overflow-hidden relative h-5 w-full text-center md:text-left">
                        <div className="animate-marquee whitespace-nowrap text-[11px] font-mono text-brand-dark inline-block space-x-12">
                          <span>[Westlands, Nairobi] Toyota RAV4 Brake Pads Certified & Installed <strong className="text-emerald-400">Saved KES 3,200</strong></span>
                          <span>•</span>
                          <span>[Nakuru CBD] Flatbed SOS Tow truck Dispatched to Highway Breakdown <strong className="text-brand-amber font-bold">Arrived in 19 mins</strong></span>
                          <span>•</span>
                          <span>[Milimani, Kisumu] Mazda Demio 5,000 km Oil Service Completed <strong className="text-brand-gold font-bold">6-Month Warranty active</strong></span>
                          <span>•</span>
                          <span>[Ganjoni, Mombasa] OBD-II Computer Diagnostics cleared air sensor <strong className="text-emerald-400 font-bold">Total KES 1,500</strong></span>
                          <span>•</span>
                          {/* Duplicated list for infinite seamless carousel transition */}
                          <span>[Westlands, Nairobi] Toyota RAV4 Brake Pads Certified & Installed <strong className="text-emerald-400">Saved KES 3,200</strong></span>
                          <span>•</span>
                          <span>[Nakuru CBD] Flatbed SOS Tow truck Dispatched to Highway Breakdown <strong className="text-brand-amber font-bold">Arrived in 19 mins</strong></span>
                          <span>•</span>
                          <span>[Milimani, Kisumu] Mazda Demio 5,000 km Oil Service Completed <strong className="text-brand-gold font-bold">6-Month Warranty active</strong></span>
                          <span>•</span>
                          <span>[Ganjoni, Mombasa] OBD-II Computer Diagnostics cleared air sensor <strong className="text-emerald-400 font-bold">Total KES 1,500</strong></span>
                        </div>
                      </div>
                      
                      <div className="text-[10px] font-mono text-slate-500 shrink-0 hidden lg:block">
                        Vetted Partner Network: 450+ Garages, 12,000+ Vehicles
                      </div>
                    </div>

                  </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-20 border-t border-brand-gold/15 bg-brand-gold-light/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(197,168,92,0.06),transparent_50%)] pointer-events-none" />
                  <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
                    
                    <div className="max-w-2xl mx-auto space-y-4">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Keep Rolling</span>
                      <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-brand-dark tracking-tight">
                        Ready to Connect with Trusted Automotive Pros?
                      </h2>
                      <p className="text-sm sm:text-base text-brand-muted font-light max-w-xl mx-auto leading-relaxed">
                        Book a verified garage, estimate your repair costs, or trigger an emergency breakdown dispatch. It’s free to start.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => handleScrollToSection('garages')}
                        className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber-hover text-white font-mono font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-amber/15 transition hover:-translate-y-0.5"
                      >
                        <span>Book a Mechanic Now</span>
                      </button>
                      
                      <button
                        onClick={() => setActiveSOS(true)}
                        className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber-hover text-white font-mono font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-amber/15 transition hover:-translate-y-0.5"
                      >
                        <span>Request Roadside SOS</span>
                      </button>
                    </div>

                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'simulator' && (
              <motion.div
                key="simulator-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <section id="simulator" className="py-20 border-b border-brand-gold/15 bg-[#0c1020]/20">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <AppSimulator />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'shortener' && (
              <motion.div
                key="shortener-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <section id="shortener" className="py-20 bg-transparent border-b border-brand-gold/15">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Link Compression Tool</span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
                        Automotive <span className="text-brand-amber">Smart Link Engine</span> & Clicks Tracker
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                        Our specialized links outperform generic services like Bitly or TinyURL with direct diagnostics integrations, high-fidelity analytics, zero ads, and Safaricom SMS payload optimizations.
                      </p>
                    </div>
                    <LinkShortener />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0"
              >
                {/* Services Grid Section */}
                <section className="py-20 bg-transparent border-b border-brand-gold/15">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Explore Services</span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
                        What Automotive Service <span className="text-brand-amber">Do You Need?</span>
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                        Find trusted mechanics near you in minutes, compare quotes, and book with absolute confidence.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {POPULAR_SERVICES.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (item.id === 'roadside' || item.id === 'towing') {
                              setActiveSOS(true);
                            } else if (item.id === 'parts') {
                              handleScrollToSection('estimator');
                            } else {
                              handleScrollToSection('garages');
                            }
                          }}
                          className="bg-white border border-brand-gold/20 hover:border-brand-amber hover:bg-brand-gold-light/40 rounded-3xl p-6 transition duration-300 group cursor-pointer hover:-translate-y-1 flex flex-col justify-between shadow-xl"
                        >
                          <div className="space-y-4">
                            <div className="bg-brand-gold-light/60 border border-brand-gold/15 text-brand-amber p-3 rounded-2xl w-max group-hover:bg-brand-amber group-hover:text-white transition duration-300">
                              {getServiceIcon(item.iconName)}
                            </div>
                            <h3 className="font-display font-bold text-lg text-brand-dark group-hover:text-brand-amber transition-colors leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-xs text-brand-muted leading-relaxed font-light">
                              {item.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-brand-gold/15 mt-4 flex items-center justify-between text-[11px] font-mono text-brand-muted group-hover:text-brand-amber transition-colors">
                            <span>{item.popular ? 'POPULAR REQUEST' : 'BOOK ON-DEMAND'}</span>
                            <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Extra Interactive Cards Area */}
                <section className="py-20 border-t border-brand-gold/15 bg-brand-gold-light/40">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Premium Offerings</span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
                        Guaranteed OEM Spares & Roadside Assistance
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                        We connect you directly with certified distributors to keep your car operating efficiently on Kenyan roads.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Card 1: Spare Parts */}
                      <div className="bg-white border border-brand-gold/20 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl">
                        <div>
                          <img 
                            src={sparePartsImg} 
                            alt="Verified spare parts store in Kenya" 
                            referrerPolicy="no-referrer"
                            className="w-full h-56 object-cover group-hover:scale-[1.01] transition-transform duration-500"
                          />
                          <div className="p-6 md:p-8 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                100% GENUINE
                              </span>
                              <span className="text-xs font-mono text-brand-muted">Distributor network</span>
                            </div>
                            <h3 className="font-display font-bold text-xl text-brand-dark group-hover:text-brand-amber transition-colors">
                              Sourcing Genuine Spare Parts
                            </h3>
                            <p className="text-xs text-brand-muted leading-relaxed font-light">
                              Avoid counterfeit components that compromise safety and durability. Our parts distribution network links you directly with official distributors for Toyota, Subaru, Mazda, Nissan, and Mercedes-Benz original parts in Nairobi.
                            </p>
                          </div>
                        </div>
                        <div className="px-6 md:px-8 pb-8">
                          <button
                            onClick={() => handleScrollToSection('estimator')}
                            className="bg-brand-amber hover:bg-brand-amber-hover text-white font-mono text-xs font-bold py-3 px-5 rounded-xl transition duration-300 cursor-pointer w-full text-center shadow-lg shadow-brand-amber/15 hover:-translate-y-0.5"
                          >
                            Verify Spare Parts Pricing
                          </button>
                        </div>
                      </div>

                      {/* Card 2: Roadside Assistance */}
                      <div className="bg-white border border-brand-gold/20 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl">
                        <div>
                          <img 
                            src={roadsideImg} 
                            alt="Kenyan roadside assistance flatbed towing vehicle" 
                            referrerPolicy="no-referrer"
                            className="w-full h-56 object-cover group-hover:scale-[1.01] transition-transform duration-500"
                          />
                          <div className="p-6 md:p-8 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                24/7 ACTIVE
                              </span>
                              <span className="text-xs font-mono text-brand-muted">Roadside Towing</span>
                            </div>
                            <h3 className="font-display font-bold text-xl text-brand-dark group-hover:text-rose-500 transition-colors">
                              Emergency Highway Breakdown Response
                            </h3>
                            <p className="text-xs text-brand-muted leading-relaxed font-light">
                              Stuck with a flat tyre, blown head gasket, or battery failure on the highway? Our towing network features flatbed trucks equipped to recover vehicles safely. Average dispatch arrival within Nairobi is 25 minutes.
                            </p>
                          </div>
                        </div>
                        <div className="px-6 md:px-8 pb-8">
                          <button
                            onClick={() => setActiveSOS(true)}
                            className="bg-brand-amber hover:bg-brand-amber-hover text-white font-mono text-xs font-bold py-3 px-5 rounded-xl transition duration-300 cursor-pointer w-full text-center shadow-lg shadow-brand-amber/15 hover:-translate-y-0.5"
                          >
                            Request Emergency Tow Truck
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 border-t border-brand-gold/15 bg-brand-gold-light/40">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Testimonials</span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
                        Loved by Kenyan <span className="text-brand-amber">Car Owners</span>
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                        Read how mCarFix has helped vehicle owners get back on the road safely and economically.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {MOCK_TESTIMONIALS.map((t) => (
                        <div 
                          key={t.id}
                          className="bg-white border border-brand-gold/20 p-6 rounded-3xl flex flex-col justify-between h-full hover:border-brand-amber hover:shadow-lg transition duration-300 shadow-xl"
                        >
                          <div className="space-y-4">
                            <div className="flex text-brand-amber gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-brand-amber text-brand-amber" />
                              ))}
                            </div>
                            <p className="text-xs text-brand-dark italic leading-relaxed font-light">
                              "{t.text}"
                            </p>
                          </div>

                          <div className="pt-4 border-t border-brand-gold/15 mt-6 flex items-center gap-3">
                            {t.avatarUrl ? (
                              <img
                                src={t.avatarUrl}
                                alt={t.name}
                                className="w-10 h-10 rounded-full object-cover border border-brand-gold/20 shadow-sm select-none"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-brand-gold-light/80 border border-brand-gold/20 flex items-center justify-center font-display text-xs font-extrabold text-brand-gold uppercase shadow-inner">
                                {t.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div>
                              <span className="block text-xs font-bold text-brand-dark">{t.name}</span>
                              <span className="block text-[10px] font-mono text-brand-muted uppercase tracking-wider">{t.location}, KE</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'how-it-works' && (
              <motion.div
                key="how-it-works-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0"
              >
                {/* How it Works Section */}
                <section className="py-20 border-t border-brand-gold/15 bg-brand-gold-light/40">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Process Flow</span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark">
                        Get Your Vehicle Fixed in <span className="text-brand-amber">3 Simple Steps</span>
                      </h2>
                      <p className="text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                        We make finding trusted automotive repairs entirely frictionless. No guesswork, no overcharging.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          step: '01',
                          title: 'Search or Diagnose',
                          desc: 'Use our interactive directory to search for garages or select symptoms in our Diagnostic Helper to identify mechanical issues.'
                        },
                        {
                          step: '02',
                          title: 'Check Cost & Book',
                          desc: 'Estimate standard market rates for repairs using our cost estimator, compare nearby garages, and book an appointment with zero upfront fees.'
                        },
                        {
                          step: '03',
                          title: 'Drive with Confidence',
                          desc: 'Your selected garage performs the repair using certified original parts, backed by a free 6-month labor & parts guarantee.'
                        }
                      ].map((step, idx) => (
                        <div 
                          key={idx}
                          className="bg-white border border-brand-gold/20 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full shadow-xl"
                        >
                          <span className="font-display font-black text-6xl text-brand-gold/15 absolute right-4 top-4 select-none">{step.step}</span>
                          <div className="space-y-4">
                            <h4 className="font-display font-bold text-xl text-brand-dark mt-4">{step.title}</h4>
                            <p className="text-xs text-brand-muted leading-relaxed font-light">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* FAQs Section */}
                <section className="py-20 bg-transparent border-t border-brand-gold/15">
                  <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 space-y-10">
                    <div className="text-center space-y-2">
                      <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">FAQ</span>
                      <h2 className="font-display font-extrabold text-3xl text-brand-dark">
                        Frequently Asked <span className="text-brand-amber">Questions</span>
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {faqs.map((faq, idx) => {
                        const isOpen = activeFAQ === idx;
                        return (
                          <div 
                            key={idx}
                            className="bg-white border border-brand-gold/20 rounded-2xl overflow-hidden transition duration-300 shadow-xl"
                          >
                            <button
                              onClick={() => toggleFAQ(idx)}
                              className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-brand-dark focus:outline-none cursor-pointer hover:bg-brand-gold-light/20 transition-colors"
                            >
                              <span>{faq.q}</span>
                              {isOpen ? <ChevronUp className="w-4 h-4 text-brand-amber" /> : <ChevronDown className="w-4 h-4 text-brand-muted" />}
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="border-t border-brand-gold/15 bg-brand-gold-light/20"
                                >
                                  <p className="p-5 text-xs text-brand-muted leading-relaxed font-light">
                                    {faq.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'garages' && (
              <motion.div
                key="garages-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <section id="garages" className="py-20 bg-transparent border-t border-brand-gold/15 relative overflow-hidden">
                  {/* 90% Visible Background Image (User-requested) */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    <img 
                      src={mercedesSuvImg} 
                      alt="Premium Mercedes SUV in Nairobi" 
                      className="w-full h-full object-cover opacity-90 filter saturate-[1.05] brightness-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle light transparent overlays that blend beautifully while keeping the image 90% visible */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/45 via-transparent to-brand-cream/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/45 via-transparent to-brand-cream/45" />
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                  </div>

                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-br from-white/75 via-brand-gold-light/75 to-brand-gold/15 backdrop-blur-[10px] p-6 sm:p-10 rounded-[32px] border-2 border-brand-gold/30 shadow-[0_20px_50px_rgba(197,168,92,0.12)] space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="space-y-2">
                        <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block">Live Finder</span>
                        <h2 className="font-display font-extrabold text-3xl text-brand-dark">
                          Verified Garages & Mechanics
                        </h2>
                        <p className="text-sm text-brand-muted max-w-md">
                          Find audited mechanics, compare distances, and book service appointments instantly. Click on map pins to select.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2 px-3.5 rounded-xl w-max">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>450+ Licensed Kenya Garages Active</span>
                      </div>
                    </div>

                    <GarageFinder onBookClick={(g) => setSelectedGarageToBook(g)} />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'estimator' && (
              <motion.div
                key="estimator-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <section id="estimator" className="py-20 border-t border-brand-gold/15 bg-transparent">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <CostEstimator />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'diagnostics' && (
              <motion.div
                key="diagnostics-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <section id="diagnostics" className="py-20 bg-transparent border-t border-brand-gold/15">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <Diagnostics onSOSClick={() => setActiveSOS(true)} />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'schedules' && (
              <motion.div
                key="schedules-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <section id="schedules" className="py-20 bg-transparent border-t border-brand-gold/15">
                  <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    <MaintenanceReminder />
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer (Critique Item 10) */}
        <footer className="bg-[#040610] border-t border-brand-gold/15 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Logo and Pitch */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-brand-gold/20 shadow-sm flex items-center justify-center p-0.5">
                  <img 
                    src={mcarfixLogo} 
                    alt="mCarFix Logo" 
                    className="w-full h-full object-contain select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-display font-black text-lg text-white tracking-tight">
                  mCar<span className="text-brand-amber">Fix</span>
                </span>
              </div>
              <p className="leading-relaxed font-light text-slate-400">
                Connecting vehicle owners with vetted, professional mechanics and spare part distributors in Kenya since 2021.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Directory Link</h4>
              <ul className="space-y-2 font-mono">
                <li><button onClick={() => handleScrollToSection('garages')} className="hover:text-brand-amber transition-colors cursor-pointer text-left text-slate-400">Find Garages</button></li>
                <li><button onClick={() => handleScrollToSection('estimator')} className="hover:text-brand-amber transition-colors cursor-pointer text-left text-slate-400">Cost Estimator</button></li>
                <li><button onClick={() => handleScrollToSection('diagnostics')} className="hover:text-brand-amber transition-colors cursor-pointer text-left text-slate-400">Troubleshooter</button></li>
                <li><button onClick={() => handleScrollToSection('shortener')} className="hover:text-brand-amber transition-colors cursor-pointer text-left text-slate-400">Smart Link Shortener</button></li>
                <li><button onClick={() => handleScrollToSection('schedules')} className="hover:text-brand-amber transition-colors cursor-pointer text-left text-slate-400">Service Reminder</button></li>
              </ul>
            </div>

            {/* Support Hotline */}
            <div>
              <h4 className="font-display font-bold text-white mb-3 uppercase tracking-wider text-[11px]">General Enquiries</h4>
              <p className="leading-relaxed font-light mb-3 text-slate-400">
                Delta Corner Towers, 4th Floor,<br />
                Waiyaki Way, Westlands, Nairobi.
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:+254704804578" 
                  className="inline-flex items-center gap-1.5 text-brand-amber hover:text-white font-mono font-bold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+254 704 804578</span>
                </a>
                <a 
                  href="mailto:enquiries@mcarfix.com" 
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-brand-amber transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>enquiries@mcarfix.com</span>
                </a>
              </div>
            </div>

            {/* Partners Portal */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-white uppercase tracking-wider text-[11px]">Are you a Garage owner?</h4>
              <p className="leading-relaxed font-light text-slate-400">
                Join 450+ verified service providers across Kenya to grow your business.
              </p>
              <button
                onClick={() => alert('Partner integration portal! We will contact you at wayneian492@gmail.com to request business licenses and garage audit scheduling.')}
                className="bg-transparent hover:bg-brand-gold/10 text-white border border-brand-gold/25 font-mono text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Partner with us
              </button>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
            <p>© {new Date().getFullYear()} mCarFix Kenya. All rights reserved. Registered under NTSA directories.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-amber transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-brand-amber transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      </div> {/* closes workspace flex-1 container */}

      {/* MODAL POPUPS */}
      <AnimatePresence>
        {activeSOS && (
          <SOSModal onClose={() => setActiveSOS(false)} />
        )}

        {selectedGarageToBook && (
          <BookingModal 
            garage={selectedGarageToBook} 
            onClose={() => setSelectedGarageToBook(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
