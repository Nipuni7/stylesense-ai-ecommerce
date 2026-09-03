import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import QuickViewModel from "../components/QuickViewModel";
import CompleteLookModal from "../components/CompleteLookModal";
import VirtualTryOnModal from "../components/VirtualTryOnModal";

import { catalog60 } from "../data/catalog";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "all";

  const [currentCategory, setCurrentCategory] =
    useState(categoryFromUrl);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    color: "all",
    badge: "all",
    price: "all",
    sort: "featured",
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [completeLookProduct, setCompleteLookProduct] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  /*
   * ----------------------------------------------------
   * CATEGORY OPTIONS
   * ----------------------------------------------------
   */
  const categories = [
    {
      id: "all",
      label: "All Collection",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "men",
      label: "Men",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
  ];

  /*
   * ----------------------------------------------------
   * DYNAMIC FILTER OPTIONS
   * ----------------------------------------------------
   */
  const colorOptions = useMemo(() => {
    const colors = catalog60
      .map((product) => product.color)
      .filter(Boolean);

    return ["all", ...new Set(colors)];
  }, []);

  const badgeOptions = useMemo(() => {
    const badges = catalog60
      .map((product) => product.badge)
      .filter(Boolean);

    return ["all", ...new Set(badges)];
  }, []);

  /*
   * ----------------------------------------------------
   * FILTER + SEARCH + SORT
   * ----------------------------------------------------
   */
  const filteredProducts = useMemo(() => {
    let products = [...catalog60];

    // Category
    if (currentCategory !== "all") {
      products = products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          currentCategory.toLowerCase()
      );
    }

    // Search
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      products = products.filter((product) => {
        const searchableText = [
          product.name,
          product.description,
          product.category,
          product.color,
          product.badge,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Color
    if (filters.color !== "all") {
      products = products.filter(
        (product) =>
          product.color?.toLowerCase() ===
          filters.color.toLowerCase()
      );
    }

    // Badge
    if (filters.badge !== "all") {
      products = products.filter(
        (product) =>
          product.badge?.toLowerCase() ===
          filters.badge.toLowerCase()
      );
    }

    // Price
    if (filters.price !== "all") {
      products = products.filter((product) => {
        const price = Number(product.price) || 0;

        if (filters.price === "under-25000") {
          return price < 25000;
        }

        if (filters.price === "25000-50000") {
          return price >= 25000 && price <= 50000;
        }

        if (filters.price === "50000-80000") {
          return price > 50000 && price <= 80000;
        }

        if (filters.price === "over-80000") {
          return price > 80000;
        }

        return true;
      });
    }

    // Sort
    if (filters.sort === "price-low") {
      products.sort(
        (a, b) =>
          Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (filters.sort === "price-high") {
      products.sort(
        (a, b) =>
          Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (filters.sort === "name") {
      products.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
      );
    }

    return products;
  }, [
    currentCategory,
    searchQuery,
    filters,
  ]);

  /*
   * ----------------------------------------------------
   * ACTIVE FILTER COUNT
   * ----------------------------------------------------
   */
  const activeFilterCount = [
    filters.color !== "all",
    filters.badge !== "all",
    filters.price !== "all",
  ].filter(Boolean).length;

  /*
   * ----------------------------------------------------
   * CLEAR FILTERS
   * ----------------------------------------------------
   */
  const clearFilters = () => {
    setFilters({
      color: "all",
      badge: "all",
      price: "all",
      sort: "featured",
    });

    setSearchQuery("");
  };

  /*
   * ----------------------------------------------------
   * CATEGORY CHANGE
   * ----------------------------------------------------
   */
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  /*
   * ----------------------------------------------------
   * PRODUCT CALLBACKS
   * ----------------------------------------------------
   */

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleTryOn = (product) => {
    setTryOnProduct(product);
  };

  /*
   * IMPORTANT:
   * ProductCard versions can send either:
   * - full product object
   * - product ID
   *
   * This handles BOTH safely.
   */
  const handleCompleteLook = (productOrId) => {
    if (!productOrId) {
      return;
    }

    if (typeof productOrId === "object") {
      setCompleteLookProduct(productOrId);
      return;
    }

    const foundProduct = catalog60.find(
      (product) =>
        String(product.id) === String(productOrId)
    );

    if (foundProduct) {
      setCompleteLookProduct(foundProduct);
    }
  };

  /*
   * ----------------------------------------------------
   * PRICE FORMATTER
   * ----------------------------------------------------
   */
  const formatPrice = (price) => {
    const numericPrice = Number(price) || 0;

    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* ==================================================
          HERO
      ================================================== */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.05),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.25em] text-white/60">
              <Sparkles size={14} />
              STYLESENSE AI ATELIER
            </div>

            <h1 className="font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              {currentCategory === "all"
                ? "Complete Collection"
                : `${currentCategory}'s Atelier`}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Discover curated fashion pieces selected through
              AI-powered style intelligence, premium design,
              and modern haute couture aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SHOP CONTROLS
      ================================================== */}
      <section className="sticky top-0 z-30 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((category) => {
                const active =
                  currentCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(category.id)
                    }
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Search + Filter */}
            <div className="flex w-full gap-2 lg:max-w-xl">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search the collection..."
                  className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-10 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters((value) => !value)
                }
                className={`relative flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition ${
                  showFilters
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white"
                }`}
              >
                <SlidersHorizontal size={17} />

                <span className="hidden sm:inline">
                  Filters
                </span>

                {activeFilterCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-black">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ==================================================
              FILTER PANEL
          ================================================== */}
          {showFilters && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* Color */}
                <FilterSelect
                  label="Color"
                  value={filters.color}
                  onChange={(value) =>
                    setFilters((previous) => ({
                      ...previous,
                      color: value,
                    }))
                  }
                  options={colorOptions}
                />

                {/* Badge */}
                <FilterSelect
                  label="Collection"
                  value={filters.badge}
                  onChange={(value) =>
                    setFilters((previous) => ({
                      ...previous,
                      badge: value,
                    }))
                  }
                  options={badgeOptions}
                />

                {/* Price */}
                <FilterSelect
                  label="Price"
                  value={filters.price}
                  onChange={(value) =>
                    setFilters((previous) => ({
                      ...previous,
                      price: value,
                    }))
                  }
                  options={[
                    "all",
                    "under-25000",
                    "25000-50000",
                    "50000-80000",
                    "over-80000",
                  ]}
                  labels={{
                    all: "All Prices",
                    "under-25000": "Under LKR 25,000",
                    "25000-50000":
                      "LKR 25,000 – 50,000",
                    "50000-80000":
                      "LKR 50,000 – 80,000",
                    "over-80000":
                      "Over LKR 80,000",
                  }}
                />

                {/* Sort */}
                <FilterSelect
                  label="Sort By"
                  value={filters.sort}
                  onChange={(value) =>
                    setFilters((previous) => ({
                      ...previous,
                      sort: value,
                    }))
                  }
                  options={[
                    "featured",
                    "price-low",
                    "price-high",
                    "name",
                  ]}
                  labels={{
                    featured: "Featured",
                    "price-low": "Price: Low to High",
                    "price-high": "Price: High to Low",
                    name: "Name: A to Z",
                  }}
                />
              </div>

              {activeFilterCount > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-white/45 underline underline-offset-4 transition hover:text-white"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          RESULTS HEADER
      ================================================== */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Curated Selection
            </p>

            <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "Piece"
                : "Pieces"}
            </h2>
          </div>

          {searchQuery && (
            <p className="text-sm text-white/40">
              Results for{" "}
              <span className="text-white/75">
                “{searchQuery}”
              </span>
            </p>
          )}
        </div>
      </section>

      {/* ==================================================
          PRODUCT GRID
      ================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
                onTryOn={handleTryOn}
                onCompleteLook={handleCompleteLook}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] px-6 text-center">
            <div className="max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <Search
                  size={24}
                  className="text-white/35"
                />
              </div>

              <h3 className="mt-6 font-serif text-2xl text-white">
                No pieces found
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                We couldn't find anything matching your
                current search and filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Reset Collection
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ==================================================
          MODALS
      ================================================== */}

      {quickViewProduct && (
        <QuickViewModel
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {completeLookProduct && (
        <CompleteLookModal
          productId={completeLookProduct.id}
          onClose={() => setCompleteLookProduct(null)}
        />
      )}

      {tryOnProduct && (
        <VirtualTryOnModal
          product={tryOnProduct}
          onClose={() => setTryOnProduct(null)}
        />
      )}
    </main>
  );
};

/*
 * ======================================================
 * FILTER SELECT COMPONENT
 * ======================================================
 */
const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  labels = {},
}) => {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#111111] px-4 pr-10 text-sm text-white outline-none transition focus:border-white/25"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {labels[option] || formatOption(option)}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/35"
        />
      </div>
    </div>
  );
};

/*
 * ======================================================
 * OPTION LABEL FORMATTER
 * ======================================================
 */
const formatOption = (option) => {
  if (!option) {
    return "";
  }

  if (option === "all") {
    return "All";
  }

  return option
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
};

export default Shop;