import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';

export async function getStaticProps() {
	// getStaticProps only runs on the server side
	const res = await fetch('http://jsonplaceholder.typicode.com/users');
	const robots = await res.json();

	return {
		props: {
			robots, // will be passed to the Robots component as props
		},
	};
}

const Robots = ({ robots }) => {
	return (
		<Layout>
			<Head>
				<title>RoboFriends</title>
			</Head>
			<div className='tc'>
				{robots.map(robot => (
					<div
						key={robot.id}
						className='tc bg-light-green dib br3 pa3 ma2 bw2 shadow-5'
					>
						<img
							src={`https://robohash.org/${robot.id}?size=200x200`}
							width='200'
							height='200'
							alt='robots'
						/>
						<div>
							<h2>{robot.name}</h2>
							<p>{robot.email}</p>
						</div>
						<Link href={`robots/${robot.id}`}>
							<button className='grow'>See more</button>
						</Link>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Robots;
