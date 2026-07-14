/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MOCK_PRICING_ESTIMATES } from '../types';
import { AlertCircle, Wrench, Clock, Info, CheckCircle2 } from 'lucide-react';

export default function CostEstimator() {
  const [carType, setCarType] = useState('sedan');
  const [service, setService] = useState('engine');
  const [isCalculated, setIsCalculated] = useState(true);

  const handleSelectionChange = (type: string, val: string) => {
    if (type === 'car') setCarType(val);
    if (type === 'service') setService(val);
    setIsCalculated(true);
  };

  // Logic to determine cost details based on selections
  const getSelectedEstimate = () => {
    let queryName = '';
    if (service === 'engine') {
      queryName = 'Full Engine Service (Oil, Spark plugs, Filters)';
    } else if (service === 'brakes') {
      queryName = 'Front Brake Pad Replacement (Genuine Parts)';
    } else if (service === 'alignment') {
      queryName = 'Computerized Wheel Alignment & Balancing';
    } else if (service === 'gearbox') {
      queryName = 'Automatic Gearbox Fluid Flush (ATF)';
    }

    const matches = MOCK_PRICING_ESTIMATES.filter((est) => {
      if (est.serviceName !== queryName) return false;
      if (est.carType === 'All Vehicle Classes') return true;
      if (carType === 'sedan' && est.carType.includes('Sedan')) return true;
      if (carType === 'suv' && est.carType.includes('SUV')) return true;
      return false;
    });

    if (matches.length > 0) return matches[0];

    // Fallback default pricing
    return {
      id: 'fallback',
      serviceName: queryName || 'Automotive Inspection',
      carType: carType === 'sedan' ? 'Sedan' : 'SUV / Light Truck',
      minPrice: carType === 'sedan' ? 4000 : 7000,
      maxPrice: carType === 'sedan' ? 8000 : 13000,
      duration: '1 - 2 Hours',
      recommendation: 'Ensure standard diagnostic check is performed during inspection.',
    };
  };

  const currentEst = getSelectedEstimate();

  // Parts vs Labor split (Simulated breakdown)
  const partsPercentage = service === 'alignment' ? 20 : service === 'engine' ? 65 : 55;
  const laborPercentage = 100 - partsPercentage;
  
  const minPartsCost = Math.round((currentEst.minPrice * partsPercentage) / 100);
  const maxPartsCost = Math.round((currentEst.maxPrice * partsPercentage) / 100);
  const minLaborCost = currentEst.minPrice - minPartsCost;
  const maxLaborCost = currentEst.maxPrice - maxPartsCost;

  return (
    <div className="bg-white border border-brand-gold/15 rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Input Parameters */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block mb-1">Interactive Tool</span>
            <h3 className="font-display font-bold text-2xl text-brand-dark">Estimate Repair Costs</h3>
            <p className="text-sm text-brand-muted mt-1">
              Select your vehicle class and requested service to check local price ranges in Kenyan Shillings (KES).
            </p>
          </div>

          {/* Vehicle Type Picker */}
          <div>
            <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-2">Vehicle Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelectionChange('car', 'sedan')}
                className={`p-3.5 rounded-xl border text-sm font-medium transition-all text-center cursor-pointer ${
                  carType === 'sedan'
                    ? 'border-brand-amber bg-brand-amber/5 text-brand-dark font-extrabold shadow-md shadow-brand-amber/5'
                    : 'border-brand-gold/20 bg-brand-gold-light/40 text-brand-muted hover:border-brand-gold/40 hover:text-brand-dark'
                }`}
              >
                Sedan / Hatchback
              </button>
              <button
                type="button"
                onClick={() => handleSelectionChange('car', 'suv')}
                className={`p-3.5 rounded-xl border text-sm font-medium transition-all text-center cursor-pointer ${
                  carType === 'suv'
                    ? 'border-brand-amber bg-brand-amber/5 text-brand-dark font-extrabold shadow-md shadow-brand-amber/5'
                    : 'border-brand-gold/20 bg-brand-gold-light/40 text-brand-muted hover:border-brand-gold/40 hover:text-brand-dark'
                }`}
              >
                SUV / Crossover
              </button>
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-xs font-mono text-brand-muted uppercase tracking-wider mb-2">Select Service</label>
            <div className="space-y-2.5">
              {[
                { id: 'engine', label: 'Full Engine Service' },
                { id: 'brakes', label: 'Front Brake Pads Replacement' },
                { id: 'alignment', label: 'Wheel Alignment & Balancing' },
                { id: 'gearbox', label: 'Gearbox Fluid Flush (ATF)' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectionChange('service', s.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                    service === s.id
                      ? 'border-brand-amber bg-brand-amber/5 text-brand-dark'
                      : 'border-brand-gold/20 bg-white text-brand-muted hover:border-brand-gold/40 hover:text-brand-dark'
                  }`}
                >
                  <span className="font-semibold">{s.label}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${service === s.id ? 'border-brand-amber bg-brand-amber' : 'border-brand-gold/30'}`}>
                    {service === s.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-gold-light/40 border border-brand-gold/15 flex gap-3 text-xs text-brand-muted leading-relaxed">
            <Info className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
            <p>
              Prices are calculated using market indices from verified garages in Westlands, Industrial Area, and Mombasa Nyali. Actual service prices include a parts warranty.
            </p>
          </div>
        </div>

        {/* Output Estimation Card */}
        <div className="flex-1 bg-brand-gold-light/20 rounded-2xl border border-brand-gold/15 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold uppercase tracking-wider">
                  Verified Quote Range
                </span>
                <h4 className="font-display font-bold text-xl text-brand-dark mt-3 leading-tight">{currentEst.serviceName}</h4>
                <p className="text-xs font-mono text-brand-muted mt-1 uppercase tracking-wide">{currentEst.carType}</p>
              </div>
            </div>

            {/* Huge Price Gauge */}
            <div className="bg-white rounded-2xl p-6 border border-brand-gold/15 text-center relative overflow-hidden">
              <span className="text-xs font-mono text-brand-muted block mb-1">Estimated Cost Range</span>
              <div className="font-display text-2xl md:text-3.5xl font-extrabold text-brand-dark flex items-baseline justify-center gap-1.5">
                <span className="text-xs text-brand-amber font-mono">KES</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-amber">
                  {currentEst.minPrice.toLocaleString()} - {currentEst.maxPrice.toLocaleString()}
                </span>
              </div>

              {/* Slider Representation */}
              <div className="mt-4 relative h-2.5 bg-brand-gold-light rounded-full overflow-hidden">
                <div className="absolute left-[20%] right-[15%] h-full bg-gradient-to-r from-emerald-500 via-brand-amber to-amber-600 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-brand-muted mt-2">
                <span>Budget Grade</span>
                <span>Standard OEM Range</span>
                <span>Premium Quality</span>
              </div>
            </div>

            {/* Split Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-brand-gold/15">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-1 font-mono uppercase tracking-wider">
                  <Wrench className="w-3.5 h-3.5 text-brand-muted" />
                  <span>Labor Fee</span>
                </div>
                <p className="font-mono font-bold text-base text-brand-dark">
                  KES {minLaborCost.toLocaleString()} - {maxLaborCost.toLocaleString()}
                </p>
                <span className="text-[10px] text-brand-muted block mt-0.5">Approx. {laborPercentage}% of total</span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-brand-gold/15">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-1 font-mono uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-brand-muted" />
                  <span>Duration</span>
                </div>
                <p className="font-mono font-bold text-base text-brand-dark">{currentEst.duration}</p>
                <span className="text-[10px] text-brand-muted block mt-0.5">While-you-wait</span>
              </div>
            </div>

            {/* Kenyan Advice Column */}
            <div className="border-t border-brand-gold/10 pt-5">
              <span className="text-xs font-mono font-bold text-brand-amber tracking-wider uppercase block mb-2">
                Expert Recommendation
              </span>
              <p className="text-sm text-brand-dark leading-relaxed font-sans">
                {currentEst.recommendation}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-brand-gold/10 pt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-500/10 text-emerald-600 p-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs text-brand-muted font-medium">Free 6-Month Work Warranty</span>
            </div>
            
            <button
              onClick={() => {
                const element = document.getElementById('garages');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-brand-amber hover:bg-brand-amber-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-brand-amber/10 font-mono tracking-tight"
            >
              Find Repair Shops
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
