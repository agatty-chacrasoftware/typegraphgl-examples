import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class EmployeeModel {
	@Field({ nullable: true })
	employeeId: number;

	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	salary: number;
}

@ObjectType()
export class Subscription {
	@Field(() => EmployeeModel, { nullable: true })
	newEmployee: EmployeeModel;
}

@InputType()
export class CreateEmployeeInputType {
	@Field({ nullable: false })
	name: string;

	@Field(() => Int, { nullable: false })
	salary: number;
}

@InputType()
export class UpdateEmployeeInputType {
	@Field({ nullable: true })
	name: string;

	@Field(() => Int, { nullable: true })
	salary: number;
}
