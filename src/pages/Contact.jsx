import React from "react";
import { Envelope, Phone, MapPin, CaretDown } from "phosphor-react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
        <p className="mt-2 text-gray-500">
          Have questions? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* LEFT COLUMN: Contact Info & Form */}
        <div className="space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-6 text-center text-primary">
              <Phone size={32} className="mx-auto mb-2" />
              <p className="font-bold">+1 234 567 890</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-6 text-center text-primary">
              <Envelope size={32} className="mx-auto mb-2" />
              <p className="font-bold">support@flavor.com</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-6 text-center text-primary">
              <MapPin size={32} className="mx-auto mb-2" />
              <p className="font-bold">New York, USA</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none"
                required
              />
              <textarea
                rows="4"
                placeholder="How can we help?"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:outline-none"
                required
              ></textarea>
              <button className="w-full rounded-lg bg-primary py-3 font-bold text-white transition hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Map & FAQ */}
        <div className="space-y-8">
          {/* Google Map Embed */}
          <div className="h-64 overflow-hidden rounded-2xl shadow-sm">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* FAQ Section */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group border-b border-gray-100 pb-4 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>How long does delivery take?</span>
                  <span className="transition group-open:rotate-180">
                    <CaretDown />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Standard shipping takes 3-5 business days. Express shipping is
                  available for 1-2 day delivery.
                </p>
              </details>

              <details className="group border-b border-gray-100 pb-4 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>What is your return policy?</span>
                  <span className="transition group-open:rotate-180">
                    <CaretDown />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  You can return any unused item within 30 days of purchase for
                  a full refund. No questions asked.
                </p>
              </details>

              <details className="group border-b border-gray-100 pb-4 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                  <span>Do you offer international shipping?</span>
                  <span className="transition group-open:rotate-180">
                    <CaretDown />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Yes, we ship to over 100 countries worldwide. Shipping fees
                  may vary based on location.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
