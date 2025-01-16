'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// TS type for instructor data
type Instructor = {
	id: number;
	name: string;
	image_url: string;
};

export default function Instructors() {
	// Component code
	const [instructors, setInstructors] = useState<Instructor[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchInstructors();
	}, []);

	const fetchInstructors = async () => {
		try {
			const { data, error } = await supabase
				.from('instructors') // table name
				.select('*'); // select all fields
			// TBC .select('id, name, specific_fields')

			if (error) throw error;

			setInstructors(data);
		} catch (error) {
			setError('Error fetching instructors');
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ul>
			{instructors?.map((instructor) => (
				<li key={instructor.id}>{instructor.name}</li>
			))}
		</ul>
	);
}
