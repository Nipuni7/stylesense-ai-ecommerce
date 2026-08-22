import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  ChevronRight 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

const mockProductData = {
  id: 1,
  name: "Pleated Tussar Silk Trench",
  category: "Outerwear",
  price: 34500,
  aiMatch: 98,
  description: "Cut from ethically sourced raw Tussar silk, this structured trench coat reimagines classical tailoring with modern drape lines. Engineered for both formal presence and transitional climate layering.",
  fabric: "100% Raw Tussar Silk & Handwoven Linen lining",
  care: "Dry clean only. Preserve in breathable garment bag.",
  sizes: ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14"],
  colors: [
    { name: "Raw Ecru", hex: "#E3DAC9" },
    { name: "Obsidian Black", hex: "#1A1A1A" },
    { name: "Sandstone", hex: "#C2B280" }
  ],
  images: [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
  ]
};

const completeTheLookItems = [
  {
    id: 3,
    name: "Draped Organza Evening Slip",
    category: "Occasionwear",
    price: 42000,
    aiMatch: 99,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Woven Minimalist Leather Tote",
    category: "Accessories",
    price: 31000,
    aiMatch: 96,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("UK 8");
  const [selectedColor, setSelectedColor] = useState(mockProductData.colors[0]);
  const [addedToBag, setAddedToBag] = useState(false);

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2500);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-luxury text-brand-muted mb-8">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-dark font-medium">{mockProductData.name}</span>
        </div>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Gallery View */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto">
              {mockProductData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 aspect-[3/4] overflow-hidden rounded-sm border transition-all ${
                    selectedImage === idx ? 'border-brand-dark ring-1 ring-brand-dark' : 'border-brand-sand opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] overflow-hidden rounded-sm bg-brand-sand shadow-lg">
              <img
                src={mockProductData.images[selectedImage]}
                alt={mockProductData.name}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />
              <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md border border-brand-champagne/40 px-3 py-1 rounded-full text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">
                <Sparkles className="w-3 h-3 inline-block mr-1.5" />
                {mockProductData.aiMatch}% AI Aesthetic Fit
              </div>
            </div>
          </div>

          {/* Right: Product Spec & Action Area */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">
                  {mockProductData.category}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-brand-dark tracking-tight mt-1">
                  {mockProductData.name}
                </h1>
                <p className="text-xl font-serif text-brand-dark font-semibold mt-3">
                  LKR {mockProductData.price.toLocaleString()}
                </p>
              </div>

              <p className="text-xs text-brand-muted font-sans leading-relaxed">
                {mockProductData.description}
              </p>

              {/* Color Selector */}
              <div className="pt-2">
                <div className="flex justify-between text-xs uppercase tracking-luxury mb-2.5">
                  <span className="text-brand-muted">Color:</span>
                  <span className="text-brand-dark font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex gap-3">
                  {mockProductData.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      aria-label={col.name}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor.name === col.name ? 'border-brand-dark ring-2 ring-brand-champagne scale-110' : 'border-brand-sand'
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-luxury mb-2.5">
                  <span className="text-brand-muted">Select Size:</span>
                  <button className="text-brand-champagne hover:underline text-[11px]">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {mockProductData.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs uppercase tracking-wider border rounded-sm transition-all ${
                        selectedSize === size
                          ? 'bg-brand-dark text-brand-cream border-brand-dark font-semibold'
                          : 'bg-transparent text-brand-dark border-brand-sand hover:border-brand-champagne'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag CTA */}
              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 py-4 bg-brand-dark text-brand-cream text-xs uppercase tracking-luxury font-bold hover:bg-brand-charcoal transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {addedToBag ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-brand-champagne" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  aria-label="Wishlist"
                  className="w-14 border border-brand-sand flex items-center justify-center hover:border-brand-champagne hover:text-brand-champagne transition-all"
                >
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Luxury Badges */}
              <div className="pt-6 border-t border-brand-sand space-y-3 text-xs text-brand-dark">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-brand-champagne" />
                  <span className="font-light">Complimentary Islandwide Express Delivery (2-3 Days)</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-brand-champagne" />
                  <span className="font-light">Complimentary 14-day Private Returns & Exchanges</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-champagne" />
                  <span className="font-light">Authenticity & Artisan Material Certificate Included</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Complete the Look Section */}
        <div className="mt-28 pt-16 border-t border-brand-sand">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Complete The Look
            </span>
            <h2 className="font-serif text-3xl uppercase tracking-tight text-brand-dark mt-1">
              AI Algorithmic Ensemble
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {completeTheLookItems.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;