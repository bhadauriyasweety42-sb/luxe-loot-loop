import { ShoppingCart, Trash2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import emptyWishlistImg from '@/assets/empty-wishlist.png';
import { useMemo, useState } from 'react';

const WishlistPage = () => {
  const { getWishlistItems, removeFromWishlist, moveToCart, getAllProducts } = useShop();

  const items = getWishlistItems();
  const allProducts = getAllProducts();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Shuffle and exclude wishlist items
  const wishlistIds = new Set(items.map(i => i.id));
  const shuffled = useMemo(() => {
    const filtered = allProducts.filter(p => !wishlistIds.has(p.id));
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [allProducts, wishlistIds.size]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(shuffled.map(p => p.category)));
    return ['All', ...cats];
  }, [shuffled]);

  const recommendations = activeCategory === 'All'
    ? shuffled
    : shuffled.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          My Wishlist
        </h1>
        <p className="text-muted-foreground mb-8">
          {items.length} {items.length === 1 ? 'item' : 'items'} saved
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img src={emptyWishlistImg} alt="Empty wishlist" className="h-52 w-52 object-contain mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              No wishes yet! 💔
            </h2>
            <p className="text-muted-foreground max-w-md">
              This puppy needs some love! Start adding items you adore and come back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map(item => (
              <div key={item.id} className="group relative rounded-lg bg-card shadow-card overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                  <p className="mt-1 text-lg font-bold text-accent">₹{item.price.toLocaleString()}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => moveToCart(item.id)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-accent py-2 text-xs font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Move to Bag
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="rounded-md border border-border p-2 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default WishlistPage;
