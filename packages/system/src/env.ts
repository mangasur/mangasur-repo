import { SystemError } from "./error";

export const getEnv = (key: string, isRequired?: boolean): string => {
	const value = process.env[key];
	if ((!value || value === "") && isRequired) {
		throw new SystemError(`Missing environment variable: ${key}`);
	}
	return value || "";
};
