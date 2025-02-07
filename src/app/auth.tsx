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
									<p>Email: {session.user.email}</p>
									<p>Name: {session.user.user_metadata.name}</p>
									<p>Avatar: {session.user.user_metadata.avatar_url}</p>
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