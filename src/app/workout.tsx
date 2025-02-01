'use client';
// import { useState } from 'react';
import Image from 'next/image';
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

export default function Workout(props: { workout: WorkoutType; songData: WorkoutSong }) {
	const { workout, songData } = props;
	const workoutLink = `https://members.onepeloton.co.uk/classes/cycling?utm_source=ios_app&utm_medium=in_app&code=%3D&locale=en-GB&modal=classDetailsModal&classId=${workout.id}`;

	// const convertToMinutes = (duration: number) => {
	// 	const minutes = Math.floor(duration / 60);
	// 	return `${minutes}mins`;
	// };

	return (
		<>
			{songData && (
				<div className={styles.workoutCard}>
					<div className={styles.songInfo}>
						<Image src={songData.image_url} alt={`${songData.title} cover`} width={60} height={60} className={styles.songImage} />
						<div>
							<p className={styles.songTitle}>{songData.title}</p>
							<p className={styles.songArtist}>{songData.artist}</p>
						</div>
					</div>
					<h3 className={styles.title}>{workout.title}</h3>
					<button className={styles.button} onClick={() => window.open(workoutLink, '_blank')}>
						View on Peloton
					</button>
					<p style={{ color: 'black' }}>{workout.instructor_id}</p>
					<p></p>
				</div>
			)}
		</>
	);
}
