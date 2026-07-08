import React, { useState } from "react";
import { Calendar, Clock, Video, User, BadgeAlert, Award, ShieldAlert } from "lucide-react";
import { submitTechnicalConsultation } from "../api/technicalConsultationApi";

interface Consultant {
  name: string;
  role: string;
  exp: string;
  dept: string;
  pic: string;
}

const CONSULTANTS: Consultant[] = [
  {
    name: "Er. Ramesh Deshmukh",
    role: "Senior Lead Civil Engineer (Slabs & RCC)",
    exp: "24+ Years Field Exp",
    dept: "structural",
    pic: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150"
  },
  {
    name: "Ar. Sneha Pathak",
    role: "BIM Modeling & Spatial Coordinator",
    exp: "12+ Years CAD/VR Exp",
    dept: "bim",
    pic: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150"
  },
  {
    name: "Er. Vivek Shrivastava",
    role: "Licensing, PWD and Statutory Head",
    exp: "18+ Years Regulatory Exp",
    dept: "compliance",
    pic: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150"
  }
];



export const MeetingScheduler: React.FC = () => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [dept, setDept] = useState<string>("RCC_STRUCTURAL_DESIGN");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("TEN_TO_TWELVE");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientPhone || !date) {
      alert("Please enter all required scheduling parameters.");
      return;
    }

    setBookingLoading(true);

    try {
      const request = {
        consultationFocusArea: dept,
        meetingDate: date,
        timeSlot: time,
        fullName: clientName,
        contactNumber: clientPhone,
      };

      const response = await submitTechnicalConsultation(request);

      setBookingDetails({
        ticketId: response.data.ticketId, // or response.data.id
        name: clientName,
        phone: clientPhone,
        department: dept,
        date,
        time,
      });

      setIsBooked(true);;

      // Reset form
      setDept("RCC_STRUCTURAL_DESIGN");
      setDate("");
      setTime("TEN_TO_TWELVE");
      setClientName("");
      setClientPhone("");

      console.log(response.data);

    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ??
        "Unable to book the technical consultation."
      );

    } finally {
      setBookingLoading(false);
    }
  };

  // Generate simple next 4 business days
  const getDates = () => {
    const list = [];

    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      if (d.getDay() !== 0) { // Skip Sunday
        list.push({
          value: d.toISOString().split("T")[0], // 2026-07-10
          label: d.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }), // Sat, 10 Jul
        });
      }
    }

    return list;
  };

  const availableDates = getDates();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-sm overflow-hidden" id="meeting-scheduler">
      <div className="p-6 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2.5 bg-brand-orange text-white rounded-xl">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black tracking-tight">Virtual Technical Consulting Desk</h3>
            <p className="text-[10px] text-gray-300">Book an absolute direct callback or video session with our certified civil engineers</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!isBooked ? (
          <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-4">
              {/* Select Department */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                  1. Consultation Focus Area
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      id: "RCC_STRUCTURAL_DESIGN",
                      label: "RCC Structural Design",
                    },
                    {
                      id: "BIM_3D_WALKTHROUGH",
                      label: "BIM / 3D Walkthrough",
                    },
                    {
                      id: "PWD_STATUTORY_COMPLIANCE",
                      label: "PWD & Statutory Compliance",
                    },
                  ].map((dOption) => (
                    <button
                      type="button"
                      key={dOption.id}
                      onClick={() => setDept(dOption.id)}
                      className={`p-3 rounded-xl border text-[11px] font-bold text-center leading-tight transition-all ${dept === dOption.id
                        ? "border-brand-orange bg-orange-500/5 text-brand-orange"
                        : "border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      {dOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    2. Choose Meeting Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full text-xs font-bold p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-brand-orange focus:outline-none text-gray-700 dark:text-gray-300"
                  >
                    <option value="">Select Date Option</option>
                    {availableDates.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    3. Choose Time Window
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-brand-orange focus:outline-none text-gray-700 dark:text-gray-300"
                  >
                    <option value="TEN_TO_TWELVE">
                      10:00 AM - 12:00 PM
                    </option>

                    <option value="ONE_TO_THREE">
                      01:00 PM - 03:00 PM
                    </option>

                    <option value="FOUR_TO_SIX">
                      04:00 PM - 06:00 PM (Executive Hub)
                    </option>
                  </select>
                </div>
              </div>

              {/* Contact Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    4. Contact Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-brand-orange focus:outline-none text-gray-700 dark:text-gray-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    5. Callback Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      if (value.length <= 10) {
                        setClientPhone(value);
                      }
                    }}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="e.g. 9876543210"
                    className="w-full text-xs font-bold p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-brand-orange focus:outline-none text-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-3.5 bg-brand-orange hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
              >
                {bookingLoading
                  ? "Booking..."
                  : "Confirm Technical Callback Slot"}
              </button>
            </div>


          </form>
        ) : (
          <div className="p-8 text-center space-y-6 flex flex-col items-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-black text-brand-navy dark:text-white">Callback Slot Reserved!</h3>
              <p className="text-xs text-gray-400">Your consultation pass has been successfully registered on our corporate server.</p>
            </div>

            {/* Ticket representation */}
            <div className="w-full bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-gray-150 dark:border-slate-800 text-left space-y-3.5 font-mono text-[10px] relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 rounded-full border-r border-gray-200 dark:border-slate-800" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 rounded-full border-l border-gray-200 dark:border-slate-800" />

              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-gray-400">TICKET REF:</span>
                <span className="font-black text-brand-orange">ANK-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>

              <div className="space-y-1 text-gray-600 dark:text-gray-300">
                <p><strong>CLIENT:</strong> {bookingDetails?.name}</p>

                <p><strong>MOBILE:</strong> +91 {bookingDetails?.phone}</p>

                <p>
                  <strong>FOCUS AREA:</strong>{" "}
                  {{
                    RCC_STRUCTURAL_DESIGN: "RCC Structural Design",
                    BIM_3D_WALKTHROUGH: "BIM / 3D Walkthrough",
                    PWD_STATUTORY_COMPLIANCE: "PWD & Statutory Compliance",
                  }[bookingDetails?.department] ?? bookingDetails?.department}
                </p>

                <p>
                  <strong>DATE:</strong>{" "}
                  {bookingDetails?.date
                    ? new Date(bookingDetails.date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    : "-"}
                </p>

                <p>
                  <strong>TIME:</strong>{" "}
                  {{
                    TEN_TO_TWELVE: "10:00 AM - 12:00 PM",
                    ONE_TO_THREE: "01:00 PM - 03:00 PM",
                    FOUR_TO_SIX: "04:00 PM - 06:00 PM",
                  }[bookingDetails?.time] ?? bookingDetails?.time}
                </p>
              </div>

              <div className="text-center pt-2 text-[9px] text-emerald-500 font-bold uppercase tracking-wider">
                ● Live Google Meet Room Link Attached
              </div>
            </div>

            <button
              onClick={() => {
                setIsBooked(false);
                setBookingDetails(null);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Book Another Slot
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
