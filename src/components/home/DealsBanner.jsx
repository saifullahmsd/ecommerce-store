import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "phosphor-react";

const DealsBanner = () => {
  return (
    <section className="my-12 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
      <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:justify-between md:p-12">
        <div className="text-center md:text-left">
          <div className="mb-2 flex items-center justify-center gap-2 text-yellow-400 md:justify-start">
            <Tag size={24} weight="fill" />
            <span className="font-bold uppercase tracking-wider">
              Limited Time Offer
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Get 30% Off On All{" "}
            <span className="text-blue-400">Electronics</span>
          </h2>
          <p className="mb-6 max-w-md text-slate-300">
            Upgrade your tech game with our latest gadgets. Offer valid until
            stocks last. Don't miss out!
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">02</span>
              <span className="text-xs text-slate-400">Days</span>
            </div>
            <span className="text-2xl font-bold text-slate-600">:</span>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">14</span>
              <span className="text-xs text-slate-400">Hours</span>
            </div>
            <span className="text-2xl font-bold text-slate-600">:</span>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">28</span>
              <span className="text-xs text-slate-400">Mins</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            to="/products?category=smartphones"
            className="rounded-lg bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Shop the Sale
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealsBanner;
