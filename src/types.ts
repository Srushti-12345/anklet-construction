export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedPoints: string[];
  imageUrl: string;
  iconName: string; // Used to look up Lucide icons dynamically
}

export interface Project {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Infrastructure" | "Architecture" | "Interiors";
  description: string;
  imageUrl: string;
  location: string;
  year: string;
  size: string;
  client: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
  submittedAt: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  focusArea: string;
  consultantName: string;
  preferredDate: string;
  timeSlot: string;
  submittedAt: string;
}
