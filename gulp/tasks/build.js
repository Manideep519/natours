var gulp = require('gulp'),
useref = require('gulp-useref'),
uglify = require('gulp-uglify'),
gulpIf = require('gulp-if'),
cssNano = require('gulp-cssnano'),
del = require('del'),
runSequence = require('run-sequence');


gulp.task('useref', function(){
	console.log("running useref");
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpIf('*,.js', uglify()))
	.pipe(gulpIf('*.css', cssNano()))
	.pipe(gulp.dest('docs'))
});


gulp.task('clean:docs', function(){
	console.log("Deleting Old files");
	return del.sync('docs');
});


gulp.task('build', function(callback){
	console.log("Building assets");
	runSequence('clean:docs',
		['useref'],
		callback);
});