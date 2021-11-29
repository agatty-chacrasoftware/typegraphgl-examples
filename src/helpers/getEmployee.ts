import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
export const getEmployee = async () => {
	const employees = prisma.employee.findMany({});
	return employees;
};
