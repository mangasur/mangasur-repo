import { Client } from "./client";

export class SharedAPI {
	protected _client: Client;
	constructor(client: Client) {
		this._client = client;
	}
}
