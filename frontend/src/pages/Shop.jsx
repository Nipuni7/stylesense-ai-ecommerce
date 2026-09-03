```jsx
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';

import ProductCard from '../components/ProductCard';
import QuickViewModel from '../components/QuickViewModel';
import CompleteLookModal from '../components/CompleteLookModal';
import VirtualTryOnModal from '../components/VirtualTryOnModal';

import { normalizedCatalog, catalogStats } from '../data/catalog';
import { getRecommendations } from '../utils/recommendations';


// ============================================================
// SORT OPTIONS
// ============================================================

const SORTS = {
  featured: (a, b) => (b.trendScore || 0) - (a.trendScore || 0),

  low: (a, b) => Number(a.price || 0) - Number(b.price || 0),

  high: (a, b) => Number(b.price || 0) - Number(a.price || 0),

  az: (a, b) =>
    String(a.name || '').localeCompare(String(b.name || '')),
};


// ============================================================
// DEFAULT FILTERS
// ============================================================

const INITIAL_FILTERS = {
  color: 'all',
  badge: 'all',
  min: 0,
  max: 120000,
  sort: 'featured',
};


// ============================================================
// HELPERS
// ============================================================

const safeString = (value) =>
  value === undefined || value === null
    ? ''
    : String(value).toLowerCase();

const normalizeSearchText = (value) =>
  safeString(value)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();


// ============================================================
// SHOP COMPONENT
// ============================================================

const Shop = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('cat') || 'all';

  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [completeLookProduct, setCompleteLookProduct] = useState(null);

  const [tryOnProduct, setTryOnProduct] = useState(null);


  // ==========================================================
  // CATEGORY LABEL
  // ==========================================================

  const categoryTitle = useMemo(() => {
    switch (category) {
      case 'women':
        return "Women's Atelier";

      case 'men':
        return "Men's Sartorial";

      case 'accessories':
        return 'High Jewels & Accessories';

      default:
        return 'Complete Collection';
    }
  }, [category]);


  // ==========================================================
  // COLORS
  // ==========================================================

  const colors = useMemo(() => {
    const uniqueColors = new Set();

    normalizedCatalog.forEach((product) => {
      if (product.color) {
        uniqueColors.add(product.color);
      }
    });

    return ['all', ...Array.from(uniqueColors).sort()];
  }, []);


  // ==========================================================
  // BADGES
  // ==========================================================

  const badges = useMemo(() => {
    const uniqueBadges = new Set();

    normalizedCatalog.forEach((product) => {
      if (product.badge) {
        uniqueBadges.add(product.badge);
      }
    });

    return ['all', ...Array.from(uniqueBadges).sort()];
  }, []);


  // ==========================================================
  // SEARCH + FILTER + SORT
  // ==========================================================

  const filteredProducts = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    const searchTerms = query
      ? query.split(/\s+/).filter(Boolean)
      : [];

    return normalizedCatalog
      .filter((product) => {
        // CATEGORY
        if (
          category !== 'all' &&
          safeString(product.category) !== safeString(category)
        ) {
          return false;
        }

        return true;
      })

      // -------------------------------------------------------
      // SMART SEARCH
      // -------------------------------------------------------

      .filter((product) => {
        if (!searchTerms.length) {
          return true;
        }

        const searchableText = normalizeSearchText(
          [
            product.name,
            product.description,
            product.category,
            product.color,
            product.badge,
            product.material,
            product.style,
            product.type,
            ...(Array.isArray(product.searchTags)
              ? product.searchTags
              : []),
          ]
            .filter(Boolean)
            .join(' ')
        );

        return searchTerms.every((term) =>
          searchableText.includes(term)
        );
      })

      // -------------------------------------------------------
      // COLOR
      // -------------------------------------------------------

      .filter((product) => {
        if (filters.color === 'all') {
          return true;
        }

        return (
          safeString(product.color) ===
          safeString(filters.color)
        );
      })

      // -------------------------------------------------------
      // BADGE
      // -------------------------------------------------------

      .filter((product) => {
        if (filters.badge === 'all') {
          return true;
        }

        return (
          safeString(product.badge) ===
          safeString(filters.badge)
        );
      })

      // -------------------------------------------------------
      // PRICE
      // -------------------------------------------------------

      .filter((product) => {
        const price = Number(product.price || 0);

        return (
          price >= Number(filters.min || 0) &&
          price <= Number(filters.max || 120000)
        );
      })

      // -------------------------------------------------------
      // SORT
      // -------------------------------------------------------

      .sort(
        SORTS[filters.sort] || SORTS.featured
      );
  }, [
    category,
    searchQuery,
    filters,
  ]);


  // ==========================================================
  // AI-STYLE RECOMMENDATIONS
  // ==========================================================

  const recommendations = useMemo(() => {
    try {
      return getRecommendations(
        normalizedCatalog,
        {
          category,
          query: searchQuery,
        }
      );
    } catch (error) {
      console.error(
        'Recommendation engine error:',
        error
      );

      return [];
    }
  }, [
    category,
    searchQuery,
  ]);


  // ==========================================================
  // CATEGORY UPDATE
  // ==========================================================

  const updateCategory = (nextCategory) => {
    if (nextCategory === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({
        cat: nextCategory,
      });
    }

    // Reset filters when switching category
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  };


  // ==========================================================
  // FILTER UPDATE
  // ==========================================================

  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };


  // ==========================================================
  // RESET
  // ==========================================================

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  };


  // ==========================================================
  // SAFE CART HANDLER
  // ==========================================================

  const handleAddToCart = (product) => {
    if (!product) {
      return;
    }

    if (typeof onAddToCart === 'function') {
      try {
        onAddToCart(product);
      } catch (error) {
        console.error(
          'Unable to add product to cart:',
          error
        );
      }

      return;
    }

    console.warn(
      'onAddToCart was not provided.',
      product
    );
  };


  // ==========================================================
  // IMAGE FALLBACK
  // ==========================================================

  const handleImageError = (event, product) => {
    const fallback =
      product?.fallbackImage ||
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80';

    if (
      event.currentTarget.src !== fallback
    ) {
      event.currentTarget.src = fallback;
    }
  };


  // ==========================================================
  // FILTER PANEL
  // ==========================================================

  const FilterPanel = ({ mobile = false }) => {
    return (
      <div
        className={
          mobile
            ? 'p-5 space-y-6'
            : 'p-5 space-y-6'
        }
      >

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold">
            <SlidersHorizontal className="w-4 h-4" />
            Refine
          </div>

          {mobile && (
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              aria-label="Close filters"
              className="p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}

        </div>


        {/* COLOR */}
        <label className="block space-y-2">

          <span className="text-[10px] uppercase tracking-widest text-stone-500">
            Color
          </span>

          <select
            value={filters.color}
            onChange={(event) =>
              updateFilter(
                'color',
                event.target.value
              )
            }
            className="w-full border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-stone-700"
          >

            {colors.map((color) => (
              <option
                key={color}
                value={color}
              >
                {color === 'all'
                  ? 'All Colors'
                  : color}
              </option>
            ))}

          </select>

        </label>


        {/* BADGE */}
        <label className="block space-y-2">

          <span className="text-[10px] uppercase tracking-widest text-stone-500">
            Collection / Badge
          </span>

          <select
            value={filters.badge}
            onChange={(event) =>
              updateFilter(
                'badge',
                event.target.value
              )
            }
            className="w-full border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-stone-700"
          >

            {badges.map((badge) => (
              <option
                key={badge}
                value={badge}
              >
                {badge === 'all'
                  ? 'All Collections'
                  : badge}
              </option>
            ))}

          </select>

        </label>


        {/* PRICE */}
        <div className="space-y-2">

          <span className="text-[10px] uppercase tracking-widest text-stone-500">
            Price Range
          </span>

          <div className="grid grid-cols-2 gap-2">

            <input
              type="number"
              min="0"
              value={filters.min}
              onChange={(event) =>
                updateFilter(
                  'min',
                  Number(event.target.value) || 0
                )
              }
              className="w-full border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-stone-700"
              placeholder="Min"
            />

            <input
              type="number"
              min="0"
              value={filters.max}
              onChange={(event) =>
                updateFilter(
                  'max',
                  Number(event.target.value) || 120000
                )
              }
              className="w-full border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-stone-700"
              placeholder="Max"
            />

          </div>

        </div>


        {/* SORT */}
        <label className="block space-y-2">

          <span className="text-[10px] uppercase tracking-widest text-stone-500">
            Sort By
          </span>

          <select
            value={filters.sort}
            onChange={(event) =>
              updateFilter(
                'sort',
                event.target.value
              )
            }
            className="w-full border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-stone-700"
          >

            <option value="featured">
              Featured
            </option>

            <option value="low">
              Price: Low → High
            </option>

            <option value="high">
              Price: High → Low
            </option>

            <option value="az">
              A → Z
            </option>

          </select>

        </label>


        {/* RESET */}
        <button
          type="button"
          onClick={resetFilters}
          className="w-full border border-stone-300 py-2.5 text-[10px] uppercase tracking-[0.2em] hover:bg-stone-100 transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </button>

      </div>
    );
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-8">

      {/* ======================================================
          HERO / HEADER
      ====================================================== */}

      <header className="border-b border-stone-200 pb-8">

        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-7">

          <div className="space-y-3">

            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-400 font-semibold">
              StyleSense AI · Atelier Inventory
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif uppercase tracking-tight text-stone-900">
              {categoryTitle}
            </h1>

            <p className="text-xs sm:text-sm text-stone-500">
              {filteredProducts.length} of{' '}
              {category === 'all'
                ? catalogStats.total
                : catalogStats[category] || 0}{' '}
              pieces curated for you.
            </p>

          </div>


          {/* CATEGORY NAV */}
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Product categories"
          >

            {[
              'all',
              'women',
              'men',
              'accessories',
            ].map((cat) => (

              <button
                key={cat}
                type="button"
                onClick={() =>
                  updateCategory(cat)
                }
                className={`
                  px-4 py-2.5
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  transition-all
                  ${
                    category === cat
                      ? 'bg-stone-900 text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
                  }
                `}
              >
                {cat}
              </button>

            ))}

          </nav>

        </div>

      </header>


      {/* ======================================================
          SEARCH
      ====================================================== */}

      <section className="flex flex-col lg:flex-row gap-4 lg:items-center">

        <div className="relative flex-1 max-w-3xl">

          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search name, material, color, mood, badge..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-700 transition"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() =>
                setSearchQuery('')
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

        </div>


        {/* MOBILE FILTER BUTTON */}
        <div className="flex gap-2">

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="lg:hidden flex-1 px-4 py-3.5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>


          {/* DESKTOP SORT */}
          <select
            value={filters.sort}
            onChange={(event) =>
              updateFilter(
                'sort',
                event.target.value
              )
            }
            className="hidden lg:block border border-stone-200 bg-white px-4 py-3 text-[10px] uppercase tracking-wider outline-none"
          >

            <option value="featured">
              Featured
            </option>

            <option value="low">
              Price Low → High
            </option>

            <option value="high">
              Price High → Low
            </option>

            <option value="az">
              A → Z
            </option>

          </select>

        </div>

      </section>


      {/* ======================================================
          AI RECOMMENDATIONS
      ====================================================== */}

      {recommendations.length > 0 &&
        !searchQuery && (

          <section className="border-y border-stone-200 py-6">

            <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold">

              <Sparkles className="w-3.5 h-3.5" />

              AI Atelier Edit · Recommended for you

            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {recommendations
                .slice(0, 4)
                .map((product) => (

                  <button
                    key={product.id}
                    type="button"
                    onClick={() =>
                      setQuickViewProduct(
                        product
                      )
                    }
                    className="group text-left bg-white border border-stone-200 p-2 hover:border-stone-500 transition"
                  >

                    <div className="aspect-[4/5] overflow-hidden bg-stone-100">

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(event) =>
                          handleImageError(
                            event,
                            product
                          )
                        }
                      />

                    </div>


                    <p className="mt-2 font-serif text-xs truncate">
                      {product.name}
                    </p>

                    <p className="text-[10px] font-mono text-stone-500">
                      LKR{' '}
                      {Number(
                        product.price || 0
                      ).toLocaleString()}
                    </p>

                  </button>

                ))}

            </div>

          </section>

        )}


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">


        {/* ====================================================
            DESKTOP FILTER
        ==================================================== */}

        <aside className="hidden lg:block bg-white border border-stone-200 sticky top-24">

          <FilterPanel />

        </aside>


        {/* ====================================================
            PRODUCTS
        ==================================================== */}

        <section>

          {filteredProducts.length === 0 ? (

            /* EMPTY STATE */

            <div className="py-28 border border-dashed border-stone-300 text-center">

              <Search className="w-8 h-8 mx-auto text-stone-300 mb-4" />

              <h2 className="font-serif text-xl text-stone-900">
                No pieces found
              </h2>

              <p className="text-xs text-stone-500 mt-2">
                Try a different search or reset
                your filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 px-5 py-2.5 bg-stone-900 text-white text-[10px] uppercase tracking-widest hover:bg-stone-800 transition"
              >
                Clear Search
              </button>

            </div>

          ) : (

            /* PRODUCT GRID */

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6">

              {filteredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}

                    onAddToCart={
                      handleAddToCart
                    }

                    onQuickView={
                      setQuickViewProduct
                    }

                    onTryOn={
                      setTryOnProduct
                    }

                    onCompleteLook={() =>
                      setCompleteLookProduct(
                        product
                      )
                    }
                  />

                )
              )}

            </div>

          )}

        </section>

      </div>


      {/* ======================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {mobileFiltersOpen && (

        <div className="fixed inset-0 z-[60] lg:hidden">

          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />


          {/* DRAWER */}

          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#FAF8F5] shadow-2xl overflow-y-auto">

            <FilterPanel mobile />

          </div>

        </div>

      )}


      {/* ======================================================
          QUICK VIEW
      ====================================================== */}

      <QuickViewModel
        isOpen={Boolean(
          quickViewProduct
        )}
        product={quickViewProduct}
        onClose={() =>
          setQuickViewProduct(null)
        }
        onAddToCart={
          handleAddToCart
        }
      />


      {/* ======================================================
          COMPLETE LOOK
      ====================================================== */}

      <CompleteLookModal
        isOpen={Boolean(
          completeLookProduct
        )}
        productId={
          completeLookProduct?.id ||
          null
        }
        onClose={() =>
          setCompleteLookProduct(null)
        }
        onAddToCart={
          handleAddToCart
        }
      />


      {/* ======================================================
          VIRTUAL TRY ON
      ====================================================== */}

      <VirtualTryOnModal
        isOpen={Boolean(
          tryOnProduct
        )}
        product={tryOnProduct}
        onClose={() =>
          setTryOnProduct(null)
        }
        onAddToCart={
          handleAddToCart
        }
      />

    </main>
  );
};


export default Shop;
```
