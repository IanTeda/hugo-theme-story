'use strict';

let autoprefixer = require('autoprefixer');
let cssnext = require('postcss-cssnext');
let lost = require('lost');
let magician = require('postcss-font-magician');
let mqpacker = require('css-mqpacker');
let pngquant = require('imagemin-pngquant');
let postImport = require('postcss-import');
let sprites = require('postcss-sprites');

const hstatic = 'static/';
const nodeModules = 'node_modules/';
const src = 'src/';

module.exports = {
  fonts: {
    extensions: '*.{eot,svg,ttf,woff,woff2,otf}',
    src: [
      nodeModules + 'font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
      src + 'fonts/**/*.{eot,svg,ttf,woff,woff2,otf}',
    ],
    dest: hstatic + 'fonts',
  },
  gulpLoadPlugins: {
    options: {
      // when set to true, the plugin will log info to console
      DEBUG: false,

      // the glob(s) to search for in package.json
      pattern: ['gulp-*', 'gulp.*', 'del', 'merge2', 'shelljs'],

      // if true, transforms hyphenated plugins names to camel case
      camelize: true,

      // whether the plugins should be lazy loaded on demand
      lazy: true,
    },
  },
  gzip: {
    options: {
      append: true,
    },
  },
  images: {
    extensions: '*.{png,gif,jpg}',
    src: src + 'images/**/*.{png,gif,jpg}',
    dest: hstatic + 'images',
    responsive: {
      config: {
        '*': [
          {
            width: 480,
            rename: {suffix: '-sm'},
            withoutEnlargement: true,
          }, {
            width: 480 * 2,
            rename: {suffix: '-sm@2x'},
            withoutEnlargement: true,
          }, {
            width: 675,
            withoutEnlargement: true,
          }, {
            width: 675 * 2,
            rename: {suffix: '@2x'},
            withoutEnlargement: true,
          },
        ],
      },
      global: {
        // Global configuration for all images
        // The output quality for JPEG, WebP and TIFF output formats
        quality: 70,
        // Use progressive (interlace) scan for JPEG and PNG output
        progressive: true,
        // Zlib compression level of PNG output format
        compressionLevel: 6,
        // Strip all metadata
        withMetadata: false,
        // Skip files that need enlargement
        errorOnEnlargement: false,
        // Don't spam the console
        silent: true,
      },
    },
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
    },
  },
  postcss: {
    processors: [
      autoprefixer({
        browsers: ['last 3 version'],
      }),
      cssnext,
      lost,
      magician,
      mqpacker,
      postImport,
      sprites,
    ],
  },
  scripts: {
    extensions: '*.js',
    filename: 'hasper.js',
    src: [
      nodeModules + 'jquery/dist/jquery.js',
      src + 'scripts/main.js',
    ],
    dest: hstatic + 'scripts',
  },
  styles: {
    extensions: '*.css',
    filename: 'hasper.css',
    src: [
      nodeModules + '/animate.css/animate.css',
      nodeModules + '/font-awesome/css/font-awesome.css',
      src + 'styles/screen.css',
    ],
    dest: hstatic + 'styles',
  },
  uglify: {
    options: {
    },
  },
};
