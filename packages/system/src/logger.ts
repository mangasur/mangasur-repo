import chalk from "chalk";
import { basename } from "path";

type Chalk = (text: string) => string;

type LogLevel = "log" | "error" | "debug" | "warn" | "info";
type Message = string | object;

const getCallerInfo = () => {
	const stack = new Error().stack;
	if (!stack) {
		return { file: "unknown", line: 0 };
	}

	const stackLines = stack.split("\n");
	const callerLine = stackLines[3];
	const match = callerLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);

	if (!match) {
		return { file: "unknown", line: 0 };
	}

	const [, , filePath, line] = match;
	return { file: basename(filePath), line: Number(line) };
};

const formatMessage = (level: LogLevel, message: Message): string => {
	const { file, line } = getCallerInfo();
	const formattedMessage =
		typeof message === "string" ? message : JSON.stringify(message);
	return `[${level.toUpperCase()}] [${file}:${line}]: ${chalk.white(formattedMessage)}`;
};

const logWithColor = (level: LogLevel, color: Chalk, message: Message) => {
	console[level](color(formatMessage(level, message)));
};

const levels: Record<LogLevel, Chalk> = {
	log: chalk.green,
	error: chalk.red,
	debug: chalk.blue,
	warn: chalk.yellow,
	info: chalk.cyan,
};

const createLogger = () => {
	return Object.fromEntries(
		Object.entries(levels).map(([level, color]) => [
			level,
			(message: Message) => logWithColor(level as LogLevel, color, message),
		])
	) as Record<LogLevel, (message: Message) => void>;
};

export const Logger = createLogger();
