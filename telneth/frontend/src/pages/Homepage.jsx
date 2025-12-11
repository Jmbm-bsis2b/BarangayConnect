import React from "react";

const announcements = [
  {
    id: 1,
    title: "Barangay Clean-Up Drive",
    date: "Dec 5, 2025",
    excerpt: "Join us this weekend for our annual community clean-up. Let's keep our barangay beautiful!",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Free Health Checkup",
    date: "Dec 12, 2025",
    excerpt: "Avail free health screenings at the barangay hall on Dec 12. Bring your family!",
    image: "https://images.unsplash.com/photo-1588776814546-4db4de90d6e0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Holiday Festival Schedule",
    date: "Dec 15-20, 2025",
    excerpt: "Celebrate with us! Check the full schedule of events for the holiday festival.",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=800&q=80",
  },
];

const services = [
  { id: 1, icon: "🏢", title: "Certificate Requests", description: "Request barangay clearance, residency certificates, and more." },
  { id: 2, icon: "⚠️", title: "Report Issues", description: "Report barangay concerns or emergencies easily online." },
  { id: 3, icon: "📅", title: "Events Calendar", description: "Stay updated with upcoming community events and activities." },
  { id: 4, icon: "📞", title: "Contact Officials", description: "Get in touch with barangay officials for assistance." },
];

const testimonials = [
  { id: 1, name: "Maria Santos", text: "The barangay portal made it so easy to request my clearance. Very convenient!" },
  { id: 2, name: "Juan Dela Cruz", text: "I love how involved our community is through this portal. Great job!" },
  { id: 3, name: "Luz Mendoza", text: "Reporting barangay concerns online saved me a lot of time." },
];

export default function Homepage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[420px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
          filter: "brightness(0.7)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to BarangayConnect</h1>
          <p className="text-xl font-light max-w-2xl mx-auto drop-shadow-md">
            Your community portal for announcements, services, and connecting with your barangay officials.
          </p>
          <button className="mt-8 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Announcements */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-yellow-400 inline-block pb-1">Latest Announcements</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {announcements.map(({ id, title, date, excerpt, image }) => (
            <div key={id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
              <img src={image} alt={title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <p className="text-sm text-yellow-600 font-semibold mb-2">{date}</p>
                <p className="text-gray-700">{excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-yellow-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 border-b-4 border-yellow-400 inline-block pb-1">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {services.map(({ id, icon, title, description }) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer"
              >
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-10 border-b-4 border-yellow-400 inline-block pb-1 text-center">
          What Our Residents Say
        </h2>
        <div className="space-y-6">
          {testimonials.map(({ id, name, text }) => (
            <blockquote
              key={id}
              className="bg-white p-6 rounded-lg shadow-lg italic text-gray-800 border-l-4 border-yellow-400"
            >
              <p>"{text}"</p>
              <footer className="mt-3 font-semibold text-yellow-600">— {name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-xl mb-2">BarangayConnect</h3>
            <p>© 2025 BarangayConnect. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-300">
              📘
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-300">
              🐦
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-300">
              📸
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
