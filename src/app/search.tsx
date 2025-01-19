'use client';
import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import SongDetail from './songDetail';

type Song = {
	workout_id: string;
	id: number;
	title: string;
	artist_names: string;
	image_url: string;
};

export default function Instructors() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [searchTerm, setSongSearchTerm] = useState('');
	const [artists, setArtists] = useState<Song[]>([]);
	const [artistSearchTerm, setArtistSearchTerm] = useState('');

	const fetchSongs = async () => {
		try {
			const { data, error } = await supabase
				.from('songs') // table name
				.select('id, title, artist_names, workout_id, image_url') // return all these fields
				.ilike('title', `%${searchTerm}%`) // where title matches searchTerm - case insensitive
				.limit(25);
			if (error) throw error;
			console.log(data);
			setSongs(data);
		} catch (error) {
			// setError('Error fetching instructors');
			console.error(error);
		} finally {
			// setIsLoading(false);
		}
	};

	const fetchArtists = async () => {
		try {
			const { data, error } = await supabase
				.from('songs') // table name
				.select('id, title, artist_names, workout_id, image_url') // return all these fields
				.ilike('artist_names', `%${searchTerm}%`) // where title matches searchTerm - case insensitive
				.limit(25);
			if (error) throw error;
			console.log(data);
			setArtists(data);
		} catch (error) {
			// setError('Error fetching instructors');
			console.error(error);
		} finally {
			// setIsLoading(false);
		}
	};

	const handleSongSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSongSearchTerm(e.target.value);
	};

	const handleArtistSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setArtistSearchTerm(e.target.value);
	};

	const handleFetchSongs = () => {
		fetchSongs();
	};

	const handleFetchArtists = () => {
		fetchArtists();
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search songs"
				onChange={handleSongSearch}
			/>
			<button onClick={handleFetchSongs}>Fetch</button>
			<input
				type="text"
				placeholder="Search artists"
				onChange={handleArtistSearch}
			/>
			<button onClick={handleFetchArtists}>Fetch</button>
			<ul>
				{songs.map((song) => (
					<SongDetail
						key={song.id}
						id={song.id}
						title={song.title}
						artist_names={song.artist_names}
						image_url={song.image_url}
						workout_id={song.workout_id}
					/>
				))}
				{artists.map((artist) => (
					<SongDetail
						key={artist.id}
						id={artist.id}
						title={artist.title}
						artist_names={artist.artist_names}
						image_url={artist.image_url}
						workout_id={artist.workout_id}
					/>
				))}
			</ul>
		</div>
	);
}
