"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background"
        >
          <div className="space-y-5 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.35em] text-muted">
              Apex Automations
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  className="h-14 w-3 rounded-full bg-gradient-to-b from-primary via-secondary to-accent"
                  animate={{ y: [0, -16, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-muted">Booting autonomous systems...</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

