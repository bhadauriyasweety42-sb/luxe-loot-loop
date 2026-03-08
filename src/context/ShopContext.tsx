import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { HashTable } from '@/lib/HashTable';
import { products, Product } from '@/lib/productData';

/**
 * Cart item extends Product with a quantity field.
 * Stored in the cart HashTable as: Key → Product ID, Value → CartItem
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Shop Context provides global state management using Hash Tables.
 * 
 * Three Hash Tables are used:
 * 1. productTable  - stores all product data for fast lookups by ID
 * 2. cartTable     - stores cart items keyed by product ID
 * 3. wishlistTable - stores wishlist items keyed by product ID
 */
interface ShopContextType {
  // Product operations
  getProduct: (id: string) => Product | undefined;
  getAllProducts: () => Product[];
  
  // Cart operations using Hash Table
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getCartItems: () => CartItem[];
  calculateTotal: () => number;
  getCartCount: () => number;
  clearCart: () => void;
  
  // Wishlist operations using Hash Table
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  getWishlistItems: () => Product[];
  moveToCart: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Cart summary / analytics
  getMostExpensiveItem: () => CartItem | null;
  getAveragePrice: () => number;

  // Auth
  isLoggedIn: boolean;
  username: string;
  login: (email: string) => void;
  logout: () => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * Initialize the Product Hash Table.
   * All products are inserted at startup for O(1) lookups by product ID.
   */
  const [productTable] = useState(() => {
    const ht = new HashTable<Product>(31);
    products.forEach(p => ht.set(p.id, { ...p }));
    return ht;
  });

  /** Cart Hash Table: Key = Product ID, Value = CartItem (product + quantity) */
  const [cartTable] = useState(() => new HashTable<CartItem>(31));
  
  /** Wishlist Hash Table: Key = Product ID, Value = Product */
  const [wishlistTable] = useState(() => new HashTable<Product>(31));
  
  // Trigger re-renders when tables change
  const [, setVersion] = useState(0);
  const bump = useCallback(() => setVersion(v => v + 1), []);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('shop_user'));
  const [username, setUsername] = useState(() => localStorage.getItem('shop_user') || '');

  const login = useCallback((email: string) => {
    localStorage.setItem('shop_user', email);
    setIsLoggedIn(true);
    setUsername(email);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('shop_user');
    setIsLoggedIn(false);
    setUsername('');
  }, []);

  // ─── Product Operations ───
  const getProduct = useCallback((id: string) => productTable.get(id), [productTable]);
  const getAllProducts = useCallback(() => productTable.getAll().map(([, v]) => v), [productTable]);

  // ─── Cart Operations (Hash Table) ───
  const addToCart = useCallback((productId: string) => {
    const product = productTable.get(productId);
    if (!product || product.stock <= 0) return;

    const existing = cartTable.get(productId);
    if (existing) {
      existing.quantity += 1;
      cartTable.set(productId, existing);
    } else {
      cartTable.set(productId, { ...product, quantity: 1 });
    }

    // Decrease stock in product table
    product.stock -= 1;
    productTable.set(productId, product);
    bump();
  }, [productTable, cartTable, bump]);

  const removeFromCart = useCallback((productId: string) => {
    const cartItem = cartTable.get(productId);
    if (!cartItem) return;

    // Restore stock
    const product = productTable.get(productId);
    if (product) {
      product.stock += cartItem.quantity;
      productTable.set(productId, product);
    }

    cartTable.remove(productId);
    bump();
  }, [productTable, cartTable, bump]);

  const increaseQuantity = useCallback((productId: string) => {
    const product = productTable.get(productId);
    if (!product || product.stock <= 0) return;

    const cartItem = cartTable.get(productId);
    if (!cartItem) return;

    cartItem.quantity += 1;
    cartTable.set(productId, cartItem);
    product.stock -= 1;
    productTable.set(productId, product);
    bump();
  }, [productTable, cartTable, bump]);

  const decreaseQuantity = useCallback((productId: string) => {
    const cartItem = cartTable.get(productId);
    if (!cartItem) return;

    const product = productTable.get(productId);

    if (cartItem.quantity <= 1) {
      cartTable.remove(productId);
    } else {
      cartItem.quantity -= 1;
      cartTable.set(productId, cartItem);
    }

    if (product) {
      product.stock += 1;
      productTable.set(productId, product);
    }
    bump();
  }, [productTable, cartTable, bump]);

  const getCartItems = useCallback(() => cartTable.getAll().map(([, v]) => v), [cartTable]);
  
  const calculateTotal = useCallback(() => {
    return cartTable.getAll().reduce((sum, [, item]) => sum + item.price * item.quantity, 0);
  }, [cartTable]);

  const getCartCount = useCallback(() => {
    return cartTable.getAll().reduce((sum, [, item]) => sum + item.quantity, 0);
  }, [cartTable]);

  // ─── Wishlist Operations (Hash Table) ───
  const addToWishlist = useCallback((productId: string) => {
    const product = productTable.get(productId);
    if (!product) return;
    wishlistTable.set(productId, { ...product });
    bump();
  }, [productTable, wishlistTable, bump]);

  const removeFromWishlist = useCallback((productId: string) => {
    wishlistTable.remove(productId);
    bump();
  }, [wishlistTable, bump]);

  const getWishlistItems = useCallback(() => wishlistTable.getAll().map(([, v]) => v), [wishlistTable]);

  const isInWishlist = useCallback((productId: string) => wishlistTable.has(productId), [wishlistTable]);

  /**
   * moveToCart: Moves an item from the wishlist hash table to the cart hash table.
   * 1. Get item from wishlist
   * 2. Insert into cart hash table
   * 3. Remove from wishlist
   */
  const moveToCart = useCallback((productId: string) => {
    const wishlistItem = wishlistTable.get(productId);
    if (!wishlistItem) return;

    const product = productTable.get(productId);
    if (!product || product.stock <= 0) return;

    addToCart(productId);
    wishlistTable.remove(productId);
    bump();
  }, [wishlistTable, productTable, addToCart, bump]);

  // ─── Cart Summary / Analytics ───
  const getMostExpensiveItem = useCallback(() => {
    const items = cartTable.getAll().map(([, v]) => v);
    if (items.length === 0) return null;
    return items.reduce((max, item) => item.price > max.price ? item : max, items[0]);
  }, [cartTable]);

  const getAveragePrice = useCallback(() => {
    const items = cartTable.getAll().map(([, v]) => v);
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return total / items.length;
  }, [cartTable]);

  return (
    <ShopContext.Provider value={{
      getProduct, getAllProducts,
      addToCart, removeFromCart, increaseQuantity, decreaseQuantity,
      getCartItems, calculateTotal, getCartCount,
      addToWishlist, removeFromWishlist, getWishlistItems, moveToCart, isInWishlist,
      getMostExpensiveItem, getAveragePrice,
      isLoggedIn, username, login, logout
    }}>
      {children}
    </ShopContext.Provider>
  );
};
