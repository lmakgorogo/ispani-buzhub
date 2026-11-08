import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin, Building2, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('General Inquiry');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="py-12 lg:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Get in Touch · Ispani Biz Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Us
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Have questions about business compliance, suggestions for our guide, or advertising inquiries? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                MaruB Creations
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Operating Ispani Biz Hub to support emerging entrepreneurs, freelancers, and small enterprises across South Africa.
              </p>

              <div className="pt-2 space-y-3 text-xs">
                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Official Email</span>
                    <a href="mailto:marubcreations@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      marubcreations@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Location</span>
                    <span>Johannesburg & Pretoria, South Africa</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Turnaround Time</span>
                    <span>Typically within 24 to 48 business hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Advertising & Partnerships</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Interested in advertising to South African entrepreneurs or listing an accredited SME accelerator cohort? Select "Advertising / Sponsorship" in the form.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                  Send a Direct Message
                </h2>

                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sipho Ndlovu"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sipho@example.co.za"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Enquiry Subject
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
                  >
                    <option value="General Inquiry">General Information Inquiry</option>
                    <option value="Advertising / Sponsorship">Advertising / Google AdSense Query</option>
                    <option value="Content Suggestion">Content Suggestion / Statutory Update</option>
                    <option value="Partnership">Partnership / Accelerator Listing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can MaruB Creations assist your business or query?"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your message regarding <em>{subject}</em> has been received by MaruB Creations. We will get back to you shortly.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={onNavigateHome}
                    className="px-4 py-2 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Return to Guide
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
