import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 py-16 md:py-24 max-w-6xl mx-auto px-6">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
        <div className="w-20 h-20 rounded-[16px] bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-4xl shadow-lg shadow-[#2563EB]/25">
          V
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            VisaKit
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-[#1E40AF]">
            Smart Visa Form Autofill
          </p>
        </div>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          A secure, lightweight Chrome Extension that helps you securely save your visa profile locally and autofill supported online Indian Visa application forms in seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <Link 
            href="/download" 
            className="w-full sm:w-auto py-3 px-8 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold rounded-[16px] text-base shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/35 transition-all text-center"
          >
            Download Extension
          </Link>
          <a 
            href="https://github.com/masudul2002/visakit" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto py-3 px-8 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-[16px] text-base border border-slate-200 shadow-sm transition-all text-center"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Designed for Speed and Privacy
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Everything you need, stored safely right in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-[16px] flex gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-lg text-slate-900">Privacy First</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We store all your profile details locally in Chrome Storage. No analytics, tracking, or background syncing. Your passport data never leaves your device.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-[16px] flex gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-lg text-slate-900">Fast Autofill</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tired of re-typing complex address lines, passport dates, and family history? Autofill forms dynamically using mapped, structured profiles.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-[16px] flex gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-lg text-slate-900">Chrome Extension</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Built strictly on Manifest V3 specifications. Fully compatible with Google Chrome, Brave, Microsoft Edge, and Chromium-based browsers.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-[16px] flex gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-lg text-slate-900">Open Source</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Licensed under MIT. Review, audit, or host the code yourself. We welcome developers to contribute and keep visa application processes transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Development Roadmap
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Our timeline to release Version 1.0 on the Web Store.
          </p>
        </div>

        <div className="max-w-xl mx-auto flex flex-col gap-6 w-full">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm shrink-0">
              ✓
            </div>
            <div className="flex flex-col gap-1 pt-0.5">
              <h3 className="font-bold text-slate-900">Sprint 01 & 02: Environment & Foundation</h3>
              <p className="text-xs text-slate-500">Completed</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Set up modular Chrome Extension builds with Manifest V3 and configured official project landing pages.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div className="flex flex-col gap-1 pt-0.5">
              <h3 className="font-bold text-slate-900">Sprint 03 & 04: UI Form Dashboard</h3>
              <p className="text-xs text-[#2563EB] font-bold">Active</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Building secure input profile forms for options dashboard pages including validation schemas.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center font-bold text-sm shrink-0">
              4
            </div>
            <div className="flex flex-col gap-1 pt-0.5">
              <h3 className="font-bold text-slate-500">Sprint 05 & 06: Local Storage & DOM Fill Engine</h3>
              <p className="text-xs text-slate-400 font-semibold">Upcoming</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connecting profiles to local encrypted browser storage and matching DOM fields to autofill online fields.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
