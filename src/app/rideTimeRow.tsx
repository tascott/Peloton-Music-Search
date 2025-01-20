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
}

export default function rideTimeRow() {
    const [selectedTimes, setSelectedTimes] = useState([]);

    const handleTimeClick = (seconds: number) => {
        console.log(seconds);
        setSelectedTimes((prev) => [...prev, seconds]);
    }

	return (
		<div className={styles.rideTimeRow}>
			{Object.entries(rideTimes).map(([seconds, label]) => (
				<button
					key={seconds}
					className={styles.timeButton}
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
