import { PrismaClient } from ".prisma/client";
import {
	CreateEmployeeInputType,
	UpdateEmployeeInputType,
} from "../graphql/models/employeeModel";

const prisma = new PrismaClient();

export const deleteEmployee = async (employeeId: number) => {
	return prisma.employee.delete({
		where: {
			employeeId: Number(employeeId),
		},
	});
};

export const createEmployee = async (input: CreateEmployeeInputType) => {
	return prisma.employee.create({
		data: input,
	});
};

export const getEmployee = async () => {
	return prisma.employee.findMany({
		include: {
			projects: true,
		},
	});
};

export const updateEmployee = async (
	employeeId: number,
	input: UpdateEmployeeInputType
) => {
	return prisma.employee.update({
		data: input,
		where: {
			employeeId: Number(employeeId),
		},
	});
};
