import { getEmployee } from "../helpers/getEmployee";
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import {
	CreateEmployeeModel,
	EmployeeModel,
	UpdateEmployeeModel,
} from "./model";
import { createEmployee } from "../helpers/createEmployee";
import { updateEmployee } from "../helpers/updateEmployee";
import { deleteEmployee } from "../helpers/deleteEmployee";

@Resolver()
export class EmployeeResolver {
	@Query((_returns) => [EmployeeModel])
	async employee() {
		return await getEmployee();
	}

	@Mutation((_returns) => EmployeeModel)
	async createEmployee(
		@Arg("options", () => CreateEmployeeModel) options: CreateEmployeeModel
	) {
		return await createEmployee(options);
	}

	@Mutation((_returns) => EmployeeModel)
	async updateEmployee(
		@Arg("req", () => UpdateEmployeeModel) req: UpdateEmployeeModel,
		@Arg("empId", () => Int) empId: number
	) {
		return await updateEmployee(empId, req);
	}

	@Mutation((_returns) => EmployeeModel)
	async deleteEmployee(@Arg("empId", () => Int) empId: number) {
		return await deleteEmployee(empId);
	}
}
