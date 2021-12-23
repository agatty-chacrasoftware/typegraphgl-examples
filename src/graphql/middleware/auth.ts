import { MyContext } from "../../types/MyContext";
import { verifyToken } from "../../utils/authHelpers/verifyToken";
import { MiddlewareFn } from "type-graphql";
import { getEmployeeById } from "../../helpers/employeeService";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.headers.authorization) {
		throw new Error("Add authoriation");
	}

	const token = context.req.headers.authorization;
	const userId = await verifyToken(token);
	const employee = await getEmployeeById(Number(userId));

	if (!employee) {
		throw new Error("Access Denied");
	}

	return next();
};
