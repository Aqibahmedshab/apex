import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarClock,
  ChartColumnBig,
  CircleCheckBig,
  Cpu,
  DatabaseZap,
  Gauge,
  Handshake,
  HeartHandshake,
  House,
  Layers3,
  LifeBuoy,
  MessageSquareText,
  MessagesSquare,
  PhoneCall,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UsersRound,
  Workflow,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  detail: string;
};

export type AgentNode = {
  title: string;
  role: string;
  output: string;
};

export type ServiceCard = {
  title: string;
  description: string;
  metric: string;
  cta: string;
  icon: LucideIcon;
};

export type CaseStudy = {
  title: string;
  niche: string;
  before: string;
  after: string;
  uplift: string;
  response: string;
  impact: string;
};

export type PricingTier = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  features: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "#features" },
  { label: "Paperclip", href: "#paperclip" },
  { label: "Services", href: "#services" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
];

export const heroMetrics: Metric[] = [
  { label: "Leads Processed", value: "18.4K", detail: "+39% this month" },
  { label: "Tasks Automated", value: "342K", detail: "Across 14 workflows" },
  { label: "Revenue Generated", value: "$2.8M", detail: "Pipeline influenced" },
  { label: "Hours Saved", value: "11,920", detail: "Recovered for operators" },
];

export const featureCards: IconCard[] = [
  {
    title: "AI Agents",
    description: "Deploy specialized autonomous agents for ops, growth, and support.",
    detail: "24/7 execution with delegated decision trees",
    icon: Bot,
  },
  {
    title: "WhatsApp Automation",
    description: "Turn inbound messages into booked calls, nurtured leads, and closed loops.",
    detail: "Connected to CRM and payment-ready journeys",
    icon: MessagesSquare,
  },
  {
    title: "Sales Automation",
    description: "Qualify, route, score, and follow up with prospects automatically.",
    detail: "Sequences tailored by source, intent, and deal size",
    icon: TrendingUp,
  },
  {
    title: "Customer Support",
    description: "Resolve routine tickets instantly while escalating critical edge cases.",
    detail: "Human handoff with context-aware summaries",
    icon: ShieldCheck,
  },
  {
    title: "Lead Qualification",
    description: "Enrich, prioritize, and triage every new contact in real time.",
    detail: "AI scoring tuned to your best-fit customers",
    icon: SearchCheck,
  },
  {
    title: "Appointment Booking",
    description: "Remove scheduling friction with conversational, multi-channel booking.",
    detail: "Calendar sync plus no-show rescue automations",
    icon: CalendarClock,
  },
  {
    title: "CRM Integration",
    description: "Keep every pipeline movement, note, and trigger perfectly synchronized.",
    detail: "Clean handoffs between marketing, sales, and delivery",
    icon: DatabaseZap,
  },
  {
    title: "Analytics Dashboard",
    description: "Surface ROI, bottlenecks, and agent performance in one command center.",
    detail: "Executive reporting without spreadsheet lag",
    icon: ChartColumnBig,
  },
];

export const agentNodes: AgentNode[] = [
  { title: "CEO Agent", role: "Owns strategy, priorities, and resource allocation.", output: "Directs execution toward top-line goals." },
  { title: "CTO Agent", role: "Maintains integrations, workflows, and infrastructure.", output: "Keeps automations fast, stable, and secure." },
  { title: "Marketing Agent", role: "Launches campaigns, tests creative, and scores demand.", output: "Supplies high-intent leads to sales." },
  { title: "Sales Agent", role: "Qualifies leads, books calls, and follows up relentlessly.", output: "Improves conversion velocity and close rate." },
  { title: "Support Agent", role: "Handles FAQs, triage, and customer updates instantly.", output: "Cuts response time while boosting satisfaction." },
  { title: "Operations Agent", role: "Automates back office tasks, reports, and checklists.", output: "Eliminates repetitive execution overhead." },
];

export const workflowSteps = [
  "Business Goal",
  "Paperclip CEO",
  "Department Agents",
  "Execution",
  "Results Dashboard",
];

