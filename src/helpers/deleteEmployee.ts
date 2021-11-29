import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export const deleteEmployee = async (empId: number) => {
	return prisma.employee.delete({
		where: {
			empId: Number(empId),
		},
	});
};
