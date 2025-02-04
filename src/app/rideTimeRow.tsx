'use client';
import styles from './rideTimeRow.module.css';

type RideTimeRowProps = {
	rideTimes: Record<string, string>;
	selectedTimes: number[];
	onTimeSelect: (times: number[]) => void;
	activeTimes: number[];
};

export default function RideTimeRow({ rideTimes, selectedTimes, onTimeSelect, activeTimes }: RideTimeRowProps) {
	const handleTimeClick = (seconds: number) => {
		onTimeSelect(selectedTimes.includes(seconds) ? selectedTimes.filter((time) => time !== seconds) : [...selectedTimes, seconds]);
	};

	return (
		<div className={styles.timeRow}>
			{Object.entries(rideTimes).map(([seconds, label]) => {
				const duration = parseInt(seconds);
				return (
					(activeTimes.length === 0 || activeTimes.includes(duration)) && (
						<button
							key={seconds}
							onClick={() => handleTimeClick(duration)}
							className={selectedTimes.includes(duration) ? styles.timeButtonSelected : styles.timeButton}
						>
							{label}
						</button>
					)
				);
			})}
		</div>
	);
}
