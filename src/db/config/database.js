const { get } = require('env-var');
require('dotenv').config();
const dialect = get('DATABASE_DIALECT').asString();
const host = get('DATABASE_HOST').required().asString();
const port = get('DATABASE_PORT').required().asPortNumber();
const username = get('DATABASE_USERNAME').required().asString();
const password = get('DATABASE_PASSWORD').required().asString();
const database = get('DATABASE_NAME').required().asString();

// flyDataBase
module.exports = {
	development: {
		dialect,
		host,
		port,
		username,
		password,
		database,
	},
	test: {
		dialect,
		host,
		port,
		username,
		password,
		database,
	},
	production: {
		dialect,
		host,
		port,
		username,
		password,
		database,
	},
};
