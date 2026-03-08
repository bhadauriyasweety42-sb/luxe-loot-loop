import { Minus, Plus, Trash2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import emptyCartImg from '@/assets/empty-cart.png';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const {
    getCartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    getCartCount,
    getAllProducts,
    addToWishlist,
    isInWishlist,
  } = useShop();

  const items = getCartItems();
  const total = calculateTotal();
  const count = getCartCount();
  const allProducts = getAllProducts();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Shuffle and exclude cart items
  const cartIds = new Set(items.map(i => i.id));
  const shuffled = useMemo(() => {
    const filtered = allProducts.filter(p => !cartIds.has(p.id));
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [allProducts, cartIds.size]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(shuffled.map(p => p.category)));
    return ['All', ...cats];
  }, [shuffled]);

  const recommendations = activeCategory === 'All'
    ? shuffled
    : shuffled.filter(p => p.category === activeCategory);

  const handleMoveToWishlist = (productId: string) => {
    if (!isInWishlist(productId)) {
      addToWishlist(productId);
    }
    removeFromCart(productId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Checkout steps header */}
      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-4 text-sm font-medium tracking-widest">
          <span className="text-accent font-bold">BAG</span>
          <span className="text-muted-foreground">– – – – –</span>
          <span className="text-muted-foreground">ADDRESS</span>
          <span className="text-muted-foreground">– – – – –</span>
          <span className="text-muted-foreground">PAYMENT</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img src={emptyCartImg} alt="Empty cart" className="h-52 w-52 object-contain mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Your bag is on a diet! 🛍️
            </h2>
            <p className="text-muted-foreground max-w-md">
              This little kitty is waiting for some goodies. Go add something fabulous!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {count} {count === 1 ? 'Item' : 'Items'} in your bag
              </h2>

              {items.map(item => (
                <div key={item.id} className="flex gap-4 rounded-lg bg-card p-4 shadow-card">
                  <img src={item.image} alt={item.name} className="h-28 w-24 rounded-md object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                      <span className="mt-2 inline-block text-lg font-bold text-accent">₹{item.price.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-1 rounded border border-border">
                        <button onClick={() => decreaseQuantity(item.id)} className="p-1.5 hover:bg-muted transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="p-1.5 hover:bg-muted transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleMoveToWishlist(item.id)} className="text-xs text-muted-foreground hover:text-accent transition-colors">
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price details sidebar */}
            <div>
              <div className="sticky top-20 rounded-lg bg-card p-5 shadow-card">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 border-b border-border pb-2">
                  PRICE DETAILS ({count} {count === 1 ? 'Item' : 'Items'})
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total MRP</span>
                    <span className="text-foreground">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-accent">- ₹0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="text-accent">FREE</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <Link 
                  to="/checkout"
                  className="mt-5 w-full block text-center rounded-md bg-accent py-3 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  PLACE ORDER
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* You may also like with category tabs */}
        {recommendations.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">You may also like</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    activeCategory === cat
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {recommendations.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
