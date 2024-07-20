import styles from '../../styles/Home.module.css';
import { useEffect, useState } from "react";
import Image from "next/image";
import PersonajeInfo from "./descriptionCharacter";
import {mostrar} from "../lib/getAllCharacters";

export default function Home() {
    const [characters, setCharacters] = useState<{
        id: string;
        name: string;
        imageUrl: string;
        movies: string[];
    }[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data for page', page, 'with query', query);
                const data = await mostrar(query, page);
                setCharacters(data.characters);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch characters:", error);
            }
        };
        fetchData();
    }, [page, query]);

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1); 
    };

    const handleViewDetails = (characterId: string) => {
        setSelectedCharacterId(characterId);
    };

    const handleCloseDetails = () => {
        setSelectedCharacterId(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Disney Characters</h1>
            <input
                type="text"
                placeholder="Buscar por nombre"
                value={query}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            {selectedCharacterId ? (
                <PersonajeInfo
                    id={selectedCharacterId}
                    onClose={handleCloseDetails}
                />
            ) : (
                <>
                    <ul className={styles.characterList}>
                        {characters.map((character) => (
                            <li key={character.id} className={styles.characterItem}>
                                <h2 className={styles.characterName}>{character.name}</h2>
                                <Image
                                    src={character.imageUrl}
                                    alt={character.name}
                                    width={200}
                                    height={200}
                                    className={styles.characterImage}
                                />
                                <br />
                                <button
                                    onClick={() => handleViewDetails(character.id)}
                                    className={styles.detailsButton}
                                >
                                    Ver detalles
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage} disabled={page <= 1} className={styles.paginationButton}>Anterior</button>
                        <button onClick={handleNextPage} disabled={page >= totalPages} className={styles.paginationButton}>Siguiente</button>
                    </div>
                </>
            )}
        </div>
    );
}