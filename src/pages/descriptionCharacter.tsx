import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchCharacterDetail } from '../lib/getOneCharacter';

interface CharacterDetailProps {
    id: string;
    onClose: () => void;
}

interface CharacterDetailData {
    films: string[];
    shortFilms: string[];
    tvShows: string[];
    videoGames: string[];
    parkAttractions: string[];
    name: string;
    imageUrl: string;
    
}

export default function CharacterDetail({ id, onClose }: CharacterDetailProps) {
    const [character, setCharacter] = useState<CharacterDetailData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCharacterDetail(id);
            setCharacter(data);
        };

        fetchData();
    }, [id]);

    if (!character) return <p>Loading...</p>;

    return (
        <div className={styles.characterDetailContainer}>
            <button onClick={onClose} className={styles.backButton}>Volver</button>
            <h1 className={styles.characterDetailTitle}>{character.name}</h1>
            <Image
                src={character.imageUrl}
                alt={character.name}
                width={300}
                height={300}
                className={styles.characterDetailImage}
            />
            <div className={styles.characterDetailSection}>
                <h2 className={styles.characterDetailSectionTitle}>Películas</h2>
                <ul className={styles.characterDetailList}>
                    {character.films.map(film => <li key={film}>{film}</li>)}
                </ul>
            </div>
            <div className={styles.characterDetailSection}>
                <h2 className={styles.characterDetailSectionTitle}>Cortometrajes</h2>
                <ul className={styles.characterDetailList}>
                    {character.shortFilms.map(shortFilm => <li key={shortFilm}>{shortFilm}</li>)}
                </ul>
            </div>
            <div className={styles.characterDetailSection}>
                <h2 className={styles.characterDetailSectionTitle}>TV Shows</h2>
                <ul className={styles.characterDetailList}>
                    {character.tvShows.map(tvShow => <li key={tvShow}>{tvShow}</li>)}
                </ul>
            </div>
            <div className={styles.characterDetailSection}>
                <h2 className={styles.characterDetailSectionTitle}>Videojuegos</h2>
                <ul className={styles.characterDetailList}>
                    {character.videoGames.map(videoGame => <li key={videoGame}>{videoGame}</li>)}
                </ul>
            </div>
            <div className={styles.characterDetailSection}>
                <h2 className={styles.characterDetailSectionTitle}>Atracciones del parque</h2>
                <ul className={styles.characterDetailList}>
                    {character.parkAttractions.map(attraction => <li key={attraction}>{attraction}</li>)}
                </ul>
            </div>
        </div>
    );
}