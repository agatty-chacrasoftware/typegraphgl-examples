import { getToken } from "../../utils/authHelpers/getToken";
import { Resolver, Query, Arg } from "type-graphql";
import { AuthenticationModel } from "../models/authenticationModel";

@Resolver()
export class AuthResolver {
	@Query((_returns) => AuthenticationModel)
	async getToken(@Arg("employeeId", () => String) employeeId: string) {
		const token = await getToken(employeeId);
		return { token };
	}
}
