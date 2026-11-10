import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Linkedin, Github, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Software Internship Opportunity',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const mailtoLink = `mailto:${PORTFOLIO_DATA.email}?subject=${encodeURIComponent(
    `[Student Portfolio Inquiry] ${formData.topic} - ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(formData.message || 'Hi Venkat,\n\nI came across your portfolio from NIAT X Joy University and would like to connect regarding...')}`;

  return (
    <section id="contact" className="py-24 border-t border-neutral-200 dark:border-rose-950/70 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-tech font-semibold tracking-widest uppercase text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 shadow-[0_0_8px_#dc2626]" />
                <span>Get In Touch</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Let's Connect & Collaborate.
              </h2>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed font-sans">
                I am actively seeking software internships, hackathon teammates, and mentorship opportunities. Whether you have a project idea or internship role, feel free to drop a message.
              </p>
            </div>

            {/* Quick Contact Card */}
            <div className="p-6 rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-rose-950/60 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-200 dark:border-rose-900/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Student Email</div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white font-mono">
                      {PORTFOLIO_DATA.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-neutral-500 hover:text-red-500 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-rose-950/40 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-red-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/80 dark:border-rose-950/60 text-xs text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>NIAT X Joy University Campus · Tamil Nadu, India</span>
              </div>
            </div>

            {/* Social & Profiles */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://github.com/venkatvaddi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#0c0305] dark:hover:bg-rose-950/50 border border-neutral-200 dark:border-rose-950 transition-colors hover:text-red-500"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/venkat-vaddi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-[#0c0305] dark:hover:bg-rose-950/50 border border-neutral-200 dark:border-rose-950 transition-colors hover:text-red-500"
              >
                <Linkedin className="w-4 h-4 text-red-500" />
                <span>LinkedIn</span>
              </a>

              <a
                href={mailtoLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-red-500 bg-rose-950/30 border border-rose-900/60 hover:bg-rose-900/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Quick Mailto</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white/90 dark:bg-[#090204]/85 backdrop-blur-md border border-neutral-200 dark:border-rose-950/80 shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Chen"
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-rose-950/70 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-rose-950/70 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Discussion Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-rose-950/70 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    >
                      <option>Software Internship Opportunity</option>
                      <option>Hackathon Team / Collaboration</option>
                      <option>Project Collaboration / Open Source</option>
                      <option>Mentorship & Technical Advice</option>
                      <option>General Message / Greetings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share project details, student opportunities, or what you'd like to collaborate on..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-rose-950/70 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">
                      Replies typically within 24 hours
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-rose-950 shadow-sm shadow-red-950/40 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-rose-950/60 text-red-400 flex items-center justify-center mx-auto border border-rose-900">
                    <Check className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                    Thank you for reaching out, {formData.name}. Venkat will review your note and get back to you at {formData.email}.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <a
                      href={mailtoLink}
                      className="px-4 py-2 text-xs font-medium text-red-500 hover:underline"
                    >
                      Launch native email client →
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', topic: 'Software Internship Opportunity', message: '' });
                      }}
                      className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-white border border-neutral-200 dark:border-rose-950 rounded-lg"
                    >
                      Send another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
