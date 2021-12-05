import { PrismaClient } from ".prisma/client";
import {
	CreateProjectAssignmentInputModel,
	UpdateProjectAssignmentInputModel,
} from "../graphql/models/projectAssignmentModel";

const prisma = new PrismaClient();

export const createProjectAssignment = async (
	input: CreateProjectAssignmentInputModel
) => {
	return prisma.projectAssignment.create({
		data: input,
	});
};

export const getProjectAssignment = async () => {
	const result = await prisma.projectAssignment.findMany({});
	return result;
};

export const updateProjectAssignment = async (
	assignmentId: number,
	input: UpdateProjectAssignmentInputModel
) => {
	return prisma.projectAssignment.update({
		data: input,
		where: {
			assignmentId: Number(assignmentId),
		},
	});
};
