'use strict'
const os = require ('os')
module.exports = function () {
	const ifaces = os.networkInterfaces ()
	const ips = Object.values (ifaces).reduce ((x, y) => x.concat (y), [])
	for (let i = 0; i < ips.length; i++) {
		const details = ips[i]
		if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			return details.address
		}
	}
}