'use client';
import { useState, ChangeEvent } from 'react';
import styles from './rideTimeRow.module.css';

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

export default function RideTimeRow() {
	const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

	const handleTimeClick = (seconds: number) => {
		setSelectedTimes((prev) =>
			prev.includes(seconds)
				? prev.filter((time) => time !== seconds)
				: [...prev, seconds]
		);
	};

	return (
		<div className={styles.rideTimeRow}>
			{Object.entries(rideTimes).map(([seconds, label]) => (
				<button
					key={seconds}
					className={
						selectedTimes.includes(parseInt(seconds))
							? styles.timeButtonSelected
							: styles.timeButton
					}
					// data-selected={selectedTimes.includes(parseInt(seconds))}
					onClick={() => handleTimeClick(parseInt(seconds))}
				>
					{label}
				</button>
			))}
			{selectedTimes.map((time) => (
				<div key={time}>{time}</div>
			))}
		</div>
	);
}
