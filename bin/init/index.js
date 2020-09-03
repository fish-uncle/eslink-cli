const gulp = require ('gulp')
const path = require ('path')
const child_process = require ('child_process')

module.exports = () => {
	gulp.src (path.resolve (__dirname, '../../clone/**/*'))
		.pipe (gulp.dest (process.cwd ()))
		.on ('end', callback)

	function callback () {
		const GLOBALS_ENV = require ('../utils/env')
		GLOBALS_ENV ('development')
		const info = require ('../utils/info')
		const p = process.cwd ()
		child_process.exec (`cd ${p}&& npm install`, function (error, stdout, stderr) {
			info.support ()
			info.project ()
		})
		child_process.exec (`npm start`, function (error, stdout, stderr) {
		})
	}
}
