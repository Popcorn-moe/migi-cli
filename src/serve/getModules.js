import { join } from 'path'

export default function getModules({ modules } = {}, dir) {
	if (!modules || !modules.length) return {}

	return modules
		.map(mod => {
			const Module = require(join(dir, 'node_modules', mod))
			return [mod, Module]
		})
		.reduce((obj, [k, v]) => ((obj[k] = v), obj), {})
}
