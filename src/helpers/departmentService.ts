import { PrismaClient } from ".prisma/client";
import {
	CreateDepartmentInputModel,
	UpdateDepartmentInputModel,
} from "../graphql/models/departmentModel";

const prisma = new PrismaClient();

export const createDepartment = async (input: CreateDepartmentInputModel) => {
	return prisma.department.create({
		data: input,
	});
};

export const getDepartments = async () => {
	const result = await prisma.department.findMany({
		include: { employees: true, projects: true },
	});
	return result;
};

export const updateDepartment = async (
	departmentId: number,
	input: UpdateDepartmentInputModel
) => {
	return prisma.department.update({
		data: input,
		where: {
			departmentId: Number(departmentId),
		},
	});
};
