import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Facebook, 
  Instagram, 
  CalendarDays,
  FileText,
  History,
  Trash2
} from "lucide-react";
import { QuoteRequest, ConsultationRequest } from "../types";

interface ContactFormProps {
  activeTab?: "quote" | "consult";
  setActiveTab?: (tab: "quote" | "consult") => void;
  projectType?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  activeTab: controlledActiveTab,
  setActiveTab: controlledSetActiveTab,
  projectType
}) => {
  const [localActiveTab, setLocalActiveTab] = useState<"quote" | "consult">("quote");
  
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : localActiveTab;
  const setActiveTab = controlledSetActiveTab !== undefined ? controlledSetActiveTab : setLocalActiveTab;
  
  // Quote form state
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteType, setQuoteType] = useState("Residential Construction");
  const [quoteBudget, setQuoteBudget] = useState("50L - 1 Crore");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null);

  // Consultation form state
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultDate, setConsultDate] = useState("");
  const [consultTime, setConsultTime] = useState("10:00 AM - 12:00 PM");
  const [consultMessage, setConsultMessage] = useState("");
  const [consultSuccess, setConsultSuccess] = useState<string | null>(null);

  // Saved submissions history
  const [savedQuotes, setSavedQuotes] = useState<QuoteRequest[]>([]);
  const [savedConsults, setSavedConsults] = useState<ConsultationRequest[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const quotes = localStorage.getItem("anklet_quotes");
    const consults = localStorage.getItem("anklet_consults");
    if (quotes) setSavedQuotes(JSON.parse(quotes));
    if (consults) setSavedConsults(JSON.parse(consults));
  }, []);

  useEffect(() => {
    if (projectType && activeTab === "quote") {
      setQuoteType(projectType);
    }
  }, [projectType, activeTab]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quoteEmail || !quotePhone) return;

    const newQuote: QuoteRequest = {
      id: "QT-" + Math.floor(100000 + Math.random() * 900000),
      name: quoteName,
      email: quoteEmail,
      phone: quotePhone,
      projectType: quoteType,
      budget: quoteBudget,
      message: quoteMessage,
      submittedAt: new Date().toLocaleDateString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newQuote, ...savedQuotes];
    setSavedQuotes(updated);
    localStorage.setItem("anklet_quotes", JSON.stringify(updated));
    setQuoteSuccess(newQuote.id);

    // Reset fields
    setQuoteName("");
    setQuoteEmail("");
    setQuotePhone("");
    setQuoteMessage("");

    setTimeout(() => setQuoteSuccess(null), 8000);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultEmail || !consultPhone || !consultDate) return;

    const newConsult: ConsultationRequest = {
      id: "CS-" + Math.floor(100000 + Math.random() * 900000),
      name: consultName,
      email: consultEmail,
      phone: consultPhone,
      preferredDate: consultDate,
      timeSlot: consultTime,
      message: consultMessage,
      submittedAt: new Date().toLocaleDateString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newConsult, ...savedConsults];
    setSavedConsults(updated);
    localStorage.setItem("anklet_consults", JSON.stringify(updated));
    setConsultSuccess(newConsult.id);

    // Reset fields
    setConsultName("");
    setConsultEmail("");
    setConsultPhone("");
    setConsultDate("");
    setConsultMessage("");

    setTimeout(() => setConsultSuccess(null), 8000);
  };

  const clearHistory = () => {
    localStorage.removeItem("anklet_quotes");
    localStorage.removeItem("anklet_consults");
    setSavedQuotes([]);
    setSavedConsults([]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 xl:gap-10" id="contact-panel-wrapper">
      {/* LEFT COLUMN: Premium Active Inquiry Forms */}
      <div className="xl:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl border border-gray-100 dark:border-slate-700/60">
        
        {/* Tab Header Selector */}
        <div className="flex border-b border-gray-100 dark:border-slate-700 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("quote")}
            className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm uppercase tracking-wider relative transition-colors duration-200 cursor-pointer ${
              activeTab === "quote" 
                ? "text-brand-orange" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            Request a Quote
            {activeTab === "quote" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange rounded-full" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("consult")}
            className={`flex items-center gap-2 pb-4 px-4 font-bold text-sm uppercase tracking-wider relative transition-colors duration-200 cursor-pointer ${
              activeTab === "consult" 
                ? "text-brand-orange" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            Schedule Consultation
            {activeTab === "consult" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange rounded-full" />
            )}
          </button>
        </div>

        {/* Form rendering */}
        {activeTab === "quote" ? (
          <form onSubmit={handleQuoteSubmit} className="space-y-6" id="quote-request-form">
            {quoteSuccess && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Quote Ingress Received Successfully</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500/90 mt-1">
                    Your request was recorded under Ticket ID <strong>#{quoteSuccess}</strong>. Our senior quantity estimator will compile the preliminary engineering BOQ and contact you within 24 working hours.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@gmail.com"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 74149 38354"
                  value={quotePhone}
                  onChange={(e) => setQuotePhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Project Classification
                </label>
                <select
                  id="quote-project-type"
                  value={quoteType}
                  onChange={(e) => setQuoteType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                >
                  <option>Residential Construction</option>
                  <option>Commercial Construction</option>
                  <option>Infrastructure Development</option>
                  <option>Architectural Design</option>
                  <option>Interior Design & Turnkey Fitout</option>
                  <option>Civil Engineering Consultancy</option>
                  <option>Renovation & Structural Upgrade</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Estimated Project Budget (INR)
              </label>
              <select
                value={quoteBudget}
                onChange={(e) => setQuoteBudget(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
              >
                <option>Under 50 Lakhs</option>
                <option>50 Lakhs - 1 Crore</option>
                <option>1 Crore - 5 Crores</option>
                <option>5 Crores - 25 Crores</option>
                <option>Above 25 Crores (Corporate Scale)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Project Vision & Scope Specifications
              </label>
              <textarea
                rows={4}
                placeholder="Describe your design specifications, dimensions, locations, and material requirements..."
                value={quoteMessage}
                onChange={(e) => setQuoteMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-brand-navy dark:bg-brand-orange text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 dark:hover:bg-orange-600 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Submit Structural Quote Request
            </button>
          </form>
        ) : (
          <form onSubmit={handleConsultSubmit} className="space-y-6" id="consultation-booking-form">
            {consultSuccess && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Consultation Confirmed</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500/90 mt-1">
                    Your appointment is booked! Confirmation ID is <strong>#{consultSuccess}</strong>. Our corporate relationship team will send a calendar link with Google Meet credentials or coordinate a physical site visit.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sonal Deshmukh"
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sonal@deshmukh.com"
                  value={consultEmail}
                  onChange={(e) => setConsultEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={consultDate}
                  onChange={(e) => setConsultDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Time Slot Window
                </label>
                <select
                  value={consultTime}
                  onChange={(e) => setConsultTime(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
                >
                  <option>10:00 AM - 12:00 PM</option>
                  <option>01:00 PM - 03:00 PM</option>
                  <option>04:00 PM - 06:00 PM (Executive Hub)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 74149 38354"
                value={consultPhone}
                onChange={(e) => setConsultPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Consultation Topic & Project Context
              </label>
              <textarea
                rows={3}
                placeholder="Explain the technical topics or site parameters you would like to audit..."
                value={consultMessage}
                onChange={(e) => setConsultMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 focus:border-brand-orange focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm transition-colors focus:outline-none dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-brand-orange text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/10 hover:bg-orange-600 transition-all cursor-pointer"
            >
              <CalendarDays className="w-4 h-4" />
              Book Technical Consultation Session
            </button>
          </form>
        )}

        {/* --- DYNAMIC SUBMISSIONS LOG (LOCALPERSISTENCE) --- */}
        {(savedQuotes.length > 0 || savedConsults.length > 0) && (
          <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center justify-between w-full text-xs font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Active Inquiry History ({savedQuotes.length + savedConsults.length})
              </span>
              <span>{showHistory ? "Collapse" : "Expand"}</span>
            </button>

            {showHistory && (
              <div className="mt-4 space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin">
                {savedQuotes.map((q) => (
                  <div key={q.id} className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between font-bold text-gray-800 dark:text-gray-200">
                      <span className="text-brand-orange">Quote Ticket: {q.id}</span>
                      <span>{q.submittedAt}</span>
                    </div>
                    <p className="font-semibold text-gray-600 dark:text-gray-400 mt-1">{q.projectType} • Est. Budget: {q.budget}</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 italic">"{q.message || "No comments"}"</p>
                  </div>
                ))}
                
                {savedConsults.map((c) => (
                  <div key={c.id} className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between font-bold text-gray-800 dark:text-gray-200">
                      <span className="text-brand-navy dark:text-brand-orange">Consult Ticket: {c.id}</span>
                      <span>{c.submittedAt}</span>
                    </div>
                    <p className="font-semibold text-gray-600 dark:text-gray-400 mt-1">Date: {c.preferredDate} • Time: {c.timeSlot}</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 italic">"{c.message || "No comments"}"</p>
                  </div>
                ))}

                <button
                  onClick={clearHistory}
                  className="flex items-center gap-1 text-[10px] font-bold text-rose-500 hover:text-rose-600 uppercase tracking-wider ml-auto mt-2"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Contact Details & Google Map */}
      <div className="xl:col-span-5 space-y-6 lg:space-y-7 flex flex-col justify-between">
        <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-7 lg:p-8 xl:p-10 shadow-xl space-y-5 lg:space-y-6 flex-grow">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Corporate Office
            </span>
            <h4 className="text-2xl font-black tracking-tight mt-1 mb-4">
              Connect With Us
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Have questions regarding bid evaluations, structural plans, or project scheduling? Our client services executives and engineers are standing by.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl shrink-0">
                <Phone className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Contact Desk</p>
                <p className="font-bold text-white mt-0.5">+91 74149 38354</p>
                <p className="text-xs text-gray-300">+91 72198 55366</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl shrink-0">
                <Mail className="w-5 h-5 text-brand-orange" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Direct Email</p>
                <p className="font-bold text-white mt-0.5 text-xs sm:text-sm break-words leading-relaxed">ankletconstruction@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl shrink-0">
                <MapPin className="w-5 h-5 text-brand-orange" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Registered Office</p>
                <p className="font-bold text-white text-xs leading-relaxed mt-0.5 break-words">
                  Near Gajanan Maharaj Temple, At/Post Bharsingi, Taluka Narkhed, District Nagpur, Maharashtra – 441301, India
                </p>
                <p className="text-[9px] text-brand-orange font-black tracking-widest uppercase mt-1 break-words">
                  CIN: U43900MH2025PTC444223
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl shrink-0">
                <Clock className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Working Hours</p>
                <p className="font-bold text-white mt-0.5">Monday - Saturday</p>
                <p className="text-xs text-gray-300">09:00 AM - 06:30 PM (IST)</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Follow Brand Portals</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1LZ1jaKwE3/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-brand-orange p-3 rounded-xl transition-all duration-200">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.instagram.com/ankletconstruction?igsh=MXN3dHc3YzUxcGF6dg==" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-brand-orange p-3 rounded-xl transition-all duration-200">
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* GOOGLE MAP IFRAME CONTAINER */}
        <div className="bg-white dark:bg-slate-800 p-3 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden h-[280px] sm:h-[320px] lg:h-[360px]">
          <iframe
            title="ANKLET Headquarters location map"
            src="https://maps.google.com/maps?q=Near%20Gajanan%20Maharaj%20Temple,%20Bharsingi,%20Narkhed,%20Nagpur,%20Maharashtra%20441301&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "1.2rem" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
