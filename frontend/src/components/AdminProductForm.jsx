import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { X, Upload } from 'lucide-react';
import { BASE_URL } from '../utils/api';
import '../styles/AdminProductForm.css'; // Will create this

const AdminProductForm = ({ product, onClose }) => {
    const { addProduct, updateProduct } = useProduct();
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        category: 'men',
        description: '',
        sizes: [], // Handled as array of numbers for now
    });
    const [previews, setPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                brand: product.brand,
                price: product.price,
                category: product.category,
                description: product.description,
                sizes: product.sizes || [],
            });
            const initialImages = product.images || (product.image_url ? [product.image_url] : []);
            setPreviews(initialImages.map((path, idx) => ({
                id: 'existing_' + idx,
                url: path.startsWith('http') || path.startsWith('data:') ? path : `${BASE_URL}${path}`,
                file: null,
                existingPath: path
            })));
        } else {
            setPreviews([]);
            setFormData({
                name: '',
                brand: '',
                price: '',
                category: 'men',
                description: '',
                sizes: [],
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newPreviews = files.map((file, idx) => ({
                id: 'new_' + Date.now() + '_' + idx,
                url: URL.createObjectURL(file),
                file: file,
                existingPath: null
            }));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleRemovePreview = (id) => {
        setPreviews(prev => prev.filter(p => p.id !== id));
    };

    const handleSizeChange = (e) => {
        const sizes = e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
        setFormData(prev => ({ ...prev, sizes }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('sizes', JSON.stringify(formData.sizes));

        // Separate existing images from newly uploaded files
        const existingImagesToKeep = previews
            .filter(p => !p.file && p.existingPath)
            .map(p => p.existingPath);
        
        data.append('existing_images', JSON.stringify(existingImagesToKeep));

        const newFiles = previews.filter(p => p.file).map(p => p.file);
        newFiles.forEach((file) => {
            data.append('images[]', file);
        });

        let result;
        if (product) {
            result = await updateProduct(product.id, data);
        } else {
            result = await addProduct(data);
        }

        if (result.success) {
            onClose();
        } else {
            alert('Error saving product: ' + result.message);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="icon-btn-sm" onClick={onClose}><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <input name="brand" value={formData.brand} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price</label>
                            <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
                    </div>

                    <div className="form-group">
                        <label>Sizes (comma separated, e.g. 7, 8, 9, 10)</label>
                        <input type="text" onChange={handleSizeChange} defaultValue={formData.sizes.join(', ')} />
                    </div>

                    <div className="form-group">
                        <label>Product Images</label>
                        <div className="image-previews-grid">
                            {previews.map((p) => (
                                <div key={p.id} className="preview-card">
                                    <img src={p.url} alt="Preview" />
                                    <button type="button" className="remove-preview-btn" onClick={() => handleRemovePreview(p.id)}>
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            <label className="add-image-card">
                                <input type="file" onChange={handleImageChange} accept="image/*" multiple hidden />
                                <Upload size={24} />
                                <span>Add Image</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
