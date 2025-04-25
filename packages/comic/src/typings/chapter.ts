/**
 * Represents a single chapter within a comic series.
 *
 * This interface encapsulates all metadata and content references for a comic chapter,
 * including identification, ordering, statistics, and resource paths.
 */
export interface Chapter {
	/**
	 * Globally unique identifier for the chapter.
	 */
	chapter_id: string;
	/**
	 * Identifier of the parent comic to which this chapter belongs.
	 */
	comic_id: string;
	/**
	 * URL-friendly unique string for the chapter,
	 * typically derived from the chapter number (e.g., `chapter-1`).
	 */
	slug: string;
	/**
	 * Human-readable title of the chapter (e.g., `Chapter 1`).
	 */
	title: string;
	/**
	 * Numeric sequence of the chapter within the comic.
	 */
	chapter_number: number;
	/**
	 * ISO 8601 formatted date string indicating when the chapter was published.
	 *
	 * **Note**: This can't be trusted as the release date of the chapter,
	 */
	release_date: string;
	/**
	 * Optional path to the chapter's thumbnail image, or `null` if not available.
	 */
	thumbnail: string | null;
	/**
	 * Array of resource paths representing the chapter's content pages or images.
	 */
	contents: string[];
	/**
	 * Total number of times this chapter has been viewed.
	 *
	 * **Note**: This can't be trusted as the views of the chapter,
	 */
	views: number;
	/**
	 * Total number of times this chapter has been marked as a favorite.
	 *
	 * **Note**: This can't be trusted as the favorites of the chapter,
	 */
	favorites: number;
}
