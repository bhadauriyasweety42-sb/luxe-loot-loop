import { ShoppingCart, Trash2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

const WishlistPage = () => {
  const { getWishlistItems, removeFromWishlist, moveToCart, getAllProducts } = useShop();

  const items = getWishlistItems();
  const allProducts = getAllProducts();

  // Recommendations: products not in wishlist
  const wishlistIds = new Set(items.map(i => i.id));
  const recommendations = allProducts.filter(p => !wishlistIds.has(p.id)).slice(0, 8);

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
          <div className="rounded-lg bg-card p-12 text-center shadow-card">
            <p className="text-xl font-medium text-foreground mb-2">Your wishlist is empty</p>
            <p className="text-muted-foreground">Save items you love to buy them later!</p>
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

        {/* You may also like */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground mb-6">You may also like</h2>
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
