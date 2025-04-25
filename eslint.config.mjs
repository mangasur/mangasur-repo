import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import prettierLint from "eslint-config-prettier/flat";
import path from "path";
import tsLint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
	includeIgnoreFile(gitignorePath),
	...tsLint.configs.recommended,
	...compat.extends("plugin:prettier/recommended"),
	{
		rules: {
			"@typescript-eslint/no-namespace": "off",
			curly: ["error", "all"],
			"no-else-return": ["error", { allowElseIf: false }],
			camelcase: [
				"error",
				{
					properties: "never",
					ignoreDestructuring: false,
					ignoreImports: true,
					allow: ["^[a-z]+(_[a-z]+)+$"],
				},
			],
			quotes: ["error", "double", { avoidEscape: true }],
			semi: ["error", "always"],
			"space-before-function-paren": [
				"error",
				{
					anonymous: "always",
					named: "never",
					asyncArrow: "always",
				},
			],
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
					VariableDeclarator: { var: 1, let: 1, const: 1 },
					outerIIFEBody: 1,
					MemberExpression: 1,
					FunctionDeclaration: { parameters: 1, body: 1 },
					FunctionExpression: { parameters: 1, body: 1 },
					CallExpression: { arguments: 1 },
					ArrayExpression: 1,
					ObjectExpression: 1,
					ImportDeclaration: 1,
					flatTernaryExpressions: false,
					ignoreComments: false,
					ignoredNodes: ["ConditionalExpression"],
				},
			],
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					args: "after-used",
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"prettier/prettier": "warn",
		},
	},
	prettierLint,
];
