import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import { CreditCard, Banknote, Smartphone, ChevronRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { playSuccessSound } from '@/lib/sounds';
import confetti from 'canvas-confetti';

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { getCartItems, calculateTotal, getCartCount, clearCart } = useShop();
  const items = getCartItems();
  const total = calculateTotal();
  const count = getCartCount();

  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAddressValid = formData.fullName.trim() && formData.mobile.trim().length >= 10 && formData.pincode.trim() && formData.address.trim() && formData.city.trim() && formData.state.trim();

  const handleContinueToPayment = () => {
    if (!isAddressValid) {
      toast.error('Please fill all address fields correctly');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    setOrderPlaced(true);
    clearCart();
    playSuccessSound();
    toast.success('Order placed successfully! 🎉', {
      style: { background: '#16a34a', color: '#ffffff', border: 'none' },
    });
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <CheckCircle className="h-24 w-24 text-accent mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-md bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Checkout steps header */}
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-4 text-sm font-medium tracking-widest">
          <span className="text-muted-foreground">BAG</span>
          <span className="text-muted-foreground">– – – – –</span>
          <span className={step === 'address' ? 'text-accent font-bold' : 'text-muted-foreground'}>ADDRESS</span>
          <span className="text-muted-foreground">– – – – –</span>
          <span className={step === 'payment' ? 'text-accent font-bold' : 'text-muted-foreground'}>PAYMENT</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 'address' && (
              <div className="rounded-lg bg-card p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">Delivery Address</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter pincode"
                      maxLength={6}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House no., Building, Street, Area"
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <button
                  onClick={handleContinueToPayment}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Continue to Payment <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="rounded-lg bg-card p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-foreground">Payment Method</h2>
                  <button onClick={() => setStep('address')} className="text-sm text-accent hover:underline">
                    Edit Address
                  </button>
                </div>

                {/* Address summary */}
                <div className="mb-6 p-4 rounded-md bg-muted/50 border border-border">
                  <p className="font-medium text-foreground">{formData.fullName}</p>
                  <p className="text-sm text-muted-foreground">{formData.address}</p>
                  <p className="text-sm text-muted-foreground">{formData.city}, {formData.state} - {formData.pincode}</p>
                  <p className="text-sm text-muted-foreground">Mobile: {formData.mobile}</p>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map(method => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex w-full items-center gap-4 rounded-md border p-4 transition-colors ${
                          paymentMethod === method.id
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-foreground/30'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${paymentMethod === method.id ? 'text-accent' : 'text-muted-foreground'}`} />
                        <span className={`font-medium ${paymentMethod === method.id ? 'text-accent' : 'text-foreground'}`}>
                          {method.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full rounded-md bg-accent py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  PLACE ORDER
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-20 rounded-lg bg-card p-5 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-4 border-b border-border pb-2">
                ORDER SUMMARY ({count} {count === 1 ? 'Item' : 'Items'})
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="h-16 w-14 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-accent">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-accent">FREE</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;