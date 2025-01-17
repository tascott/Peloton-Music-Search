'use client';
// import { useState } from 'react';
import Image from 'next/image';
import styles from './workout.module.css';

type WorkoutSong = {
	title: string;
	artist: string;
	image_url: string;
};

type Workout = {
	id: string;
	title: string;
	duration: number;
	image_url: string;
	instructor_id: string;
	description: string;
	fitness_discipline: string;
	scheduled_time: string;
	difficulty_rating_avg: number;
	song?: WorkoutSong;
};

export default function Workout(props: { workout: Workout }) {
	const { workout } = props;
	const workoutLink = `https://members.onepeloton.co.uk/classes/cycling?utm_source=ios_app&utm_medium=in_app&code=%3D&locale=en-GB&modal=classDetailsModal&classId=${workout.id}`;

	const convertToMinutes = (duration: number) => {
		const minutes = Math.floor(duration / 60);
		return `${minutes}mins`;
	};

	return (
		<div className={styles.workoutCard}>
			{workout.song && (
				<div className={styles.songInfo}>
					<Image
						src={workout.song.image_url}
						alt={`${workout.song.title} cover`}
						width={100}
						height={100}
						className={styles.songImage}
					/>
					<div>
						<p className={styles.songTitle}>{workout.song.title}</p>
						<p className={styles.songArtist}>
							{workout.song.artist}
						</p>
					</div>
				</div>
			)}
			<h2 className={styles.title}>{workout.title}</h2>
			<p className={styles.details}>
				Duration: {convertToMinutes(workout.duration)}
			</p>
			<button
				className={styles.button}
				onClick={() => window.open(workoutLink, '_blank')}
			>
				View on Peloton
			</button>
		</div>
	);
}
