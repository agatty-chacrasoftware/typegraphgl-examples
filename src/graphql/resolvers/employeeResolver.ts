import {
	createEmployee,
	deleteEmployee,
	getEmployeeById,
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
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";

@Resolver()
export class EmployeeResolver {
	@UseMiddleware(isAuth)
	@Query((_returns) => [EmployeeModel])
	async employees() {
		return getEmployees();
	}

	@Query((_returns) => [EmployeeModel])
	async getEmployeeById(
		@Arg("employeeId", () => Int)
		employeeId: number
	) {
		return getEmployeeById(employeeId);
	}

	@Mutation((_returns) => EmployeeModel)
	async createEmployee(
		@Arg("input", () => CreateEmployeeInputType)
		input: CreateEmployeeInputType,
		@Arg("picture", () => GraphQLUpload)
		{ createReadStream }: Upload
	) {
		return createEmployee(input, createReadStream);
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
