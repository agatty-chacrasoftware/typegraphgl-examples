import {
	createProjectAssignment,
	getProjectAssignment,
	updateProjectAssignment,
} from "../../helpers/projectAssignmentService";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import {
	CreateProjectAssignmentInputModel,
	ProjectAssignmentModel,
	UpdateProjectAssignmentInputModel,
} from "../models/projectAssignmentModel";

@Resolver()
export class ProjectAssignmentResolver {
	@Query((_returns) => [ProjectAssignmentModel])
	async projectAssignment() {
		return getProjectAssignment();
	}

	@Mutation((_returns) => ProjectAssignmentModel)
	async createProjectAssignment(
		@Arg("input", () => CreateProjectAssignmentInputModel)
		input: CreateProjectAssignmentInputModel
	) {
		return createProjectAssignment(input);
	}

	@Mutation((_returns) => ProjectAssignmentModel)
	async updateProjectAssignment(
		@Arg("input")
		input: UpdateProjectAssignmentInputModel,
		@Arg("projectId", () => Int) projectId: number
	) {
		return updateProjectAssignment(projectId, input);
	}
}
