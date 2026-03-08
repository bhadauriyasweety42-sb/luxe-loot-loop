import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { ArrowRight, Globe, Bell, Diamond, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const { getAllProducts } = useShop();
  const allProducts = getAllProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Fashion collection" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:py-44">
          <div className="max-w-lg">
            <h1 className="font-display text-5xl font-bold text-primary-foreground sm:text-6xl leading-tight">
              Elevate Your Style
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Curated fashion, shoes & skincare — handpicked for the modern you.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Collection</h2>
            <p className="mt-1 text-muted-foreground">Our top picks for this season</p>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {allProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-[hsl(var(--secondary))] border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col items-center text-center gap-3">
              <Globe className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold text-secondary-foreground">Worldwide Shipping</h3>
              <p className="text-sm text-muted-foreground">Fast delivery to your doorstep globally.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Bell className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold text-secondary-foreground">Best Quality</h3>
              <p className="text-sm text-muted-foreground">Premium materials, crafted with care.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Diamond className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold text-secondary-foreground">Best Offers</h3>
              <p className="text-sm text-muted-foreground">Competitive prices and seasonal deals.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <ShieldCheck className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold text-secondary-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Your transactions are safe and encrypted.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--secondary))] border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h4 className="font-bold text-secondary-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-accent transition-colors">About</Link></li>
                <li><Link to="/login" className="hover:text-accent transition-colors">My Account</Link></li>
                <li><Link to="/dashboard" className="hover:text-accent transition-colors">Cart</Link></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-secondary-foreground mb-4">Clothes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-accent transition-colors cursor-pointer">Leather Jacket</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Summer Dress</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Denim Jeans</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Cashmere Sweater</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Silk Blouse</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-secondary-foreground mb-4">Shoes & Skincare</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-accent transition-colors cursor-pointer">White Sneakers</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Running Shoes</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Stiletto Pumps</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Glow Revive Serum</span></li>
                <li><span className="hover:text-accent transition-colors cursor-pointer">Moisturizer</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-secondary-foreground mb-4">LUXE</h4>
              <p className="text-sm text-muted-foreground">
                Demonstrating Hash Table usage in an online shopping cart system with separate chaining.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 text-center">
            <p className="text-sm text-muted-foreground">© 2026 LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
