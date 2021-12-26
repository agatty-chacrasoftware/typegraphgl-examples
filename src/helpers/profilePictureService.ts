import { PrismaClient } from ".prisma/client";
import { getEmployeeById } from "./employeeService";
const prisma = new PrismaClient();

export const createEmployeeProfilePicture = async (
	profilePictureUrl: string,
	employeeId: number
) => {
	const employeeById = await getEmployeeById(employeeId);

	if (!employeeById) {
		throw new Error("Employee not present");
	}

	return prisma.employeeProfilePicture.create({
		data: {
			profilePictureUrl: profilePictureUrl,
			employeeId: employeeId,
		},
	});
};
