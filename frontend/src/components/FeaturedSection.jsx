import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'women',
    title: "Women's Collection",
    subtitle: "Atelier Gowns, Silk Sarees & Drapes",
    itemCount: "20 Curated Pieces",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?cat=women",
    tag: "Haute Couture"
  },
  {
    id: 'men',
    title: "Men's Collection",
    subtitle: "Bespoke Tailoring & Fine Linen Sets",
    itemCount: "20 Curated Pieces",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?cat=men",
    tag: "Sartorial"
  },
  {
    id: 'accessories',
    title: "Luxury Accessories",
    subtitle: "Full-Grain Leather, Gems & Silk",
    itemCount: "20 Curated Pieces",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?cat=accessories",
    tag: "Artisanal"
  }
];

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-stone-500 text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-stone-700" />
            <span>Discover The Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif uppercase tracking-tight text-stone-900">
            Curated Universes
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans tracking-wide leading-relaxed">
            Select a realm below to explore twenty signature creations handcrafted with bespoke tailoring and pure organic textures.
          </p>
        </div>

        {/* 3 Luxury Big Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(cat.link)}
              className="group relative h-[520px] w-full overflow-hidden rounded-none cursor-pointer bg-stone-900 shadow-xl transition-all duration-700 hover:shadow-2xl"
            >
              {/* Background Image with Slow Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-85 group-hover:opacity-95"
              />

              {/* Dark Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

              {/* Top Tag */}
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-medium">
                  {cat.tag}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col justify-end space-y-3 text-white">
                <span className="text-[11px] uppercase tracking-[0.25em] text-stone-300 font-sans">
                  {cat.itemCount}
                </span>
                
                <h3 className="text-2xl lg:text-3xl font-serif uppercase tracking-wide text-white group-hover:text-stone-200 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                {/* Explore Link with Floating Arrow */}
                <div className="pt-4 flex items-center justify-between border-t border-white/20">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:underline underline-offset-8 transition-all">
                    Explore Collection
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-stone-900 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;