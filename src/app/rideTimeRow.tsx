'use client';
import styles from './rideTimeRow.module.css';

type RideTimeRowProps = {
	rideTimes: Record<string, string>;
	selectedTimes: number[];
	onTimeSelect: (times: number[]) => void;
};

export default function RideTimeRow({ rideTimes, selectedTimes, onTimeSelect }: RideTimeRowProps) {
	const handleTimeClick = (seconds: number) => {
		onTimeSelect(
			selectedTimes.includes(seconds)
				? selectedTimes.filter((time) => time !== seconds)
				: [...selectedTimes, seconds]
		);
	};

	return (
		<div className={styles.timeRow}>
			{Object.entries(rideTimes).map(([seconds, label]) => (
				<button
					key={seconds}
					onClick={() => handleTimeClick(parseInt(seconds))}
					className={selectedTimes.includes(parseInt(seconds)) ? styles.timeButtonSelected : styles.timeButton}
				>
					{label}
				</button>
			))}
		</div>
	);
}
