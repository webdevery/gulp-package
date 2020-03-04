let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSyns = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  pug = require("gulp-pug"),
  imageMin = require("gulp-imagemin"),
  spritesmith = require("gulp.spritesmith"),
  merge = require("merge-stream"),
  //svg2png = require("gulp-svg2png"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  babel = require("gulp-babel");

let opts = {
  app: {
    dir: "app/",
    images: this.dir + "images",
    fonts: this.dir + "fonts",
    js: this.dir + "js",
    css: this.dir + "css"
  },
  dist: {
    dir: "dist/",
    imgDir: this.dir + "static/images/",

    styles: this.dir + "scss/**/*.scss",
    js: this.dir + "scripts/*.js",
    fonts: this.dir + "static/fonts/*.ttf",
    images: this.imgDir + "*.*",
    svg: this.imgDir + "sprite/svg/*.*",
    sprite: this.imgDir + "sprite/*.png",
    pug: this.dir + "pages/*.pug",
    pugAll: this.dir + "pages/**/*.pug",

    svgTo: this.imgDir + "sprite",
    styleBase: this.dir + "scss/base/"
  },
  js: {
    libs: [
      "node_modules/jquery/src/jquery.js",
      "node_modules/fancybox/dist/js/jquery.fancybox.js",
      "node_modules/swiper/js/swiper.js"
    ]
  }
};

gulp.task("scss", function() {
  return gulp
    .src(opts.dist.styles)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest(opts.app.css))
    .pipe(browserSyns.reload({ stream: true }));
});

gulp.task("libs-js", function() {
  return gulp
    .src(opts.js.libs)
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(opts.app.js))
    .pipe(browserSyns.reload({ stream: true }));
});

gulp.task("js", function() {
  return gulp
    .src(opts.dist.js)
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest(opts.app.js))
    .pipe(browserSyns.reload({ stream: true }));
});

gulp.task("images", function() {
  return gulp
    .src(opts.dist.images)
    .pipe(imageMin())
    .pipe(gulp.dest(opts.app.images))
    .pipe(browserSyns.reload({ stream: true }));
});

gulp.task("ttf2woff2", function() {
  return gulp
    .src(opts.dist.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(opts.app.fonts));
});

/* gulp.task("svg2png", function() {
  return gulp
    .src(opts.dist.svg)
    .pipe(svg2png())
    .pipe(gulp.dest(opts.dist.svgTo));
}); */

gulp.task("sprite", function() {
  var spriteData = gulp
    .src(opts.dist.sprite) // путь, откуда берем картинки для спрайта
    .pipe(
      spritesmith({
        imgName: "sprite.png",
        cssName: "sprite.scss",
        cssFormat: "scss",
        algorithm: "binary-tree",
        cssVarMap: function(sprite) {
          sprite.name = "icon-" + sprite.name;
        }
      })
    );
  var cssStream = spriteData.css.pipe(gulp.dest(opts.dist.styleBase)); // путь, куда сохраняем стили
  var imgStream = spriteData.img.pipe(gulp.dest(opts.app.images)); // путь, куда сохраняем картинку

  return merge(imgStream, cssStream);
});

gulp.task("pug", function buildHTML() {
  return gulp
    .src(opts.dist.pug)
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(opts.app.dir))
    .pipe(browserSyns.reload({ stream: true }));
});

gulp.task("watch", function() {
  gulp.watch(opts.dist.styles, gulp.parallel("scss"));
  gulp.watch(opts.dist.js, gulp.parallel("js"));
  gulp.watch(opts.dist.pugAll, gulp.parallel("pug"));
  gulp.watch(opts.dist.images, gulp.parallel("images"));
  gulp.watch(opts.dist.sprite, gulp.parallel("sprite"));

  //gulp.watch(opts.dist.svg, gulp.parallel("svg2png"));
  gulp.watch(opts.dist.fonts, gulp.parallel("ttf2woff2"));
});

gulp.task("browser-sync", function() {
  browserSyns.init({
    server: {
      baseDir: opts.app.dir
    }
  });
});

gulp.task(
  "default",
  gulp.parallel(
    "scss",
    "libs-js",
    "js",
    "pug",
    "images",
    "sprite",
    "browser-sync",
    "watch"
  )
);
