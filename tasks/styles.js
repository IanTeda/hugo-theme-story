/**
 * Gulp Task for JavaScript Files
 * @param {gulp} gulp - The gulp module passed in
 * @param {config} config - The projects Gulp config file
 * @param {argv} argv - Arguments flagged at the CLI
 * @param {$} $ - Lazy load plugins, save the imports at the start of the file
 * @return {stream} Stream - Task stream to manage Style Sheets in project
 */

module.exports = (gulp, config, argv, $) => {
  'use strict';
  return function() {
    let stream = gulp
      // CSS source files.
      .src(config.styles.src)

      // Concatenate css, since order is important
      .pipe($.concat(config.styles.filename))
      .pipe($.size({title: 'Style concatenated into one file:'}))

      // Apply PostCSS processors to the stream
      .pipe($.postcss(config.postcss.processors))
      .pipe($.size({title: 'postCSS:'}))

      // Write source maps for easier debugging, since we are concatenating
      .pipe($.sourcemaps.write('./'))
      .pipe($.size({title: 'Style source maps written:'}))

      // Add hash to concatenated script file
      .pipe($.hash())
      .on('end', function() {
        $.util.log('Hash added to concatenated styles');
      })

      // Write stream to drive
      .pipe(gulp.dest(config.styles.dest))

      // Create hash map of script
      .pipe($.hash.manifest('hash-styles.json'))
      .pipe(gulp.dest('data'))
      .on('end', function() {
        $.util.log(
          'Style hash-map "hash-styles.json" written to "/data" folder'
        );
      });

    return stream;
  };
};
