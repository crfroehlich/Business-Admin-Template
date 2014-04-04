gulp = require 'gulp' 
less = require 'gulp-less' 
autoprefixer = require 'gulp-autoprefixer' 
minifyCss = require 'gulp-minify-css' 
jshint = require 'gulp-jshint' 
uglify = require 'gulp-uglify' 
gutil = require 'gulp-util' 
imagemin = require 'gulp-imagemin' 
rename = require 'gulp-rename' 
clean = require 'gulp-clean' 
concat = require 'gulp-concat' 
notify = require 'gulp-notify' 
cache = require 'gulp-cache' 
livereload = require 'gulp-livereload' 
lr = require 'tiny-lr' 
plugins = require 'gulp-load-plugins'   
path = require 'path' 
gulpBowerFiles = require 'gulp-bower-files' 
wiredep = require 'wiredep' 
coffee = require 'gulp-coffee' 
coffeelint = require 'gulp-coffeelint' 
debug = require 'gulp-debug' 
inject = require 'gulp-inject' 
git = require 'gulp-git' 
bump = require 'gulp-bump' 
qunit = require 'gulp-qunit' 
header = require 'gulp-header' 
watch = require 'gulp-watch' 
plumber = require 'gulp-plumber' 
js2coffee = require 'gulp-js2coffee' 
changed = require 'gulp-changed'
server = lr()

pkg = require './package.json'

extended = [
  '/**'
  ' * <%= pkg.name %> - <%= pkg.description %>'
  ' * @version v<%= pkg.version %>'
  ' * @link <%= pkg.homepage %>'
  ' * @license <%= pkg.license %>'
  ' */'
  ''
].join('\n')

succint = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n'

paths =
  css: './src/css'
  js: './src/coffee'
  release: './dist'
  lib: './bower_components'
  less: './src/less'
  coffee: './src/coffee'
  src: './src'
  test: './test'
  img: './src/images'

files =
  css: './src/less/**/*.css'
  index: './dist/release.html'
  devIndex: './src/dev.html'
  testIndex: './test/test.html'
  testIndexCoffee: './test/test.coffee.html'
  js: './src/coffee/**/*.js'
  coffee: './src/coffee/**/*.coffee'
  less: './src/less/**/*.less'
  test: './test/**/*.coffee*/'
  img: './src/images/**/*'

gulp.task 'less', ->
  gulp.src files.less 
    .pipe concat 'complete.less'
    .pipe header extended, pkg: pkg
    .pipe gulp.dest './dist'
    .pipe less sourceMap: true
    .pipe header extended, pkg: pkg
    .pipe gulp.dest './dist'
    .pipe rename suffix: '.min'
    .pipe minifyCss processImport: false
    .pipe gulp.dest './dist'
    .pipe notify message: 'LESS to CSS conversion complete.'
    .on 'error', gutil.log
  return

gulp.task 'css', ->
  gulp.src [
    './src/css/**/*.css' 
    './src/icon/glyphsrc/icon/css/glyphsrc/**/*.css'
    './src/icon/pictosrc/icon/css/picto.css'
    ] 
    .pipe concat 'addon.css'
    .pipe header extended, pkg: pkg
    .pipe gulp.dest './dist'
    .pipe rename suffix: '.min'
    .pipe minifyCss processImport: false
    .pipe gulp.dest './dist'
    .pipe notify message: 'Add-On CSS compilation complete.'
    .on 'error', gutil.log
  return

gulp.task 'img', ->
  gulp.src files.img
    .pipe changed './dist/images'
    .pipe imagemin optimizationLevel: 5
    .pipe gulp.dest './dist/images'
    .on 'error', gutil.log

# Inject JS & CSS Files
gulp.task 'inject', ->
  
  #Inject into dev.html
  gulp.src './src/dev2.html'
    .pipe inject(gulp.src([
      
      './src/less/**/*.css'
      './src/css/**/*.css'
      './src/js/**/*.js'
      './src/icon/glyphsrc/icon/css/glyphsrc/**/*.css'
      './src/icon/pictosrc/icon/css/picto.css'
    ],
      read: false), # Not necessary to read the files (will speed up things), we're only after their paths
   
      addRootSlash: false
      addPrefix: '..')
    .pipe gulp.dest paths.src
    .pipe notify message: 'dev.html includes dynamically injected.'
    .on 'error', gutil.log
  
  #Inject into test.html
  gulp.src './test/test.html'
    .pipe inject(gulp.src([
      './src/coffee/**/*.js'
      './src/less/**/*.css'
      './src/css/**/*.css'
      './src/js/**/*.js'
      './test/**/*.js*/'
      ],
      read: false), # Not necessary to read the files (will speed up things), we're only after their paths
   
      addRootSlash: false
      addPrefix: '..')
    .pipe gulp.dest paths.test
    .pipe notify message: 'test.html includes dynamically injected.'
    .on 'error', gutil.log
  
  #Inject into release.html
  gulp.src './dist/release.html'
    .pipe inject(gulp.src(['./dist/**/*.min.*'], read: false), # Not necessary to read the files (will speed up things), we're only after their paths
   
      addRootSlash: false
      addPrefix: '../../docdata')
    .pipe gulp.dest paths.release
    .pipe notify message: 'release.html includes dynamically injected.'
    .on 'error', gutil.log
  
  return


# Compile and Minify CoffeeScript
gulp.task 'coffee', ->
  gulp.src files.coffee
    .pipe coffee map: true
    .pipe concat 'complete.js'
    .pipe header extended, pkg: pkg
    .pipe gulp.dest paths.release
    .pipe rename suffix: '.min'
    .pipe uglify()
    .pipe header succint, pkg: pkg
    .pipe gulp.dest paths.release
    .pipe notify message: 'CoffeeScript to JS compilation complete.'
    .on 'error', gutil.log
  return

# Compile and Minify JS
gulp.task 'js', ->
  
  gulp.src './src/**/*.js'
    .pipe concat 'addon.js'
    .pipe header extended, pkg: pkg
    .pipe gulp.dest paths.release
    .pipe rename suffix: '.min'
    .pipe uglify()
    .pipe header succint, pkg: pkg
    .pipe gulp.dest paths.release
    .pipe notify message: 'JS compilation complete.'
    .on 'error', gutil.log
  return

###
Inject bower dependencies
###
gulp.task 'init', ->
  wiredep
    directory: './bower_components'
    bowerJson: require('./bower.json')
    src: './dist/release.html'
    exclude: [/require/]

  wiredep
    directory: './bower_components'
    bowerJson: require('./bower.json')
    src: './src/dev2.html'
    exclude: [/require/]

  wiredep
    directory: './bower_components'
    bowerJson: require('./bower.json')
    src: './test/test.html'
    exclude: [/require/]

  return

###
 Bump the version in bower and package json
###
gulp.task 'bumpVersion', ->
  gulp.src([
    './package.json'
    './bower.json'
  ])
  .pipe bump()
  .pipe gulp.dest './'
  .pipe notify message: 'Version bumped to ' + pkg.version + '.'
  .on 'error', gutil.log
  return

# Init watch
gulp.task 'watch', ->
  
  gulp.watch './src/**/*', [
    'compile'
  ]
  return

gulp.task 'test', ->
  gulp.src './test/test.html'
    .pipe qunit()

gulp.task 'compile', [
  'less'
  'css'
  'img'
  'coffee'
  'js'
  'inject'
  'init'
]

gulp.task 'build', [
  'compile'
  'watch'
]

gulp.task 'default', ['build']
