import Papa from 'papaparse';

export const DataManager = {
    async fetchGames() {
        try {
            const response = await fetch('/games.json');
            if (!response.ok) throw new Error('Failed to fetch games registry');
            return await response.json();
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
