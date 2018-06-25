import { red, white, yellow } from 'chalk'

export function error(e, message, ...args) {
	args.forEach(
		(arg, i) =>
			(message = message.replace('$' + i, '"' + white.bgRed(arg) + '"'))
	)
	console.error(red.bold(message))
	console.error(red.bold('Stack: ') + red((e && e.stack) || '' + e))
	console.error(red.italic.bold('Please fix me senpaiiii!'))
}

export function warn(message, ...args) {
	args.forEach(
		(arg, i) =>
			(message = message.replace('$' + i, '"' + white.bgYellow(arg) + '"'))
	)
	console.warn(yellow.bold('Warning: ') + yellow(message))
	console.warn(yellow.italic.bold('Notice me, senpai <3'))
}
