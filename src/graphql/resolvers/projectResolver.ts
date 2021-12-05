import {
	createProject,
	getProject,
	updateProject,
} from "../../helpers/projectService";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { CreateProjectInputModel } from "../models/ProjectModel";
import { ProjectModel, UpdateProjectInputModel } from "../models/projectModel";

@Resolver()
export class ProjectResolver {
	@Query((_returns) => [ProjectModel])
	async project() {
		return getProject();
	}

	@Mutation((_returns) => ProjectModel)
	async createProject(
		@Arg("input", () => CreateProjectInputModel)
		input: CreateProjectInputModel
	) {
		return createProject(input);
	}

	@Mutation((_returns) => ProjectModel)
	async updateProject(
		@Arg("input")
		input: UpdateProjectInputModel,
		@Arg("projectId", () => Int) projectId: number
	) {
		return updateProject(projectId, input);
	}
}
