import { MyContext } from "../../types/MyContext";
import { verifyToken } from "../../utils/authHelpers/verifyToken";
import { MiddlewareFn } from "type-graphql";
import { getEmployeeById } from "../../helpers/employeeService";
import { errorName } from "../../utils/errorsHelpers/errorConstants";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.headers.authorization) {
		throw new Error(errorName.UNAUTHORIZED);
	}

	const token = context.req.headers.authorization;
	const userId = await verifyToken(token);
	const employee = await getEmployeeById(Number(userId));

	if (!employee) {
		throw new Error(errorName.UNAUTHORIZED);
	}

	return next();
};
