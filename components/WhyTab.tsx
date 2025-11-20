
import React from 'react';
import { AlertTriangle, Heart, Users, Tablet } from 'lucide-react';

export const WhyTab: React.FC = () => {
  return (
    <div className="px-6 py-8 space-y-10 max-w-screen-md mx-auto pb-24 text-slate-300">
      
      {/* Section 1: Awareness */}
      <section className="space-y-4">
        <div className="flex items-center space-x-3 text-teal-400 mb-2">
          <div className="p-2 bg-teal-900/30 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Digital Awareness</h2>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/60 shadow-sm">
          <p className="mb-4 leading-relaxed text-slate-300">
            Today’s mobile-first world exposes children to highly stimulating content, algorithm-driven platforms, and constant notifications. These fast-cut, addictive video formats can lead to:
          </p>
          <ul className="space-y-2 text-slate-400 mb-4">
            <li className="flex items-center space-x-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-400/60"></span>
               <span>Shortened attention spans</span>
            </li>
            <li className="flex items-center space-x-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-400/60"></span>
               <span>Constant distraction</span>
            </li>
            <li className="flex items-center space-x-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-400/60"></span>
               <span>Device dependency</span>
            </li>
          </ul>
          <p className="font-medium text-teal-100/90 border-l-2 border-teal-500/50 pl-3 italic">
            Stillness exists to raise awareness that these patterns are real, widespread, and deeply affecting children’s cognitive development.
          </p>
        </div>
      </section>

      {/* Section 2: Alternative Content */}
      <section className="space-y-4">
        <div className="flex items-center space-x-3 text-teal-400 mb-2">
          <div className="p-2 bg-teal-900/30 rounded-lg">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Healthier Alternatives</h2>
        </div>
        <div className="space-y-4 leading-relaxed">
          <p>
            There are healthier, calmer alternatives to mainstream overstimulating digital platforms. The goal is not to remove all screens, but to shift toward <span className="text-teal-300 font-medium">healthier screen experiences</span>.
          </p>
          <p>
            Parents must be mindful, intentional, and involved in choosing content. Stillness demonstrates what curated, non-addictive content looks like.
          </p>
        </div>
      </section>

      {/* Section 3: Educators & Creators */}
      <section className="space-y-4">
        <div className="flex items-center space-x-3 text-teal-400 mb-2">
          <div className="p-2 bg-teal-900/30 rounded-lg">
             <Users className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Curated from Experts</h2>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/60 shadow-sm">
          <p>
            Our content is sourced from Instagram creators, educators, awareness-focused pages, and individuals who share research-backed insights on digital well-being.
          </p>
          <p className="mt-4 text-sm text-slate-500 italic">
            Stillness is a curation tool, not a content factory. We acknowledge and appreciate these creators for their valuable work.
          </p>
        </div>
      </section>

      {/* Section 4: Daptar Project */}
      <section className="space-y-4">
        <div className="flex items-center space-x-3 text-teal-400 mb-2">
          <div className="p-2 bg-teal-900/30 rounded-lg">
            <Tablet className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The Daptar Project</h2>
        </div>
        <div className="space-y-5">
          <p className="leading-relaxed">
            <strong>Daptar (दप्तर)</strong> reimagines the tablet as a school bag to solve five major problems affecting children today:
          </p>
          <ul className="grid grid-cols-1 gap-2.5">
             {[
               "Mobile phone addiction & distraction",
               "Child safety in digital environments",
               "Physical & mental health impacts of device use",
               "Digital literacy and skill-building",
               "Accessibility of age-appropriate digital devices"
             ].map((item, i) => (
               <li key={i} className="flex items-start space-x-3 text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                 <span className="text-teal-500 font-bold mt-0.5">•</span>
                 <span className="leading-snug">{item}</span>
               </li>
             ))}
          </ul>
          
          <div className="pt-2">
            <a 
              href="https://daptar.digital/blog/posts/daptar-tablet-ask-for-collaboration/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-full px-6 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-900/20 hover:shadow-teal-900/40"
            >
              <span>Read about Daptar Tablet</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