export const services: ServiceCard[] = [
  {
    title: "AI Automation Systems",
    description: "End-to-end workflow design for revenue, ops, fulfillment, and reporting.",
    metric: "48 automations launched per quarter",
    cta: "Design your stack",
    icon: Workflow,
  },
  {
    title: "WhatsApp AI Agents",
    description: "Conversational agents for inbound qualification, reminders, and nurture.",
    metric: "3.1x faster lead response",
    cta: "See messaging flows",
    icon: MessageSquareText,
  },
  {
    title: "Lead Generation Automation",
    description: "From enrichment to personalized outreach, we automate pipeline creation.",
    metric: "+67% qualified opportunities",
    cta: "Launch outbound engine",
    icon: UsersRound,
  },
  {
    title: "CRM Automation",
    description: "Automated routing, stage updates, note logging, and revenue reporting.",
    metric: "0 manual lead assignment",
    cta: "Connect your CRM",
    icon: BriefcaseBusiness,
  },
  {
    title: "AI Chatbots",
    description: "High-context web and support bots grounded in your business processes.",
    metric: "83% deflection on routine tickets",
    cta: "Build support AI",
    icon: BrainCircuit,
  },
  {
    title: "Internal Business Automation",
    description: "Approval flows, SOP execution, data sync, and internal agent copilots.",
    metric: "11.9K hours saved annually",
    cta: "Automate operations",
    icon: Layers3,
  },
  {
    title: "Customer Support AI",
    description: "Unified ticket triage, proactive updates, and smart escalation layers.",
    metric: "92 second first response time",
    cta: "Upgrade CX",
    icon: LifeBuoy,
  },
  {
    title: "Infrastructure Consulting",
    description: "Architecture, observability, governance, and orchestration for AI systems.",
    metric: "99.9% workflow uptime target",
    cta: "Audit infrastructure",
    icon: Cpu,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: "Gym Automation",
    niche: "Fitness",
    before: "Manual lead follow-up and staff-dependent reminder chains.",
    after: "AI lead routing, WhatsApp nurture, and automated appointment recovery.",
    uplift: "+58% memberships from inbound leads",
    response: "4 min to 22 sec average response time",
    impact: "$41K monthly revenue lift",
  },
  {
    title: "Clinic Automation",
    niche: "Healthcare",
    before: "Phone bottlenecks, missed appointment reminders, and overloaded front desks.",
    after: "AI booking assistant, triage flows, and patient support automation.",
    uplift: "+33% booked consultations",
    response: "67% fewer missed follow-ups",
    impact: "2.4x front-desk capacity",
  },
  {
    title: "Real Estate Automation",
    niche: "Property",
    before: "Slow lead qualification across portals, forms, and WhatsApp conversations.",
    after: "Autonomous screening, instant property matching, and agent routing.",
    uplift: "+72% faster qualified lead delivery",
    response: "31% more showings booked",
    impact: "$180K influenced quarterly pipeline",
  },
  {
    title: "Marketing Agency Automation",
    niche: "Services",
    before: "Founder-led sales follow-up, inconsistent onboarding, and scattered ops.",
    after: "AI SDR, onboarding orchestrator, and client success command center.",
    uplift: "+46% proposal conversion",
    response: "76% less admin workload",
    impact: "2.1x client capacity without hiring",
  },
];

