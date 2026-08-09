import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Clock, Sparkles, Printer } from 'lucide-react';

const ROOM_RATES = {
  'heritage': { name: 'The Heritage Master Suite', price: 6500 },
  'pine-deluxe': { name: 'Pine View Deluxe Room', price: 4200 },
  'lofi-loft': { name: 'Lo-Fi Loft Cottage', price: 5400 },
  'fireside-villa': { name: 'Fireside Haven Villa', price: 9800 }
};

export default function BookingSection() {
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '2',
    room: 'heritage',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [confirmation, setConfirmation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Set default dates on mount
  useEffect(() => {
    const today = new Date();
    const checkout = new Date();
    checkout.setDate(today.getDate() + 2);

    setFormData((prev) => ({
      ...prev,
      checkin: prev.checkin || today.toISOString().split('T')[0],
      checkout: prev.checkout || checkout.toISOString().split('T')[0]
    }));
  }, []);

  // Calculate nights & pricing
  const calculateNights = () => {
    if (!formData.checkin || !formData.checkout) return 1;
    const start = new Date(formData.checkin);
    const end = new Date(formData.checkout);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const currentRoom = ROOM_RATES[formData.room] || ROOM_RATES['heritage'];
  const roomTotal = currentRoom.price * nights;
  const taxes = Math.round(roomTotal * 0.10);
  const grandTotal = roomTotal + taxes;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const refCode = 'SHANU-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmation({
      refCode,
      roomName: currentRoom.name,
      checkin: formData.checkin,
      checkout: formData.checkout,
      nights,
      guests: formData.guests,
      fullName: formData.fullName,
      email: formData.email,
      total: grandTotal
    });
  };

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F3ECE1] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFE8DC] text-[#C87A53] text-xs font-semibold uppercase tracking-widest">
            Instant Reservations
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-light text-[#2C221E] leading-tight">
            Reserve Your <span className="italic text-[#C87A53] font-serif-heading">Mountain Escape</span>
          </h2>
          <p className="text-[#6B5B52] text-base sm:text-lg">
            No upfront deposit required. Instant confirmation with zero cancellation fees up to 48h before stay.
          </p>
        </div>

        {/* Main Form & Summary Container */}
        <div className="bg-[#FBF8F3] border border-[#D9C6B4]/60 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-100 border border-rose-200 text-rose-800 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-serif-heading text-2xl font-semibold text-[#2C221E]">
                1. Stay Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="book-checkin" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    id="book-checkin"
                    name="checkin"
                    value={formData.checkin}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="book-checkout" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    id="book-checkout"
                    name="checkout"
                    value={formData.checkout}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="book-room" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                    Accommodations
                  </label>
                  <select
                    id="book-room"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                  >
                    <option value="heritage">The Heritage Master Suite (₹6,500/night)</option>
                    <option value="pine-deluxe">Pine View Deluxe Room (₹4,200/night)</option>
                    <option value="lofi-loft">Lo-Fi Loft Cottage (₹5,400/night)</option>
                    <option value="fireside-villa">Fireside Haven Villa (₹9,800/night)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="book-guests" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                    Number of Guests
                  </label>
                  <select
                    id="book-guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                  >
                    <option value="1">1 Guest (Solo Sanctuary)</option>
                    <option value="2">2 Guests (Couple / Friends)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests (Family)</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#D9C6B4]/60">
              <h3 className="font-serif-heading text-2xl font-semibold text-[#2C221E]">
                2. Guest Contact Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="book-name" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="book-name"
                    name="fullName"
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="book-email" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="book-email"
                    name="email"
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="book-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="book-phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="book-requests" className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B52] mb-1">
                  Special Requests / Dietary Preferences
                </label>
                <textarea
                  id="book-requests"
                  name="specialRequests"
                  rows="3"
                  placeholder="e.g., Late check-in, vegetarian breakfast options..."
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full bg-[#EFE8DC]/60 border border-[#D9C6B4] rounded-xl px-4 py-3 text-sm text-[#2C221E] focus:ring-2 focus:ring-[#C87A53] focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#2C221E] hover:bg-[#C87A53] text-[#FBF8F3] font-medium text-base transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Confirm & Lock Reservation</span>
              <Sparkles className="w-5 h-5" />
            </button>

          </form>

          {/* Right: Live Price & Benefits Summary Card */}
          <div className="lg:col-span-5 bg-[#F3ECE1] border border-[#D9C6B4]/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C87A53] font-semibold block mb-2">
                Live Reservation Breakdown
              </span>
              <h4 className="font-serif-heading text-2xl font-bold text-[#2C221E] mb-4">
                {currentRoom.name}
              </h4>

              <div className="space-y-3 text-sm text-[#6B5B52] pb-6 border-b border-[#D9C6B4]/60">
                <div className="flex justify-between">
                  <span>Room Rate ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                  <span className="font-medium text-[#2C221E]">₹{roomTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artisanal Breakfast & Tea</span>
                  <span className="text-emerald-700 font-medium">Included (₹0)</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Resort Tax & Service (10%)</span>
                  <span className="font-medium text-[#2C221E]">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#6B5B52] block">Total Estimated Cost</span>
                  <span className="text-[#C87A53] font-serif-heading text-3xl font-bold">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right text-xs text-[#6B5B52]">
                  <span>Pay upon arrival at lodge</span>
                </div>
              </div>
            </div>

            {/* Lodge Guarantees */}
            <div className="space-y-3 pt-6 border-t border-[#D9C6B4]/60 text-xs text-[#6B5B52]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4A5D4E]" />
                <span>Zero reservation fees or hidden charges</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4A5D4E]" />
                <span>Free cancellation up to 48 hours prior</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A5D4E]" />
                <span>Instant email confirmation voucher</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmation && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1714]/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#FBF8F3] border border-[#D9C6B4] rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 text-center animate-in zoom-in duration-300 relative">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C87A53] font-semibold">Reservation Confirmed!</span>
              <h3 className="font-serif-heading text-3xl font-bold text-[#2C221E]">
                We Can't Wait to Welcome You
              </h3>
              <p className="text-xs font-mono text-[#6B5B52] bg-[#EFE8DC] py-1 px-3 rounded-full inline-block">
                Reference ID: <strong className="text-[#2C221E]">{confirmation.refCode}</strong>
              </p>
            </div>

            <div className="bg-[#F3ECE1] p-4 rounded-2xl text-left text-xs sm:text-sm space-y-2 text-[#2C221E]">
              <div className="flex justify-between border-b border-[#D9C6B4]/40 pb-1.5">
                <span className="text-[#6B5B52]">Guest Name:</span>
                <strong>{confirmation.fullName}</strong>
              </div>
              <div className="flex justify-between border-b border-[#D9C6B4]/40 pb-1.5">
                <span className="text-[#6B5B52]">Selected Suite:</span>
                <strong>{confirmation.roomName}</strong>
              </div>
              <div className="flex justify-between border-b border-[#D9C6B4]/40 pb-1.5">
                <span className="text-[#6B5B52]">Dates:</span>
                <span>{confirmation.checkin} → {confirmation.checkout} ({confirmation.nights} n)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#6B5B52]">Total Due at Check-In:</span>
                <strong className="text-[#C87A53] font-serif-heading text-lg">₹{confirmation.total.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <p className="text-xs text-[#6B5B52]">
              A confirmation email has been sent to <strong>{confirmation.email}</strong>.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full border border-[#D9C6B4] text-xs font-medium text-[#2C221E] hover:bg-[#EFE8DC] flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={() => setConfirmation(null)}
                className="px-6 py-2 rounded-full bg-[#2C221E] text-white hover:bg-[#C87A53] text-xs font-medium transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
