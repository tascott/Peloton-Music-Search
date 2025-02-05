'use client';
import { instructors } from '@/data/instructors';
import styles from './workout.module.css';
import DifficultyColorPill from './difficultyColorPill';

type WorkoutSong = {
	title: string;
	artist: string;
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
	song?: WorkoutSong;
};

export default function Workout(props: { workout_details: WorkoutType; songData: WorkoutSong }) {
	const { workout_details, songData } = props;
	const workoutLink = `https://members.onepeloton.co.uk/classes/cycling?utm_source=ios_app&utm_medium=in_app&code=%3D&locale=en-GB&modal=classDetailsModal&classId=${workout_details.id}`;

	return (
		<>
			{songData && (
				<div className={styles.workoutCard}>
					<h3 className={styles.title}>{workout_details.title}</h3>
					<p className={styles.instructor}>{workout_details.instructor_id && instructors[workout_details.instructor_id]?.name}</p>
					<div className={styles.songInfo}>
						<div>
							<p className={styles.songTitle}>
								{songData.title}
								<span className={styles.songArtist}> — {songData.artist}</span>
							</p>
						</div>
					</div>
					<div className={styles.actionRow}>
						<div className={styles.pillWrapper}>
							{workout_details.difficulty_rating_avg && <DifficultyColorPill difficulty={workout_details.difficulty_rating_avg} />}
						</div>
						<button className={styles.button} onClick={() => window.open(workoutLink, '_blank')}>
							Open
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7 17L17 7M17 7H8M17 7V16"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>
			)}
		</>
	);
}
