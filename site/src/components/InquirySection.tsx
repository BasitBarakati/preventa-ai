"use client";

import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, Calendar, Clock } from "lucide-react";

export default function InquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    topic: "Consultation",
    message: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setLoading(true);

    try {
      // Attempt API call if endpoint exists
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      // Fallback for preview
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2]">
      <div className="site-container">
        <div className="max-w-4xl mx-auto card-clean p-8 sm:p-12 border-2 border-[#0B3D5F]/10 shadow-xl">
          {!submitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="badge-pill badge-teal mb-3">Intake &amp; Advisory</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3D5F]">
                    Start a Thoughtful Conversation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D7185] mt-2 leading-relaxed">
                    Whether you are an Ontario public health unit, a regional health authority, a researcher, or a community health centre, our advisory team is ready to assist.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#0B3D5F]/10 text-xs text-[#33485C]">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-[#1F8A8A]" />
                    <span>Response within 2 business days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-[#1F8A8A]" />
                    <span>Confidential &amp; PIPEDA-compliant intake</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#1F8A8A]" />
                    <span>Complimentary 30-min discovery session</span>
                  </div>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B3D5F] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Jordan Rivera"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3D5F]/15 bg-white text-xs text-[#1A2530] focus:border-[#1F8A8A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B3D5F] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jordan@healthauthority.ca"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3D5F]/15 bg-white text-xs text-[#1A2530] focus:border-[#1F8A8A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B3D5F] mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Public Health Unit / University"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3D5F]/15 bg-white text-xs text-[#1A2530] focus:border-[#1F8A8A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B3D5F] mb-1">
                        Topic of Inquiry *
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3D5F]/15 bg-white text-xs text-[#1A2530] focus:border-[#1F8A8A] focus:outline-none cursor-pointer"
                      >
                        <option value="Consultation">Book a Consultation</option>
                        <option value="Organization Pilot">Organization Pilot Demo</option>
                        <option value="Community Tier">Community Tier Application</option>
                        <option value="Indigenous Partnership">Indigenous Health Partnership</option>
                        <option value="Academic Research">Academic &amp; Research Alliance</option>
                        <option value="General">General Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B3D5F] mb-1">
                      How Can We Help? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline your public health objectives, target populations, or governance questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#0B3D5F]/15 bg-white text-xs text-[#1A2530] focus:border-[#1F8A8A] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded text-[#1F8A8A] focus:ring-[#1F8A8A]"
                    />
                    <label htmlFor="consent" className="text-[11px] text-[#5D7185] leading-snug cursor-pointer">
                      I agree to the confidential processing of this inquiry under Preventa AI&apos;s privacy policy. No health info is requested.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="btn-primary !w-full justify-center !py-3 text-xs font-bold mt-2"
                  >
                    <Send size={14} />
                    <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EBF3E7] text-[#3E692D] flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0B3D5F]">
                Thank You for Connecting with Preventa AI
              </h3>
              <p className="text-xs sm:text-sm text-[#5D7185] max-w-md mx-auto leading-relaxed">
                Your message has been received by our public health team. We review all submissions carefully and will respond to <span className="font-bold text-[#0B3D5F]">{formData.email}</span> within 2 business days.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary !py-2 !px-4 text-xs mt-4"
              >
                Send Another Note
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
