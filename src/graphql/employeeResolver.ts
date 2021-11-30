import {
	createEmployee,
	deleteEmployee,
	getEmployee,
	updateEmployee,
} from "../helpers/employeeService";
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import {
	CreateEmployeeInputType,
	EmployeeModel,
	UpdateEmployeeInputType,
} from "./model";

@Resolver()
export class EmployeeResolver {
	@Query((_returns) => [EmployeeModel])
	async employee() {
		return getEmployee();
	}

	@Mutation((_returns) => EmployeeModel)
	async createEmployee(
		@Arg("options", () => CreateEmployeeInputType)
		options: CreateEmployeeInputType
	) {
		return createEmployee(options);
	}

	@Mutation((_returns) => EmployeeModel)
	async updateEmployee(
		@Arg("req", () => UpdateEmployeeInputType) req: UpdateEmployeeInputType,
		@Arg("employeeId", () => Int) employeeId: number
	) {
		return updateEmployee(employeeId, req);
	}

	@Mutation((_returns) => EmployeeModel)
	async deleteEmployee(@Arg("employeeId", () => Int) employeeId: number) {
		return deleteEmployee(employeeId);
	}
}
