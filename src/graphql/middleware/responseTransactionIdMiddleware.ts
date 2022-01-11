import { ServerError } from "../../utils/errorHelper";
import { MiddlewareFn } from "type-graphql";
import uuid4 from "uuid4";

export const ResponseTransactionIdMiddleware: MiddlewareFn<any> = async (
	{ context },
	next
) => {
	if (context.responseTranscationId) {
		return next();
	}

	context.responseTranscationId = true;
	try {
		await next();
		const txId = uuid4();
		context.res.setHeader("Transaction-Id", txId);
	} catch (error) {
		const serverError = error as ServerError;
		throw serverError;
	}
};
