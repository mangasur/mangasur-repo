import { getEnv } from "../src/env";
import { SystemError } from "../src/error";

describe("getEnv", () => {
	const ENV = process.env;

	beforeEach(() => {
		process.env = { ...ENV };
	});

	afterEach(() => {
		process.env = ENV;
	});

	it("returns the value of an existing environment variable", () => {
		process.env.TEST_KEY = "test-value";
		expect(getEnv("TEST_KEY")).toBe("test-value");
	});

	it("returns an empty string if the variable is not set and not required", () => {
		delete process.env.TEST_KEY;
		expect(getEnv("TEST_KEY")).toBe("");
	});

	it("throws SystemError if the variable is not set and is required", () => {
		delete process.env.TEST_KEY;
		expect(() => getEnv("TEST_KEY", true)).toThrow(SystemError);
	});

	it("throws SystemError if the variable is set to an empty string and is required", () => {
		process.env.TEST_KEY = "";
		expect(() => getEnv("TEST_KEY", true)).toThrow(SystemError);
	});

	it("returns an empty string if the variable is set to an empty string and not required", () => {
		process.env.TEST_KEY = "";
		expect(getEnv("TEST_KEY")).toBe("");
	});
});
