import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { EmployeeResolver } from "./graphql/resolvers/employeeResolver";
import { DepartmentResolver } from "./graphql/resolvers/departmentResolver";
import { ProjectResolver } from "./graphql/resolvers/projectResolver";
import { ProjectAssignmentResolver } from "./graphql/resolvers/projectAssignmentResolver";

const main = async () => {
	const schema = await buildSchema({
		resolvers: [
			EmployeeResolver,
			DepartmentResolver,
			ProjectResolver,
			ProjectAssignmentResolver,
		],
	});
	const apolloServer = new ApolloServer({
		schema,
	});
	const app = Express();
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
	app.listen(4000, () => {
		console.log("Server started at http://localhost:4000/graphql");
	});
};

main();
