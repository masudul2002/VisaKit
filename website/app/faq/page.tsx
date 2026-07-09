import React from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Is VisaKit safe to use with my passport information?",
      answer: "Yes, absolutely. VisaKit is built on a local-first architecture. It does not contain any code to transmit data across the internet. All passport and personal particulars remain entirely in your browser's local sandbox storage."
    },
    {
      question: "Does VisaKit bypass captchas or submit forms automatically?",
      answer: "No. VisaKit is not a bypass tool or captcha solver. It only copies user-provided details into standard text and selection fields on supported pages. You must still solve captchas and click submit manually."
    },
    {
      question: "Which browsers are supported?",
      answer: "VisaKit supports Google Chrome, Brave, Microsoft Edge, and any modern Chromium-based browser supporting Manifest V3."
    },
    {
      question: "Where is my profile data stored?",
      answer: "It is saved in your browser's secure extension storage. If you clear your browser cache, extension local data remains intact, but you can securely delete or reset your profile at any time inside the Options dashboard."
    },
    {
      question: "Is VisaKit open source?",
      answer: "Yes! VisaKit is licensed under the MIT License and is open for community audits on GitHub."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-10">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Find answers to common questions about security, automation, and compatibility.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6 bg-white border border-slate-200/60 rounded-[16px] flex flex-col gap-2 shadow-sm">
            <h3 className="font-bold text-lg text-[#1E40AF]">
              {faq.question}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
