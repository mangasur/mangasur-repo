import { ChapterAPI, ComicAPI } from "./api";
import { Fetch, FetchOptions } from "./fetch";
import { API } from "./typings/api";

export class Client extends Fetch implements API {
	constructor(opts: FetchOptions = {}) {
		super(opts);
	}
	comic: ComicAPI = new ComicAPI(this);
	chapter: ChapterAPI = new ChapterAPI(this);
}
