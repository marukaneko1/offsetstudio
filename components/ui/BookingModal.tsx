"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Services list from ServicesListModal
const allServices = [
  "Logo design (primary + variations) Banner",
  "Brand guidelines (mini → full)",
  "Customer journey map visuals",
  "Product architecture diagrams",
  "UX audit + prioritized fixes",
  "Landing page UX + UI design",
  "Website design (5 pages)",
  "Website design (10–15 pages)",
  "MVP app UX (flows + wireframes)",
  "App UI (10–20 screens)",
  "Design system (components/tokens)",
  "Figma library setup/cleanup",
  "Developer handoff specs",
  "Accessibility pass (WCAG basics)",
  "UX writing / microcopy",
  "Motion brand kit (logo + elements)",
  "Explainer video (30–60 sec)",
  "Product demo video (30–90 sec)",
  "Investor pitch deck (10–15 slides)",
  "Sales deck (10–20 slides)",
  "Partnership / sponsorship deck",
  "One-pager (product/service)",
  "Proposal design + template",
  "Business plan visual formatting",
  "Report/whitepaper (10–20 pages)",
  "Brochure (tri-fold)",
  "Onboarding/training deck",
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    website: "",
    services: [] as string[],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one service is selected
    if (formData.services.length === 0) {
      setSubmitStatus("error");
      alert("Please select at least one service");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking request");
      }

      // Success
      setSubmitStatus("success");
      
      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        website: "",
        services: [],
      });

      // Show success message and close after a delay
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      alert(error instanceof Error ? error.message : "Failed to submit booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(service);
      return {
        ...prev,
        services: isSelected
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        className={`relative z-[101] w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/30 bg-black p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col ${
          isOpen
            ? "opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white z-10"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4 md:mb-6 pr-8 md:pr-10">
          <h2 className="text-2xl md:text-3xl font-light text-white">Book a Free Call</h2>
          <p className="mt-2 text-sm md:text-base text-white/60">
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto pr-1 md:pr-2">
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="John Doe"
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Acme Inc."
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Current Website */}
          <div>
            <label
              htmlFor="website"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Current Website <span className="text-white/50">(optional)</span>
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="https://example.com"
            />
          </div>

          {/* Services - Checkbox Grid */}
          <div>
            <label className="mb-3 block text-sm font-medium text-white/80">
              Services * {formData.services.length > 0 && (
                <span className="text-white/50">({formData.services.length} selected)</span>
              )}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {allServices.map((service) => {
                const isSelected = formData.services.includes(service);
                return (
                  <label
                    key={service}
                    className={`relative flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "border-white/40 bg-white/10"
                        : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/8"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleServiceToggle(service)}
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-white/20 focus:ring-offset-0 focus:ring-offset-transparent"
                    />
                    <span className="flex-1 text-sm text-white/90 leading-snug">
                      {service}
                    </span>
                  </label>
                );
              })}
            </div>
            {formData.services.length === 0 && (
              <p className="mt-2 text-xs text-white/50">
                Please select at least one service
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 pb-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium text-white transition-all ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white/20 hover:border-white/40"
              }`}
            >
              {isSubmitting ? "Submitting..." : submitStatus === "success" ? "Submitted!" : "Submit"}
            </button>
            {submitStatus === "success" && (
              <p className="mt-2 text-center text-sm text-green-400">
                Thank you! We'll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="mt-2 text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}

