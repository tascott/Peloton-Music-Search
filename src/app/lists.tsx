import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './lists.module.css';

type List = {
    id: string;
    name: string;
    created_at: string;
};

type Workout = {
    id: string;
    title: string;
    instructor_id?: string;
};

type WorkoutResponse = {
    workout_id: string;
    web_workouts: {
        id: string;
        title: string;
        instructor_id?: string;
    };
};

export default function Lists() {
    const [lists, setLists] = useState<List[]>([]);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState<List | null>(null);
    const [listWorkouts, setListWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
            .from('user_lists')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching lists:', error);
            return;
        }

        setLists(data);
    };

    const createList = async () => {
        if (!newListName.trim()) return;

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { error } = await supabase
            .from('user_lists')
            .insert([{
                name: newListName,
                user_id: session.user.id,
            }]);

        if (error) {
            console.error('Error creating list:', error);
            return;
        }

        setNewListName('');
        fetchLists();
    };

    const deleteList = async (listId: string) => {
        const { error } = await supabase
            .from('user_lists')
            .delete()
            .eq('id', listId);

        if (error) {
            console.error('Error deleting list:', error);
            return;
        }

        setSelectedList(null);
        fetchLists();
    };

    const fetchListWorkouts = async (listId: string) => {
        const { data, error } = await supabase
            .from('list_workouts')
            .select(`
                workout_id,
                web_workouts!inner (
                    id,
                    title,
                    instructor_id
                )
            `)
            .eq('list_id', listId);

        if (error) {
            console.error('Error fetching list workouts:', error);
            return;
        }

        const typedData = data as unknown as WorkoutResponse[];
        const workouts = typedData.map(item => ({
            id: item.web_workouts.id,
            title: item.web_workouts.title,
            instructor_id: item.web_workouts.instructor_id
        }));

        setListWorkouts(workouts);
    };

    const removeWorkoutFromList = async (listId: string, workoutId: string) => {
        const { error } = await supabase
            .from('list_workouts')
            .delete()
            .eq('list_id', listId)
            .eq('workout_id', workoutId);

        if (error) {
            console.error('Error removing workout from list:', error);
            return;
        }

        fetchListWorkouts(listId);
    };

    return (
        <div className={styles.listsContainer}>
            <div className={styles.createList}>
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                    className={styles.input}
                />
                <button onClick={createList} className={styles.button}>
                    Create List
                </button>
            </div>

            <div className={styles.listGrid}>
                {lists.map(list => (
                    <div
                        key={list.id}
                        className={`${styles.listCard} ${selectedList?.id === list.id ? styles.selected : ''}`}
                        onClick={() => {
                            setSelectedList(list);
                            fetchListWorkouts(list.id);
                        }}
                    >
                        <div className={styles.listHeader}>
                            <h3>{list.name}</h3>
                            <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteList(list.id);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <p>{new Date(list.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {selectedList && listWorkouts.length > 0 && (
                <div className={styles.workoutList}>
                    <h3>Workouts in {selectedList.name}</h3>
                    {listWorkouts.map(workout => (
                        <div key={workout.id} className={styles.workoutItem}>
                            <span>{workout.title}</span>
                            <button
                                className={styles.removeButton}
                                onClick={() => removeWorkoutFromList(selectedList.id, workout.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}