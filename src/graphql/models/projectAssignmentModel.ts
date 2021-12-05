import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class ProjectAssignmentModel {
	@Field({ nullable: false })
	assignmentId: number;

	@Field({ nullable: false })
	employeeId: number;

	@Field({ nullable: false })
	projectId: number;
}

@InputType()
export class CreateProjectAssignmentInputModel {
	@Field({ nullable: false })
	employeeId: number;

	@Field({ nullable: false })
	projectId: number;
}

@InputType()
export class UpdateProjectAssignmentInputModel {
	@Field({ nullable: false })
	employeeId: number;

	@Field({ nullable: false })
	projectId: number;
}
