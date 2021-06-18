const { src, dest, parallel, series, watch } = require('gulp');
const sync = require('browser-sync').create();
const del = require('del');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const csso = require('gulp-csso');
const webp = require('gulp-webp');
const svgStore = require('gulp-svgstore');
const ttf2woff2 = require('gulp-ttf2woff2');

//html

const html = () => {
  return src('src/*.html')
  .pipe(dest('dist/src/'))
  .pipe(sync.stream());
}

exports.html = html;

//styles

const styles = () => {
  return src('src/less/style.less')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(sourcemap.write('.'))
  .pipe(dest('dist/src/css/'))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(dest('dist/src/css/'))
  .pipe(sync.stream());
}

exports.styles = styles;

//scripts

const scripts = () => {
  return src('src/js/*.js')
  .pipe(concat('script.js'))
  .pipe(dest('dist/src/js/'))
  .pipe(sourcemap.init())
  .pipe(uglify())
  .pipe(rename('script.min.js'))
  .pipe(sourcemap.write('.'))
  .pipe(dest('dist/src/js/'))
  .pipe(sync.stream())
}

exports.scripts = scripts;

//images

const getMinImages = () => {
  return src('src/img/**/*')
    .pipe(newer('dist/src/img'))
    .pipe(imagemin())
    .pipe(dest('dist/src/img/'))
    .pipe(sync.stream())
}

exports.getMinImages = getMinImages;

const getWebp  = () => {
  return src('dist/src/img/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(dest('dist/src/img/'))
}

exports.getWebp = getWebp;

const getSvgSprite = () => {
  return src('dist/src/img/**/icon-*.svg')
    .pipe(svgStore(
    ))
    .pipe(rename('sprite.svg'))
    .pipe(dest('dist/src/img/'))
}

exports.getSvgSprite = getSvgSprite;

const images = series(
  getMinImages,
  // getWebp,
  getSvgSprite
);

exports.images = images;

//fonts

const getWoff2 = () => {
  return src('src/fonts/**/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('src/fonts/'))
}

exports.getWoff2 = getWoff2;


const fonts = () => {
  return src('src/fonts/**/*.woff2')
    .pipe(dest('dist/src/fonts/'))
};

exports.fonts = fonts;

//del

const cleanDist = () => {
  return del('dist/');
}

exports.cleanDist = cleanDist;

//server

const browserSync = (done) => {
  sync.init({
    server: {
      baseDir: 'dist/src'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//watcher

const watcher = () => {
  watch('src/**/*.html').on('change', html);
  watch('src/less/**/*.less', styles);
  watch('scr/js/*.js',  scripts);
  watch('src/img/src/**/*', images);
}

const build = series(
  cleanDist,
  html,
  fonts,
  images,
  scripts,
  styles
);

exports.build = build;

exports.default = series(html, fonts, styles, scripts, browserSync, watcher);