export const processSteps: IconCard[] = [
  {
    title: "Discover",
    description: "Map the revenue engine, bottlenecks, and high-value automation opportunities.",
    detail: "Stakeholder workshops plus funnel diagnostics",
    icon: Sparkles,
  },
  {
    title: "Plan",
    description: "Architect the agent system, orchestration logic, and integration footprint.",
    detail: "Clear roadmap, scope, and operational guardrails",
    icon: Gauge,
  },
  {
    title: "Build",
    description: "Ship the workflows, prompts, dashboards, and business logic with rigor.",
    detail: "Fast iteration with enterprise-grade reliability",
    icon: Activity,
  },
  {
    title: "Deploy",
    description: "Launch live automations with observability, QA, and team enablement.",
    detail: "Measured rollout with documented SOPs",
    icon: CircleCheckBig,
  },
  {
    title: "Scale",
    description: "Expand automations, optimize performance, and compound ROI over time.",
    detail: "Monthly optimization loops and strategic reviews",
    icon: ArrowRight,
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$2.5K/mo",
    description: "For companies ready to automate one high-impact workflow fast.",
    features: [
      "1 automation system",
      "1 AI assistant or support bot",
      "CRM and messaging integration",
      "Monthly reporting dashboard",
    ],
  },
  {
    name: "Growth",
    price: "$6.9K/mo",
    description: "For teams building a multi-agent revenue and operations engine.",
    featured: true,
    features: [
      "Up to 5 production automations",
      "WhatsApp and lead gen AI agents",
      "Paperclip orchestration layer",
      "Weekly optimization and strategy reviews",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For complex businesses that need full AI infrastructure and governance.",
    features: [
      "Unlimited orchestration roadmap",
      "Custom observability and reporting",
      "Security, governance, and SLA support",
      "Dedicated solutions architect",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Apex rebuilt our lead response engine in under a month. It now feels like we have a digital operations team working around the clock.",
    name: "Aisha Khan",
    role: "Founder",
    company: "Northline Clinics",
  },
  {
    quote:
      "The command center alone changed how we manage growth. We finally see what every automation is doing and where revenue is coming from.",
    name: "Marcus Reid",
    role: "COO",
    company: "ForgeFit Studios",
  },
  {
    quote:
      "Their Paperclip-inspired orchestration turned a messy stack into a system. Follow-up is instant, handoffs are clean, and conversion is up.",
    name: "Neha Sharma",
    role: "Managing Director",
    company: "Axis Estate Group",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What kinds of businesses are the best fit for Apex Automations?",
    answer:
      "Service businesses, multi-location operators, clinics, real estate teams, agencies, and growth-stage companies benefit most when fast response times and repeatable workflows drive revenue.",
  },
  {
    question: "Do you only build chatbots?",
    answer:
      "No. We design full operating systems for growth, support, and back-office execution, including AI agents, CRM automation, analytics, orchestration, and internal tools.",
  },
  {
    question: "Can Apex work with our existing CRM and communication stack?",
    answer:
      "Yes. We typically integrate with existing CRMs, calendars, messaging tools, forms, spreadsheets, knowledge bases, and fulfillment workflows so your current stack becomes smarter instead of being replaced.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Most focused automation systems launch in 2 to 4 weeks. Larger multi-agent programs are phased so high-value workflows go live early while the broader platform scales cleanly.",
  },
  {
    question: "How do you keep AI systems reliable and safe?",
    answer:
      "We build around approvals, escalation logic, observability, testing, and role-based access. Sensitive workflows can be constrained with clear guardrails and human checkpoints.",
  },
];

export const footerLinks = {
  services: ["AI Agents", "WhatsApp Automation", "Customer Support AI", "Lead Generation"],
  company: ["About", "Case Studies", "Pricing", "Contact"],
  resources: ["Playbooks", "Automation Audit", "ROI Calculator", "FAQ"],
  social: ["LinkedIn", "X", "Instagram", "YouTube"],
};

export const commandCenterFeed = [
  { agent: "Sales Agent", event: "Qualified a lead from WhatsApp", time: "12 sec ago" },
  { agent: "Support Agent", event: "Resolved renewal question with payment link", time: "46 sec ago" },
  { agent: "Marketing Agent", event: "Deployed high-intent retargeting sequence", time: "2 min ago" },
  { agent: "Operations Agent", event: "Synced CRM notes and delivery checklist", time: "4 min ago" },
];

export const integrationPillars = [
  { label: "Lead Systems", icon: PhoneCall },
  { label: "Client Experience", icon: HeartHandshake },
  { label: "Revenue Ops", icon: BarChart3 },
  { label: "Infrastructure", icon: Handshake },
  { label: "Property", icon: House },
  { label: "Healthcare", icon: Stethoscope },
];

