import { ClientError } from "@mangasur/system";
import { RequestInit, fetch } from "undici";

export interface FetchOptions extends RequestInit {
	baseURL?: string;
}

export class Fetch {
	private baseURL: string;

	constructor(options: FetchOptions = {}) {
		this.baseURL = options.baseURL || "";
	}

	/**
	 * Sanitizes the URL by ensuring it starts with "http://" or "https://".
	 * If the URL is relative, it appends it to the baseURL.
	 * @param baseURL - The base URL to append to if the path is relative.
	 * @param path - The path to sanitize.
	 * @returns The sanitized URL.
	 */
	private _sanitizeUrl(baseURL: string, path: string): string {
		if (/^https?:\/\//i.test(path)) {
			return path;
		}
		if (!baseURL) {
			throw new Error("Relative path provided without a baseURL.");
		}
		return baseURL.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");
	}

	async request<T extends object>(
		path: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = this._sanitizeUrl(this.baseURL, path);
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new ClientError(`HTTP error! status: ${response.status}`, {
				url,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: await response.text(),
			});
		}
		return response.json() as Promise<T>;
	}
}
