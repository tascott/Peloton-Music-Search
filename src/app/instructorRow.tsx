'use client';
import styles from './instructorRow.module.css';
import { instructors } from '@/data/instructors';

type InstructorRowProps = {
	onInstructorsSelect: (instructors: string[]) => void;
	selectedInstructors: string[];
};

export default function InstructorRow({ onInstructorsSelect, selectedInstructors }: InstructorRowProps) {
	const handleInstructorClick = (instructorID: string) => {
		onInstructorsSelect(
			selectedInstructors.includes(instructorID)
				? selectedInstructors.filter((instructor) => instructor !== instructorID)
				: [...selectedInstructors, instructorID]
		);
	};

	return (
		<div className={styles.instructorRow}>
			{Object.entries(instructors).map(
				([id, instructor]) =>
					(instructor.type || 'single') !== 'other' && (
						<button
							key={id}
							className={selectedInstructors.includes(instructor.id) ? styles.instructorButtonSelected : styles.instructorButton}
							onClick={() => handleInstructorClick(instructor.id)}
						>
							{instructor.name}
						</button>
					)
			)}
		</div>
	);
}
