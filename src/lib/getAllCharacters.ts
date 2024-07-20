export async function mostrar(query: string, page = 1) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: headers,
        redirect: 'follow' as RequestRedirect
    };

    const url = new URL('https://api.disneyapi.dev/character');
    url.searchParams.append('page', page.toString());
    if (query) {
        url.searchParams.append('name', query);
    }

    try {
        const respuesta = await fetch(url.toString(), requestOptions);

        if (!respuesta.ok) {
            throw new Error('Error en la petición');
        }

        const data = await respuesta.json();

        const characters = data.data.map((character: { _id: string; name: string; imageUrl: string; }) => {
            const { _id, name, imageUrl} = character;
            return {
                id: _id,
                name,
                imageUrl,
                
            };
        });

        return {
            characters,
            totalPages: data.info.totalPages
        };
    } catch (error) {
        console.log('Error en la petición', error);
        return {
            characters: [],
            totalPages: 1
        };
    }
}