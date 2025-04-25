import { SharedAPI } from "./shared";
import { API } from "./typings/api";

export class ComicAPI extends SharedAPI implements API.Comic {
	get<T extends API.Comic.GetRequest>(
		options: T
	): Promise<API.Comic.GetResponse<T>> {
		return this._client.request("/comic/get", {
			method: "POST",
			body: JSON.stringify(options),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	latest<T extends API.Comic.GetLatestRequest>(
		options: T
	): Promise<API.Comic.GetLatestResponse<T>> {
		return this._client.request("/comic/latest", {
			method: "POST",
			body: JSON.stringify(options),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	search<T extends API.Comic.SearchRequest>(
		options: T
	): Promise<API.Comic.SearchResponse<T>> {
		return this._client.request("/comic/search", {
			method: "POST",
			body: JSON.stringify(options),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

export class ChapterAPI extends SharedAPI implements API.Chapter {
	get<T extends API.Chapter.GetRequest>(
		options: T
	): Promise<API.Chapter.GetResponse<T>> {
		return this._client.request("/chapter/get", {
			method: "POST",
			body: JSON.stringify(options),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	list<T extends API.Chapter.ListRequest>(
		options: T
	): Promise<API.Chapter.ListResponse<T>> {
		return this._client.request("/chapter/list", {
			method: "POST",
			body: JSON.stringify(options),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
