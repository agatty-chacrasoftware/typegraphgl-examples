import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Designation } from "../enums";
import { ProjectAssignmentModel } from "./projectAssignmentModel";

@ObjectType()
export class EmployeeModel {
	@Field({ nullable: false })
	employeeId: number;

	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	salary: number;

	@Field({ nullable: true })
	designation: Designation;

	@Field({ nullable: true })
	departmentId: number;

	@Field({ nullable: true })
	profilePictureUrl: string;

	@Field(() => [ProjectAssignmentModel], { nullable: true })
	projects: [ProjectAssignmentModel];
}

@InputType()
export class CreateEmployeeInputType {
	@Field({ nullable: false })
	name: string;

	@Field(() => Int, { nullable: false })
	salary: number;

	@Field({ nullable: false })
	designation: Designation;

	@Field({ nullable: false })
	departmentId: number;

	@Field({ nullable: true })
	profilePictureUrl: string;
}

@InputType()
export class UpdateEmployeeInputType {
	@Field({ nullable: true })
	name: string;

	@Field(() => Int, { nullable: true })
	salary: number;

	@Field({ nullable: true })
	designation: Designation;

	@Field({ nullable: true })
	departmentId: number;
}
