document.addEventListener('DOMContentLoaded', () => {
  const hotelCards = document.getElementById('hotelCards');
  const bookingForm = document.getElementById('bookingForm');

  // Fetch and display hotel cards
  function loadHotels() {
    fetch('/api/hotels')
      .then(res => res.json())
      .then(hotels => {
        hotelCards.innerHTML = '';
        hotels.forEach((hotel, idx) => {
          const card = document.createElement('div');
          card.className = 'hotel-card';
          card.style.animationDelay = `${idx * 0.12}s`; // staggered animation

          card.innerHTML = `
            <h3>${hotel.name}</h3>
            <div class="location">📍 ${hotel.location}</div>
            <div class="rooms">🛏️ Rooms: ${hotel.rooms}</div>
          `;
          hotelCards.appendChild(card);

          // Optional: On click, fill hotel name in form
          card.addEventListener('click', () => {
            document.getElementById('hotelName').value = hotel.name;
            card.classList.add('selected');
            setTimeout(() => card.classList.remove('selected'), 500);
          });
        });
      })
      .catch(() => {
        hotelCards.innerHTML = '<div style="color:red;">Could not load hotels.</div>';
      });
  }

  // Handle booking form submission
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const guestName = document.getElementById('guestName').value;
    const hotelName = document.getElementById('hotelName').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const departureDate = document.getElementById('departureDate').value;

    // Find hotel by name
    fetch('/api/hotels')
      .then(res => res.json())
      .then(hotels => {
        const hotel = hotels.find(h => h.name.toLowerCase() === hotelName.toLowerCase());
        if (!hotel) {
          alert('Hotel not found!');
          return;
        }
        // Post booking
        fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hotel: hotel._id,
            guestName,
            arrivalDate,
            departureDate
          })
        })
        .then(res => res.json())
        .then(data => {
          alert('Booking successful!');
          bookingForm.reset();
        })
        .catch(() => alert('Booking failed!'));
      });
  });

  loadHotels();
});