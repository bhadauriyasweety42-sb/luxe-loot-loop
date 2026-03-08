import { Minus, Plus, Trash2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

const CartPanel = () => {
  const { getCartItems, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotal, getCartCount, getMostExpensiveItem, getAveragePrice } = useShop();
  const items = getCartItems();
  const total = calculateTotal();
  const count = getCartCount();
  const mostExpensive = getMostExpensiveItem();
  const avgPrice = getAveragePrice();

  if (items.length === 0) {
    return (
      <div className="rounded-lg bg-card p-6 shadow-card text-center">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-card">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
              <p className="text-sm text-accent font-medium">₹{item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => decreaseQuantity(item.id)} className="p-1 rounded bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)} className="p-1 rounded bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary / Analytics */}
      <div className="rounded-lg bg-secondary p-4 space-y-2">
        <h4 className="font-display text-lg font-semibold text-secondary-foreground">Cart Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Total Items:</span>
          <span className="font-medium text-secondary-foreground text-right">{count}</span>
          <span className="text-muted-foreground">Total Cost:</span>
          <span className="font-medium text-secondary-foreground text-right">₹{total.toLocaleString()}</span>
          <span className="text-muted-foreground">Most Expensive:</span>
          <span className="font-medium text-secondary-foreground text-right truncate">{mostExpensive?.name || '—'}</span>
          <span className="text-muted-foreground">Average Price:</span>
          <span className="font-medium text-secondary-foreground text-right">₹{Math.round(avgPrice).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
