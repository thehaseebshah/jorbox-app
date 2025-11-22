import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const CardViewer = ({ cards }) => {
    const [shuffledCards, setShuffledCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Shuffle cards when they change
    useEffect(() => {
        if (cards && cards.length > 0) {
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setShuffledCards(shuffled);
            setCurrentIndex(0);
        }
    }, [cards]);

    if (!shuffledCards || shuffledCards.length === 0) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>No cards available.</div>;
    }

    const currentCard = shuffledCards[currentIndex];

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
            setIsAnimating(false);
        }, 300); // Match transition duration
    };

    return (
        <div className="card-viewer" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
            <div
                className="glass-panel"
                style={{
                    padding: '3rem 2rem',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'scale(0.95)' : 'scale(1)'
                }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '800'
                }}>
                    {currentCard.Name}
                </h2>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.8',
                    maxWidth: '80%'
                }}>
                    {currentCard.Description}
                </p>

                {currentCard.Category && (
                    <span style={{
                        marginTop: '2rem',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.1)',
                        fontSize: '0.9rem',
                        color: 'var(--accent-primary)'
                    }}>
                        {currentCard.Category}
                    </span>
                )}

                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                }}>
                    {currentIndex + 1} / {shuffledCards.length}
                </div>
            </div>

            <div className="controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button onClick={handleNext} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '14px 32px' }}>
                    Next <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default CardViewer;
