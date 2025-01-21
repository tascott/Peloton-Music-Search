'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Workout from './workout';

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
	}, [props.workout_id]); // Update when workout_id changes, i.e. when a new song is added

	// Determine if we should show the workout based on selected times (TODO: also add instructors, and difficulty rating)
	const shouldShowWorkout =
		workout &&
		(props.selectedTimes.length === 0 || props.selectedTimes.includes(workout.duration || 0));

	return (
		<div>
			{shouldShowWorkout && (
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
