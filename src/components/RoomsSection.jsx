import React, { useState, useEffect } from 'react';
import { Bed, Users, Maximize2, X, ArrowRight, ShieldCheck, Check } from 'lucide-react';

const ROOMS = [
  {
    id: 'heritage',
    name: 'The Heritage Master Suite',
    tagline: 'Stone Hearth Fireplace & Panoramic Valley View',
    price: '₹6,500',
    rawPrice: 6500,
    size: '65 sq. m',
    capacity: '2 - 3 Guests',
    bed: 'King Organic Featherbed',
    image: '/images/heritage_suite.jpg',
    amenities: ['Stone Fireplace', 'Private Deck', 'Cedar Bath', 'Artisanal Breakfast', 'High-Speed Wi-Fi', 'Coffee Bar'],
    description: 'Our flagship suite crafted from solid pine logs and indigenous mountain stone. Features a roaring hearth, floor-to-ceiling windows overlooking foggy pine valleys, and a hand-carved cedar bathtub.'
  },
  {
    id: 'pine-deluxe',
    name: 'Pine View Deluxe Room',
    tagline: 'Warm Timber Sanctuary with Forest Balcony',
    price: '₹4,200',
    rawPrice: 4200,
    size: '48 sq. m',
    capacity: '2 Guests',
    bed: 'King Plush Mattress',
    image: '/images/pine_deluxe.jpg',
    amenities: ['Forest Balcony', 'Rainfall Shower', 'Ambient Lighting', 'Artisanal Breakfast', 'Wi-Fi'],
    description: 'Surrounded by fragrant pine walls and warm ambient lamps. Step onto your private balcony to listen to the birds and mountain breeze.'
  },
  {
    id: 'lofi-loft',
    name: 'Lo-Fi Loft Cottage',
    tagline: 'Cozy Attic Loft with Vinyl Player & Skylight',
    price: '₹5,400',
    rawPrice: 5400,
    size: '55 sq. m',
    capacity: '2 Guests',
    bed: 'Queen Cloud Mattress',
    image: '/images/lofi_loft.jpg',
    amenities: ['Vinyl Record Player', 'Stargazing Skylight', 'Cozy Reading Nook', 'Espresso Bar', 'Wi-Fi'],
    description: 'A music and book lover’s retreat under sloping timber beams. Complete with a vintage vinyl record player, curated lo-fi vinyls, and a skylight right above the plush reading armchair.'
  },
  {
    id: 'fireside-villa',
    name: 'Fireside Haven Villa',
    tagline: 'Spacious Multi-Room Lodge Villa for Families',
    price: '₹9,800',
    rawPrice: 9800,
    size: '95 sq. m',
    capacity: '4 - 6 Guests',
    bed: '2 King Beds + Loft Twin',
    image: '/images/hero.jpg',
    amenities: ['Dual Fireplaces', 'Outdoor Hot Tub', 'Full Lounge', 'Private Kitchenette', 'Mountain Bicycles'],
    description: 'Designed for families or groups seeking connection. Features two master bedrooms, a private outdoor wood-fired soak tub, and a grand fireside living room.'
  }
];

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRoom(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReserveClick = (room) => {
    setSelectedRoom(null);
    const roomSelect = document.getElementById('book-room');
    if (roomSelect) {
      roomSelect.value = room.id;
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="rooms" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F3ECE1] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFE8DC] text-[#C87A53] text-xs font-semibold uppercase tracking-widest">
            Accommodations
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-light text-[#2C221E] leading-tight">
            Rooms & Suites Crafted for <span className="italic text-[#C87A53] font-serif-heading">Restful Sleep</span>
          </h2>
          <p className="text-[#6B5B52] text-base sm:text-lg">
            Every room at Shanu Lodge features organic linens, natural wood textures, acoustic soundproofing, and serene forest views.
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.map((room) => (
            <div 
              key={room.id}
              className="bg-[#FBF8F3] border border-[#D9C6B4]/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Price Tag */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-[#2C221E]/90 backdrop-blur-md text-[#FBF8F3] px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                    <span className="font-serif-heading text-lg font-bold text-[#E5B899]">{room.price}</span>
                    <span className="text-xs text-[#EFE8DC]"> / night</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-2xl font-semibold text-[#2C221E] group-hover:text-[#C87A53] transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-[#C87A53] font-medium tracking-wide mt-1">
                      {room.tagline}
                    </p>
                  </div>

                  {/* Specs Pill List */}
                  <div className="flex flex-wrap gap-4 py-3 border-y border-[#D9C6B4]/50 text-xs text-[#6B5B52]">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#C87A53]" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-[#C87A53]" />
                      <span>{room.size}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#C87A53]" />
                      <span>{room.bed}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#6B5B52] line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="text-sm font-medium text-[#2C221E] hover:text-[#C87A53] underline underline-offset-4 transition"
                >
                  View Details & Features
                </button>
                <button
                  onClick={() => handleReserveClick(room)}
                  className="px-5 py-2.5 rounded-full bg-[#2C221E] text-white hover:bg-[#C87A53] transition-all text-xs font-medium flex items-center gap-1.5 shadow-sm"
                >
                  <span>Select Room</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      {selectedRoom && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1714]/75 backdrop-blur-md transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-room-title"
        >
          <div className="bg-[#FBF8F3] border border-[#D9C6B4] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#2C221E]/80 text-white flex items-center justify-center hover:bg-[#C87A53] transition"
              aria-label="Close room details dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img 
                src={selectedRoom.image} 
                alt={selectedRoom.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E5B899] font-medium">Shanu Lodge Room Guide</span>
                <h3 id="modal-room-title" className="font-serif-heading text-3xl font-bold">
                  {selectedRoom.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-[#2C221E]">
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D9C6B4]">
                <div>
                  <span className="font-serif-heading text-3xl font-bold text-[#C87A53]">{selectedRoom.price}</span>
                  <span className="text-sm text-[#6B5B52]"> / night (Taxes included)</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-[#6B5B52]">
                  <span className="bg-[#EFE8DC] px-3 py-1 rounded-full">{selectedRoom.capacity}</span>
                  <span className="bg-[#EFE8DC] px-3 py-1 rounded-full">{selectedRoom.size}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#6B5B52]">About This Sanctuary</h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#2C221E]">
                  {selectedRoom.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#6B5B52]">Included Amenities & Touches</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {selectedRoom.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#F3ECE1] p-2.5 rounded-xl border border-[#D9C6B4]/50">
                      <Check className="w-4 h-4 text-[#C87A53]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lodge Guarantees */}
              <div className="bg-[#EFE8DC]/80 p-4 rounded-2xl flex items-start gap-3 text-xs text-[#6B5B52]">
                <ShieldCheck className="w-5 h-5 text-[#4A5D4E] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C221E] font-medium">Flexible Cancellation:</strong> Full refund up to 48 hours before check-in. Includes organic breakfast and 24/7 concierge assistance.
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-2 flex items-center justify-end gap-4">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="px-5 py-2.5 rounded-full border border-[#D9C6B4] text-sm text-[#6B5B52] hover:bg-[#EFE8DC]"
                >
                  Close
                </button>
                <button
                  onClick={() => handleReserveClick(selectedRoom)}
                  className="px-6 py-2.5 rounded-full bg-[#C87A53] text-white hover:bg-[#A65B33] text-sm font-medium transition shadow-md flex items-center gap-2"
                >
                  <span>Reserve This Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
