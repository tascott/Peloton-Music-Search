'use client';
import { useState } from 'react';
import Image from 'next/image';

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
};

export default function Workout(props: { workout: Workout }) {
	console.log('props', props);
	const workoutLink = `https://members.onepeloton.co.uk/classes/cycling?utm_source=ios_app&utm_medium=in_app&code=%3D&locale=en-GB&modal=classDetailsModal&classId=${props.workout.id}`;

	const convertToMinutes = (duration: number) => {
		const minutes = Math.floor(duration / 60);
		return `${minutes}mins}`;
	};

	return (
		<div>
			<p>Title: {props.workout.title}</p>
			<p>Duration: {convertToMinutes(props.workout.duration)}</p>
			{/* <p>Description: {props.workout.description}</p>
			<p>Fitness Discipline: {props.workout.fitness_discipline}</p>
			<p>Scheduled Time: {props.workout.scheduled_time}</p>
			<p>Difficulty Rating Avg: {props.workout.difficulty_rating_avg}</p> */}
			<button onClick={() => window.open(workoutLink, '_blank')}>
				View on Peloton
			</button>
		</div>
	);
}
