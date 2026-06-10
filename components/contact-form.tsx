"use client";

import { useState } from "react";
import { Loader2, Send, ShieldCheck } from "lucide-react";

import {
  monthlyLeadOptions,
  serviceInquiryOptions,
  timelineOptions,
  type ConsultationRequestInput,
} from "@/lib/consultations";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof ConsultationRequestInput, string>>;

const initialFormState: ConsultationRequestInput = {
  name: "",
  email: "",
  company: "",
  phone: "",
  serviceInterest: serviceInquiryOptions[0],
  timeline: timelineOptions[0],
  monthlyLeads: monthlyLeadOptions[0],
  message: "",
  website: "",
  source: "website",
};

export function ContactForm() {
  const [formState, setFormState] = useState<ConsultationRequestInput>(initialFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  function updateField<K extends keyof ConsultationRequestInput>(
    key: K,
    value: ConsultationRequestInput[K],
  ) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
    setErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setServerMessage(null);
    setSuccessId(null);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = (await response.json()) as
        | { success: true; id: string; message: string }
        | { success: false; error?: string; errors?: FieldErrors };

      if (!response.ok || !result.success) {
        setErrors(result.success ? {} : result.errors || {});
        setServerMessage(result.success ? null : result.error || "Submission failed.");
        return;
      }

      setFormState(initialFormState);
      setErrors({});
      setSuccessId(result.id);
      setServerMessage(result.message);
    } catch {
      setServerMessage("We could not submit the form right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          value={formState.name}
          onChange={(value) => updateField("name", value)}
          error={errors.name}
          placeholder="Alex Morgan"
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          value={formState.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
          placeholder="alex@company.com"
        />
        <Field
          label="Company"
          name="company"
          value={formState.company}
          onChange={(value) => updateField("company", value)}
          error={errors.company}
          placeholder="Northline Clinics"
        />
        <Field
          label="Phone"
          name="phone"
          value={formState.phone || ""}
          onChange={(value) => updateField("phone", value)}
          error={errors.phone}
          placeholder="+1 555 0182"
        />
        <SelectField
          label="Primary need"
          name="serviceInterest"
          value={formState.serviceInterest}
          onChange={(value) =>
            updateField("serviceInterest", value as ConsultationRequestInput["serviceInterest"])
          }
          error={errors.serviceInterest}
          options={serviceInquiryOptions}
        />
        <SelectField
          label="Implementation timeline"
          name="timeline"
          value={formState.timeline}
          onChange={(value) => updateField("timeline", value as ConsultationRequestInput["timeline"])}
          error={errors.timeline}
          options={timelineOptions}
        />
        <SelectField
          label="Monthly lead volume"
          name="monthlyLeads"
          value={formState.monthlyLeads}
          onChange={(value) =>
            updateField("monthlyLeads", value as ConsultationRequestInput["monthlyLeads"])
          }
          error={errors.monthlyLeads}
          options={monthlyLeadOptions}
        />
        <div className="hidden">
          <Field
            label="Website"
            name="website"
            value={formState.website || ""}
            onChange={(value) => updateField("website", value)}
            error={errors.website}
            placeholder=""
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="message">
          What do you want to automate?
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={5}
          placeholder="Tell us about your workflows, pain points, lead flow, response times, and the outcomes you want."
          className={cn(
            "min-h-[140px] w-full rounded-[24px] border bg-background/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted",
            errors.message
              ? "border-red-400/70 focus:border-red-400"
              : "border-white/10 focus:border-secondary",
          )}
        />
        {errors.message ? <p className="mt-2 text-sm text-red-300">{errors.message}</p> : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
        <div className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-background/60 px-4 py-4 text-sm text-muted">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          Your request is validated server-side, rate limited, and stored in the backend for follow-up.
        </div>

        {serverMessage ? (
          <div
            className={cn(
              "rounded-[24px] border px-4 py-3 text-sm",
              successId
                ? "border-accent/30 bg-accent/10 text-white"
                : "border-red-400/30 bg-red-500/10 text-red-100",
            )}
          >
            {serverMessage}
            {successId ? <span className="block text-xs text-accent">Reference ID: {successId}</span> : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-6 text-base font-medium text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          {isSubmitting ? "Submitting..." : "Book Consultation"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  type?: "text" | "email";
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full rounded-[24px] border bg-background/70 px-4 text-sm text-white outline-none transition placeholder:text-muted",
          error ? "border-red-400/70 focus:border-red-400" : "border-white/10 focus:border-secondary",
        )}
      />
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: readonly string[];
};

function SelectField({ label, name, value, onChange, error, options }: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-12 w-full rounded-[24px] border bg-background/70 px-4 text-sm text-white outline-none transition",
          error ? "border-red-400/70 focus:border-red-400" : "border-white/10 focus:border-secondary",
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

