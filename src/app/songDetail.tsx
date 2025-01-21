'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Workout from './workout';
import styles from './songdetail.module.css';

interface SongDetailProps {
	id: number;
	title: string;
	artist_names: string;
	image_url: string;
	workout_id: string;
	selectedTimes: number[];
}

type WorkoutType = {
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

export default function SongDetail(props: SongDetailProps) {
	const [workout, setWorkout] = useState<WorkoutType | null>(null);
	useEffect(() => {
		// Only fetch workout once when component mounts
		const fetchWorkout = async () => {
			let query = supabase
				.from('web_workouts')
				.select(`
					id,
					title,
					duration,
					image_url,
					instructor_id,
					description,
					fitness_discipline,
					scheduled_time,
					difficulty_rating_avg
				`);

			// if selectedTimes is not empty, filter by selectedTimes
			if (props.selectedTimes.length > 0) {
				console.log('selectimes > 0');
				query = query.in('duration', props.selectedTimes);
			}

			const { data } = await query
				.eq('id', props.workout_id)
				.single();

			if (data) setWorkout(data);
		};

		fetchWorkout();
	}, [props.workout_id, props.selectedTimes]); // Add props.selectedTimes to dependency array

	return (
		<div className={styles.resultContainer}>
			{workout && (
				<Workout
					workout={workout}
					songData={{
						image_url: props.image_url,
						title: props.title,
						artist: props.artist_names,
					}}
				/>
			)}
		</div>
	);
}
