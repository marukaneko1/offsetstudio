"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionShell from "@/components/ui/SectionShell";
import Pill from "@/components/ui/Pill";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is your design process?",
    answer:
      "Our design process begins with understanding your vision and goals. We then create a detailed proposal, work through iterations, and deliver the final design with revisions and support.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "1-4 weeks, larger projects taking 6+ weeks",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes, we work with clients worldwide. All communication and collaboration happens through video calls, email, and our project management platform.",
  },
  {
    question: "What is included in a brand identity package?",
    answer:
      "A complete brand identity package includes logo design, color palette, typography system, brand guidelines, and application examples across various touchpoints.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20">
      <Container>
        <SectionShell>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Image + Title */}
            <div>
              <div className="mb-4">
                <Pill>FAQ&apos;S</Pill>
              </div>
              <h2 className="mb-4 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                Answers
              </h2>
              <p className="text-lg text-white/70">
                We are a luxury design studio committed to delivering exceptional work that exceeds expectations. Our approach combines meticulous attention to detail with efficient project management, ensuring we produce the highest quality designs within the most efficient timelines. Every project receives our full dedication and expertise, from initial concept to final delivery.
              </p>
            </div>

            {/* Right: Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-medium text-white">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 text-white/60">
                        {isOpen ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M5 5L15 15M15 5L5 15"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M10 5V15M5 10H15"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6 text-white/70">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionShell>
      </Container>
    </section>
  );
}

