import styles from './page.module.css';
import Search from './search';
export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Search />
			</main>
		</div>
	);
}
