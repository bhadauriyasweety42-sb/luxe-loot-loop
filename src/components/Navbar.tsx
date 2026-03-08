import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, LogOut, Menu, X, Search, LayoutGrid, Shirt, Footprints, Sparkles, Watch } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useState } from 'react';

const categories = [
  { id: 'all', label: 'All Products', icon: LayoutGrid },
  { id: 'clothes', label: 'Clothes', icon: Shirt },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
  { id: 'skincare', label: 'Skincare', icon: Sparkles },
  { id: 'accessories', label: 'Accessories', icon: Watch },
];

const Navbar = () => {
  const { getCartCount, getWishlistItems, isLoggedIn, logout, getAllProducts } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = getCartCount();
  const wishlistCount = getWishlistItems().length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCategoryClick = (categoryId: string) => {
    setCategoryOpen(false);
    if (categoryId === 'all') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard?category=${categoryId}`);
    }
  };

  const allProducts = getAllProducts();
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Products' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-2xl font-bold tracking-wide text-foreground">
          LUXE<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === l.to ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Categories */}
          <div className="relative">
            <button 
              onClick={() => { setCategoryOpen(!categoryOpen); setSearchOpen(false); }} 
              className="p-2 text-foreground hover:text-accent transition-colors"
              title="Categories"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            {categoryOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-background shadow-lg py-2">
                <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Shop by Category</p>
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <button onClick={() => { setSearchOpen(!searchOpen); setCategoryOpen(false); }} className="p-2 text-foreground hover:text-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-md border bg-background shadow-lg">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}>
                <input
                  type="text"
                  placeholder="Search products... (press Enter)"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full rounded-t-md border-b bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                </form>
                {filteredProducts.length > 0 && (
                  <ul className="max-h-60 overflow-y-auto py-1">
                    {filteredProducts.map(p => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.id}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <img src={p.image} alt={p.name} className="h-8 w-8 rounded object-cover" />
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">₹{p.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {searchQuery.trim() && filteredProducts.length === 0 && (
                  <p className="px-4 py-3 text-sm text-muted-foreground">No products found.</p>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2 text-foreground hover:text-accent transition-colors">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 text-foreground hover:text-accent transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          )}
          {!isLoggedIn && (
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          )}
          <button className="p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t bg-background px-4 py-3 md:hidden">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t mt-2 pt-2">
            <p className="py-2 text-xs font-semibold text-muted-foreground uppercase">Categories</p>
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => { handleCategoryClick(cat.id); setMenuOpen(false); }}
                  className="flex w-full items-center gap-3 py-2 text-sm text-foreground hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
