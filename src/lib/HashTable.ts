/**
 * HashTable Implementation with Separate Chaining
 * 
 * This class implements a hash table data structure used throughout the shopping website
 * to manage product data, cart items, and wishlist items.
 * 
 * Key concepts demonstrated:
 * - Hash function to convert keys to array indices
 * - Key-value storage for fast data access
 * - Separate chaining for collision handling
 * - O(1) average time complexity for lookups
 */

export type HashTableEntry<T> = [string, T];

export class HashTable<T> {
  private table: HashTableEntry<T>[][];
  private size: number;
  private count: number;

  /**
   * Creates a new HashTable with a given size.
   * The table is an array of "buckets", where each bucket is an array of [key, value] pairs.
   * This allows multiple entries to exist at the same index (separate chaining).
   * 
   * @param size - The number of buckets in the hash table
   */
  constructor(size: number = 53) {
    this.size = size;
    this.table = new Array(size);
    this.count = 0;

    // Initialize each bucket as an empty array
    for (let i = 0; i < size; i++) {
      this.table[i] = [];
    }
  }

  /**
   * Hash Function - Converts a string key into a valid array index.
   * 
   * Uses a polynomial rolling hash with a prime multiplier (31)
   * to distribute keys evenly across the table, minimizing collisions.
   * 
   * @param key - The string key to hash
   * @returns A valid index within the table's size
   */
  hash(key: string): number {
    let total = 0;
    const PRIME = 31; // Prime number helps distribute keys more evenly

    // Process each character of the key (limit to first 100 chars for performance)
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.size;
    }

    return Math.abs(total);
  }

  /**
   * SET - Inserts or updates a key-value pair in the hash table.
   * 
   * Steps:
   * 1. Hash the key to get the bucket index
   * 2. Check if the key already exists in the bucket (update if so)
   * 3. If not found, push a new [key, value] pair into the bucket
   * 
   * This is where collision handling via separate chaining occurs:
   * Multiple keys can map to the same index, and they coexist in the same bucket.
   * 
   * @param key - The key to store
   * @param value - The value associated with the key
   */
  set(key: string, value: T): void {
    const index = this.hash(key);
    const bucket = this.table[index];

    // Check if key already exists in this bucket (collision chain)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        // Key found - update the value
        bucket[i][1] = value;
        return;
      }
    }

    // Key not found in bucket - add new entry (separate chaining)
    bucket.push([key, value]);
    this.count++;
  }

  /**
   * GET - Retrieves a value by its key.
   * 
   * Fast lookup operation:
   * 1. Hash the key to find the bucket
   * 2. Search through the bucket's chain for the matching key
   * 3. Return the value or undefined if not found
   * 
   * Average time complexity: O(1) with a good hash function
   * Worst case: O(n) if all keys collide into one bucket
   * 
   * @param key - The key to look up
   * @returns The value or undefined
   */
  get(key: string): T | undefined {
    const index = this.hash(key);
    const bucket = this.table[index];

    // Search through the chain at this index
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    // Key not found in the chain
    return undefined;
  }

  /**
   * REMOVE - Deletes a key-value pair from the hash table.
   * 
   * 1. Hash the key to find the bucket
   * 2. Search the chain for the key
   * 3. Remove the entry using splice
   * 
   * @param key - The key to remove
   * @returns true if removed, false if key wasn't found
   */
  remove(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }

    return false;
  }

  /**
   * GETALL - Returns all key-value pairs stored in the hash table.
   * 
   * Iterates through every bucket and every chain entry,
   * collecting all stored pairs into a flat array.
   * 
   * @returns Array of all [key, value] pairs
   */
  getAll(): HashTableEntry<T>[] {
    const entries: HashTableEntry<T>[] = [];

    for (let i = 0; i < this.size; i++) {
      const bucket = this.table[i];
      // Iterate through each entry in the chain
      for (let j = 0; j < bucket.length; j++) {
        entries.push(bucket[j]);
      }
    }

    return entries;
  }

  /**
   * Returns the number of entries in the hash table.
   */
  getCount(): number {
    return this.count;
  }

  /**
   * Checks if a key exists in the hash table.
   * Uses the same fast lookup as get().
   */
  has(key: string): boolean {
    return this.get(key) !== undefined;
  }
}
