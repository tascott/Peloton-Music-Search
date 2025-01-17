'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Workout from './workout';
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
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchSongs = async () => {
		try {
			const { data, error } = await supabase
				.from('songs') // table name
				.select('id, title, artist_names, workout_id, image_url') // return all these fields
				.eq('title', searchTerm) // where title matches searchTerm
				.limit(5);
			if (error) throw error;
			console.log(data);
			setSongs(data);
		} catch (error) {
			setError('Error fetching instructors');
			console.error(error);
		} finally {
			setIsLoading(false);
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
			<p>{searchTerm}</p>
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
