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
	const [searchTerm, setSearchTerm] = useState('');

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

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleFetch = () => {
		fetchSongs();
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search songs"
				onChange={handleSearch}
			/>
			<button onClick={handleFetch}>Fetch</button>
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
