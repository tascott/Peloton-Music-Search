'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import styles from './auth.module.css';

export default function AuthButton() {
    const [session, setSession] = useState<Session | null>(null);
    const [showAuth, setShowAuth] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    // const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

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

    const addPlaylist = () => {
        console.log('addPlaylist');
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
									/>
									<button
										className={styles.addPlaylistButton}
										onClick={() => addPlaylist()}
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
					{/* {showCreatePlaylist && (
						<>
							<div className={styles.createPlaylistModal}>
								<div className={styles.createPlaylistContent}>
									<h1>Create Playlist</h1>
								</div>
								<button onClick={() => setShowCreatePlaylist(false)} className={styles.closeButton}>
									Close
								</button>
							</div>
						</>
					)} */}
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