'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

type PlaylistContextType = {
    refreshPlaylists: () => Promise<void>;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function PlaylistProvider({ children }: { children: ReactNode }) {
    const refreshPlaylists = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user.id) return;

        const { data: userLists, error } = await supabase
            .from('user_lists')
            .select('*')
            .eq('user_id', session.user.id);

        if (error) {
            console.error('Error fetching playlists:', error);
            return;
        }

        // Dispatch a custom event that AuthButton can listen to
        window.dispatchEvent(new CustomEvent('playlistsUpdated'));
    };

    return (
        <PlaylistContext.Provider value={{ refreshPlaylists }}>
            {children}
        </PlaylistContext.Provider>
    );
}

export function usePlaylistContext() {
    const context = useContext(PlaylistContext);
    if (!context) {
        throw new Error('usePlaylistContext must be used within a PlaylistProvider');
    }
    return context;
}