import { PrismaClient } from ".prisma/client";
import { NotFoundError } from "../utils/errorsHelpers/error";
import {
	CreateEmployeeInputType,
	UpdateEmployeeInputType,
} from "../graphql/models/employeeModel";
import { uploadImageToCloudinary } from "./profilePictureService";
import { logger } from "../utils/loggerHelper/logger";

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
	const employee = await getEmployeeById(employeeId);

	if (!employee) {
		logger.error("Employee not present in database");
		throw new NotFoundError("Employee not found");
	}

	return await prisma.employee.update({
		data: input,
		where: {
			employeeId: Number(employeeId),
		},
	});
};

export const getEmployeeById = async (employeeId: number) => {
	const employee = await prisma.employee.findUnique({
		where: {
			employeeId: employeeId,
		},
		include: {
			projects: true,
		},
	});

	if (!employee) {
		logger.error("Employee not present in database");
		throw new NotFoundError("Employee not found");
	}

	return employee;
};
