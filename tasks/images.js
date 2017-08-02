/**
 * Gulp Image Task
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 */

module.exports = (gulp, config, argv, $) => {
  'use strict';
  return function() {
    let stream = gulp
      // Image sources
      .src(config.images.src)

      // Create response copies and compress
      .pipe($.responsive(
        config.images.responsive.config,
        config.images.responsive.global
      ))

      // Minimise images
      .pipe($.imagemin(config.imagemin.options))

      // Add hash to image files
      .pipe($.hash())

      // Save images to destination
      .pipe(gulp.dest(config.images.dest))

      // Create hash map of images
      .pipe($.hash.manifest('hash-images.json'))
      // Write has map to /data folder
      .pipe(gulp.dest('data'))
      .on('end', function() {
        $.util.log(
          'Images hash-map "hash-images.json" written to "/data" folder'
        );
      });

    return stream;
  };
};
