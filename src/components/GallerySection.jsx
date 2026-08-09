import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, title: 'Twilight Lodge View', category: 'Lodge & Architecture', image: '/images/hero.jpg' },
  { id: 2, title: 'Heritage Suite Bedroom', category: 'Rooms & Lofts', image: '/images/heritage_suite.jpg' },
  { id: 3, title: 'Lo-Fi Loft Attic', category: 'Rooms & Lofts', image: '/images/lofi_loft.jpg' },
  { id: 4, title: 'Fireside Hearth Lounge', category: 'Lounge & Fireside', image: '/images/fireplace_lounge.jpg' },
  { id: 5, title: 'Pine Deluxe Balcony', category: 'Rooms & Lofts', image: '/images/pine_deluxe.jpg' },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F3ECE1] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFE8DC] text-[#C87A53] text-xs font-semibold uppercase tracking-widest">
            Visual Story
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-light text-[#2C221E] leading-tight">
            Moments at <span className="italic text-[#C87A53] font-serif-heading">Shanu Lodge</span>
          </h2>
          <p className="text-[#6B5B52] text-base sm:text-lg">
            A glimpse into the quiet corners, glowing hearths, and mountain vistas awaiting your arrival.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery Category Filters">
          {['All', 'Lodge & Architecture', 'Rooms & Lofts', 'Lounge & Fireside'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                activeFilter === filter
                  ? 'bg-[#2C221E] text-white shadow-sm'
                  : 'bg-[#EFE8DC] text-[#6B5B52] hover:bg-[#E5DBCB] hover:text-[#2C221E]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-[#2C221E] aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-[#E5B899] font-medium">{item.category}</span>
                <h3 className="font-serif-heading text-2xl font-bold">{item.title}</h3>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#EFE8DC]">
                  <Maximize className="w-3.5 h-3.5" />
                  <span>Expand View</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1714]/95 backdrop-blur-xl p-4 transition-opacity"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4"
          >
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center text-white space-y-1">
              <h3 className="font-serif-heading text-2xl">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-xs text-[#E5B899]">{filteredItems[lightboxIndex].category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
