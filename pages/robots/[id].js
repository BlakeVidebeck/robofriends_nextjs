import Link from 'next/link';
import Layout from '../../components/layout';

// This function gets called at build time
export async function getStaticPaths() {
	// Call an external API endpoint to get robots
	const res = await fetch('http://jsonplaceholder.typicode.com/users');
	const robots = await res.json();

	// Get the paths we want to pre-render based on robots
	const paths = robots.map(robot => ({
		// changed the id to a string
		params: { id: robot.id.toString() },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
	const res = await fetch(
		`http://jsonplaceholder.typicode.com/users/${params.id}`,
	);
	const robot = await res.json();

	return {
		props: {
			robot, // will be passed to the Robots component as props
		},
	};
}

const Robot = ({ robot }) => {
	return (
		<Layout>
			<div className='tc'>
				<div className='tc bg-light-green dib br3 pa3 mv1 bw2 shadow-5 w-25-l w-75'>
					<img
						src={`https://robohash.org/${robot.id}?size=200x200`}
						width='200'
						height='200'
						alt='robots'
					/>
					<hr />
					<h2>{robot.name}</h2>
					<p>
						<strong>Alias: </strong> {robot.username}
					</p>
					<p>
						<strong>City: </strong>
						{robot.address.city}
					</p>
					<p>
						<strong>Website: </strong> {robot.website}
					</p>
					<h4>Contact me</h4>
					<p>{robot.email}</p>
					<Link href={`/`}>
						<button className='grow'>Go back</button>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Robot;
