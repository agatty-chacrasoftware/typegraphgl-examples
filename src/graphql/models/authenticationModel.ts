import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthenticationModel {
	@Field({ nullable: false })
	token: string;
}
