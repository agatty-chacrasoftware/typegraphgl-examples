import {
	createEmployee,
	deleteEmployee,
	getEmployees,
	updateEmployee,
} from "../../helpers/employeeService";
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	Int,
	UseMiddleware,
} from "type-graphql";
import {
	CreateEmployeeInputType,
	EmployeeModel,
	UpdateEmployeeInputType,
} from "../models/employeeModel";
import { isAuth } from "../middleware/auth";

@Resolver()
export class EmployeeResolver {
	@UseMiddleware(isAuth)
	@Query((_returns) => [EmployeeModel])
	async employees() {
		return getEmployees();
	}

	@Mutation((_returns) => EmployeeModel)
	@UseMiddleware(isAuth)
	async createEmployee(
		@Arg("input", () => CreateEmployeeInputType)
		input: CreateEmployeeInputType
	) {
		return createEmployee(input);
	}

	@Mutation((_returns) => EmployeeModel)
	@UseMiddleware(isAuth)
	async updateEmployee(
		@Arg("input", () => UpdateEmployeeInputType) input: UpdateEmployeeInputType,
		@Arg("employeeId", () => Int) employeeId: number
	) {
		return updateEmployee(employeeId, input);
	}

	@Mutation((_returns) => EmployeeModel)
	@UseMiddleware(isAuth)
	async deleteEmployee(@Arg("employeeId", () => Int) employeeId: number) {
		return deleteEmployee(employeeId);
	}
}
