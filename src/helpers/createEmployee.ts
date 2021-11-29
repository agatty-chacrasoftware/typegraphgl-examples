import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export const createEmployee = async (req: { name: string; salary: number }) => {
	return prisma.employee.create({
		data: req,
	});
};
