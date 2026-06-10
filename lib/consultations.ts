export const serviceInquiryOptions = [
  "AI Automation Systems",
  "WhatsApp AI Agents",
  "Lead Generation Automation",
  "CRM Automation",
  "AI Chatbots",
  "Internal Business Automation",
  "Customer Support AI",
  "Infrastructure Consulting",
] as const;

export const timelineOptions = [
  "ASAP",
  "Within 30 days",
  "This quarter",
  "Just exploring",
] as const;

export const monthlyLeadOptions = [
  "Under 100 leads",
  "100 to 500 leads",
  "500 to 2,000 leads",
  "2,000+ leads",
] as const;

export const consultationStatuses = [
  "new",
  "contacted",
  "qualified",
  "proposal-sent",
  "closed",
] as const;

export type ServiceInquiryOption = (typeof serviceInquiryOptions)[number];
export type TimelineOption = (typeof timelineOptions)[number];
export type MonthlyLeadOption = (typeof monthlyLeadOptions)[number];
export type ConsultationStatus = (typeof consultationStatuses)[number];

export type ConsultationRequestInput = {
  name: string;
  email: string;
  company: string;
  phone?: string;
  serviceInterest: ServiceInquiryOption;
  timeline: TimelineOption;
  monthlyLeads: MonthlyLeadOption;
  message: string;
  website?: string;
  source?: string;
};

export type ConsultationRequestRecord = ConsultationRequestInput & {
  id: string;
  createdAt: string;
  status: ConsultationStatus;
  source: string;
  ipAddress: string;
  userAgent: string;
};

export type ConsultationValidationResult =
  | {
      success: true;
      data: ConsultationRequestInput;
    }
  | {
      success: false;
      errors: Partial<Record<keyof ConsultationRequestInput, string>>;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d\s()\-]{7,20}$/;

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function isAllowedValue<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return options.includes(value);
}

export function validateConsultationInput(payload: unknown): ConsultationValidationResult {
  const body = (payload ?? {}) as Record<string, unknown>;

  const data: ConsultationRequestInput = {
    name: normalizeText(body.name),
    email: normalizeText(body.email).toLowerCase(),
    company: normalizeText(body.company),
    phone: normalizeText(body.phone),
    serviceInterest: normalizeText(body.serviceInterest) as ServiceInquiryOption,
    timeline: normalizeText(body.timeline) as TimelineOption,
    monthlyLeads: normalizeText(body.monthlyLeads) as MonthlyLeadOption,
    message: normalizeText(body.message),
    website: normalizeText(body.website),
    source: normalizeText(body.source) || "website",
  };

  const errors: Partial<Record<keyof ConsultationRequestInput, string>> = {};

  if (data.website) {
    errors.website = "Spam check failed.";
  }

  if (data.name.length < 2 || data.name.length > 80) {
    errors.name = "Enter a name between 2 and 80 characters.";
  }

  if (!emailPattern.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (data.company.length < 2 || data.company.length > 120) {
    errors.company = "Enter a company name between 2 and 120 characters.";
  }

  if (data.phone && !phonePattern.test(data.phone)) {
    errors.phone = "Enter a valid phone number or leave this blank.";
  }

  if (!isAllowedValue(data.serviceInterest, serviceInquiryOptions)) {
    errors.serviceInterest = "Choose the service you are most interested in.";
  }

  if (!isAllowedValue(data.timeline, timelineOptions)) {
    errors.timeline = "Choose an implementation timeline.";
  }

  if (!isAllowedValue(data.monthlyLeads, monthlyLeadOptions)) {
    errors.monthlyLeads = "Choose the lead volume that fits best.";
  }

  if (data.message.length < 20 || data.message.length > 1200) {
    errors.message = "Share at least 20 characters about your automation goals.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data,
  };
}

