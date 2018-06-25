#!/usr/bin/env node
require('yargs')
	.usage('Usage: $0 <command> [options]')
	.demandCommand()
	.command(
		['serve', 'start', 'run'],
		'start the bot',
		yargs => {},
		({ token, dir = process.cwd() }) => {
			const dotenv = require('dotenv')
			const { default: serve } = require('./serve')

			dotenv.config({ path: dir })
			token = process.env.DISCORD_TOKEN

			if (!token)
				throw new Error(
					'You must specify a token using the DISCORD_TOKEN var in env or in .env file or using the --token option.'
				)

			serve({ token, dir })
		}
	)
	.option('token', {
		alias: 't',
		desc:
			'Specify a token (defaults to DISCORD_TOKEN var in env or in .env file)'
	})
	.option('dir', {
		alias: 'd',
		desc: 'Specify a directory (defaults to current working directory)'
	}).argv
