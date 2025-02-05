'use client';
import styles from './difficultyColorPill.module.css';

type DifficultyColorPillProps = {
	difficulty: number;
};

export default function DifficultyColorPill({ difficulty }: DifficultyColorPillProps) {
	const getColor = (difficulty: number) => {
		// Scale from 6.0 to 9.0
		const normalized = Math.min((difficulty - 6) / 3, 1); // Will give us 0 to 1, capped at 1

		// More vibrant colors
		const colors = [
			{ r: 46, g: 204, b: 113 }, // Bright Green
			{ r: 241, g: 196, b: 15 }, // Bright Yellow
			{ r: 235, g: 47, b: 6 }, // Bright Red
		];

		if (normalized <= 0.5) {
			// Interpolate between green and yellow
			const t = normalized * 2;
			return {
				r: colors[0].r + (colors[1].r - colors[0].r) * t,
				g: colors[0].g + (colors[1].g - colors[0].g) * t,
				b: colors[0].b + (colors[1].b - colors[0].b) * t,
			};
		} else {
			// Interpolate between yellow and red
			const t = (normalized - 0.5) * 2;
			return {
				r: colors[1].r + (colors[2].r - colors[1].r) * t,
				g: colors[1].g + (colors[2].g - colors[1].g) * t,
				b: colors[1].b + (colors[2].b - colors[1].b) * t,
			};
		}
	};

	const color = getColor(difficulty);
	const backgroundColor = `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;

	return (
		<div className={styles.pill} style={{ backgroundColor }}>
			Difficulty: {difficulty.toFixed(1)}
		</div>
	);
}
