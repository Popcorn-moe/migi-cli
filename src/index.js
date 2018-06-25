#!/usr/bin/env node
require('yargs')
	.usage('Usage: $0 <command> [options]')
	.demandCommand()
	.command(
		['serve', 'start', 'run'],
		'start the bot',
		yargs => {},
		({ token, dir }) => {
			const dotenv = require('dotenv')
			const { resolve, join } = require('path')
			const { default: serve } = require('./serve')

			dir = resolve(process.cwd(), dir || '')
			dotenv.config({ path: join(dir, '.env') })
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
