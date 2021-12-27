import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ProfilePictureModel {
	@Field({ nullable: false })
	profileId: number;

	@Field({ nullable: false })
	employeeId: number;

	@Field({ nullable: true })
	profilePictureUrl: string;
}
