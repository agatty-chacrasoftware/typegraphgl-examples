import { MyContext } from "../../types/MyContext";
import { verifyToken } from "../../utils/authHelpers/verifyToken";
import { MiddlewareFn } from "type-graphql";
import { getEmployeeById } from "../../helpers/employeeService";
import { AuthenticationError } from "apollo-server-express";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	try {
		if (!context.req.headers.authorization) {
			throw new AuthenticationError("Add authorization header");
		}

		const token = context.req.headers.authorization;
		const userId = await verifyToken(token);
		const employee = await getEmployeeById(Number(userId));

		if (!employee) {
			throw new AuthenticationError("Not authorized");
		}

		return next();
	} catch (err) {
		throw new AuthenticationError("Error");
	}
};
