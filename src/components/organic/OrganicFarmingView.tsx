'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Layers,
  Bug,
  Droplets,
  TrendingUp,
  CheckCircle2,
  Circle,
  HelpCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  BookOpen,
  Sprout,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ORGANIC_FARMING_BENEFITS, ORGANIC_TRANSITION_STEPS } from '@/lib/agronomyData';

export const OrganicFarmingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'compost' | 'pest-management' | 'certification' | 'checklist' | 'faq'
  >('overview');

  const [checklist, setChecklist] = useState<
    { id: number; completed: boolean; title: string; desc: string }[]
  >(
    ORGANIC_TRANSITION_STEPS.map((step) => ({
      id: step.step,
      completed: step.step <= 3, // first 3 completed by default
      title: step.title,
      desc: step.description,
    }))
  );

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const faqs = [
    {
      q: 'Does organic farming always yield higher profits than conventional farming?',
      a: 'Not automatically. While organic produce often commands a 15–30% price premium in dedicated markets, initial transition years typically experience a 10–25% yield dip as biological soil equilibrium establishes. Profitability depends on lowering synthetic input costs, soil organic matter buildup, and establishing direct-to-consumer or certified premium sales channels.',
    },
    {
      q: 'Are all organic sprays completely non-toxic and harmless?',
      a: 'No. Just because an input is botanical or biological does not mean it is harmless. Concentrated copper fungicides can accumulate in soils if over-applied, and broad-spectrum botanical pyrethrins can affect non-target beneficial insects like honeybees. Always follow labeled dilution rates, spray at dusk when pollinators are inactive, and prioritize cultural and preventive practices.',
    },
    {
      q: 'How long does organic certification take?',
      a: 'Most global accredited certification bodies (such as USDA Organic, EU Organic, PGS-India, and Kenya Organic Standards) mandate a 24 to 36 month transition period from the date of the last prohibited synthetic chemical application before crops can be officially labeled and marketed as certified organic.',
    },
    {
      q: 'What is the optimal Carbon-to-Nitrogen (C:N) ratio for rapid composting?',
      a: 'A ratio of approximately 25:1 to 30:1 by weight is ideal. "Browns" (dry leaves, straw, sawdust) provide carbon, while "Greens" (fresh grass clippings, cow manure, kitchen scraps) provide nitrogen. Keep moisture at 50–60% (like a damp wrung-out sponge) and turn every 10–14 days to maintain aerobic thermophilic heat between 55°C and 65°C.',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#154734] to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>Master Agronomic Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Organic Farming: Benefits, Science & How to Do It
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            A comprehensive, practical roadmap to regenerating soil fertility, reducing input
            expenses, and producing nutrient-dense crops without synthetic chemicals.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto gap-2 text-xs font-semibold">
        {[
          { id: 'overview', label: '1. Fundamentals & Benefits' },
          { id: 'checklist', label: `2. 10-Step Transition (${progressPercent}%)` },
          { id: 'compost', label: '3. Composting & Soil' },
          { id: 'pest-management', label: '4. Natural IPM & Biocontrol' },
          { id: 'certification', label: '5. Certification & Standards' },
          { id: 'faq', label: '6. FAQs & Limitations' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-700 text-emerald-900 font-bold bg-emerald-50/50 rounded-t-xl'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Fundamentals & Benefits */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 5 Core Benefits from Requirements */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Core Agronomic Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ORGANIC_FARMING_BENEFITS.map((benefit, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1.5">{benefit.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Balanced Perspective: Realistic Limitations & Cautions */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Scientific Balance & Farming Realities</span>
            </div>
            <p className="leading-relaxed">
              Organic farming does not guarantee instant wealth or zero pest damage. Heavy insect
              outbreaks and severe fungal pressures require vigilant preventative biological
              controls. Soil biology takes 2 to 3 seasons to build robust disease-suppressive
              mechanisms. Plan your transition deliberately in phases.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: 10-Step Transition Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Interactive 10-Step Transition Checklist
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Track your farm's journey from baseline assessment to organic certification.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-56">
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Progress</span>
                  <span className="text-emerald-800">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-3.5">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    item.completed
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-emerald-700 hover:text-emerald-800 focus:outline-none shrink-0"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800">Step {item.id}.</span>
                      <h4
                        className={`text-xs font-bold ${
                          item.completed ? 'text-emerald-950' : 'text-gray-900'
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Composting & Soil Management */}
      {activeTab === 'compost' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              The Science of High-Quality Compost
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Proper aerobic composting destroys fungal spores and weed seeds through thermophilic
              microbial respiration, converting raw biomass into stable, bio-available humic
              substances.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                <p className="font-bold text-amber-900 mb-1">Browns (Carbon-Rich Material)</p>
                <p className="text-amber-800 mb-2">Target: 60–70% of total volume</p>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Dry maize stalks & shredded straw</li>
                  <li>Dried leaves & sawdust</li>
                  <li>Cardboard shreds (chemical-free)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <p className="font-bold text-emerald-900 mb-1">Greens (Nitrogen-Rich Material)</p>
                <p className="text-emerald-800 mb-2">Target: 30–40% of total volume</p>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Well-cured cow, poultry, or goat manure</li>
                  <li>Fresh grass clippings & green legume foliage</li>
                  <li>Vegetable cullings & kitchen plant scraps</li>
                </ul>
              </div>
            </div>

            {/* Vermicomposting box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <h4 className="font-bold text-gray-900 mb-1">
                Vermicomposting with Red Wigglers (Eisenia fetida)
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Earthworm castings contain 5x more available nitrogen, 7x more available phosphorus,
                and 11x more potassium than standard topsoil. Keep worm beds between 15°C and 25°C
                with 70% moisture and shaded ventilation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Natural IPM */}
      {activeTab === 'pest-management' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Integrated Pest Management (IPM) Matrix
            </h3>
            <p className="text-xs text-gray-600">
              Preventive biological suppression is the core of sustainable pest regulation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <p className="font-bold text-gray-900 mb-1">1. Cultural & Companion</p>
                <p className="text-gray-600">
                  Intercrop marigolds (Tagetes) to deter nematodes. Plant sweet alyssum to attract
                  beneficial hoverflies.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <p className="font-bold text-gray-900 mb-1">2. Biological Agents</p>
                <p className="text-gray-600">
                  Apply <em>Trichoderma viride</em> to prevent fungal root rots. Use{' '}
                  <em>Bacillus thuringiensis (Bt)</em> against chewing caterpillars.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <p className="font-bold text-gray-900 mb-1">3. Botanical Formulations</p>
                <p className="text-gray-600">
                  Cold-pressed Neem Seed Kernel Extract (NSKE 5%) or 0.5% neem oil emulsion with
                  mild liquid soap as an antifeedant.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Certification Standards */}
      {activeTab === 'certification' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
          <h3 className="text-base font-bold text-gray-900">Global & Regional Certification</h3>
          <p className="text-gray-600 leading-relaxed">
            Certification provides consumer verification that crops meet accredited organic
            standards.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl border border-gray-200 bg-slate-50 flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">Participatory Guarantee Systems (PGS)</p>
                <p className="text-gray-600 mt-0.5">
                  Cost-effective peer-review certification ideal for local direct-marketing, farmer
                  cooperatives, and regional farmer markets.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 bg-slate-50 flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900">Third-Party National Certification</p>
                <p className="text-gray-600 mt-0.5">
                  e.g., USDA NOP, India NPOP, Kenya Organic Standard (KOSt). Required for export and
                  commercial supermarket supply chains. Requires strict 36-month field audit logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FAQs */}
      {activeTab === 'faq' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-4 bg-gray-50/50 hover:bg-emerald-50/30 flex items-center justify-between text-xs font-bold text-gray-900 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="p-4 text-xs text-gray-600 bg-white border-t border-gray-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
