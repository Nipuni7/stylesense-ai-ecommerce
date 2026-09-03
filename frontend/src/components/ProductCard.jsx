```jsx
import React from 'react';
import {
  Eye,
  ShoppingBag,
  Shirt,
  Sparkles,
  Heart,
  ArrowUpRight
} from 'lucide-react';

const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
  onTryOn,
  onCompleteLook
}) => {
  const aiScore = product.trendScore || 94;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden bg-[#faf9f7] border border-stone-200/70 transition-all duration-500 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_50px_rgba(28,25,23,0.10)]">

      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
          loading="lazy"
        />

        {/* Soft luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-70 pointer-events-none" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 bg-[#171513]/90 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-stone-100 backdrop-blur-md">
              <Sparkles className="h-2.5 w-2.5 text-amber-300" />
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white/90 text-stone-700 opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-stone-900 hover:text-white group-hover:opacity-100"
          title="Add to wishlist"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>

        {/* Quick View */}
        <button
          onClick={() => onQuickView?.(product)}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-2 bg-white/95 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-stone-900 opacity-0 shadow-lg backdrop-blur-md transition-all duration-400 hover:bg-stone-900 hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" />
          Quick View
        </button>

        {/* AI Match */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 border border-white/20 bg-stone-950/75 px-2.5 py-1.5 text-[8px] font-mono tracking-wide text-amber-200 backdrop-blur-md">
          <Sparkles className="h-2.5 w-2.5" />
          {aiScore}% AI MATCH
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="flex flex-1 flex-col p-5">

        {/* Category + color */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-stone-400">
            {product.category}
          </span>

          <span className="text-[8px] uppercase tracking-[0.12em] text-stone-400">
            {product.color || 'Neutral'}
          </span>
        </div>

        {/* Name */}
        <div className="group/name flex items-start justify-between gap-2">
          <h3 className="font-serif text-[16px] leading-snug tracking-wide text-stone-900">
            {product.name}
          </h3>

          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-stone-300 transition-all duration-300 group-hover/name:-translate-y-0.5 group-hover/name:translate-x-0.5 group-hover/name:text-stone-800" />
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-stone-500">
          {product.description}
        </p>

        {/* AI Curated */}
        <div className="mt-4 border-l-2 border-stone-800 bg-stone-100/70 px-3 py-2.5">
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles className="h-2.5 w-2.5 text-stone-700" />
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-stone-700">
              AI Curated
            </span>
          </div>

          <p className="line-clamp-2 text-[9px] leading-relaxed text-stone-500">
            {product.explainableRationale ||
              'Selected for your refined palette, silhouette preference and current style profile.'}
          </p>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end justify-between border-t border-stone-200/80 pt-4">
          <div>
            <span className="mb-1 block text-[8px] uppercase tracking-[0.2em] text-stone-400">
              Investment
            </span>

            <span className="font-serif text-[15px] tracking-wide text-stone-900">
              LKR {product.price?.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => onAddToCart?.(product)}
            className="group/bag flex items-center gap-2 bg-stone-900 px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-stone-700 active:scale-95"
          >
            <ShoppingBag className="h-3 w-3 transition-transform group-hover/bag:-translate-y-0.5" />
            Add
          </button>
        </div>

        {/* ================= AI ACTIONS ================= */}
        <div className="mt-3 grid grid-cols-2 gap-2">

          <button
            onClick={() => onTryOn?.(product)}
            className="flex items-center justify-center gap-1.5 border border-stone-800 bg-stone-900 py-2.5 text-[8px] font-semibold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:bg-stone-700 active:scale-[0.98]"
          >
            <Shirt className="h-3 w-3" />
            AI Try-On
          </button>

          <button
            onClick={() => onCompleteLook?.(product.id)}
            className="flex items-center justify-center gap-1.5 border border-stone-200 bg-white py-2.5 text-[8px] font-semibold uppercase tracking-[0.13em] text-stone-700 transition-all duration-300 hover:border-stone-800 hover:bg-stone-50 active:scale-[0.98]"
          >
            <Sparkles className="h-3 w-3" />
            Pair Look
          </button>

        </div>
      </div>
    </article>
  );
};

export default ProductCard;
```
