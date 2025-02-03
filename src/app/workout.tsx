'use client';
import { instructors } from '@/data/instructors';
import styles from './workout.module.css';

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

export default function Workout(props: {
	workout_details: WorkoutType;
	songData: WorkoutSong;
}) {
	const { workout_details, songData } = props;
	const workoutLink = `https://members.onepeloton.co.uk/classes/cycling?utm_source=ios_app&utm_medium=in_app&code=%3D&locale=en-GB&modal=classDetailsModal&classId=${workout_details.id}`;

	return (
		<>
			{songData && (
				<div className={styles.workoutCard}>
					<h3 className={styles.title}>{workout_details.title}</h3>
					<p className={styles.instructor}>
						{workout_details.instructor_id &&
							instructors[workout_details.instructor_id]?.name}
					</p>
					<div className={styles.songInfo}>
						<div>
							<p className={styles.songTitle}>
								{songData.title} - {songData.artist}
								<span className={styles.songArtist}></span>
							</p>
						</div>
					</div>
					<button
						className={styles.button}
						onClick={() => window.open(workoutLink, '_blank')}
					>
						View on Peloton
					</button>
				</div>
			)}
		</>
	);
}
