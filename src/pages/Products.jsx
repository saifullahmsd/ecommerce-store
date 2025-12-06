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
import ErrorMessage from "../components/ui/ErrorMessage";
import SEO from "../components/shared/SEO";
import PageTransition from "../components/shared/PageTransition";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(12);
  const observerTarget = useRef(null);

  // Initialize State
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

  // Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Sync URL
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

  // Reset Scroll on Filter Change
  useEffect(() => {
    setDisplayLimit(12);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.sortBy,
    debouncedSearch,
  ]);

  // API Query
  const [sortKey, sortOrder] = filters.sortBy.split("-");
  const { data, isLoading, isError, refetch } = useGetAllProductsQuery({
    limit: 100,
    skip: 0,
    search: debouncedSearch,
    category: filters.category,
    sortBy: sortKey,
    order: sortOrder,
  });

  // Client-Side Filtering
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

  // Pagination Logic
  const visibleProducts = filteredProducts.slice(0, displayLimit);
  const hasMore = displayLimit < filteredProducts.length;
  const totalItems = filteredProducts.length;

  // Infinite Scroll Observer
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore) {
        setTimeout(() => setDisplayLimit((prev) => prev + 12), 500);
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

  // Handlers (Memoized)
  const handleCategoryChange = useCallback((cat) => {
    setFilters((prev) => ({ ...prev, category: cat, page: 1 }));
    setIsSidebarOpen(false);
  }, []);

  const handlePriceChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  }, []);

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
    <PageTransition>
      <div className="container mx-auto px-4 py-4 max-w-[1600px]">
        <SEO
          title="All Products"
          description="Browse our extensive collection of top rated products"
        />

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {filters.category === "all"
              ? "All Products"
              : `Category: ${filters.category}`}
          </h1>
          <button
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium dark:border-slate-700 dark:text-gray-200 lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Funnel /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onClear={handleClearFilters}
              isOpen={isSidebarOpen}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </div>

          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onClear={handleClearFilters}
              isOpen={isSidebarOpen}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          </div>

          <div className="min-w-0">
            {/* Controls */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-4 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none dark:bg-slate-900 dark:border-slate-600 dark:text-white"
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <ErrorMessage
                message="We couldn't load the products."
                onRetry={refetch}
              />
            ) : totalItems === 0 ? (
              <div className="py-20 text-center text-gray-500 dark:text-gray-400">
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {hasMore && (
                  <div
                    ref={observerTarget}
                    className="mt-8 flex justify-center py-4"
                  >
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <CircleNotch size={24} className="animate-spin" /> Loading
                      more products...
                    </div>
                  </div>
                )}

                {!hasMore && (
                  <p className="mt-8 text-center text-gray-400 text-sm">
                    You've reached the end of the list.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Products;
