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
  quoteId: string;
  name: string;
  fullName: string;
  email: string;
  emailAddress: string;
  phone: string;
  contactNumber: string;
  projectType: string;
  projectClassification: string;
  budget: string;
  estimatedProjectBudget: string;
  message: string;
  projectVisionScopeSpecifications: string;
  submittedAt: string;
  status?: "NEW" | "CONTACTED" | "COMPLETED" | "CLOSED";
}

export interface ConsultationRequest {
  id: string;
  consultationId: string;
  name: string;
  fullName: string;
  email: string;
  emailAddress: string;
  phone: string;
  contactNumber: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
  consultationTopic: string;
  submittedAt: string;
  status?: "NEW" | "CONTACTED" | "COMPLETED" | "CLOSED";
}

export interface CallbackRequest {
  id: string;
  technicalConsultationId: string;
  name: string;
  fullName: string;
  phone: string;
  contactNumber: string;
  focusArea: string;
  consultationFocusArea: string;
  consultantName?: string;
  preferredDate: string;
  meetingDate?: string;
  timeSlot: string;
  submittedAt: string;
  status?: "NEW" | "CONTACTED" | "COMPLETED" | "CLOSED";
}
