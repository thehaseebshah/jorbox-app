import React from 'react';
import { ChevronDown } from 'lucide-react';

const GameSelector = ({ games, selectedGame, onSelectGame }) => {
    return (
        <div className="game-selector-container" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <label htmlFor="game-select" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                Select Game
            </label>
            <div className="custom-select-wrapper" style={{ position: 'relative', display: 'inline-block', minWidth: '250px' }}>
                <select
                    id="game-select"
                    value={selectedGame ? selectedGame.id : ''}
                    onChange={(e) => {
                        const game = games.find(g => g.id === e.target.value);
                        onSelectGame(game);
                    }}
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
                    <option value="" disabled>Choose a game...</option>
                    {games.map(game => (
                        <option key={game.id} value={game.id} style={{ color: 'black' }}>
                            {game.name}
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

export default GameSelector;
