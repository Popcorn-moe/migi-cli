import Migi from '@popcorn.moe/migi'
import { blue, green, magenta } from 'chalk'
import getMigiConf from '../getMigiConf'
import getModules from './getModules'
import { error, warn } from './log'

export default function serve({ token, dir }) {
	console.log(blue(`Starting migi in directory ${`'${green.bold(dir)}'`}!`))
	const migi = new Migi({
		root: dir
	})

	const modules = getModules(getMigiConf(dir), dir)

	console.log(modules)

	Object.entries(modules).forEach(([mod, Module]) => {
		console.log(
			blue(
				`Starting module ${green.bold(Module.name)} from ${green.bold(
					`'${mod}'`
				)}!`
			)
		)
		migi.loadModule(Module)
	})

	migi.login(token).catch(e => error(e, 'Login error!'))

	migi.on('ready', () =>
		console.log(magenta(`Moe Moe Kyun ${green.bold('@' + migi.user.tag)}!`))
	)

	//catch exits
	process.on('exit', () => {
		migi.destroy()
	})

	//catch ctrl+c event and exit normally
	process.on('SIGINT', () => {
		process.exit(2)
	})

	//catch uncaught exceptions, and exit normally
	process.on('uncaughtException', err => {
		error(err, 'Uncaught exception... exiting program!')
		process.exit(99)
	})

	//catch rejected promises
	process.on('unhandledRejection', err => {
		error(err, 'Unhandled promise rejection!')
	})

	//catch warnings
	process.on('warning', warning => {
		warn(warning)
	})

	return migi
}
