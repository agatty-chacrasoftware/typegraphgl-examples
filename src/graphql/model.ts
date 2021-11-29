import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class EmployeeModel {
	@Field({ nullable: false })
	empId: number;

	@Field({ nullable: false })
	name: string;

	@Field({ nullable: false })
	salary: number;
}

@InputType()
export class CreateEmployeeModel {
	@Field({ nullable: false })
	name: string;

	@Field(() => Int, { nullable: false })
	salary: number;
}

@InputType()
export class UpdateEmployeeModel {
	@Field({ nullable: true })
	name: string;

	@Field(() => Int, { nullable: true })
	salary: number;
}
