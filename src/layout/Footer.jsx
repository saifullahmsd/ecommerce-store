import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
} from "phosphor-react";

const Footer = () => {
  return (
    <footer className="bg-text p-8 text-background md:p-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Column 1: Brand/About */}
          <div>
            <h3 className="mb-4 text-2xl font-bold">Ecommerce-Store</h3>
            <p className="text-background/70">
              Your one-stop shop for the finest products. Quality and customer
              satisfaction are our top priorities.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-background/70 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-background/70 hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-background/70 hover:text-white"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-background/70 hover:text-white"
                >
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories (Example) */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/categories/electronics"
                  className="text-background/70 hover:text-white"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/apparel"
                  className="text-background/70 hover:text-white"
                >
                  Apparel
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/groceries"
                  className="text-background/70 hover:text-white"
                >
                  Groceries
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/home"
                  className="text-background/70 hover:text-white"
                >
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Customer Support</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link
                  to="/contact"
                  className="text-background/70 hover:text-white "
                >
                  Contact Us
                </Link>
              </li>
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="mt-12 border-t border-background/20 pt-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-sm text-background/60">
              © 2025 Ecommerce-Store. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-4 sm:mt-0">
              <a href="#" className="text-background/70 hover:text-white">
                <FacebookLogo size={24} />
              </a>
              <a href="#" className="text-background/70 hover:text-white">
                <TwitterLogo size={24} />
              </a>
              <a href="#" className="text-background/70 hover:text-white">
                <InstagramLogo size={24} />
              </a>
              <a href="#" className="text-background/70 hover:text-white">
                <LinkedinLogo size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
