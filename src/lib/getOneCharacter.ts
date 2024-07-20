export async function fetchCharacterDetail(id: string) {
    try {
        const response = await fetch(`https://api.disneyapi.dev/characters/${id}`);
        if (!response.ok) {
            throw new Error('Error fetching character details');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Failed to fetch character details:", error);
        return null;
    }
}