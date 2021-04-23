export function CheckFields(
	fields: string[],
	objectToVerify: Record<string, unknown>,
): string[] {
	const missingFields: string[] = [];
	fields.forEach((field) => {
		if (!(field in objectToVerify)) missingFields.push(field);
	});

	return missingFields;
}
