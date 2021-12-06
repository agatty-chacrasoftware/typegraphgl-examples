import { PrismaClient } from ".prisma/client";
import {
	CreateProjectInputModel,
	UpdateProjectInputModel,
} from "../graphql/models/ProjectModel";

const prisma = new PrismaClient();

export const createProject = async (input: CreateProjectInputModel) => {
	return prisma.project.create({
		data: input,
	});
};

export const getProjects = async () => {
	const result = await prisma.project.findMany({
		include: { employees: true },
	});
	return result;
};

export const updateProject = async (
	projectId: number,
	input: UpdateProjectInputModel
) => {
	return prisma.project.update({
		data: input,
		where: {
			projectId: Number(projectId),
		},
	});
};
