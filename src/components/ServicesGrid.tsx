import React, { useState } from "react";
import { SERVICES_DATA } from "../data";
import { Service } from "../types";
import { 
  Home, 
  Building2, 
  HardHat, 
  Compass, 
  Palette, 
  ClipboardCheck, 
  Wrench, 
  ArrowRight, 
  X, 
  CheckCircle2,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Helper to resolve Lucide icons dynamically
const IconResolver = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "Home":
      return <Home className={className} />;
    case "Building2":
      return <Building2 className={className} />;
    case "HardHat":
      return <HardHat className={className} />;
    case "Compass":
      return <Compass className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "ClipboardCheck":
      return <ClipboardCheck className={className} />;
    case "Wrench":
      return <Wrench className={className} />;
    default:
      return <HardHat className={className} />;
  }
};

export const ServicesGrid: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Sub-items based on user requirements for each service ID
  const getSubitems = (id: string) => {
    switch (id) {
      case "residential":
        return ["Luxury Villas", "Premium Homes", "Affordable Housing", "Turnkey Solutions"];
      case "commercial":
        return ["Office Buildings", "Shopping Complexes", "Business Hubs", "Retail Spaces"];
      case "infrastructure":
        return ["Roads & Highways", "Site Development", "Industrial Parks", "Government Civil Works"];
      case "government-construction":
        return ["Public Buildings", "Civic Infrastructure", "Regulatory Compliance", "Institutional Projects"];
      case "architecture":
        return ["2D & 3D Design Drafting", "Engineering Blueprints", "Structural Load Planning", "Municipal Authority Approval Drawings"];
      case "interior":
        return ["Residential Interior Curation", "Commercial Office Layouts", "Bespoke Space Planning", "Turnkey Fit-outs & Carpentry"];
      case "civil-consultancy":
        return ["Elite Project Management", "Precise Quantity Estimation & BOQ", "Rigorous Construction Supervision", "Expert Technical Auditing"];
      case "renovation":
        return ["Home & Office Remodeling", "Structural Retrofitting", "Commercial Modernization", "General Maintenance Plans"];
      default:
        return ["Luxury Projects", "Engineering Design", "Supervision", "Premium Quality"];
    }
  };

  const handleInquire = (serviceTitle: string, tab: "quote" | "consult" = "quote") => {
    // Close the modal first so the overlay can unmount (AnimatePresence exit animation)
    setSelectedService(null);

    // Wait for the modal exit animation to finish before scrolling/dispatching
    const WAIT_MS = 550; // matches modal transition duration (500ms) plus small buffer
    setTimeout(() => {
      // Ensure URL hash points to contact as a robust fallback (browser will jump)
      try {
        window.location.hash = "#contact-panel-wrapper";
      } catch (e) {
        // ignore
      }

      // Try to find known contact anchors and scroll to them
      const contactEl = document.getElementById("contact-panel-wrapper") || document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Pre-fill project type select if present
      const input = document.getElementById("quote-project-type") as HTMLSelectElement;
      if (input) {
        input.value = serviceTitle;
        // trigger change event if needed
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }

      // Dispatch a custom event so the ContactForm can switch tabs or prefill state
      try {
        const evt = new CustomEvent("anklet-set-contact-tab", { detail: { tab: tab, projectType: serviceTitle } });
        window.dispatchEvent(evt);
      } catch (e) {
        // noop
      }
    }, WAIT_MS);
  };

  return (
    <div className="py-12">
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
        {SERVICES_DATA.map((service, index) => {
          const subitems = getSubitems(service.id);
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700/50 flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedService(service)}
              id={`service-card-${service.id}`}
            >
              {/* Image Banner with overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent" />
                
                {/* Float Icon Badge */}
                <div className="absolute top-4 left-4 bg-brand-orange text-white p-3.5 rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                  <IconResolver name={service.iconName} className="w-6 h-6" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                    {service.subtitle.split(',')[0]}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-brand-orange transition-colors duration-200">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Subcategories Tags */}
                <div className="border-t border-gray-100 dark:border-slate-700/80 pt-4 mt-auto">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Specializations & Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {subitems.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-3 py-1.5 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg group-hover:bg-orange-500/10 group-hover:text-brand-orange transition-colors duration-200"
                      >
                        {sub}
                      </span>
                    ))}
                    
                  </div>
                </div>

                {/* Learn More link */}
                <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-700 flex justify-between items-center text-sm font-bold text-brand-navy dark:text-white group-hover:text-brand-orange transition-colors duration-200">
                  <span>View Details & Specs</span>
                  <div className="bg-gray-100 dark:bg-slate-700 group-hover:bg-brand-orange group-hover:text-white p-2 rounded-full transition-all duration-300">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modern Spec Modal Detail Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-900/85 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
              id="service-detail-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-colors cursor-pointer"
                id="close-service-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Cinematic Banner (45% Width) */}
              <div className="md:w-[45%] relative h-48 md:h-auto overflow-hidden">
                <img
                  src={selectedService.imageUrl}
                  alt={selectedService.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="bg-brand-orange text-white w-fit p-3.5 rounded-2xl shadow-lg mb-4">
                    <IconResolver name={selectedService.iconName} className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-1">
                    Premium Solutions
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-2 italic leading-relaxed">
                    "{selectedService.subtitle}"
                  </p>
                </div>
              </div>

              {/* Right Column: High-Fidelity Specs & Lists (55% Width) */}
              <div className="md:w-[55%] p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">
                    Corporate Specification
                  </span>
                  <h4 className="text-xl font-black text-brand-navy dark:text-white mt-1 mb-4">
                    Execution Framework & Scope
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {selectedService.description} At ANKLET Construction & Infrastructure, we operate with a stringent zero-compromise approach, fusing robust materials with advanced BIM coordination to de-risk key construction schedules.
                  </p>

                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-brand-orange" />
                    Deliverables & Technical Work scope
                  </h5>
                  <ul className="space-y-3 mb-8">
                    {selectedService.detailedPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                    {getSubitems(selectedService.id).map((sub, idx) => (
                      <li key={`sub-${idx}`} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 ml-1">
                        <span className="text-brand-orange font-bold mr-1">•</span>
                        <span>{sub} (As-built execution available)</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Block */}
                <div className="bg-gray-50 dark:bg-slate-800/60 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-100 dark:border-slate-800 mt-auto">
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                      Need a technical quote?
                    </p>
                    <p className="text-sm font-bold text-brand-navy dark:text-white">
                      Receive an engineering BOQ estimate.
                    </p>
                  </div>
                  <button
                    onClick={() => handleInquire(selectedService.title)}
                    className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white text-xs font-extrabold tracking-wider uppercase px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Consult & Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
