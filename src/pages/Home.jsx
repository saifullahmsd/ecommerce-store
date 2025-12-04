import React from "react";

// Components
import Hero from "../components/home/Hero";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import DealsBanner from "../components/home/DealsBanner";
import BrandsStrip from "../components/home/BrandsStrip";
import SEO from "../components/shared/SEO";

const Home = () => {
  return (
    <div className="space-y-8">
      <SEO
        title="home"
        description="Welcome to FlavourFusion - the best place to buy everything you need"
      />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Strip (Moved up for trust signal, optional placement) */}
      <BrandsStrip />

      {/* 3. Categories Grid */}
      <CategoriesSection />

      {/* 4. Promotional Banner */}
      <DealsBanner />

      {/* 5. Featured Products Grid */}
      <FeaturedProducts />

      {/* Bottom Spacer */}
      <div className="h-12"></div>
    </div>
  );
};

export default Home;
