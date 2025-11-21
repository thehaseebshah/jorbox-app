import React from 'react';
import { ChevronDown } from 'lucide-react';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
    if (!categories || categories.length === 0) return null;

    return (
        <div className="category-selector-container" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <label htmlFor="category-select" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                Filter by Category
            </label>
            <div className="custom-select-wrapper" style={{ position: 'relative', display: 'inline-block', minWidth: '200px' }}>
                <select
                    id="category-select"
                    value={selectedCategory || ''}
                    onChange={(e) => onSelectCategory(e.target.value || null)}
                    className="glass-panel"
                    style={{
                        width: '100%',
                        padding: '12px 40px 12px 16px',
                        appearance: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category} style={{ color: 'black' }}>
                            {category}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={20}
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: 'var(--text-secondary)'
                    }}
                />
            </div>
        </div>
    );
};

export default CategorySelector;
