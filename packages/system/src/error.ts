/**
 * Base class for custom errors.
 * @extends {Error}
 */
class BaseError extends Error {
	constructor(name: string, message: string) {
		super(message);
		this.name = name;
	}
}

/**
 * Error thrown by the client.
 * @extends {BaseError}
 */
export class ClientError extends BaseError {
	/**
	 * Additional data associated with the error.
	 */
	public data?: unknown;
	constructor(message: string, data?: unknown) {
		super("ClientError", message);
		this.data = data;
	}
}

export class SystemError extends BaseError {
	constructor(message: string) {
		super("SystemError", message);
	}
}

export class CoreError extends BaseError {
	constructor(message: string) {
		super("CoreError", message);
	}
}
