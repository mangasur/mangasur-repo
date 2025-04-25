import * as Typings from ".";

export abstract class API {
	abstract comic: API.Comic;
	abstract chapter: API.Chapter;
}

export type Merge<T, U> = T & Omit<T, keyof U> & U;
export type PartiallyRequired<
	T = Typings.Comic | Typings.Chapter,
	K extends keyof T = keyof T,
> = Pick<T, K>;
export type OptionallyRequired<T, K extends keyof T> = Required<Pick<T, K>> &
	Partial<Omit<T, K>>;
export type Returns_<T, R extends keyof T> = {
	[K in Extract<R, keyof T>]: T[K];
};

export namespace API {
	export interface Metadata {
		/**
		 * The current page of the response.
		 */
		page: number;
		/**
		 * The number of items per page.
		 */
		page_size: number;
		/**
		 * Indicates if there are more pages of results.
		 */
		has_more: boolean | null;
		/**
		 * The total number of available items.
		 */
		total_items: number;
	}
	export type Response<T, M = { metadata: boolean }> = {
		/**
		 * Indicates if the request was successful.
		 */
		status: boolean;
		/**
		 * Message from server.
		 */
		message: string;
		/**
		 * The time taken to process the request on the server.
		 */
		backend_response_time: number;
	} & (M extends { metadata: true }
		? {
				/**
				 * Optional information.
				 * This only available if its show up.
				 */
				metadata: Metadata;
			}
		: M) & {
			/**
			 * The things.
			 */
			result: T;
		};

	export abstract class Comic {
		/**
		 * Get the comic.
		 *
		 * @param options
		 */
		abstract get<T extends Comic.GetRequest>(
			options: T
		): Promise<Comic.GetResponse<T>>;
		/**
		 * Get the latest comics.
		 *
		 * @param options
		 */
		abstract latest<T extends Comic.GetLatestRequest>(
			options: T
		): Promise<Comic.GetLatestResponse<T>>;
		/**
		 * Search for comics.
		 *
		 * @param options
		 */
		abstract search<T extends Comic.SearchRequest>(
			options: T
		): Promise<Comic.SearchResponse<T>>;
	}
	export namespace Comic {
		export type Extra = {
			/**
			 * First chapter of this comic.
			 * It's the lowest `chapter_number` of the comic.
			 */
			first_chapter: PartiallyRequired<
				Typings.Chapter,
				"chapter_id" | "slug" | "chapter_number" | "release_date"
			> | null;
			/**
			 * Last chapter of this comic.
			 * The newest by `release_date`
			 */
			latest_chapter: PartiallyRequired<
				Typings.Chapter,
				"chapter_id" | "slug" | "chapter_number" | "release_date"
			> | null;
			/**
			 * * The total number of chapters in the comic.
			 */
			total_chapters: number;
		};
		export interface GetRequest {
			/**
			 * The ID of the comic.
			 */
			comic_id: string;
			/**
			 * **Only get what you want.**
			 */
			returns_?: (keyof Typings.Comic)[];
		}
		export type GetResponse<T extends GetRequest> = Response<
			T["returns_"] extends (keyof Typings.Comic)[]
				? Returns_<Typings.Comic, T["returns_"][number]>
				: Typings.Comic
		>;

		export interface GetLatestRequest {
			/**
			 * Page number
			 */
			page: number;
			/**
			 * Items per-page.
			 */
			page_size: number;
		}
		export interface GetLatestRequest {
			/**
			 * Filter by `type`
			 */
			type?: `${Typings.ComicType}`;
			/**
			 * Filter by `source`
			 */
			source?: string;
			/**
			 * Filter by genres
			 */
			genres?: string[];
			/**
			 * Sort order.
			 *
			 * Sort by `latest_chapter.release_date`
			 */
			sort_order?: "asc" | "desc";
			/**
			 * **Only get what you want.**
			 */
			returns_?: (keyof Typings.Comic)[];
		}

		export type GetLatestResponse<T extends GetLatestRequest> = Response<
			Merge<
				T["returns_"] extends (keyof Typings.Comic)[]
					? Returns_<Typings.Comic, T["returns_"][number]>
					: Typings.Comic,
				Extra
			>[],
			{ metadata: true }
		>;

		export interface SearchRequest {
			/**
			 * Search query/term.
			 */
			search_term: string;
			/**
			 * Search constrait
			 */
			search_by?: "title" | "author" | "artist" | "description";
			/**
			 * Page number.
			 */
			page: number;
			/**
			 * Items per-page.
			 */
			page_size: number;
			/**
			 * **Only get what you want.**
			 */
			returns_?: (keyof Typings.Comic)[];
		}
		export type SearchResponse<T extends SearchRequest> = Response<
			(T["returns_"] extends (keyof Typings.Comic)[]
				? Returns_<Typings.Comic, T["returns_"][number]>
				: Typings.Comic)[],
			{ metadata: true }
		>;
	}

	export abstract class Chapter {
		/**
		 * Get comic chapter.
		 *
		 * @param options
		 */
		abstract get<T extends Chapter.GetRequest>(
			options: T
		): Promise<Chapter.GetResponse<T>>;
		/**
		 * List comic chapters.
		 *
		 * @param options
		 */
		abstract list<T extends Chapter.ListRequest>(
			options: T
		): Promise<Chapter.ListResponse<T>>;
	}
	export namespace Chapter {
		export type Extra = {
			/**
			 * The comic of this chapter.
			 */
			comic: PartiallyRequired<Typings.Comic, "slug" | "title">;
			/**
			 * Previous chapter.
			 */
			previous_chapter: PartiallyRequired<
				Typings.Chapter,
				"slug" | "title" | "chapter_number" | "release_date"
			> | null;
			/**
			 * Next chapter.
			 */
			next_chapter: PartiallyRequired<
				Typings.Chapter,
				"slug" | "title" | "chapter_number" | "release_date"
			> | null;
		};
		export interface GetRequest {
			/**
			 * The ID of the chapter.
			 */
			chapter_id: string;
			/**
			 * **Only get what you want.**
			 */
			returns_?: (keyof Typings.Chapter)[];
		}
		export type GetResponse<T extends GetRequest> = Response<
			T["returns_"] extends (keyof Typings.Chapter)[]
				? Returns_<Typings.Chapter, T["returns_"][number]>
				: Typings.Chapter
		>;

		export interface ListRequest {
			/**
			 * The chapter `comic_id`.
			 */
			comic_id: string;
			/**
			 * Page number.
			 */
			page: number;
			/**
			 * Items per-page.
			 */
			page_size: number;
			/**
			 * Order by `chapter_number` or `release_date`
			 */
			order_by?: "chapter_number" | "release_date";
			/**
			 * Sort order.
			 */
			sort_order?: "asc" | "desc";
			/**
			 * **Only get what you want.**
			 */
			returns_?: (keyof Typings.Chapter)[];
		}
		export type ListResponse<T extends ListRequest> = Response<
			(T["returns_"] extends (keyof Typings.Chapter)[]
				? Returns_<Typings.Chapter, T["returns_"][number]>
				: Typings.Chapter)[],
			{ metadata: true }
		>;
	}
}
