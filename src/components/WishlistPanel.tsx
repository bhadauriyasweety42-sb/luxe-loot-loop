import { ShoppingCart, X } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

const WishlistPanel = () => {
  const { getWishlistItems, removeFromWishlist, moveToCart } = useShop();
  const items = getWishlistItems();

  if (items.length === 0) {
    return (
      <div className="rounded-lg bg-card p-6 shadow-card text-center">
        <p className="text-muted-foreground">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-card">
          <img src={item.image} alt={item.name} className="h-14 w-14 rounded-md object-cover" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
            <p className="text-sm text-accent font-medium">₹{item.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => moveToCart(item.id)}
            className="flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-3 w-3" />
            Move to Cart
          </button>
          <button onClick={() => removeFromWishlist(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishlistPanel;
