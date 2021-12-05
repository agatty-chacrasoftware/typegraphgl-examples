import {
	createEmployee,
	deleteEmployee,
	getEmployee,
	updateEmployee,
} from "../../helpers/employeeService";
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import {
	CreateEmployeeInputType,
	EmployeeModel,
	UpdateEmployeeInputType,
} from "../models/employeeModel";

@Resolver()
export class EmployeeResolver {
	@Query((_returns) => [EmployeeModel])
	async employee() {
		return getEmployee();
	}

	@Mutation((_returns) => EmployeeModel)
	async createEmployee(
		@Arg("input", () => CreateEmployeeInputType)
		input: CreateEmployeeInputType
	) {
		return createEmployee(input);
	}

	@Mutation((_returns) => EmployeeModel)
	async updateEmployee(
		@Arg("input", () => UpdateEmployeeInputType) input: UpdateEmployeeInputType,
		@Arg("employeeId", () => Int) employeeId: number
	) {
		return updateEmployee(employeeId, input);
	}

	@Mutation((_returns) => EmployeeModel)
	async deleteEmployee(@Arg("employeeId", () => Int) employeeId: number) {
		return deleteEmployee(employeeId);
	}
}
