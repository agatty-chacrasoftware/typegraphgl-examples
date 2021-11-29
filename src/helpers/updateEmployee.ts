import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export const updateEmployee = async (
	empId: number,
	req: {
		name: string;
		salary: number;
	}
) => {
	return prisma.employee.update({
		data: req,
		where: {
			empId: Number(empId),
		},
	});
};
