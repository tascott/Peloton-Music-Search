'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Workout from './workout';
import styles from './songdetail.module.css';

type SongDetailProps = {
	workout_id: string;
	id: number;
	title: string;
	artist_names: string;
	image_url: string;
};

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
			const { data } = await supabase
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
				`)
				.eq('id', props.workout_id)
				.single();

			if (data) setWorkout(data);
		};

		fetchWorkout();
	}, [props.workout_id]); // Only re-run if workout_id changes

	return (
		<div className={styles.resultContainer}>
			{props.title} - {props.artist_names}
			<img src={props.image_url} alt={props.title} height={100} />
			{workout && <Workout workout={workout} />}
		</div>
	);
}
