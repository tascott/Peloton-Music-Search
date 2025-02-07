import { instructors } from '@/data/instructors';
import styles from './playlistWorkoutDetail.module.css';
import DifficultyColorPill from './difficultyColorPill';

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
};

type PlaylistWorkoutDetailProps = {
    workout: WorkoutType;
    onClose: () => void;
    onDelete: () => void;
};

export default function PlaylistWorkoutDetail({ workout, onClose, onDelete }: PlaylistWorkoutDetailProps) {
    const workoutLink = `https://members.onepeloton.co.uk/classes/cycling?utm_source=ios_app&utm_medium=in_app&code=%3D&locale=en-GB&modal=classDetailsModal&classId=${workout.id}`;

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '';
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    };

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <h2 className={styles.title}>{workout.title}</h2>

                {workout.instructor_id && (
                    <p className={styles.instructor}>
                        {instructors[workout.instructor_id]?.name}
                    </p>
                )}

                {workout.duration && (
                    <p className={styles.duration}>
                        {formatDuration(workout.duration)}
                    </p>
                )}

                {workout.difficulty_rating_avg && (
                    <div className={styles.difficulty}>
                        <DifficultyColorPill difficulty={workout.difficulty_rating_avg} />
                    </div>
                )}

                {workout.description && (
                    <p className={styles.description}>{workout.description}</p>
                )}

                <div className={styles.actions}>
                    <button
                        className={styles.deleteButton}
                        onClick={onDelete}
                    >
                        Delete from playlist
                    </button>

                    <button
                        className={styles.openButton}
                        onClick={() => window.open(workoutLink, '_blank')}
                    >
                        Open in Peloton
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 17L17 7M17 7H8M17 7V16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}