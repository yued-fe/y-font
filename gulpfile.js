'use strict'

const path = require('path');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', function() {
	nodemon({
		script: 'index.js',
		nodeArgs: ['--harmony'],
		ext: 'js html',
        watch: [
            path.join('./**/*.js'), // 监听Yworkflow目录
        ],
		env: {
			'NODE_ENV': 'development'
		}
	})
})

gulp.task('default', ['start']);