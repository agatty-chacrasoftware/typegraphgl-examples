import { ObjectType, Field, InputType } from "type-graphql";
import { EmployeeModel } from "./employeeModel";

@ObjectType()
export class DepartmentModel {
	@Field({ nullable: false })
	departmentId: number;

	@Field({ nullable: true })
	departmentName: string;

	@Field(() => [EmployeeModel], { nullable: true })
	Employee: [EmployeeModel];
}

@InputType()
export class CreateDepartmentInputModel {
	@Field({ nullable: true })
	departmentName: string;
}

@InputType()
export class UpdateDepartmentInputModel {
	@Field({ nullable: true })
	departmentName: string;
}
