const path = require('path')
module.exports = {
	dev: {
		template: path.join(__dirname, 'src/index-dev.html')
	},
	test: {
		template: path.join(__dirname, 'src/index-test.html')
	},
	prod: {
		template: path.join(__dirname, 'src/index-prod.html')
	},
}