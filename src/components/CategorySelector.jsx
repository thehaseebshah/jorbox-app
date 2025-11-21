import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
    if (!categories || categories.length === 0) return null;

    return (
        <div className="category-selector" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button
                onClick={() => onSelectCategory(null)}
                className={!selectedCategory ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
                All
            </button>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={selectedCategory === category ? 'btn-primary' : 'btn-secondary'}
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;
