import { useEffect } from 'react';
import { Client, Databases, ID, Query } from 'appwrite';

const BulkAddHarnesses = () => {
	useEffect(() => {
		const client = new Client()
			.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
			.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

		const databases = new Databases(client);
		const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
		const COLLECTION_ID = import.meta.env.VITE_APPWRITE_HARNESS_COLLECTION;

		const addHarnesses = async () => {
			for (let i = 1; i <= 200; i++) {
				const harnessNumber = `${i}`;
				const existing = await databases.listDocuments(
					DATABASE_ID,
					COLLECTION_ID,
					[Query.equal('HarnessNumber', harnessNumber)]
				);
				if (existing.total === 0) {
					await databases.createDocument(
						DATABASE_ID,
						COLLECTION_ID,
						`harness-${harnessNumber}`,
						{
							HarnessNumber: harnessNumber,
							Status: 'Good',
						}
					);
				}
			}

			// Kids harnesses (K1–K30)
			for (let i = 1; i <= 30; i++) {
				const harnessNumber = `${i}`;
				const existing = await databases.listDocuments(
					DATABASE_ID,
					COLLECTION_ID,
					[Query.equal('HarnessNumber', harnessNumber)]
				);
				if (existing.total === 0) {
					await databases.createDocument(
						DATABASE_ID,
						COLLECTION_ID,
						ID.unique(),
						{
							HarnessNumber: harnessNumber,
							Status: 'Good',
						}
					);
				}
			}

			console.log('All harnesses added!');
		};

		addHarnesses();
	}, []);

	return <p>Adding harnesses… (check console)</p>;
};

export default BulkAddHarnesses;
