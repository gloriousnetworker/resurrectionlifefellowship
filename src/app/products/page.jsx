'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);

  const categories = ['All', 'Hygiene', 'Food', 'Education', 'Clothing'];
  const products = [
    { id: 1, name: 'Eco Toothbrush', price: 3200, image: '/images/toothbrush.jpg', impact: 'Provides oral care for 1 child', category: 'Hygiene' },
    { id: 2, name: 'Hygiene Kit', price: 8900, image: '/images/hygiene-kit.jpg', impact: 'Supports 3 people for a month', category: 'Hygiene' },
    { id: 3, name: 'School Supplies', price: 7200, image: '/images/school-supplies.jpg', impact: 'Equips 2 students', category: 'Education' },
    { id: 4, name: 'Food Basket', price: 15000, image: '/images/food-basket.jpg', impact: 'Feeds a family for a week', category: 'Food' },
    { id: 5, name: 'Winter Jacket', price: 12500, image: '/images/jacket.jpg', impact: 'Keeps 1 child warm', category: 'Clothing' },
    { id: 6, name: 'Sanitary Pads', price: 6500, image: '/images/pads.jpg', impact: 'Supplies for 2 months', category: 'Hygiene' },
    { id: 7, name: 'Notebook Set', price: 4800, image: '/images/notebooks.jpg', impact: 'For 4 students', category: 'Education' },
    { id: 8, name: 'Rice Package', price: 11000, image: '/images/rice.jpg', impact: 'Feeds 5 people', category: 'Food' },
    { id: 9, name: 'Clean Water Kit', price: 9500, image: '/images/water-kit.jpg', impact: 'Provides clean water for 1 month', category: 'Hygiene' },
    { id: 10, name: 'School Uniform', price: 13500, image: '/images/uniform.jpg', impact: 'Provides 1 complete uniform', category: 'Clothing' },
    { id: 11, name: 'Educational Books', price: 8200, image: '/images/books.jpg', impact: 'Provides 3 educational books', category: 'Education' },
    { id: 12, name: 'Vegetable Seeds', price: 4200, image: '/images/seeds.jpg', impact: 'Provides seeds for family garden', category: 'Food' },
  ];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const handleAddToCart = (e, product) => {
    e?.stopPropagation();
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      const newCart = exists
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    if (!selected.includes(product.id)) {
      setSelected(prev => [...prev, product.id]);
    }
  };

  const handleRemoveFromCart = (e, productId) => {
    e.stopPropagation();
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    setSelected(prev => prev.filter(id => id !== productId));
  };

  const handleViewCart = () => router.push('/cart');

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#039994] mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Every purchase makes a difference in someone's life</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full ${activeCategory === cat ? 'bg-[#039994] text-white' : 'bg-white text-gray-800'} shadow-md hover:shadow-lg transition`}
            >{cat}</button>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="flex justify-center mb-8">
            <button onClick={handleViewCart} className="bg-[#039994] text-white px-6 py-3 rounded-lg hover:bg-[#02736f] transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              View Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => {
            const isInCart = cart.some(i => i.id === product.id);
            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer"
              >
                {isInCart && <div className="absolute inset-0 bg-[#039994] bg-opacity-20 rounded-2xl pointer-events-none z-10" />}

                <div className="h-64 bg-gray-50 flex items-center justify-center p-4 relative z-20">
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                </div>

                <div className="p-6 relative z-20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <span className="bg-[#039994] bg-opacity-10 text-[#039994] text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{product.impact}</p>
                  <p className="text-xl font-bold text-[#039994]">₦{product.price.toLocaleString()}</p>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    {isInCart && (
                      <button
                        onClick={(e) => handleRemoveFromCart(e, product.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition w-full"
                      >
                        Remove
                      </button>
                    )}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-[#039994] text-white px-4 py-2 rounded-lg hover:bg-[#02736f] transition w-full"
                    >
                      {isInCart ? 'Add Again' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
