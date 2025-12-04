import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "../components/cart/CartDrawer";
import BackToTopButton from "../components/ui/BackToTopButton";
import PromoModal from "../components/ui/PromoModal";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col  ">
      {/* Navbar */}
      <Navbar />
      <CartDrawer />
      <PromoModal />
      {/* Main Content Area */}

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <Outlet />
        </div>
      </main>
      <BackToTopButton />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
