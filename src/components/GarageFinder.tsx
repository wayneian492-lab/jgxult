/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_GARAGES, Garage, KENYAN_CITIES } from '../types';
import { MapPin, Star, Phone, CheckCircle2, Search, Compass, ShieldCheck } from 'lucide-react';

interface GarageFinderProps {
  onBookClick: (garage: Garage) => void;
}

export default function GarageFinder({ onBookClick }: GarageFinderProps) {
  const [selectedCity, setSelectedCity] = useState<'Nairobi' | 'Mombasa' | 'Kisumu' | 'Nakuru' | 'Eldoret'>('Nairobi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGarageId, setSelectedGarageId] = useState<string | null>('g1');

  // Filtered Garages
  const filteredGarages = useMemo(() => {
    return MOCK_GARAGES.filter((g) => {
      const cityMatches = g.city === selectedCity;
      const searchMatches = 
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.services.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return cityMatches && searchMatches;
    });
  }, [selectedCity, searchTerm]);

  // Handle garage selection (updates card and map pin highlight)
  const handleSelectGarage = (id: string) => {
    setSelectedGarageId(id);
  };

  // Get active selected garage data
  const activeGarage = useMemo(() => {
    return MOCK_GARAGES.find((g) => g.id === selectedGarageId) || filteredGarages[0] || null;
  }, [selectedGarageId, filteredGarages]);

  // Map limits and coordinate scaling
  // We will map lat/lng into a standard 100x100 grid for representation on the custom SVG map
  const mapData = useMemo(() => {
    if (filteredGarages.length === 0) return [];
    
    // Auto-calculate bounds or use fixed ranges relative to Kenya's cities
    let latMin = -1.4, latMax = -1.2, lngMin = 36.6, lngMax = 36.9; // Nairobi default
    
    if (selectedCity === 'Mombasa') {
      latMin = -4.08; latMax = -4.01; lngMin = 39.63; lngMax = 39.72;
    } else if (selectedCity === 'Kisumu') {
      latMin = -0.15; latMax = -0.05; lngMin = 34.70; lngMax = 34.80;
    } else if (selectedCity === 'Nakuru') {
      latMin = -0.32; latMax = -0.25; lngMin = 36.00; lngMax = 36.10;
    }

    return filteredGarages.map((g) => {
      // Scale lat and lng into percentage offsets (0-100)
      const latRange = latMax - latMin;
      const lngRange = lngMax - lngMin;
      
      const y = latRange === 0 ? 50 : 100 - ((g.latitude - latMin) / latRange) * 100;
      const x = lngRange === 0 ? 50 : ((g.longitude - lngMin) / lngRange) * 100;

      return {
        ...g,
        mapX: Math.max(10, Math.min(90, x)), // clamp to keep pins fully visible
        mapY: Math.max(10, Math.min(90, y)),
      };
    });
  }, [filteredGarages, selectedCity]);

  return (
    <div className="space-y-8">
      {/* Search & City Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-brand-gold-light/40 p-4 border border-brand-gold/15 rounded-2xl">
        {/* City Toggles */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {KENYAN_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                setSearchTerm('');
                // Pick the first garage in the selected city as selected
                const firstInCity = MOCK_GARAGES.find((g) => g.city === city);
                setSelectedGarageId(firstInCity ? firstInCity.id : null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                selectedCity === city
                  ? 'bg-brand-amber text-white font-extrabold shadow-md shadow-brand-amber/10'
                  : 'text-brand-muted hover:text-brand-dark bg-white hover:bg-brand-gold-light/80 border border-brand-gold/10'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search mechanics, brakes, service..."
            className="w-full bg-white border border-brand-gold/25 rounded-xl pl-9 pr-4 py-2 text-sm text-brand-dark placeholder:text-brand-muted focus:outline-none focus:border-brand-amber transition-colors"
          />
        </div>
      </div>

      {/* Main Grid: List left, Map right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Directory List (Lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-3 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredGarages.length > 0 ? (
              filteredGarages.map((garage) => {
                const isSelected = selectedGarageId === garage.id;
                return (
                  <motion.div
                    key={garage.id}
                    onClick={() => handleSelectGarage(garage.id)}
                    className={`p-4 rounded-2xl border transition duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-white border-brand-amber shadow-xl shadow-brand-gold/10'
                        : 'bg-white/40 border-brand-gold/15 hover:bg-white/90 hover:border-brand-gold/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-base text-brand-dark">{garage.name}</h4>
                        {garage.isVerified && (
                          <div className="flex items-center gap-0.5 text-[9px] font-mono text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>VERIFIED</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-brand-muted">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-muted" />
                          <span>{garage.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
                          <span className="font-bold text-brand-dark">{garage.rating}</span>
                          <span className="text-brand-muted">({garage.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {garage.services.map((serv, index) => (
                          <span
                            key={index}
                            className="text-[10px] font-mono bg-brand-gold-light/60 text-brand-muted px-2 py-0.5 rounded-md border border-brand-gold/10"
                          >
                            {serv}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-stretch justify-end w-full sm:w-auto gap-2 border-t sm:border-t-0 border-brand-gold/10 pt-3 sm:pt-0">
                      <span className="text-right text-xs font-mono text-brand-muted font-medium self-center sm:self-end">
                        {garage.distance}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookClick(garage);
                        }}
                        className="flex-1 sm:flex-none bg-brand-amber hover:bg-brand-amber-hover text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer shadow-md shadow-brand-amber/5"
                      >
                        Book
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white border border-dashed border-brand-gold/25 rounded-3xl">
                <Compass className="w-10 h-10 text-brand-gold mx-auto mb-3 animate-spin" />
                <h4 className="font-display font-semibold text-brand-dark">No garages found in {selectedCity}</h4>
                <p className="text-xs text-brand-muted max-w-xs mx-auto mt-1">
                  Try adjusting your search terms or view other cities in Kenya.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom CSS/SVG Styled Interactive Map (Lg: 5 cols) */}
        <div className="lg:col-span-5 h-[350px] lg:h-[550px] bg-slate-950 rounded-3xl border border-slate-800/80 overflow-hidden relative shadow-inner">
          
          {/* Map Grid Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          
          {/* Active City Waterways contour */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {selectedCity === 'Mombasa' && (
              // Stylized Coastline/Creek for Mombasa
              <path
                d="M -20 120 Q 80 150 140 300 T 400 350 T 600 450 L 600 600 L -20 600 Z"
                fill="#1e1b4b"
                fillOpacity="0.4"
                className="transition duration-700"
              />
            )}
            {selectedCity === 'Kisumu' && (
              // Stylized Winam Gulf (Lake Victoria) contour
              <path
                d="M -20 300 Q 150 280 220 400 T 450 480 L -20 600 Z"
                fill="#1e1b4b"
                fillOpacity="0.4"
                className="transition duration-700"
              />
            )}
            
            {/* Draw Roads/Grid Line for a highly technical feel */}
            <path d="M 0 100 Q 150 150 500 120" stroke="#1e293b" strokeWidth="2" strokeDasharray="4" fill="none" />
            <path d="M 120 0 L 220 600" stroke="#1e293b" strokeWidth="1.5" fill="none" />
            <path d="M 0 320 H 600" stroke="#1e293b" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M 380 0 V 600" stroke="#1e293b" strokeWidth="1" fill="none" />
          </svg>

          {/* Map Indicators */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/95 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] font-mono tracking-wider font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>INTERACTIVE MAP: {selectedCity.toUpperCase()}</span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 bg-slate-900/90 border border-slate-800/80 px-2.5 py-1 rounded-lg text-[9px] font-mono text-slate-500">
            Scale: Local Directory Bounds
          </div>

          {/* Pins Overlay */}
          <div className="absolute inset-0">
            {mapData.map((pin) => {
              const isSelected = selectedGarageId === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => handleSelectGarage(pin.id)}
                  style={{
                    left: `${pin.mapX}%`,
                    top: `${pin.mapY}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none cursor-pointer"
                >
                  {/* Glowing Pulse Rings */}
                  {isSelected && (
                    <span className="absolute -inset-4 rounded-full bg-brand-amber/15 animate-ping border border-brand-amber/20" />
                  )}

                  {/* Marker Pin */}
                  <div
                    className={`p-2 rounded-full border transition duration-300 ${
                      isSelected
                        ? 'bg-brand-amber text-brand-dark scale-125 border-white shadow-xl shadow-brand-amber/40 z-30'
                        : 'bg-slate-900 text-brand-amber border-slate-750 group-hover:bg-slate-850 group-hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 group-hover:scale-100 transition-transform origin-bottom bg-slate-900 text-white text-[10px] font-semibold font-mono py-1 px-2.5 rounded-lg border border-slate-750 whitespace-nowrap shadow-xl z-40 pointer-events-none">
                    {pin.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom active garage preview overlay on mobile */}
          {activeGarage && (
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border border-slate-800 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md z-30">
              <div className="space-y-0.5">
                <h5 className="font-display font-extrabold text-sm text-white">{activeGarage.name}</h5>
                <p className="text-[10px] text-slate-400 font-mono">{activeGarage.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5 text-[9px] text-brand-amber">
                    <Star className="w-3 h-3 fill-brand-amber text-brand-amber" />
                    <span>{activeGarage.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">•</span>
                  <span className="text-[10px] text-slate-400 font-mono">{activeGarage.distance}</span>
                </div>
              </div>
              <button
                onClick={() => onBookClick(activeGarage)}
                className="bg-brand-amber hover:bg-brand-amber-hover text-brand-dark text-xs font-bold font-mono px-3 py-2 rounded-xl transition shadow-md cursor-pointer"
              >
                Book
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
