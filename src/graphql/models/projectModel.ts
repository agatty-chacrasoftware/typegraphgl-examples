import { Field, InputType, ObjectType } from "type-graphql";
import { ProjectAssignmentModel } from "./projectAssignmentModel";

@ObjectType()
export class ProjectModel {
	@Field({ nullable: false })
	projectId: number;

	@Field({ nullable: false })
	projectName: string;

	@Field({ nullable: false })
	departmentId: number;

	@Field(() => [ProjectAssignmentModel], { nullable: true })
	employees: [ProjectAssignmentModel];
}

@InputType()
export class CreateProjectInputModel {
	@Field({ nullable: false })
	projectName: string;

	@Field({ nullable: false })
	departmentId: number;
}

@InputType()
export class UpdateProjectInputModel {
	@Field({ nullable: false })
	projectName: string;

	@Field({ nullable: false })
	departmentId: number;
}
