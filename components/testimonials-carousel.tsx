"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

import type { Testimonial } from "@/lib/site-data";

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="space-y-6">
      <div className="bento-card min-h-[320px] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex h-full flex-col justify-between gap-8"
          >
            <div className="flex items-start justify-between gap-4">
              <Quote className="h-12 w-12 text-secondary" />
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted">
                Trusted by operators
              </div>
            </div>

            <p className="max-w-4xl text-xl leading-9 text-white sm:text-2xl">
              “{items[activeIndex].quote}”
            </p>

            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-lg font-semibold text-white">{items[activeIndex].name}</p>
                <p className="text-sm text-muted">
                  {items[activeIndex].role}, {items[activeIndex].company}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-accent">Live ROI reporting</p>
                <p className="text-xs text-muted">Automation performance visible every week</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              index === activeIndex
                ? "border-secondary bg-secondary/15 text-white"
                : "border-white/10 bg-white/5 text-muted hover:text-white"
            }`}
          >
            {item.company}
          </button>
        ))}
      </div>
    </div>
  );
}

