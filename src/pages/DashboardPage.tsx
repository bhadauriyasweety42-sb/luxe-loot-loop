import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import CartPanel from '@/components/CartPanel';
import WishlistPanel from '@/components/WishlistPanel';
import Navbar from '@/components/Navbar';
import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';

const DashboardPage = () => {
  const { getAllProducts, username } = useShop();
  const allProducts = getAllProducts();
  const [activePanel, setActivePanel] = useState<'cart' | 'wishlist'>('cart');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Hello, {username.split('@')[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Browse our curated collection</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Catalog */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Product Catalog</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {allProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Side Panel: Cart & Wishlist */}
          <div className="space-y-4">
            <div className="flex rounded-lg bg-secondary p-1">
              <button
                onClick={() => setActivePanel('cart')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activePanel === 'cart'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-secondary-foreground hover:bg-muted'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                Cart
              </button>
              <button
                onClick={() => setActivePanel('wishlist')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activePanel === 'wishlist'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-secondary-foreground hover:bg-muted'
                }`}
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </button>
            </div>

            {activePanel === 'cart' ? <CartPanel /> : <WishlistPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
