import { PrismaClient } from ".prisma/client";
import {
	CreateEmployeeInputType,
	UpdateEmployeeInputType,
} from "../graphql/model";

const prisma = new PrismaClient();

export const deleteEmployee = async (employeeId: number) => {
	return prisma.employee.delete({
		where: {
			employeeId: Number(employeeId),
		},
	});
};

export const createEmployee = async (req: CreateEmployeeInputType) => {
	return prisma.employee.create({
		data: req,
	});
};

export const getEmployee = async () => {
	return prisma.employee.findMany({});
};

export const updateEmployee = async (
	employeeId: number,
	req: UpdateEmployeeInputType
) => {
	return prisma.employee.update({
		data: req,
		where: {
			employeeId: Number(employeeId),
		},
	});
};
