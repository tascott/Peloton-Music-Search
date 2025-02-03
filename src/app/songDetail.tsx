'use client';
import Workout from './workout';

interface SongDetailProps {
	id: number;
	title: string;
	artist_names: string;
	image_url: string;
	workout_id: string;
	selectedTimes: number[];
	selectedInstructors: string[];
	workout_details: WorkoutType[];
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
	return (
		<Workout
			workout_details={props.workout_details[0]}
			songData={{
				image_url: props.image_url,
				title: props.title,
				artist: props.artist_names,
			}}
		/>
	);
}
