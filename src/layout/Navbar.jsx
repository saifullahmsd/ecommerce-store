import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  User,
  MagnifyingGlass,
  List,
  X,
  Heart,
  SignOut,
  Package,
} from "phosphor-react";
import { useGetAllProductsQuery } from "../api/dummyProductsApi";
import SearchSuggestions from "../components/ui/SearchSuggestions";
import MobileMenu from "./MobileMenu";
import { openCart } from "../features/cart/cartSlice";
import { logout } from "../features/auth/authSlice";
import ThemeToggle from "../components/ui/ThemeToggle";

// Helper component for NavLink styling
const StyledNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative font-medium ${
        isActive
          ? "text-primary" // Active link color
          : "text-text-muted hover:text-primary" // Inactive link color
      } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-primary after:transition-transform ${
        isActive ? "after:scale-x-100" : "hover:after:scale-x-100"
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items = [], totalQuantity } = useSelector(
    (state) => state.cart || {}
  );

  // ---  SEARCH STATE & LOGIC ---
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null); // To detect clicks outside
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Debounce Logic: Wait 500ms before updating the term for API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer); // Cleanup on typing
  }, [searchTerm]);

  // 2. Fetch Data based on Debounced Term (Only if term > 2 chars)

  const shouldFetch = debouncedTerm.length > 2;
  const { data, isLoading } = useGetAllProductsQuery(
    { search: debouncedTerm, limit: 5 },
    { skip: !shouldFetch } // Don't fetch if term is too short
  );

  // 3. Handle "Enter" Key Press
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      navigate(`/products?search=${searchTerm}`);
    }
  };

  // 4. Click Outside to Close Suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // --- END  SEARCH LOGIC ---

  return (
    <>
      {/* Main Nav container */}
      <nav className="sticky top-0 z-30 w-full bg-card/80 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* 1. Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Ecommerce-Store
          </Link>

          {/* 2. Desktop Nav Links */}
          <div className="hidden items-center space-x-6 md:flex">
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/products">Products</StyledNavLink>
            <StyledNavLink to="/categories">Categories</StyledNavLink>
          </div>

          {/* 3. Icons & Search */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-800 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>

              {/* Suggestions Dropdown Component */}
              {showSuggestions && debouncedTerm.length > 2 && (
                <SearchSuggestions
                  suggestions={data?.products}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  closeSearch={() => setShowSuggestions(false)}
                />
              )}
            </div>
            {/* --- END SEARCH BAR --- */}
            <Link
              to="/wishlist"
              className="hidden rounded-full p-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-red-500 sm:block"
            >
              <Heart size={24} />
            </Link>

            {/* Cart Icon */}
            <div className="group relative">
              <Link
                onClick={() => dispatch(openCart())}
                to="/cart"
                className="relative rounded-full p-2 text-text-muted transition-all hover:bg-background hover:text-primary"
              >
                <ShoppingCart size={24} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-text">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* Mini Cart Dropdown (Only show if items exist) */}
              {items?.length > 0 && (
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-72 translate-y-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-xl border border-gray-100 bg-white p-4">
                    <h4 className="mb-3 font-semibold text-gray-800">
                      Recent Items
                    </h4>
                    <div className="mb-4 flex flex-col gap-3">
                      {items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt="thumb"
                            className="h-10 w-10 rounded object-contain bg-gray-50"
                          />
                          <div className="overflow-hidden">
                            <p className="truncate text-sm font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} x ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/cart"
                      className="block w-full rounded-lg bg-primary py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      View Full Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle />

            {/* User Section */}
            {isAuthenticated ? (
              <div className="group relative">
                {/* User Avatar (Hover target) */}
                <button className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-gray-100">
                  <img
                    src={user.image}
                    alt="User"
                    className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                  />
                  <span className="hidden text-sm font-semibold text-gray-700 md:block">
                    {user.firstName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-48 translate-y-2 rounded-xl border border-gray-100 bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {/* User Info Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-100 rounded-t-xl">
                    <p className="font-bold text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* ---  LINKS START --- */}
                  <div className="p-1">
                    <Link
                      to="/profile"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      <User size={18} /> My Profile
                    </Link>

                    <Link
                      to="/profile/orders"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      <Package size={18} /> My Orders
                    </Link>
                  </div>
                  {/* --- LINKS END --- */}

                  <div className="border-t border-gray-100 p-1">
                    <button
                      onClick={() => dispatch(logout())}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                      <SignOut size={18} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Guest: Show Login Link */
              <Link
                to="/login"
                className="rounded-full p-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-primary"
              >
                <User size={24} />
              </Link>
            )}

            {/* Mobile Burger Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-full p-2 text-text-muted hover:bg-background hover:text-primary md:hidden"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Render Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
};

export default Navbar;
