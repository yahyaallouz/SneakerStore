import { PRODUCTS as initialProducts } from '../data/products';

const KEYS = {
    PRODUCTS: 'sneaker_store_products',
    ORDERS: 'sneaker_store_orders',
    VERSION: 'sneaker_store_version'
};

const CURRENT_VERSION = '2'; // Bump this to force product data refresh

// Initialize functionality
export const initStorage = () => {
    const storedVersion = localStorage.getItem(KEYS.VERSION);
    if (!localStorage.getItem(KEYS.PRODUCTS) || storedVersion !== CURRENT_VERSION) {
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(initialProducts));
        localStorage.setItem(KEYS.VERSION, CURRENT_VERSION);
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
        localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
    }
};

// generic helper
const get = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const set = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const storage = {
    products: {
        getAll: () => get(KEYS.PRODUCTS),
        add: (product) => {
            const products = get(KEYS.PRODUCTS);
            const newProduct = { ...product, id: Date.now() }; // Simple ID generation
            products.push(newProduct);
            set(KEYS.PRODUCTS, products);
            return newProduct;
        },
        update: (id, updates) => {
            const products = get(KEYS.PRODUCTS);
            const index = products.findIndex(p => p.id === Number(id) || p.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...updates };
                set(KEYS.PRODUCTS, products);
                return products[index];
            }
            throw new Error(`Product with id ${id} not found`);
        },
        delete: (id) => {
            let products = get(KEYS.PRODUCTS);
            products = products.filter(p => p.id !== Number(id) && p.id !== id);
            set(KEYS.PRODUCTS, products);
        }
    },
    orders: {
        getAll: () => get(KEYS.ORDERS),
        add: (order) => {
            const orders = get(KEYS.ORDERS);
            const newOrder = { 
                ...order, 
                id: Date.now(),
                created_at: new Date().toISOString(),
                status: 'Pending'
            };
            orders.unshift(newOrder); // Add to top
            set(KEYS.ORDERS, orders);
            return newOrder;
        },
        updateStatus: (id, status) => {
            const orders = get(KEYS.ORDERS);
            const index = orders.findIndex(o => o.id === Number(id) || o.id === id);
            if (index !== -1) {
                orders[index] = { ...orders[index], status };
                set(KEYS.ORDERS, orders);
                return orders[index];
            }
            throw new Error(`Order with id ${id} not found`);
        }
    }
};
