import { PrismaClient } from ".prisma/client";
import {
	CreateEmployeeInputType,
	UpdateEmployeeInputType,
} from "../graphql/models/employeeModel";
import { uploadImageToCloudinary } from "./profilePictureService";

const prisma = new PrismaClient();

export const deleteEmployee = async (employeeId: number) => {
	return prisma.employee.delete({
		where: {
			employeeId: Number(employeeId),
		},
	});
};

export const createEmployee = async (
	input: CreateEmployeeInputType,
	createReadStream
) => {
	const profilePictureUrl = await uploadImageToCloudinary(createReadStream);
	input.profilePictureUrl = profilePictureUrl;
	return prisma.employee.create({
		data: input,
	});
};

export const getEmployees = async () => {
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

export const getEmployeeById = async (employeeId: number) => {
	return prisma.employee.findUnique({
		where: {
			employeeId: employeeId,
		},
		include: {
			projects: true,
		},
	});
};
