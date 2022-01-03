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
import { graphqlUploadExpress } from "graphql-upload";
import dotenv from "dotenv";
dotenv.config();
import { ProfilePictureResolver } from "./graphql/resolvers/profilePictureResolver";
import cloudinary from "cloudinary";
import { logger } from "./utils/loggerHelper/logger";
import { ErrorLoggerMiddleware } from "./graphql/middleware/errorLoggerMiddleware";
import { GraphQLError } from "graphql";
import { RequestTimerMiddleware } from "./graphql/middleware/requestTimerMiddleware";
const main = async () => {
	const schema = await buildSchema({
		resolvers: [
			AuthResolver,
			EmployeeResolver,
			DepartmentResolver,
			ProjectResolver,
			ProjectAssignmentResolver,
			ProfilePictureResolver,
		],
		globalMiddlewares: [ErrorLoggerMiddleware, RequestTimerMiddleware],
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req }) => {
			const context = {
				req,
			};
			return context;
		},
		formatError: (error: GraphQLError) => {
			return {
				message: error.message,
				status: error.originalError,
			};
		},
	});

	const app = Express();

	await apolloServer.start();
	app.use(graphqlUploadExpress());
	apolloServer.applyMiddleware({ app });

	// Initialize using firebase adin SDK
	// This is used to generate customized token.

	const serviceAccount = require("../serviceAccountKey.json");
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});

	// Initialize using firebase config
	// Used to verify the customized token.
	const firebaseConfig = require("../firebaseConfig.json");
	initializeApp(firebaseConfig);

	cloudinary.v2.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
		folder: process.env.CLOUDINARY_FOLDER,
	});

	app.listen(parseInt(process.env.PORT), () => {
		logger.info(
			`server started on http://localhost:${process.env.PORT}/graphql`
		);
	});
};

main();
