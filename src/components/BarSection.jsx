import React, { useState } from 'react';
import { GlassWater, Wine, Flame, Clock, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';

const LIQUOR_MENU = [
  // Single Malts & Whiskies
  { id: 1, name: 'Glenfiddich 18 Year Reserve', category: 'Single Malts & Whiskies', type: 'Single Malt Scotch', price: '₹1,450', unit: '60ml peg', origin: 'Scotland', notes: 'Baked apple, cinnamon, robust oak maturity.' },
  { id: 2, name: 'Macallan Double Cask 12 Year', category: 'Single Malts & Whiskies', type: 'Speyside Single Malt', price: '₹1,650', unit: '60ml peg', origin: 'Scotland', notes: 'Fudge, citrus zest, warm vanilla spice.' },
  { id: 3, name: 'Amrut Fusion Indian Single Malt', category: 'Single Malts & Whiskies', type: 'Indian Single Malt', price: '₹950', unit: '60ml peg', origin: 'Bengaluru, India', notes: 'Peated malt, sherry sweetness, subtle smoke.' },
  { id: 4, name: 'Hibiki Japanese Harmony', category: 'Single Malts & Whiskies', type: 'Blended Japanese Whisky', price: '₹1,850', unit: '60ml peg', origin: 'Japan', notes: 'Rose, lychee, rosemary, sandalwood.' },

  // Signature Cocktails
  { id: 5, name: 'Pine Mist Old Fashioned', category: 'Signature Cocktails', type: 'Lodge Signature', price: '₹850', unit: 'Glass', origin: 'Shanu Bar Original', notes: 'Smoked Bourbon, pine honey syrup, aromatic bitters, cedar smoke flame.' },
  { id: 6, name: 'Himalayan Hot Toddy', category: 'Signature Cocktails', type: 'Winter Warmth', price: '₹650', unit: 'Warm Mug', origin: 'Shanu Bar Original', notes: 'Dark Rum, organic mountain honey, cinnamon, star anise, fresh lemon.' },
  { id: 7, name: 'Smoky Forest Negroni', category: 'Signature Cocktails', type: 'Aged Cocktail', price: '₹780', unit: 'Glass', origin: 'Craft Mixology', notes: 'Artisanal Gin, Campari, Sweet Vermouth, charred rosemary sprig.' },
  { id: 8, name: 'Espresso Lo-Fi Martini', category: 'Signature Cocktails', type: 'Nightcap', price: '₹720', unit: 'Glass', origin: 'Craft Mixology', notes: 'Single-origin espresso, Vodka, Kahlúa, Madagascar vanilla bean.' },

  // Wines & Champagne
  { id: 9, name: 'Sula Dindori Reserve Shiraz', category: 'Wines & Champagne', type: 'Red Wine', price: '₹750', unit: 'Glass / ₹3,200 Bottle', origin: 'Nashik, India', notes: 'Lush berries, cocoa, black pepper, rich oak aging.' },
  { id: 10, name: 'Château Margaux Premier Cru', category: 'Wines & Champagne', type: 'Vintage Red Wine', price: '₹8,500', unit: 'Bottle', origin: 'Bordeaux, France', notes: 'Blackcurrant, violet notes, silky tannins, exquisite finish.' },
  { id: 11, name: 'Moët & Chandon Brut Impérial', category: 'Wines & Champagne', type: 'French Champagne', price: '₹11,500', unit: 'Bottle', origin: 'Champagne, France', notes: 'Crisp green apple, white flowers, fine elegant bubbles.' },

  // Craft Beers & Cider
  { id: 12, name: 'Mountain Pine Amber Ale', category: 'Craft Beers & Cider', type: 'Microbrew Draught', price: '₹450', unit: '500ml Pint', origin: 'Lodge Brewery', notes: 'Hoppy pine aroma, subtle caramel malt finish.' },
  { id: 13, name: 'Bira 91 White Craft Beer', category: 'Craft Beers & Cider', type: 'Wheat Ale', price: '₹380', unit: '330ml Bottle', origin: 'India', notes: 'Low bitterness, refreshing coriander and orange peel notes.' },
  { id: 14, name: 'Wild Apple Mountain Cider', category: 'Craft Beers & Cider', type: 'Artisanal Cider', price: '₹420', unit: '500ml Pint', origin: 'Himachal Orchards', notes: 'Naturally fermented crisp apple sweetness.' }
];

export default function BarSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [orderedItem, setOrderedItem] = useState(null);

  const categories = ['All', 'Single Malts & Whiskies', 'Signature Cocktails', 'Wines & Champagne', 'Craft Beers & Cider'];

  const filteredItems = activeCategory === 'All'
    ? LIQUOR_MENU
    : LIQUOR_MENU.filter((item) => item.category === activeCategory);

  const handleRoomServiceClick = (item) => {
    setOrderedItem(item);
  };

  return (
    <section id="bar" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1F1714] text-[#FBF8F3] relative overflow-hidden">
      
      {/* Background glowing ambient light effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C87A53]/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#C87A53]/20 border border-[#C87A53]/40 text-[#E5B899] text-xs font-semibold uppercase tracking-widest">
            🍸 Fireside Lounge & Bar
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-light text-[#FBF8F3] leading-tight">
            Curated Spirits & <span className="italic text-[#E5B899] font-serif-heading">Handcrafted Cocktails</span>
          </h2>
          <p className="text-[#EFE8DC]/70 text-base sm:text-lg">
            Relax by the roaring stone fireplace with single malts, rare vintage wines, and artisanal wood-smoked cocktails.
          </p>
        </div>

        {/* Bar Highlights Banner */}
        <div className="bg-[#2C221E] border border-[#4A3931] rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C87A53]/20 text-[#E5B899] flex items-center justify-center text-2xl flex-shrink-0">
              🥃
            </div>
            <div>
              <strong className="text-sm text-[#FBF8F3] block">Rare Single Malts</strong>
              <span className="text-xs text-[#EFE8DC]/70">Curated collection from Scotland, Japan & India</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C87A53]/20 text-[#E5B899] flex items-center justify-center text-2xl flex-shrink-0">
              🔥
            </div>
            <div>
              <strong className="text-sm text-[#FBF8F3] block">Smoked Cocktails</strong>
              <span className="text-xs text-[#EFE8DC]/70">Infused with natural cedar wood smoke & honey</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C87A53]/20 text-[#E5B899] flex items-center justify-center text-2xl flex-shrink-0">
              🛎️
            </div>
            <div>
              <strong className="text-sm text-[#FBF8F3] block">In-Room Bar Service</strong>
              <span className="text-xs text-[#EFE8DC]/70">Nightly room delivery until 12:00 AM</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Liquor Menu Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition duration-300 ${
                activeCategory === cat
                  ? 'bg-[#C87A53] text-white shadow-lg'
                  : 'bg-[#2C221E] text-[#EFE8DC]/70 hover:bg-[#3A2D27] hover:text-[#FBF8F3] border border-[#4A3931]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Liquor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#2C221E] border border-[#4A3931] rounded-3xl p-6 flex flex-col justify-between hover:border-[#C87A53]/60 transition-all duration-300 shadow-md group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#E5B899] font-medium block">
                      {item.type} • {item.origin}
                    </span>
                    <h3 className="font-serif-heading text-xl font-bold text-[#FBF8F3] group-hover:text-[#E5B899] transition-colors mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-serif-heading text-xl font-bold text-[#E5B899] block">{item.price}</span>
                    <span className="text-[10px] text-[#EFE8DC]/60 block">{item.unit}</span>
                  </div>
                </div>

                <p className="text-xs text-[#EFE8DC]/70 leading-relaxed border-t border-[#3A2D27] pt-3">
                  <strong className="text-[#FBF8F3]">Tasting Notes:</strong> {item.notes}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#3A2D27] flex items-center justify-between">
                <span className="text-[11px] text-[#EFE8DC]/50 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C87A53]" />
                  <span>Available till 12 AM</span>
                </span>
                <button
                  onClick={() => handleRoomServiceClick(item)}
                  className="px-3.5 py-1.5 rounded-full bg-[#C87A53]/20 border border-[#C87A53]/50 text-[#E5B899] hover:bg-[#C87A53] hover:text-white transition text-xs font-medium flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order to Room</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Room Service Order Confirmation Modal */}
      {orderedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#2C221E] border border-[#C87A53]/60 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center text-[#FBF8F3] relative animate-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#C87A53]/20 text-[#E5B899] flex items-center justify-center mx-auto text-3xl">
              🍸
            </div>
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E5B899]">In-Room Bar Service</span>
              <h3 className="font-serif-heading text-2xl font-bold">{orderedItem.name}</h3>
              <p className="text-xs text-[#EFE8DC]/70">{orderedItem.unit} • {orderedItem.price}</p>
            </div>

            <div className="bg-[#1F1714] p-4 rounded-2xl text-xs text-[#EFE8DC]/80 space-y-2 text-left">
              <div className="flex justify-between border-b border-[#3A2D27] pb-1">
                <span>Delivery:</span>
                <span className="text-emerald-400 font-medium">To Your Room in 15 mins</span>
              </div>
              <div className="flex justify-between border-b border-[#3A2D27] pb-1">
                <span>Billing:</span>
                <span>Charged to Room Folio</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Item Total:</span>
                <strong className="text-[#E5B899] text-sm">{orderedItem.price}</strong>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setOrderedItem(null)}
                className="px-5 py-2 rounded-full border border-[#4A3931] text-xs text-[#EFE8DC]/80 hover:bg-[#3A2D27]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Order placed for ${orderedItem.name}! Our sommelier will deliver it to your room shortly.`);
                  setOrderedItem(null);
                }}
                className="px-6 py-2 rounded-full bg-[#C87A53] hover:bg-[#A65B33] text-white text-xs font-medium transition shadow-md"
              >
                Confirm Room Order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
