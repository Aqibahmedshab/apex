"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { LoadingScreen } from "@/components/loading-screen";
import { ParticleField } from "@/components/particle-field";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { buttonVariants } from "@/components/ui/button";
import {
  agentNodes,
  caseStudies,
  commandCenterFeed,
  faqItems,
  featureCards,
  footerLinks,
  heroMetrics,
  integrationPillars,
  pricingTiers,
  processSteps,
  services,
  testimonials,
  workflowSteps,
} from "@/lib/site-data";

export function HomePage() {
  const { scrollYProgress } = useScroll();
  const dashboardY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  return (
    <div className="relative overflow-hidden bg-background text-white">
      <LoadingScreen />
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:64px_64px] opacity-[0.06]" />
      <SiteHeader />

      <main className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <AnimatedSection id="hero" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="bento-card grid-noise p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  AI Infrastructure for modern operators
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
                    Your AI Workforce Starts <span className="text-gradient">Here</span>
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                    We build autonomous AI systems that automate customer support, lead
                    generation, operations, and business workflows.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="#contact" className={buttonVariants({ size: "lg" })}>
                    Book Free Strategy Call
                  </Link>
                  <Link
                    href="#demo"
                    className={buttonVariants({ variant: "secondary", size: "lg" })}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Link>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {integrationPillars.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-3xl border border-white/10 bg-white/5 p-4"
                      >
                        <Icon className="h-5 w-5 text-accent" />
                        <p className="mt-4 text-sm font-semibold text-white">{item.label}</p>
                        <p className="mt-1 text-xs text-muted">Automation layer active</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div style={{ y: dashboardY }} className="bento-card p-5 sm:p-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">AI Command Deck</p>
                    <h2 className="mt-2 text-2xl font-semibold">Autonomous revenue engine</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-accent/10 px-3 py-1 text-xs text-accent">
                    8 agents online
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">
                      Lead pipeline
                    </p>
                    <div className="mt-4 flex items-end gap-2">
                      {[48, 72, 60, 84, 96, 92, 110].map((height, index) => (
                        <motion.span
                          key={`${height}-${index}`}
                          className="w-full rounded-full bg-gradient-to-t from-primary via-secondary to-accent"
                          style={{ height }}
                          animate={{ opacity: [0.55, 1, 0.55] }}
                          transition={{
                            duration: 2.4,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.14,
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-muted">124 high-intent leads in the last 7 days</p>
                  </div>

                  <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted">
                        Revenue influenced
                      </p>
                      <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs text-secondary">
                        +18%
                      </span>
                    </div>
                    <p className="mt-4 text-4xl font-semibold">$482K</p>
                    <p className="mt-2 text-sm text-muted">
                      AI agents now cover qualification, follow-up, and support.
                    </p>
                    <div className="mt-6 space-y-3">
                      {[
                        ["Sales Agent", "94% reply SLA"],
                        ["Support Agent", "81% auto-resolution"],
                        ["Ops Agent", "26 workflows deployed"],
                      ].map(([label, detail]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/50 px-4 py-3"
                        >
                          <span className="text-sm text-white">{label}</span>
                          <span className="text-xs text-muted">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-background/70 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Live automation simulation</p>
                      <p className="text-xs text-muted">Paperclip routing goal: close more revenue</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      Executing
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-4">
                    {["Capture", "Qualify", "Convert", "Retain"].map((step, index) => (
                      <div
                        key={step}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                      >
                        <p className="text-xs uppercase tracking-[0.25em] text-muted">
                          Step {index + 1}
                        </p>
                        <p className="mt-3 text-sm font-semibold text-white">{step}</p>
                        <div className="mt-4 h-1.5 rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                            animate={{ width: ["24%", "100%", "24%"] }}
                            transition={{
                              duration: 3.8,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.18,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="bento-card p-5"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-muted">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-muted">{metric.detail}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="features" className="space-y-8" delay={0.05}>
          <SectionHeading
            eyebrow="Feature Stack"
            title="Bento-built systems for every mission-critical workflow"
            description="Each module combines AI logic, business rules, analytics, and multi-channel execution so your team gets outcomes instead of disconnected tools."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`bento-card p-6 ${index === 0 || index === 3 ? "xl:col-span-2" : ""}`}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-6 w-6 text-secondary" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-muted">
                        Live
                      </span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm leading-7 text-muted">{feature.description}</p>
                    </div>
                    <div className="mt-auto pt-8">
                      <div className="rounded-3xl border border-white/10 bg-background/70 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.3em] text-muted">
                            Animated visual
                          </span>
                          <ArrowRight className="h-4 w-4 text-accent" />
                        </div>
                        <div className="mt-4 flex items-end gap-2">
                          {[38, 48, 62, 74, 66].map((height, barIndex) => (
                            <motion.span
                              key={`${feature.title}-${barIndex}`}
                              className="w-full rounded-full bg-gradient-to-t from-primary/70 via-secondary/80 to-accent/70"
                              style={{ height }}
                              animate={{ opacity: [0.45, 1, 0.45] }}
                              transition={{
                                duration: 2.6,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: barIndex * 0.12,
                              }}
                            />
                          ))}
                        </div>
                        <p className="mt-4 text-xs text-muted">{feature.detail}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection id="paperclip" className="space-y-8" delay={0.08}>
          <SectionHeading
            eyebrow="Paperclip Orchestration"
            title="Powered by autonomous AI teams"
            description="Our Paperclip-inspired operating model turns one business goal into coordinated action across AI leadership, marketing, sales, support, and operations."
          />

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="bento-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    Interactive organization chart
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">Autonomous AI Teams</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                  Paperclip Core
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {agentNodes.map((agent, index) => (
                  <motion.div
                    key={agent.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className={`rounded-[26px] border border-white/10 bg-white/5 p-5 ${
                      index === 0 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/60 to-secondary/60">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{agent.title}</p>
                          <p className="text-xs text-muted">{agent.role}</p>
                        </div>
                      </div>
                      <span className="text-xs text-accent">Autonomous</span>
                    </div>
                    <div className="mt-5 rounded-2xl border border-white/10 bg-background/60 p-4 text-sm text-muted">
                      {agent.output}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bento-card p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Task delegation</p>
                <h3 className="mt-2 text-2xl font-semibold">Business goal to execution flow</h3>
                <div className="mt-6 space-y-3">
                  {workflowSteps.map((step, index) => (
                    <div
                      key={step}
                      className="relative rounded-[24px] border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-muted">
                            Stage {index + 1}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-white">{step}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-secondary" />
                      </div>
                      {index < workflowSteps.length - 1 ? (
                        <div className="absolute left-6 top-full h-4 w-px bg-gradient-to-b from-secondary to-transparent" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Control center</p>
                    <h3 className="mt-2 text-xl font-semibold">Delegation telemetry</h3>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                    96% SLA
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {commandCenterFeed.map((item) => (
                    <div
                      key={`${item.agent}-${item.time}`}
                      className="rounded-2xl border border-white/10 bg-background/60 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-white">{item.agent}</p>
                        <p className="text-xs text-muted">{item.time}</p>
                      </div>
                      <p className="mt-2 text-sm text-muted">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="services" className="space-y-8" delay={0.1}>
          <SectionHeading
            eyebrow="Services"
            title="Delivery systems built for growth, support, and internal operations"
            description="Every service card is engineered as a scalable building block, with measurable outcomes, automation depth, and a clear path to ROI."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  whileHover={{ y: -6 }}
                  className="bento-card flex flex-col p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{service.description}</p>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-background/50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Metric</p>
                    <p className="mt-2 text-sm text-white">{service.metric}</p>
                  </div>
                  <div className="mt-auto pt-6">
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm text-secondary"
                    >
                      {service.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection className="space-y-8" delay={0.12}>
          <SectionHeading
            eyebrow="Case Studies"
            title="Automation wins across revenue-critical industries"
            description="From gyms and clinics to real estate and agencies, these systems compress response times, unlock capacity, and drive measurable revenue lift."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {caseStudies.map((study) => (
              <div key={study.title} className="bento-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">{study.niche}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{study.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                    Before vs After
                  </span>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-background/60 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Before</p>
                    <p className="mt-3 text-sm leading-7 text-muted">{study.before}</p>
                  </div>
                  <div className="rounded-[24px] border border-secondary/20 bg-secondary/10 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-secondary">After</p>
                    <p className="mt-3 text-sm leading-7 text-white">{study.after}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[study.uplift, study.response, study.impact].map((metric) => (
                    <div key={metric} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-medium text-white">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="demo" className="space-y-8" delay={0.14}>
          <SectionHeading
            eyebrow="AI Command Center"
            title="A realistic dashboard for the teams running the future"
            description="This command center keeps operators, founders, and growth teams aligned around active agents, automation performance, and the pipeline that matters."
          />

          <div className="bento-card p-6 sm:p-8">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Active AI Agents", "08"],
                    ["Running Automations", "26"],
                    ["Monthly Revenue", "$482K"],
                    ["Tasks Completed", "13.9K"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted">{label}</p>
                      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr]">
                  <div className="rounded-[28px] border border-white/10 bg-background/65 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">Lead Pipeline</p>
                        <p className="mt-2 text-xl font-semibold text-white">
                          High-intent opportunities
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                        Updated live
                      </span>
                    </div>
                    <div className="mt-6 space-y-4">
                      {[
                        ["Captured", "312", "bg-primary"],
                        ["Qualified", "184", "bg-secondary"],
                        ["Booked", "79", "bg-accent"],
                        ["Proposal", "38", "bg-white"],
                      ].map(([stage, value, tone]) => (
                        <div key={stage}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-white">{stage}</span>
                            <span className="text-muted">{value}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10">
                            <motion.div
                              className={`h-full rounded-full ${tone}`}
                              initial={{ width: "0%" }}
                              whileInView={{
                                width:
                                  stage === "Captured"
                                    ? "100%"
                                    : stage === "Qualified"
                                      ? "72%"
                                      : stage === "Booked"
                                        ? "46%"
                                        : "25%",
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-background/65 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Agent activity feed</p>
                    <div className="mt-6 space-y-4">
                      {commandCenterFeed.map((item) => (
                        <div
                          key={`${item.agent}-panel`}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-semibold text-white">{item.agent}</span>
                            <span className="text-xs text-muted">{item.time}</span>
                          </div>
                          <p className="mt-2 text-sm text-muted">{item.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Support tickets</p>
                  <p className="mt-2 text-2xl font-semibold text-white">127 open conversations</p>
                  <div className="mt-6 space-y-3">
                    {[
                      ["Billing", "Resolved in 1m 12s"],
                      ["Booking", "Resolved in 48s"],
                      ["Escalations", "6 require human review"],
                    ].map(([title, detail]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-background/60 p-4"
                      >
                        <p className="text-sm font-semibold text-white">{title}</p>
                        <p className="mt-1 text-xs text-muted">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    Weekly system health
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Workflow uptime", "99.9%"],
                      ["Avg reply time", "22 sec"],
                      ["Qualified leads", "184"],
                      ["Ops hours saved", "286"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-background/60 p-4"
                      >
                        <p className="text-xs text-muted">{label}</p>
                        <p className="mt-2 text-xl font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="space-y-8" delay={0.16}>
          <SectionHeading
            eyebrow="Process"
            title="A fast, structured path from idea to autonomous execution"
            description="We move from strategy to deployment with clear checkpoints, measurable milestones, and room to scale once the first automations are producing results."
          />
          <div className="grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative bento-card p-6">
                  {index < processSteps.length - 1 ? (
                    <div className="absolute right-[-10px] top-1/2 hidden h-px w-5 bg-gradient-to-r from-secondary to-transparent md:block" />
                  ) : null}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
                  <p className="mt-4 text-xs text-accent">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection id="pricing" className="space-y-8" delay={0.18}>
          <SectionHeading
            eyebrow="Pricing"
            title="Premium SaaS-style plans for ambitious teams"
            description="Choose the engagement level that matches your growth stage, then expand into a deeper AI operating system as your workflows mature."
            align="center"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`bento-card flex flex-col p-6 sm:p-8 ${
                  tier.featured ? "border-secondary/40 shadow-glow" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{tier.name}</p>
                    <p className="mt-3 text-4xl font-semibold">{tier.price}</p>
                  </div>
                  {tier.featured ? (
                    <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
                      Most Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{tier.description}</p>
                <div className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-sm text-white">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <Link
                    href="#contact"
                    className={buttonVariants({
                      variant: tier.featured ? "default" : "secondary",
                      size: "default",
                    })}
                  >
                    Start with {tier.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="space-y-8" delay={0.2}>
          <SectionHeading
            eyebrow="Testimonials"
            title="Professional reviews from operators building with AI"
            description="Founders and operations leaders rely on Apex Automations for systems that feel strategic, measurable, and immediately useful."
          />
          <TestimonialsCarousel items={testimonials} />
        </AnimatedSection>

        <AnimatedSection className="space-y-8" delay={0.22}>
          <SectionHeading
            eyebrow="FAQ"
            title="Clear answers before you deploy"
            description="If you are evaluating an AI automation partner, these are the questions that usually matter most before we scope the first system."
          />
          <Accordion items={faqItems} />
        </AnimatedSection>

        <AnimatedSection id="contact" className="space-y-8" delay={0.24}>
          <div className="bento-card p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-5">
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
                  Backend-Connected Intake
                </span>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Ready To Build Your AI Workforce?
                </h2>
                <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  Let&apos;s design the automation stack, orchestration layer, and AI team that
                  helps your business operate faster, respond instantly, and scale without chaos.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Launch Window", "2 to 4 weeks"],
                    ["Backend", "Validated API + persistence"],
                    ["Admin Console", "Track every inbound lead"],
                    ["Reporting", "Webhook-ready lead events"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[26px] border border-white/10 bg-background/60 p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-muted">{label}</p>
                      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[28px] border border-white/10 bg-background/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Internal tools</p>
                  <p className="mt-3 text-lg font-semibold text-white">Lead operations dashboard</p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Use the backend console to review submissions, update statuses, and inspect
                    service demand once the form starts collecting real data.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link href="/admin" className={buttonVariants({ size: "default" })}>
                      Open Admin Console
                    </Link>
                    <Link
                      href="/api/health"
                      className={buttonVariants({ variant: "secondary", size: "default" })}
                    >
                      API Health Check
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-background/55 p-5 sm:p-6 lg:p-7">
                <div className="mb-6 space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    Book a strategy call
                  </p>
                  <h3 className="text-2xl font-semibold text-white">Send your automation brief</h3>
                  <p className="text-sm leading-7 text-muted">
                    This form now posts to the backend, stores submissions, and can forward them to
                    your webhook destination.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent font-bold text-white">
                AA
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Apex Automations</p>
                <p className="text-xs text-muted">Build an AI-Powered Business That Works 24/7</p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              Premium AI automation systems, autonomous agent orchestration, and operational
              infrastructure for modern businesses that want more speed, visibility, and leverage.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-white">Services</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {footerLinks.services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Company</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {footerLinks.company.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Resources</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {footerLinks.resources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Social</p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {footerLinks.social.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
