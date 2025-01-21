'use client';
import styles from './instructorRow.module.css';
import { instructors } from '@/data/instructors';


export default function InstructorRow() {
	// const handleTimeClick = (seconds: number) => {
	// 	onTimeSelect(
	// 		selectedTimes.includes(seconds)
	// 			? selectedTimes.filter((time) => time !== seconds)
	// 			: [...selectedTimes, seconds]
	// 	);
	// };

	return (
		<div className={styles.instructorRow}>
            {/* TODO: Add instructor styles */}
			{Object.entries(instructors).map(([id, instructor]) => (
                <button key={id}>
                    {instructor.name}
                </button>
			))}
		</div>
	);
}
