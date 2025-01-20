'use client';
import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import SongDetail from './songDetail';
import RideTimeRow from './rideTimeRow';

type Song = {
	workout_id: string;
	id: number;
	title: string;
	artist_names: string;
	image_url: string;
};

export default function Search() {
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
				.ilike('artist_names', `%${artistSearchTerm}%`) // where title matches searchTerm - case insensitive
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

	const handleAddToSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const type = e.target.getAttribute('param-type');
		if (type === 'artist') {
			setArtistSearchTerm(e.target.value);
		} else {
			setSongSearchTerm(e.target.value);
		}
	};


	const handleFetchArtists = (e: React.MouseEvent<HTMLButtonElement>) => {
		fetchArtists();
	};

	return (
		<div>
			<RideTimeRow />
			<input
				type="text"
				placeholder="Search songs"
				param-type="song"
				onChange={handleAddToSearch}
			/>
			<br />
			<input
				type="text"
				placeholder="Search artists"
				param-type="artist"
				onChange={handleAddToSearch}
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
			</ul>
		</div>
	);
}
