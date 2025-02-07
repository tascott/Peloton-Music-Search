'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import styles from './auth.module.css';
import PlaylistWorkoutDetail from './playlistWorkoutDetail';
import { instructors } from '@/data/instructors';

type Playlist = {
    id: string;
    name: string;
    items?: ListItem[];
};

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

type ListItem = {
    id: string;
    workout_id: string;
    workout_details?: WorkoutType;
};

export default function AuthButton() {
    const [session, setSession] = useState<Session | null>(null);
    const [showAuth, setShowAuth] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [playlistName, setPlaylistName] = useState('');
    const [expandedPlaylists, setExpandedPlaylists] = useState<string[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<{workout: WorkoutType; playlistId: string} | null>(null);

    const fetchPlaylistItems = useCallback(async (playlistId: string) => {
        const { data: items, error } = await supabase
            .from('list_items')
            .select(`
                id,
                workout_id,
                workout_details:web_workouts(*)
            `)
            .eq('list_id', playlistId);

        if (error) {
            console.error('Error fetching playlist items:', error);
            return [];
        }
        return items;
    }, []);

    const refreshPlaylists = useCallback(async () => {
        if (!session?.user.id) return;

        const { data: userLists, error } = await supabase
            .from('user_lists')
            .select('*')
            .eq('user_id', session.user.id);

        if (error) {
            console.error('Error fetching playlists:', error);
            return;
        }

        const playlistsWithItems = await Promise.all(
            userLists.map(async (playlist) => ({
                ...playlist,
                items: await fetchPlaylistItems(playlist.id)
            }))
        );

        setPlaylists(playlistsWithItems);
    }, [session?.user.id, fetchPlaylistItems]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session?.user.id) {
            refreshPlaylists();
        }
    }, [session, refreshPlaylists]);

    useEffect(() => {
        const handlePlaylistUpdate = () => {
            refreshPlaylists();
        };

        window.addEventListener('playlistsUpdated', handlePlaylistUpdate);
        return () => window.removeEventListener('playlistsUpdated', handlePlaylistUpdate);
    }, [refreshPlaylists]);

    const addPlaylist = async (name: string) => {
        const { data, error } = await supabase
            .from('user_lists')
            .insert({
                name,
                user_id: session?.user.id
            })
            .select();

        if (error) {
            console.error(error);
        } else if (data) {
            const playlistsWithItems = await Promise.all(
                data.map(async (playlist) => ({
                    ...playlist,
                    items: await fetchPlaylistItems(playlist.id)
                }))
            );
            setPlaylists(prevPlaylists => [...prevPlaylists, ...playlistsWithItems]);
            setPlaylistName('');
        }
    };

    const removeWorkoutFromPlaylist = async (playlistId: string, workoutId: string) => {
        const { error } = await supabase
            .from('list_items')
            .delete()
            .match({ list_id: playlistId, workout_id: workoutId });

        if (error) {
            console.error('Error removing workout from playlist:', error);
            return false;
        }
        return true;
    };

    const togglePlaylist = (playlistId: string) => {
        setExpandedPlaylists(prev =>
            prev.includes(playlistId)
                ? prev.filter(id => id !== playlistId)
                : [...prev, playlistId]
        );
    };

    return (
		<div className={styles.authContainer}>
			{session ? (
				<>
					<div className={styles.userInfo}>
						<button onClick={() => setShowProfile(true)}>
							<span>My Playlists</span>
						</button>

						<button onClick={() => supabase.auth.signOut()}>
							Sign Out
						</button>
					</div>
					{showProfile && (
						<div className={styles.profileModal}>
							<div className={styles.profileContent}>
								<h1>Profile</h1>
								<div className={styles.profileInfo}>
									<p>{session.user.email}</p>
								</div>
								<hr />
								<div className={styles.addPlaylistForm}>
									<label
										htmlFor="playlistName"
										className={styles.addPlaylistLabel}
									>
										Add new playlist
									</label>
									<input
										type="text"
										placeholder="Playlist Name"
										className={styles.addPlaylistInput}
                                        onChange={(e) => setPlaylistName(e.target.value)}
									/>
									<button
										className={styles.addPlaylistButton}
										onClick={() => addPlaylist(playlistName)}
									>
										Create
									</button>
								</div>

								<h3 className={styles.profileHeader}>
									Playlists
								</h3>

								<div className={styles.profilePlaylists}>
									{playlists.map((playlist) => (
										<div key={playlist.id}>
											<div
												className={styles.playlistHeader}
												onClick={() => togglePlaylist(playlist.id)}
											>
												<h2>{playlist.name}</h2>
												<button className={`${styles.playlistToggle} ${expandedPlaylists.includes(playlist.id) ? styles.expanded : ''}`}>
													<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
													</svg>
												</button>
											</div>
											<div className={`${styles.playlistItems} ${expandedPlaylists.includes(playlist.id) ? styles.expanded : ''}`}>
												{playlist.items?.map((item) => (
													<div
														key={item.id}
														className={styles.playlistItem}
														onClick={() => item.workout_details && setSelectedWorkout({
															workout: item.workout_details,
															playlistId: playlist.id
														})}
													>
														{item.workout_details && (
															<span>
																{item.workout_details.title}
																{item.workout_details.instructor_id && ` - ${instructors[item.workout_details.instructor_id].name}`}
															</span>
														)}
													</div>
												))}
											</div>
										</div>
									))}
								</div>

								{selectedWorkout && (
									<PlaylistWorkoutDetail
										workout={selectedWorkout.workout}
										onClose={() => setSelectedWorkout(null)}
										onDelete={async () => {
											const success = await removeWorkoutFromPlaylist(
												selectedWorkout.playlistId,
												selectedWorkout.workout.id
											);
											if (success) {
												refreshPlaylists();
												setSelectedWorkout(null);
											}
										}}
									/>
								)}

								<button
									className={styles.closeButton}
									onClick={() => setShowProfile(false)}
								>
									×
								</button>
							</div>
						</div>
					)}
				</>
			) : (
				<>
					<button onClick={() => setShowAuth(true)}>Sign In</button>
					{showAuth && (
						<div className={styles.authModal}>
							<div className={styles.authContent}>
								<button
									className={styles.closeButton}
									onClick={() => setShowAuth(false)}
								>
									×
								</button>
								<Auth
									supabaseClient={supabase}
									appearance={{ theme: ThemeSupa }}
									theme="dark"
									providers={[]}
									view="sign_in"
								/>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}