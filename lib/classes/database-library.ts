import { Client, QueryResult } from "pg";

export default class DatabaseLibrary {
	private static databaseInstance: Client;

	public constructor() {}

	// This method will return the singleton instance of the database client.
	public static getDatabaseInstance(): Client {
		// Initialize the database instance if it's not already.
		if (!DatabaseLibrary.databaseInstance) {
			DatabaseLibrary.databaseInstance = new Client({
				connectionString: process.env.DATABASE_URL,
				ssl: true,
			});

			// Connect only once when the instance is created
			DatabaseLibrary.databaseInstance.connect().catch((err) => {
				console.error("Database connection error:", err.stack);
			});
		}

		return DatabaseLibrary.databaseInstance;
	}

	// method to close the connection if needed
	public static async closeConnection(): Promise<void> {
		if (DatabaseLibrary.databaseInstance) {
			await DatabaseLibrary.databaseInstance.end();
		}
	}

	// Execute a query with the managed instance
	public async managedQueryExec(query: string): Promise<QueryResult> {
		const client = DatabaseLibrary.getDatabaseInstance();

		try {
			// Execute the query using the singleton client instance
			const result = await client.query(query);
			return result;
		} catch (error) {
			console.error("Query execution error:", error);
			throw error;
		}
	}
}
