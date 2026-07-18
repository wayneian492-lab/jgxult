/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, ShieldAlert, Phone, Menu, X, Mail } from 'lucide-react';

import mcarfixLogo from '../assets/images/mcarfix_logo.svg';

interface NavbarProps {
  onSOSClick: () => void;
  onNavigate: (sectionId: string) => void;
  activeTab?: string;
}

export default function Navbar({ onSOSClick, onNavigate, activeTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Garages', target: 'garages' },
    { label: 'Cost Estimator', target: 'estimator' },
    { label: 'Diagnostic Helper', target: 'diagnostics' },
    { label: 'Link Engine', target: 'shortener' },
    { label: 'Schedules', target: 'schedules' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-brand-cream/90 border-b border-brand-gold/15 transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-brand-gold/20 shadow-sm flex items-center justify-center p-0.5 group-hover:border-brand-amber transition duration-300">
              <img 
                src={mcarfixLogo} 
                alt="mCarFix Logo" 
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-brand-dark group-hover:text-brand-amber transition-colors">
                mCar<span className="text-brand-amber">Fix</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-brand-muted font-semibold uppercase">KENYA DIRECTORY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.target;
              return (
                <button
                  key={item.target}
                  onClick={() => handleLinkClick(item.target)}
                  className={`font-semibold transition cursor-pointer text-sm relative py-2 ${
                    isActive
                      ? 'text-brand-amber font-bold'
                      : 'text-brand-dark/85 hover:text-brand-amber'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-amber rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end text-right font-mono text-xs border-r border-brand-gold/15 pr-4 mr-2">
              <span className="text-[9px] uppercase tracking-widest text-brand-muted font-extrabold block">Customer Support</span>
              <a 
                href="tel:+254704804932" 
                className="flex items-center gap-1.5 text-brand-dark hover:text-brand-amber font-bold transition-colors mt-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                <span>+254 704 804932</span>
              </a>
              <a 
                href="mailto:support@mcarfix.com" 
                className="text-[10px] text-slate-500 hover:text-brand-amber transition-colors flex items-center gap-1 mt-0.5 justify-end"
              >
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span>support@mcarfix.com</span>
              </a>
            </div>
            
            <button
              onClick={onSOSClick}
              className="relative group overflow-hidden bg-brand-amber hover:bg-brand-amber-hover text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer transition duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <div className="absolute inset-0 bg-white/10 -skew-x-12 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out will-change-transform" />
              <ShieldAlert className="w-4 h-4 animate-bounce text-white" />
              <span>Emergency Assistance</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-amber p-2 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-brand-gold/15 bg-brand-cream/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.target;
                return (
                  <button
                     key={item.target}
                     onClick={() => handleLinkClick(item.target)}
                     className={`block w-full text-left px-4 py-3 rounded-lg font-semibold text-base transition-colors ${
                       isActive
                         ? 'text-brand-amber bg-brand-gold-light/40 font-bold'
                         : 'text-brand-dark/90 hover:text-brand-amber hover:bg-brand-gold/5'
                     }`}
                  >
                     {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-brand-gold/15 flex flex-col gap-3 px-4">
                <div className="flex flex-col gap-1.5 text-xs font-mono">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">Customer Support</span>
                  <a 
                    href="tel:+254704804932" 
                    className="flex items-center gap-2 text-brand-dark hover:text-brand-amber transition-colors font-bold"
                  >
                    <Phone className="w-4 h-4 text-brand-amber shrink-0" />
                    <span>+254 704 804932</span>
                  </a>
                  <a 
                    href="mailto:support@mcarfix.com" 
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-amber transition-colors"
                  >
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>support@mcarfix.com</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSOSClick();
                  }}
                  className="w-full bg-brand-amber hover:bg-brand-amber-hover text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Request Emergency SOS</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
