import {
	createDepartment,
	getDepartments,
	updateDepartment,
} from "../../helpers/departmentService";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import {
	CreateDepartmentInputModel,
	DepartmentModel,
	UpdateDepartmentInputModel,
} from "../models/departmentModel";

@Resolver()
export class DepartmentResolver {
	@Query((_returns) => [DepartmentModel])
	async departments() {
		return getDepartments();
	}

	@Mutation((_returns) => DepartmentModel)
	async createDepartment(
		@Arg("input", () => CreateDepartmentInputModel)
		input: CreateDepartmentInputModel
	) {
		return createDepartment(input);
	}

	@Mutation((_returns) => DepartmentModel)
	async updateDepartment(
		@Arg("input")
		input: UpdateDepartmentInputModel,
		@Arg("departmentId", () => Int) departmentId: number
	) {
		return updateDepartment(departmentId, input);
	}
}
