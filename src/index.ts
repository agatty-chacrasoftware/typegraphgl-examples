import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { EmployeeResolver } from "./graphql/resolvers/employeeResolver";
import { DepartmentResolver } from "./graphql/resolvers/departmentResolver";
import { ProjectResolver } from "./graphql/resolvers/projectResolver";
import { ProjectAssignmentResolver } from "./graphql/resolvers/projectAssignmentResolver";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { AuthResolver } from "./graphql/resolvers/authResolver";
import serviceAccount from "./serviceAccountKey.json";
import firebaseConfig from "./firebaseConfig.json";

const main = async () => {
	const schema = await buildSchema({
		resolvers: [
			AuthResolver,
			EmployeeResolver,
			DepartmentResolver,
			ProjectResolver,
			ProjectAssignmentResolver,
		],
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req }) => {
			const context = {
				req,
			};
			return context;
		},
	});

	const app = Express();
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });

	// Initialize using firebase adin SDK
	// This is used to generate customized token.
	admin.initializeApp({
		credential: admin.credential.cert(JSON.stringify(serviceAccount)),
	});

	// Initialize using firebase config
	// Used to verify the customized token.
	initializeApp(firebaseConfig);

	app.listen(4000, () => {
		console.log("Server started at http://localhost:4000/graphql");
	});
};

main();
