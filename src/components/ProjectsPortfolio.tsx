import React, { useState } from "react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import { 
  X, 
  MapPin, 
  Calendar, 
  Building, 
  Maximize2, 
  User, 
  ArrowRight,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type CategoryFilter = "All" | "Residential" | "Commercial" | "Infrastructure" | "Architecture" | "Interiors";

type ProjectsPortfolioProps = {
  onConsultNow?: () => void;
};

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({ onConsultNow }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: CategoryFilter[] = [
    "All",
    "Residential",
    "Commercial",
    "Infrastructure",
    "Architecture",
    "Interiors"
  ];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  return (
    <div className="py-12">
      {/* Category Filter Navigation */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-12">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-gray-100 dark:border-slate-800/80 mr-2">
          <Filter className="w-4 h-4 text-brand-orange" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            Filter Portfolio
          </span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeCategory === category
                ? "bg-brand-navy text-white dark:bg-brand-orange dark:text-white shadow-lg shadow-brand-navy/10 dark:shadow-brand-orange/20 scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:border-brand-orange hover:text-brand-orange dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700/80 dark:hover:border-brand-orange"
            }`}
            id={`filter-btn-${category.toLowerCase()}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry-Style Responsive Portfolio Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        id="portfolio-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl bg-slate-900 aspect-4/3 cursor-pointer shadow-lg"
              onClick={() => setSelectedProject(project)}
              id={`project-item-${project.id}`}
            >
              {/* Image zoom effect */}
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-100 group-hover:brightness-105"
              />

              {/* Luxury dark gradient overlay (revealed on hover or mobile) */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

              {/* Decorative Corner Accent */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
                  {project.category}
                </span>
              </div>

              {/* Text content absolute position at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-1">
                  Featured Landmark
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 group-hover:text-brand-orange transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                  {project.description}
                </p>

                {/* Hover view button */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Project Specs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Projects Found */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No projects found in this category.</p>
        </div>
      )}

      {/* Immersive Project Specs Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 dark:border-slate-800 flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[85vh]"
              id="project-detail-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition-colors cursor-pointer"
                id="close-project-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: High-Resolution Portfolio Photo (50% Width) */}
              <div className="lg:w-1/2 relative h-60 lg:h-auto min-h-75 overflow-hidden">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-slate-950/75 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <span className="bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                    {selectedProject.category} Portfolio
                  </span>
                  <h3 className="text-3xl font-black text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-300 mt-2 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Structural Metrics & Summary (50% Width) */}
              <div className="lg:w-1/2 p-6 sm:p-10 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">
                    Project Architectural Sheet
                  </span>
                  <h4 className="text-xl font-black text-brand-navy dark:text-white mt-1 mb-6">
                    Engineering Specifications
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
                    {selectedProject.description} Designed with structural durability and luxury corporate appeal, this landmark was built to achieve strict green-building codes and high seismic-resistance safety factors.
                  </p>

                  {/* Corporate Project Metrics Grid */}
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Architectural Data
                  </h5>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                      <Building className="w-5 h-5 text-brand-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Client Account</p>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{selectedProject.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                      <Maximize2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Project Volume</p>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{selectedProject.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                      <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Geographic Site</p>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{selectedProject.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                      <Calendar className="w-5 h-5 text-brand-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Handover Year</p>
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{selectedProject.year}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Inquiry Quote box */}
                <div className="bg-orange-500/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-brand-orange/20 mt-auto">
                  <div>
                    <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">
                      Love this design concept?
                    </p>
                    <p className="text-sm font-black text-brand-navy dark:text-white mt-0.5">
                      Consult on custom-building a similar structure.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      if (onConsultNow) {
                        onConsultNow();
                        window.setTimeout(() => {
                          const selectEl = document.getElementById("quote-project-type") as HTMLSelectElement | null;
                          if (selectEl && selectedProject) {
                            selectEl.value = selectedProject.category;
                          }
                        }, 150);
                        return;
                      }

                      const element = document.getElementById("contact");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        const selectEl = document.getElementById("quote-project-type") as HTMLSelectElement | null;
                        if (selectEl && selectedProject) {
                          selectEl.value = selectedProject.category;
                        }
                      }
                    }}
                    className="w-full sm:w-auto bg-brand-navy hover:bg-slate-800 dark:bg-brand-orange dark:hover:bg-orange-600 text-white text-xs font-extrabold tracking-wider uppercase px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Consult Now
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
