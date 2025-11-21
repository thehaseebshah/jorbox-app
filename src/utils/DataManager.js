import Papa from 'papaparse';

// Helper to construct correct path with base URL
const getAssetPath = (path) => {
    const baseUrl = import.meta.env.BASE_URL;
    // Remove leading slash if present to avoid double slashes with baseUrl
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // If baseUrl is '/', just return /path, otherwise join them
    return baseUrl === '/' ? `/${cleanPath}` : `${baseUrl}${cleanPath}`;
};

export const DataManager = {
    async fetchGames() {
        try {
            const response = await fetch(getAssetPath('games.json'));
            if (!response.ok) throw new Error('Failed to fetch games registry');
            const games = await response.json();

            // Fix paths in the games data as well
            return games.map(game => ({
                ...game,
                csv: getAssetPath(game.csv)
            }));
        } catch (error) {
            console.error('Error fetching games:', error);
            return [];
        }
    },

    async fetchGameData(csvPath) {
        return new Promise((resolve, reject) => {
            Papa.parse(csvPath, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }
};
