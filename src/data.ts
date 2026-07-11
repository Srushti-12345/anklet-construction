import { Service, Project, ProcessStep, Testimonial, WhyChooseUsItem } from "./types";
import suryaHeritageVilla from "../assets/Surya Heritage Villa.jpeg";
import viraajCorporatePlaza from "../assets/Viraaj Corporate Plaza.jpeg";
import saarthExpresswayCorridor from "../assets/Saarth Expressway Corridor.jpeg";
import shriyanCulturalPavilion from "../assets/Shriyan Cultural Pavilion.jpeg";
import aaravExecutiveSuites from "../assets/Aarav Executive Suites.jpeg";
import nilayaCanopyResidences from "../assets/Nilaya Canopy Residences.jpeg";
import vikramMalhotraImg from "../assets/vikram-malhotra.avif";
import sonalDeshmukhImg from "../assets/sonal-deshmukh.jpg";
import rajeshGoelImg from "../assets/rajesh-goel.jpg";
import agriculturalInfra from "../assets/agricultural_infra.webp";

export const SERVICES_DATA: Service[] = [
  {
    id: "residential",
    title: "Residential Construction",
    subtitle: "Luxury Villas, Premium Homes & Turnkey Living",
    description: "Creating bespoke personal sanctuaries. From ultra-luxury architectural villas to modern sustainable residential estates, we manage the entire project lifecycle with unmatched craftsmanship and high-end materials.",
    detailedPoints: [
      "Custom luxury villa design and build",
      "Premium smart-home systems integration",
      "Eco-friendly, energy-efficient concrete and steel frameworks",
      "Seamless turnkey residential project execution"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    iconName: "Home"
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    subtitle: "High-Rise Office Hubs, Malls & Retail Spaces",
    description: "Designing and building commercial infrastructure that drives business growth. We deliver grade-A office spaces, premium retail centers, and modern corporate headquarters built for tomorrow's business demands.",
    detailedPoints: [
      "Grade-A commercial office buildings & business hubs",
      "High-end shopping centers and boutique retail fit-outs",
      "Acoustic, security, and smart building management systems",
      "Large-scale parking structures and multi-use facilities"
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    iconName: "Building2"
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    subtitle: "Roads, Highway Bridges & Public Sector Works",
    description: "Shaping national progress through robust heavy civil engineering. Our specialized infrastructure division constructs safe, reliable high-speed roads, land reclamation projects, and structural highway bridges.",
    detailedPoints: [
      "Heavy civil engineering and massive earthworks",
      "State-of-the-art arterial roads and paved highway construction",
      "Urban stormwater drainage and pipeline installations",
      "Public-private partnerships (PPP) and government civil contracts"
    ],
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800",
    iconName: "HardHat"
  },
  {
    id: "government-construction",
    title: "Government Construction",
    subtitle: "Public Works, Institutional Buildings & Civic Infrastructure",
    description: "Delivering compliant and durable public-sector projects with disciplined execution, transparent coordination, and a strong focus on long-term civic value. We support government and institutional developments from planning through handover.",
    detailedPoints: [
      "Public buildings and institutional facility construction",
      "Municipal and civic infrastructure development",
      "Strict regulatory compliance and project documentation",
      "Reliable delivery for government and public-sector contracts"
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    iconName: "HardHat"
  },
  {
    id: "architecture",
    title: "Architectural Design",
    subtitle: "2D & 3D Drafting, Structural Blueprints & Approvals",
    description: "Where visionary aesthetics meet structural logic. Our award-winning architectural team creates striking 2D layouts and photorealistic 3D visualizations, ensuring regulatory compliance and seamless engineering blueprints.",
    detailedPoints: [
      "Concept development & photorealistic 3D visual renders",
      "Full structural engineering calculations and load-bearing details",
      "Local municipal authority drawings and zoning approvals",
      "BIM (Building Information Modeling) project integration"
    ],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800",
    iconName: "Compass"
  },
  {
    id: "interior",
    title: "Interior Design",
    subtitle: "Luxury Corporate & Premium Residential Fit-Outs",
    description: "Transforming raw physical space into high-end immersive experiences. We provide premium design conceptualization, custom-fabricated furniture, bespoke lighting designs, and complete turnkey fit-outs.",
    detailedPoints: [
      "Custom premium loose and fixed luxury millwork",
      "Bespoke ceiling, acoustic wall panels, and indirect lighting setups",
      "Curation of high-end global materials, textiles, and marbles",
      "Fast-track corporate workstation and luxury boardroom fit-outs"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    iconName: "Palette"
  },
  {
    id: "civil-consultancy",
    title: "Civil Engineering Consultancy",
    subtitle: "Project Audits, Cost Estimation & Supervisions",
    description: "Providing elite technical and financial oversight to secure project returns. Our certified consultants handle precision quantity estimation, structural health audits, safety compliance, and rigorous site supervision.",
    detailedPoints: [
      "High-precision quantity surveying & Bill of Quantities (BOQ)",
      "Independent structural integrity audits & seismic checking",
      "Daily project schedule tracking and contractor monitoring",
      "Rigorous quality assurance and workplace safety compliance"
    ],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
    iconName: "ClipboardCheck"
  },
  {
    id: "renovation",
    title: "Renovation & Structural Upgradations",
    subtitle: "Historical Restoration, Modernization & Remediation",
    description: "Breathing new life into existing assets. We perform complex structural retrofitting, architectural modernization, carbon fiber reinforcements, and energy-efficient retrofitting to maximize property asset values.",
    detailedPoints: [
      "Seismic and structural reinforcing using advanced polymers",
      "Facilitating complete building facade modernization and replacements",
      "Upgrading historic structures with energy-efficient smart systems",
      "Remodeling high-end spaces with minimal occupant disturbance"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
    iconName: "Wrench"
  }
  ,
  {
    id: "agricultural-infrastructure",
    title: "Agricultural Infrastructure",
    subtitle: "Farm Roads, Irrigation, Storage & Farm Structures",
    description: "Comprehensive agricultural infrastructure solutions to improve farm productivity, water management, and on-farm logistics. We deliver civil works tailored for agricultural operations with durable, low-maintenance construction.",
    detailedPoints: [
      "Farm Roads & Internal Roads",
      "Irrigation Canal Construction",
      "Water Storage Tanks & Reservoirs",
      "Land Development & Earthwork",
      "Farm Sheds & Warehouses",
      "Drainage Systems",
      "Boundary Walls & Fencing",
      "Greenhouse & Polyhouse Structures"
    ],
    imageUrl: agriculturalInfra,
    iconName: "Home"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Surya Heritage Villa",
    category: "Residential",
    description: "An award-winning architectural masterpiece utilizing cantilevered raw concrete, massive high-performance double-glazed glass panels, and seamless indoor-outdoor living channels with a natural stone water court.",
    imageUrl: suryaHeritageVilla,
    location: "Alibaug, Maharashtra",
    year: "2025",
    size: "12,500 Sq. Ft.",
    client: "Dr. Aditya Singhania, Chairman, Singhania Estates"
  },
  {
    id: "proj-2",
    title: "Viraaj Corporate Plaza",
    category: "Commercial",
    description: "A premium 12-story high-end corporate headquarters featuring a distinctive double-skin smart ventilated glass facade, high-efficiency geothermal HVAC systems, and flexible column-free modular office wings.",
    imageUrl: viraajCorporatePlaza,
    location: "BKC, Mumbai",
    year: "2024",
    size: "280,000 Sq. Ft.",
    client: "Aether Capital Partners, Mumbai"
  },
  {
    id: "proj-3",
    title: "Saarth Expressway Corridor",
    category: "Infrastructure",
    description: "A critical 14km high-speed arterial concrete highway development featuring two multi-span prestressed concrete bridges, automated traffic surveillance integrations, and extensive soil-reinforcement civil works.",
    imageUrl: saarthExpresswayCorridor,
    location: "Pune-Bengaluru Corridor",
    year: "2025",
    size: "14 Kilometers",
    client: "Ministry of Road Transport & Highways, Government of India"
  },
  {
    id: "proj-4",
    title: "Shriyan Cultural Pavilion",
    category: "Architecture",
    description: "A striking public structure featuring parametric curves, custom-cast self-compacting architectural white concrete, and a monumental spiraling central core connecting multi-level art galleries.",
    imageUrl: shriyanCulturalPavilion,
    location: "New Delhi, NCR",
    year: "2023",
    size: "45,000 Sq. Ft.",
    client: "Delhi Heritage Commission, Government of NCT Delhi"
  },
  {
    id: "proj-5",
    title: "Aarav Executive Suites",
    category: "Interiors",
    description: "A high-end luxury office suite featuring solid Calacatta marble slab partitionings, custom acoustic curved walnut millwork, automated smart ambient scene lighting, and premium Italian luxury furnishings.",
    imageUrl: aaravExecutiveSuites,
    location: "GIFT City, Gujarat",
    year: "2025",
    size: "18,500 Sq. Ft.",
    client: "Vanguard Trust Advisory, GIFT City"
  },
  {
    id: "proj-6",
    title: "Nilaya Canopy Residences",
    category: "Residential",
    description: "A private cluster of 6 hyper-luxury timber-and-glass forest villas harmonized with direct views of the natural landscape, featuring private infinity salt-water plunge pools and rainwater harvesting infrastructures.",
    imageUrl: nilayaCanopyResidences,
    location: "Khandala, Maharashtra",
    year: "2024",
    size: "54,000 Sq. Ft. (Total)",
    client: "Anklet Developers Group, Pune"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description: "Collaborative discovery & strategic goal mapping.",
    details: "We start with a thorough analysis of your vision, timeline, and economic parameters. Our senior leadership and design architects meet to outline project feasibility, regulatory boundaries, and target scopes."
  },
  {
    number: "02",
    title: "Design",
    description: "BIM modeling & architectural visual planning.",
    details: "Our engineering and architectural studio translates concepts into high-fidelity 3D structural designs and 2D blueprints. This phase establishes materials, visual textures, spatial configurations, and early-stage aesthetic sign-offs."
  },
  {
    number: "03",
    title: "Planning",
    description: "Detailed quantity surveying, approvals & scheduling.",
    details: "We map out precision Bill of Quantities (BOQs), establish material supply chains, procure municipal and structural clearance permits, and construct critical path network charts to guarantee timely handover schedules."
  },
  {
    number: "04",
    title: "Construction",
    description: "Engineering execution with state-of-the-art standards.",
    details: "Under the direct daily oversight of our seasoned site managers and civil engineers, heavy machinery and custom craftsmen bring the design to life, following rigid structural safety codes and using materials of the highest grade."
  },
  {
    number: "05",
    title: "Quality Inspection",
    description: "Non-destructive testing & rigid verification.",
    details: "Nothing is left to chance. Our dedicated QA/QC audit teams conduct compressive concrete core strength tests, thermal insulation analyses, acoustic calibrations, and finish-quality compliance checks before approvals."
  },
  {
    number: "06",
    title: "Handover",
    description: "Bespoke walkthrough & operational setup.",
    details: "We transition the finished masterpiece to you, accompanied by full structural guarantees, utility system operating manuals, 'as-built' architectural documentation, and professional occupancy permits."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Vikram Malhotra",
    role: "Managing Director",
    company: "Aether Capital Group",
    content: "Working with ANKLET on our corporate headquarters was an absolute revelation. They delivered a complex, 12-story high-tech building on BKC 2 weeks ahead of our aggressive schedule. Their transparency and engineering precision are unmatched in the Indian market. Highly recommended for premium corporate assets.",
    rating: 5,
    imageUrl: vikramMalhotraImg
  },
  {
    id: "test-2",
    name: "Dr. Sonal Deshmukh",
    role: "Founder & Chief Architect",
    company: "Deshmukh & Associates",
    content: "As an architect, finding a general builder who respects the micro-details of a complex layout is incredibly rare. ANKLET's engineering team executed our parametric structural designs with complete mathematical precision. Their structural concrete pours and finishes were perfect on first delivery.",
    rating: 5,
    imageUrl: sonalDeshmukhImg
  },
  {
    id: "test-3",
    name: "Rajesh K. Goel",
    role: "Chief Technical Officer",
    company: "National Highway Developers Ltd",
    content: "The heavy infrastructure division at ANKLET managed our expressway bridge project with exemplary professionalism. From rapid soil stabilization to prestressed girder installation under severe weather, their safety protocols, technical consultancy, and execution speed set a gold standard.",
    rating: 5,
    imageUrl: rajeshGoelImg
  }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: "end-to-end",
    title: "End-to-End Project Solutions",
    description: "From early architectural sketch to concrete pour to custom interior millwork, we manage everything in-house under a single point of responsibility.",
    iconName: "Maximize"
  },
  {
    id: "tech-team",
    title: "Experienced Technical Team",
    description: "Over 25+ senior civil, mechanical, and MEP engineers working in tandem with award-winning architects to solve complex load-bearing issues.",
    iconName: "Users"
  },
  {
    id: "quality-standards",
    title: "Quality Construction Standards",
    description: "We use top-grade cement, corrosion-resistant steel, and multi-layer water repellencies, verified by independent testing laboratories.",
    iconName: "ShieldCheck"
  },
  {
    id: "timely-delivery",
    title: "Timely Project Delivery",
    description: "Leveraging state-of-the-art Gantt scheduling and BIM trackers to forecast bottlenecks and ensure key handovers are met exactly as promised.",
    iconName: "CalendarDays"
  },
  {
    id: "transparent",
    title: "Transparent & Professional Approach",
    description: "No hidden charges, zero compromise on contracts. We utilize a secure online client portal to share real-time progress photo logs and cashflows.",
    iconName: "Eye"
  },
  {
    id: "customized",
    title: "Customized Designs",
    description: "No cookie-cutter templates. Every residence, workspace, or infrastructure asset is custom-tailored to the specific micro-environment.",
    iconName: "FileSpreadsheet"
  },
  {
    id: "cost-effective",
    title: "Cost-Effective Solutions",
    description: "Through deep procurement agreements with leading global steel, glass, and cement suppliers, we transfer substantial material savings directly to you.",
    iconName: "BadgeIndianRupee"
  }
];
