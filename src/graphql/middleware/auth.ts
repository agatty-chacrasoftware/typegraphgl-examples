import { PrismaClient } from ".prisma/client";
import { MyContext } from "../../types/MyContext";
import { verifyToken } from "../../utils/authHelpers/verifyToken";
import { MiddlewareFn } from "type-graphql";

const prisma = new PrismaClient();

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.headers.authorization) {
		throw new Error("Add authoriation");
	}

	const token = context.req.headers.authorization;

	const userId = await verifyToken(token);

	const employeeId = await prisma.employee.findUnique({
		where: {
			employeeId: Number(userId),
		},
	});

	if (!employeeId) {
		throw new Error("Access Denied");
	}

	return next();
};
