import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./graphql/helloResolvers";
import { EmployeeResolver } from "./graphql/employeeResolver";

const main = async () => {
	const schema = await buildSchema({
		resolvers: [HelloResolver, EmployeeResolver],
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
