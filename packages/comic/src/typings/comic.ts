import { ComicStatus, ComicType } from "./enums";

/**
 * Represents a comic with detailed metadata and attributes.
 */
export interface Comic {
	/**
	 * Unique identifier for the comic.
	 */
	comic_id: string;
	/**
	 * URL-friendly unique slug for the comic.
	 */
	slug: string;
	/**
	 * Primary title of the comic.
	 */
	title: string;
	/**
	 * Alternative or secondary title of the comic.
	 */
	alternative_title: string;
	/**
	 * Year the comic was originally released.
	 */
	release_year: number;
	/**
	 * Synopsis or description providing an overview of the comic's story.
	 */
	description: string;
	/**
	 * Format or category of the comic (e.g., Manga, Manhwa, Manhua).
	 */
	type: ComicType;
	/**
	 * Current publication status of the comic (e.g., Ongoing, Completed).
	 */
	status: ComicStatus;
	/**
	 * ISO 3166-1 alpha-2 country code representing the comic's origin.
	 */
	country_code: string;
	/**
	 * Average user rating for the comic.
	 *
	 * Note: This value may not be reliable and can be manipulated.
	 */
	rating: number;
	/**
	 * List of artists who contributed to the comic.
	 */
	artists: string[];
	/**
	 * List of authors or writers of the comic.
	 */
	authors: string[];
	/**
	 * List of genres associated with the comic.
	 */
	genres: string[];
	/**
	 * Optional Path to the comic's thumbnail image.
	 */
	thumbnail: string | null;
	/**
	 * Name of the publisher responsible for the comic.
	 */
	publisher: string;
	/**
	 * Source or origin from which the comic's data was obtained.
	 */
	source: string;
	/**
	 * Total number of views the comic has received.
	 *
	 * Note: This value is not verified and may be inaccurate.
	 */
	views: number;
	/**
	 * Total number of times the comic has been marked as a favorite.
	 *
	 * Note: This value is not verified and may be inaccurate.
	 */
	favorites: number;
}
