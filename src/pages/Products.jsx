import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../api/dummyProductsApi";
import { Funnel, MagnifyingGlass, CircleNotch } from "phosphor-react";

// Components
import ProductCard from "../components/shared/ProductCard";
import FilterSidebar from "../components/products/FilterSidebar";
import SortDropdown from "../components/products/SortDropdown";
import Skeleton from "../components/shared/Skeleton";
import ErrorMessage from "../components/ui/ErrorMessage";
import SEO from "../components/shared/SEO";

const Products = () => {
  // 1. URL Params Management
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Infinite Scroll State ---
  const [displayLimit, setDisplayLimit] = useState(12);
  const observerTarget = useRef(null);

  // 2. Initialize State from URL (Persistence)
  const initialFilters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || 0,
    sortBy: searchParams.get("sortBy") || "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  // 3. Handle Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // 4. Sync State to URL
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (filters.category && filters.category !== "all")
      params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minRating > 0) params.minRating = filters.minRating;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    setSearchParams(params);
  }, [filters, debouncedSearch, setSearchParams]);

  //  Reset Scroll when filters change ---
  useEffect(() => {
    setDisplayLimit(12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters, debouncedSearch]);

  // 5. Prepare API Query Params
  const [sortKey, sortOrder] = filters.sortBy.split("-");

  const queryParams = {
    limit: 100,
    skip: 0,
    search: debouncedSearch,
    category: filters.category,
    sortBy: sortKey,
    order: sortOrder,
  };

  const { data, isLoading, isError, refetch } =
    useGetAllProductsQuery(queryParams);

  // 6. CLIENT-SIDE FILTERING
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    return data.products.filter((product) => {
      const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
      const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
      const priceMatch = product.price >= min && product.price <= max;
      const ratingMatch = product.rating >= parseFloat(filters.minRating);
      return priceMatch && ratingMatch;
    });
  }, [data, filters.minPrice, filters.maxPrice, filters.minRating]);

  //  Slice based on displayLimit (Infinite Scroll) ---
  const visibleProducts = filteredProducts.slice(0, displayLimit);
  const hasMore = displayLimit < filteredProducts.length;
  const totalItems = filteredProducts.length;

  //  Intersection Observer Logic ---
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore) {
        // User reached bottom, load 12 more with a small delay for UX
        setTimeout(() => {
          setDisplayLimit((prev) => prev + 12);
        }, 500);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [handleObserver]);

  const handleCategoryChange = useCallback((cat) => {
    setFilters((prev) => ({ ...prev, category: cat, page: 1 }));
    setIsSidebarOpen(false);
  }, []);

  const handlePriceChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  }, []);

  // 7. Handlers
  const handleClearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      minRating: 0,
      sortBy: "",
    });
    setDisplayLimit(12);
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="All Products"
        description="Browse our extensive collection of top rated products"
      />
      {/* Page Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {filters.category === "all"
            ? "All Products"
            : `Category: ${filters.category}`}
        </h1>

        {/* Mobile Filter Toggle */}
        <button
          className="flex items-center gap-2 rounded-lg border px-4 py-2 font-medium md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Funnel /> Filters
        </button>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* LEFT: Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onClear={handleClearFilters}
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* RIGHT: Product Grid */}
        <div className="flex-1">
          {/* Controls: Search & Sort */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none"
              />
              <MagnifyingGlass
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <SortDropdown
              sort={filters.sortBy}
              setSort={(val) =>
                setFilters((prev) => ({ ...prev, sortBy: val }))
              }
            />
          </div>

          {/* Product Grid Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <ErrorMessage
              message="We couldn't load the products. Please try again."
              onRetry={refetch}
            />
          ) : totalItems === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="text-xl">
                No products found matching your filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* The Grid (Using visibleProducts) */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* --- INFINITE SCROLL LOADER --- */}
              {hasMore && (
                <div
                  ref={observerTarget}
                  className="mt-8 flex justify-center py-4"
                >
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <CircleNotch size={24} className="animate-spin" />
                    Loading more products...
                  </div>
                </div>
              )}

              {/* End of Results Message */}
              {!hasMore && visibleProducts.length > 0 && (
                <p className="mt-8 text-center text-gray-400 text-sm">
                  You've reached the end of the list.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
