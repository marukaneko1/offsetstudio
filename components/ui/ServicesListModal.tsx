"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Service {
  category: string;
  service: string;
  solves: string;
  buyers: string;
  midTier: string;
  luxury: string;
}

const services: Service[] = [
  {
    category: "Brand & Identity",
    service: "Logo design (primary + variations) Banner",
    solves: "Credibility + recognition",
    buyers: "Startups, small biz",
    midTier: "$1.5k–$5k",
    luxury: "$8k–$25k",
  },
  {
    category: "Brand & Identity",
    service: "Brand guidelines (mini → full)",
    solves: "Eliminates off-brand output",
    buyers: "Marketing teams",
    midTier: "$1.5k–$6k",
    luxury: "$8k–$25k",
  },
  {
    category: "Brand Strategy Visuals",
    service: "Customer journey map visuals",
    solves: "Finds drop-offs + confusion",
    buyers: "Product/marketing",
    midTier: "$1.5k–$6k",
    luxury: "$8k–$25k",
  },
  {
    category: "Brand Strategy Visuals",
    service: "Product architecture diagrams",
    solves: "Explains complex products simply",
    buyers: "Tech companies",
    midTier: "$1k–$5k",
    luxury: "$7.5k–$25k",
  },
  {
    category: "UI/UX",
    service: "UX audit + prioritized fixes",
    solves: "Identifies what kills conversion",
    buyers: "SaaS, ecom",
    midTier: "$1.5k–$6k",
    luxury: "$8k–$25k",
  },
  {
    category: "UI/UX",
    service: "Landing page UX + UI design",
    solves: "Higher signups/sales",
    buyers: "Any online business",
    midTier: "$1.5k–$7.5k",
    luxury: "$10k–$35k",
  },
  {
    category: "UI/UX",
    service: "Website design (5 pages)",
    solves: "Trust + clarity + conversion",
    buyers: "Service firms, startups",
    midTier: "$5k–$18k",
    luxury: "$25k–$90k+",
  },
  {
    category: "UI/UX",
    service: "Website design (10–15 pages)",
    solves: "Scalable marketing site",
    buyers: "Mid-size brands",
    midTier: "$12k–$35k",
    luxury: "$60k–$200k+",
  },
  {
    category: "UI/UX",
    service: "MVP app UX (flows + wireframes)",
    solves: "Faster build, fewer mistakes",
    buyers: "Early-stage founders",
    midTier: "$4k–$15k",
    luxury: "$20k–$60k",
  },
  {
    category: "UI/UX",
    service: "App UI (10–20 screens)",
    solves: "Modern usable interface",
    buyers: "Startups, product teams",
    midTier: "$6k–$25k",
    luxury: "$30k–$120k",
  },
  {
    category: "UI/UX",
    service: "Design system (components/tokens)",
    solves: "Scales design + dev speed",
    buyers: "SaaS teams",
    midTier: "$8k–$30k",
    luxury: "$40k–$150k+",
  },
  {
    category: "UI/UX",
    service: "Figma library setup/cleanup",
    solves: "Reusable, consistent UI",
    buyers: "Product teams",
    midTier: "$1.5k–$6k",
    luxury: "$8k–$25k",
  },
  {
    category: "UI/UX",
    service: "Developer handoff specs",
    solves: "Less dev confusion + rework",
    buyers: "Engineering teams",
    midTier: "$800–$4k",
    luxury: "$5k–$15k",
  },
  {
    category: "UI/UX",
    service: "Accessibility pass (WCAG basics)",
    solves: "Avoids UX/legal issues",
    buyers: "Orgs, SaaS",
    midTier: "$1k–$5k",
    luxury: "$8k–$25k",
  },
  {
    category: "UI/UX",
    service: "UX writing / microcopy",
    solves: "Clearer flows, fewer drop-offs",
    buyers: "SaaS/apps",
    midTier: "$500–$3k",
    luxury: "$5k–$15k",
  },
  {
    category: "Motion & Animation",
    service: "Motion brand kit (logo + elements)",
    solves: "Premium brand feel",
    buyers: "Brands, startups",
    midTier: "$2k–$8k",
    luxury: "$10k–$40k",
  },
  {
    category: "Motion & Animation",
    service: "Explainer video (30–60 sec)",
    solves: "Communicates value fast",
    buyers: "Startups, services",
    midTier: "$3k–$12k",
    luxury: "$20k–$80k+",
  },
  {
    category: "Motion & Animation",
    service: "Product demo video (30–90 sec)",
    solves: "Shows product clearly",
    buyers: "SaaS",
    midTier: "$2k–$10k",
    luxury: "$15k–$60k",
  },
  {
    category: "Pitch / Sales Visuals",
    service: "Investor pitch deck (10–15 slides)",
    solves: "Helps close capital",
    buyers: "Founders",
    midTier: "$2k–$8k",
    luxury: "$12k–$50k",
  },
  {
    category: "Pitch / Sales Visuals",
    service: "Sales deck (10–20 slides)",
    solves: "Helps close clients",
    buyers: "Sales teams",
    midTier: "$2.5k–$9k",
    luxury: "$15k–$60k",
  },
  {
    category: "Pitch / Sales Visuals",
    service: "Partnership / sponsorship deck",
    solves: "Makes deals easier",
    buyers: "Biz dev, creators",
    midTier: "$2k–$7.5k",
    luxury: "$10k–$40k",
  },
  {
    category: "Pitch / Sales Visuals",
    service: "One-pager (product/service)",
    solves: "Fast, clear explanation + CTA",
    buyers: "Any",
    midTier: "$250–$1.5k",
    luxury: "$2k–$10k",
  },
  {
    category: "Pitch / Sales Visuals",
    service: "Proposal design + template",
    solves: "Higher close rate",
    buyers: "Agencies, consultants",
    midTier: "$500–$2.5k",
    luxury: "$4k–$15k",
  },
  {
    category: "Pitch / Sales Visuals",
    service: "Business plan visual formatting",
    solves: "Makes plans readable + persuasive",
    buyers: "Entrepreneurs",
    midTier: "$800–$4k",
    luxury: "$6k–$25k",
  },
  {
    category: "Data & Infographics",
    service: "Report/whitepaper (10–20 pages)",
    solves: "Authority + readability",
    buyers: "B2B, research",
    midTier: "$2k–$10k",
    luxury: "$15k–$60k",
  },
  {
    category: "Print & Physical",
    service: "Brochure (tri-fold)",
    solves: "Offline trust + sales support",
    buyers: "Local biz, B2B",
    midTier: "$400–$2k",
    luxury: "$3k–$12k",
  },
  {
    category: "Internal/Operational",
    service: "Onboarding/training deck",
    solves: "Faster ramp-up",
    buyers: "HR/ops",
    midTier: "$1.5k–$6k",
    luxury: "$10k–$35k",
  },
];

interface ServicesListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesListModal({
  isOpen,
  onClose,
}: ServicesListModalProps) {
  const [mounted, setMounted] = useState(false);

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
        className={`relative z-[101] w-full max-w-6xl max-h-[90vh] rounded-2xl border border-white/30 bg-black p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col ${
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
        <div className="mb-6 pr-10">
          <h2 className="text-3xl font-light text-white">Full Services List</h2>
          <p className="mt-2 text-white/60">
            Complete list of services we offer with pricing ranges
          </p>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-black/95 z-10">
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">
                    Service Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">
                    Specific Service Offering
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">
                    What it solves
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">
                    Typical buyers
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">
                    Mid-Tier Range
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">
                    Luxury Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-white/90 font-medium">
                      {service.category}
                    </td>
                    <td className="py-3 px-4 text-sm text-white/80">
                      {service.service}
                    </td>
                    <td className="py-3 px-4 text-sm text-white/70">
                      {service.solves}
                    </td>
                    <td className="py-3 px-4 text-sm text-white/70">
                      {service.buyers}
                    </td>
                    <td className="py-3 px-4 text-sm text-white/80">
                      {service.midTier}
                    </td>
                    <td className="py-3 px-4 text-sm text-white/80">
                      {service.luxury}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

