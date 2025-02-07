'use client';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import styles from './auth.module.css';

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
        console.log('addPlaylist');
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

    const addWorkoutToPlaylist = async (playlistId: string, workoutId: string) => {
        const { data, error } = await supabase
            .from('list_items')
            .insert({
                list_id: playlistId,
                workout_id: workoutId
            })
            .select();

        if (error) {
            console.error('Error adding workout to playlist:', error);
            return false;
        }
        return true;
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
											<h2>{playlist.name}</h2>
											<div className={styles.playlistItems}>
												{playlist.items?.map((item) => (
													<div key={item.id} className={styles.playlistItem}>
														{item.workout_details && (
															<>
																<span>{item.workout_details.title}</span>
																<button
																	onClick={() => removeWorkoutFromPlaylist(playlist.id, item.workout_id)}
																	className={styles.removeButton}
																>
																	Remove
																</button>
															</>
														)}
													</div>
												))}
											</div>
										</div>
									))}
								</div>

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