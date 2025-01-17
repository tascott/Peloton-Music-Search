'use client';
import { useState, useEffect, ChangeEvent } from 'react';
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
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// runs once "when the component mounts" i.e. after the component is rendered
		fetchInstructors();
	}, []);

	const fetchInstructors = async () => {
		try {
			const { data, error } = await supabase
				.from('instructors') // table name
				.select('*'); // return all fields
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

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const updatedInstructors = instructors.filter((instructor) =>
		instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<input
				type="text"
				placeholder="Search instructors"
				onChange={handleSearch}
			/>
			<ul>
				{updatedInstructors?.map((instructor) => (
					<li key={instructor.id}>{instructor.name}</li>
				))}
			</ul>
		</div>
	);
}
