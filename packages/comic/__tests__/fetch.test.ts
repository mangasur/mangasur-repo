import { ClientError } from "@mangasur/system";
import { fetch } from "undici";
import { Fetch } from "../src/fetch";

jest.mock("undici", () => ({
	fetch: jest.fn(),
}));

describe("Fetch", () => {
	const baseURL = "https://api.xxx.com";

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("_sanitizeUrl", () => {
		it("returns absolute URL as is", () => {
			const f = new Fetch({ baseURL });
			// @ts-expect-error: testing private method
			expect(f._sanitizeUrl(baseURL, "https://xxx.com")).toBe(
				"https://xxx.com"
			);
		});

		it("appends relative path to baseURL", () => {
			const f = new Fetch({ baseURL });
			// @ts-expect-error: testing private method
			expect(f._sanitizeUrl(baseURL, "/users")).toBe(
				"https://api.xxx.com/users"
			);
		});

		it("throws if relative path and no baseURL", () => {
			const f = new Fetch();
			// @ts-expect-error: testing private method
			expect(() => f._sanitizeUrl("", "/users")).toThrow(
				"Relative path provided without a baseURL."
			);
		});
	});

	describe("request", () => {
		it("calls fetch with sanitized URL and returns JSON on success", async () => {
			const f = new Fetch({ baseURL });
			const mockJson = { hello: "world" };
			const mockResponse = {
				ok: true,
				status: 200,
				statusText: "OK",
				headers: {},
				json: jest.fn().mockResolvedValue(mockJson),
			};
			(fetch as jest.Mock).mockResolvedValue(mockResponse);

			const result = await f.request<{ hello: string }>("/test");
			expect(fetch).toHaveBeenCalledWith("https://api.xxx.com/test", {});
			expect(result).toEqual(mockJson);
		});

		it("throws ClientError on non-ok response", async () => {
			const f = new Fetch({ baseURL });
			const mockResponse = {
				ok: false,
				status: 404,
				statusText: "Not Found",
				headers: {},
				text: jest.fn().mockResolvedValue("Not Found"),
			};
			(fetch as jest.Mock).mockResolvedValue(mockResponse);

			await expect(f.request("/notfound")).rejects.toThrow(ClientError);
			expect(fetch).toHaveBeenCalled();
		});
	});
});
