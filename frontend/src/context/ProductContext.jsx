import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await api.get('/products');
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        try {
            await api.post('/products', productData);
            fetchProducts();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const updateProduct = async (id, productData) => {
        try {
            // Laravel requires '_method' set to 'PUT' inside POST payload for FormData to support files
            if (productData instanceof FormData) {
                productData.append('_method', 'PUT');
            }
            await api.post(`/products/${id}`, productData);
            fetchProducts();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
