import { join } from 'path'

export default function getMigiConf(dir) {
	return require(join(dir, 'package.json')).migi || {}
}
