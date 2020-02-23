import gulp from 'gulp';
import concat from 'gulp-concat';
import wrap from 'gulp-wrap';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import yargs from 'yargs';
import customizeBootstrap from 'gulp-customize-bootstrap';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';
import server from 'browser-sync';
import del from 'del';
import path from 'path';
import child from 'child_process';
import Dgeni from 'dgeni';
import historyApiFallback from 'connect-history-api-fallback';
import gulpNgConfig from 'gulp-ng-config';
import env from 'gulp-env';

const exec = child.exec;
const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  distDocs: './docs/build',
  docs: './docs/app/*.js',
  scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
  tests: `${root}/app/**/*.spec.js`,
  styles:  [`${root}/sass/*.scss`],
  templates: `${root}/app/**/*.html`,
  modules: [
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angularfire/dist/angularfire.js',
    'angular-loading-bar/build/loading-bar.min.js',
    'angular-cookies/angular-cookies.min.js',
    'checklist-model/checklist-model.js',
    'angular-utils-pagination/dirPagination.js'
  ],
  static: [
    `${root}/index.html`,
    `${root}/fonts/**/*`,
    `${root}/img/**/*`
  ]
};

if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    server.create();
}


gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('cleanDocs', cb => del(paths.distDocs + '**/**/*', cb));

gulp.task('templates', () => {
  return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: 'app',
      standalone: true,
      transformUrl: function (url) {
        return url.replace(path.dirname(url), '.');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], () => {
  return gulp.src(paths.modules.map(item => 'node_modules/' + item))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.dist + 'css/'));
});



gulp.task('compileBootstrap', function() {
  return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(customizeBootstrap('styles/scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('styles/'));
});

gulp.task('configuration', function () {
  var node_env = process.env.NODE_ENV;
  console.log("node_env: " + node_env);
  if (!node_env) {
    node_env = 'development'
  }
  gulp.src('config.json')
  .pipe(gulpNgConfig('admin.config', {
    environment: node_env
  }))
  .pipe(gulp.dest('src/app/config'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      `!${root}/app/**/*.spec.js`,
      `${root}/app/**/*.module.js`,
      ...paths.scripts,
      './templates.js'
    ])
    .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
//    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('serve', () => {

    var node_env = process.env.NODE_ENV;


    var port = 4000;

    if (node_env == 'production') {
      port = process.env.PORT;

       return server.init({
          files: [`${paths.dist}/**`],
          port: port,
          ghostMode: false,
          server: {
            baseDir: paths.dist,
            middleware: [ historyApiFallback() ]
          }
        });
    }


  return server.init({
    files: [`${paths.dist}/**`],
    port: port,
    server: {
      baseDir: paths.dist,
      middleware: [ historyApiFallback() ]
    }
  });
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', [
  'copy',
  'styles',
  'configuration',
  'serve',
  'watch'
]);

gulp.task('build', [
  'copy',
  'styles',
  'configuration',
  'scripts'
]);

gulp.task('production', [
  'copy',
  'scripts',
]);

gulp.task('copyDocs', () => {
  return gulp.src(paths.docs)
    .pipe(gulp.dest(paths.distDocs + '/src'));
});

gulp.task('dgeni', ['cleanDocs', 'copyDocs'], () => {
    var dgeni = new Dgeni([require('./docs/config')]);
    return dgeni.generate();
});
