import { MyContext } from "../../types/MyContext";
import { verifyToken } from "../../utils/authHelper/verifyToken";
import { MiddlewareFn } from "type-graphql";
import { getEmployeeById } from "../../services/employeeService";
import { logger } from "../../utils/loggerHelper/logger";
import { NotAuthorizedError } from "../../utils/errorHelper";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.headers.authorization) {
		throw new NotAuthorizedError("Please add authorization in headers");
	}

	const token = context.req.headers.authorization;
	const userId = await verifyToken(token);
	const employee = await getEmployeeById(Number(userId));

	if (!employee) {
		logger.error("Employee not present in the database");
		throw new NotAuthorizedError("Please signUp");
	}

	return next();
};
