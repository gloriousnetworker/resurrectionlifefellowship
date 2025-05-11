'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMade, setPaymentMade] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    createdAt: null
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      
      // Generate a random order ID
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setOrderDetails({
        orderId: `ORD-${randomId}`,
        createdAt: new Date()
      });
    } else {
      // If no cart is found, redirect back to products
      router.push('/products');
    }
  }, [router]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePaymentConfirmation = () => {
    setPaymentMade(true);
  };

  const handleCompleteOrder = () => {
    // In a real app, you would process the order here
    setOrderComplete(true);
    // Clear the cart after order completion
    localStorage.removeItem('cart');
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (orderComplete) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="text-green-500 text-8xl mb-6">✓</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You for Your Support!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your generous donation will go a long way in putting smiles on the faces of children and families in need.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700 mb-2">Order ID: <span className="font-semibold">{orderDetails.orderId}</span></p>
              <p className="text-gray-700">Date: <span className="font-semibold">{formatDate(orderDetails.createdAt)}</span></p>
            </div>
            <p className="text-gray-600 mb-8">
              We truly appreciate your contribution to making the world a better place.
            </p>
            <button 
              onClick={handleReturnHome}
              className="bg-[#039994] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#02736f] transition"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold text-[#039994] mb-8">Checkout</h1>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700 mb-2">Order ID: <span className="font-semibold">{orderDetails.orderId}</span></p>
                <p className="text-gray-700">Date: <span className="font-semibold">{formatDate(orderDetails.createdAt)}</span></p>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-[#039994] rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border-2 mr-3 border-[#039994] bg-[#039994]"></div>
                    <h3 className="font-medium">Bank Transfer</h3>
                  </div>
                  
                  <div className="mt-4 pl-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Make transfer to:</p>
                      <p className="text-gray-600 mb-1">Bank: GTBank</p>
                      <p className="text-gray-600 mb-1">Account Name: Shakers Network Media Limited</p>
                      <p className="text-gray-600 mb-1">Account Number: 0556638338</p>
                      <p className="text-sm text-gray-500 mt-3">
                        Please use your order ID as the payment reference
                      </p>
                    </div>

                    <div className="mt-6">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={paymentMade}
                          onChange={handlePaymentConfirmation}
                          className="h-5 w-5 text-[#039994] rounded border-gray-300 focus:ring-[#039994]"
                        />
                        <span className="ml-2 text-gray-700">I've made the payment</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦0</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-[#039994]">₦{calculateSubtotal().toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCompleteOrder}
                disabled={!paymentMade}
                className={`w-full font-semibold px-6 py-4 rounded-lg transition mt-8 ${
                  paymentMade 
                    ? 'bg-[#039994] text-white hover:bg-[#02736f] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Order
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}