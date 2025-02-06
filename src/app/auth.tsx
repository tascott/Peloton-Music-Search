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
                <div className={styles.userInfo}>
                    <span>{session.user.email}</span>
                    <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
                </div>
            ) : (
                <>
                    <button onClick={() => setShowAuth(true)}>Sign In</button>
                    {showAuth && (
                        <div className={styles.authModal}>
                            <div className={styles.authContent}>
                                <button className={styles.closeButton} onClick={() => setShowAuth(false)}>×</button>
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