'use client';
import { useState, ChangeEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Workout from './workout';
import RideTimeRow from './rideTimeRow';
import InstructorRow from './instructorRow';
import styles from './search.module.css';

type Song = {
	id: number;
	title: string;
	artist_names: string;
	workout_id: string;
	image_url: string;
	workout_details: {
		id: string;
		title: string;
		duration?: number;
		image_url?: string;
		instructor_id?: string;
		description?: string;
		fitness_discipline?: string;
		scheduled_time?: string;
		difficulty_rating_avg?: number;
	};
};

const rideTimes = {
	300: '5 minutes',
	600: '10 minutes',
	900: '15 minutes',
	1200: '20 minutes',
	1800: '30 minutes',
	2700: '45 minutes',
	3600: '60 minutes',
	4500: '75 minutes',
	5400: '90 minutes',
	7200: '120 minutes',
};

export default function Search() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [songSearchTerm, setSongSearchTerm] = useState(''); // From the songs input
	const [artistSearchTerm, setArtistSearchTerm] = useState(''); // From the artists input
	const [selectedTimes, setSelectedTimes] = useState<number[]>([]); // From RideTimeRow
	const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
	const [isInstructorsExpanded, setIsInstructorsExpanded] = useState(false);
	const [isTimesExpanded, setIsTimesExpanded] = useState(false);

	const handleTimeSelection = (times: number[]) => {
		setSelectedTimes(times);
	};

	const handleInstructorSelection = (instructors: string[]) => {
		console.log('instructors', instructors);
		setSelectedInstructors(instructors);
	};

	const toggleInstructors = () => {
		setIsInstructorsExpanded(!isInstructorsExpanded);
	};

	const toggleTimes = () => {
		setIsTimesExpanded(!isTimesExpanded);
	};

	const fetchSongList = async () => {
		try {
			let query = supabase.from('songs').select(`
                id,
                title,
                artist_names,
                workout_id,
                image_url,
                workout_details: web_workouts!inner (
                    id,
                    title,
                    duration,
                    image_url,
                    instructor_id,
                    description,
                    fitness_discipline,
                    scheduled_time,
                    difficulty_rating_avg
                )
            `);

			// Note above, had to change the primary key in supabase console to so it knows it can join the tables. Here I am also renaming the column web_workouts to workout_details

			if (songSearchTerm) {
				query = query.ilike('title', `%${songSearchTerm}%`);
			}
			if (artistSearchTerm) {
				query = query.ilike('artist_names', `%${artistSearchTerm}%`);
			}

			const { data, error } = await query.limit(50);

			if (error) throw error;
			setSongs(data);

		} catch (error) {
			console.error(error);
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

	const shouldShowIfInstructorPresent = (song: Song) => {
		if (selectedInstructors.length > 0 && song.workout_details?.instructor_id) {
			return selectedInstructors.includes(song.workout_details.instructor_id);
		}
		return true;
	};

	const shouldShowIfTimePresent = (song: Song) => {
		if (selectedTimes.length > 0 && song.workout_details?.duration) {
			return selectedTimes.includes(song.workout_details.duration);
		}
		return true;
	};

	const shouldShowIfTimeAndInstructorPresent = (song: Song) => {
		return shouldShowIfInstructorPresent(song) && shouldShowIfTimePresent(song);
	};

	return (
		<div className={styles.searchContainer}>
			<h1 className={styles.title}>Peloton Music Search</h1>
			<div className={styles.searchInputWrapper}>
				<input
					type="text"
					placeholder="Search songs"
					param-type="song"
					onChange={handleAddToSearch}
					className={styles.searchInput}
				/>
				<input
					type="text"
					placeholder="Search artists"
					param-type="artist"
					onChange={handleAddToSearch}
					className={styles.searchInput}
				/>
			</div>
			<button onClick={fetchSongList} className={styles.fetchButton}>
				Fetch
			</button>

			<button
				className={`${styles.toggleButton} ${
					isTimesExpanded ? styles.expanded : ''
				} ${selectedTimes.length > 0 ? styles.active : ''}`}
				onClick={toggleTimes}
			>
				Duration{' '}
				{selectedTimes.length > 0 && `(${selectedTimes.length})`}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>

			<div
				className={`${styles.timeContainer} ${
					isTimesExpanded ? styles.expanded : ''
				}`}
			>
				<RideTimeRow
					rideTimes={rideTimes}
					selectedTimes={selectedTimes}
					onTimeSelect={handleTimeSelection}
				/>
			</div>

			<button
				className={`${styles.toggleButton} ${
					isInstructorsExpanded ? styles.expanded : ''
				} ${selectedInstructors.length > 0 ? styles.active : ''}`}
				onClick={toggleInstructors}
			>
				Instructors{' '}
				{selectedInstructors.length > 0 &&
					`(${selectedInstructors.length})`}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>

			<div
				className={`${styles.instructorContainer} ${
					isInstructorsExpanded ? styles.expanded : ''
				}`}
			>
				<InstructorRow
					key={selectedInstructors.join(',')}
					selectedInstructors={selectedInstructors}
					onInstructorsSelect={handleInstructorSelection}
				/>
			</div>


			<div className={styles.songList}>
				{songs.map(
					(song) =>
						shouldShowIfTimeAndInstructorPresent(song) && (
							<Workout
								key={song.id + song.workout_id}
								workout_details={song.workout_details}
								songData={{
									title: song.title,
									artist: song.artist_names,
									image_url: song.image_url,
								}}
							/>
						)
				)}
			</div>
		</div>
	);
}
