let gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  cssnano = require("gulp-cssnano"),
  font2css = require("gulp-font2css").default,

  pug = require("gulp-pug"),
  getData = require("jade-get-data")("app/data"),

  imageMin = require("gulp-imagemin"),
  сacheFiles = require("gulp-cache-files"),
  spritesmith = require("gulp.spritesmith"),
  svgSprite = require("gulp-svg-sprites"),

  webpack = require("webpack-stream"),
  webpackConfig = require("./webpack.config.js"),
  errorHandler = require("gulp-error-handle"),
  gutil = require("gulp-util"),

  browserSyns = require("browser-sync"),
  concat = require("gulp-concat"),
  gulpCopy = require("gulp-copy"),
  clean = require("gulp-clean"),
  merge = require("merge-stream"),
  rename = require("gulp-rename"),
  filter = require("filter");

//конфигурации
let dirDist = "./dist/";
let dirApp = "./app/";
let dirDocs = "./docs/";
let _ = {
  dist: {
    images: dirDist + "images/",
    fonts: dirDist + "fonts/",
    js: dirDist + "js/",
    css: dirDist + "css/",
    out: "../",
  },
  fonts: {
    dir: dirApp + "static/fonts/",
    select: "**/*.{otf,ttf,woff,woff2}",
  },
  minImg: {
    dir: dirApp + "static/images/",
    select: "**/*"
  },
  sprite: {
    png: {
      dir: dirApp + "static/images/pngSprite/",
      select: "**/*.png"
    },
    svg: {
      dir: dirApp + "static/images/svgSprite/",
      select: "**/*.svg"
    }
  },
  pug: {
    dir: dirApp + "templates/",
    data: {
      dir: dirApp + "data/",
      select: "**/*.json",
    },
    select: {
      pages: "pages/*.pug",
      all: "**/*.pug",
    },
  },
  style: {
    base: dirApp + "scss/base/",
    dir: dirApp + "scss/",
    select: {
      conv: "*.scss",
      all: "**/*.scss",
    },
  },
  js: {
    select: "**/*.js",
    dir: dirApp + "scripts/",
    start: "index.js",
  },
};

///Работа со стилями
gulp.task("scss", function () {
  return gulp
    .src(_.style.dir + _.style.select.conv)
    .pipe(sass())
    .pipe(
      postcss([
        require("postcss-import"),
        require("autoprefixer"),
        require("postcss-discard-comments"),
      ])
    )
    .pipe(cssnano({ zIndex: false }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(_.dist.css))
    .pipe(browserSyns.reload({ stream: true }));
});

/////Работа со скриптами
const logError = function (err) {
  //gutil.log(err);
  this.emit("end");
};
gulp.task("js", function (callback) {
  gulp
    .src(_.js.dir + _.js.start)
    .pipe(webpack(webpackConfig))
    .pipe(errorHandler(logError))
    .pipe(gulp.dest(_.dist.js));

  callback();
});

/////Работа с картинками
gulp.task("images", function () {
  return gulp
    .src(_.minImg.dir + _.minImg.select, { read: false })
    .pipe(сacheFiles.filter("./cache/images.json"))
    .pipe(
      imageMin({
        verbose: true,
      })
    )
    .pipe(gulp.dest(_.dist.images))
    .pipe(сacheFiles.manifest())
    .pipe(browserSyns.reload({ stream: true }));
});
gulp.task("pngSprite", function () {
  var spriteData = gulp
    .src(_.sprite.png.dir + _.sprite.png.select) // путь, откуда берем картинки для спрайта
    .pipe(
      spritesmith({
        imgName: "../images/sprite.png",
        cssName: "pngSprite.scss",
        cssFormat: "scss",
        algorithm: "binary-tree",
        cssVarMap: function (sprite) {
          sprite.name = "icon-" + sprite.name;
        },
      })
    );
  var cssStream = spriteData.css.pipe(gulp.dest(_.style.base)); // путь, куда сохраняем стили
  var imgStream = spriteData.img.pipe(gulp.dest(_.dist.images)); // путь, куда сохраняем картинку

  return merge(imgStream, cssStream);
});
gulp.task("svgSprite", function () {
  return gulp
    .src(_.sprite.svg.dir + _.sprite.svg.select)
    .pipe(
      svgSprite({
        selector: "svg-%f",
        common: "svg-icon",
        cssFile: _.dist.out + _.style.base + "svgSprite.scss",
        svg: {
          sprite: "images/sprite.svg",
        },
        preview: false,
      })
    )
    .pipe(gulp.dest(dirDist));
});

/////Работа со шрифтами
gulp.task("font2css", function () {
  return gulp
    .src(_.fonts.dir + _.fonts.select)
    .pipe(font2css())
    .pipe(concat("fonts.css"))
    .pipe(gulp.dest(_.style.base))
});

/////Работа с шаблонами страниц
gulp.task("pug", function () {
  return gulp
    .src(_.pug.dir + _.pug.select.pages)
    .pipe(
      pug({
        data: { getData },
        pretty: true,
        wrapLineLength: 120,
        maxPreserveNewlines: 50,
      })
    )
    .pipe(gulp.dest(dirDist))
    .pipe(browserSyns.reload({ stream: true }));
});


gulp.task("watch", function () {
  //Стили и скрипты
  gulp.watch(_.style.dir + _.style.select.all, gulp.parallel("scss"));
  gulp.watch(_.js.dir + _.js.select, gulp.parallel("js"));

  //Сборка страниц из шаблонов
  gulp.watch(_.pug.dir + _.pug.select.all, gulp.parallel("pug"));
  gulp.watch(_.pug.data.dir + _.pug.data.select, gulp.parallel("pug"));

  //Сжатие картинок
  gulp.watch(_.minImg.dir + _.minImg.select, gulp.parallel("images"));

  //спрайты
  gulp.watch(
    _.sprite.png.dir + _.sprite.png.select,
    gulp.parallel("pngSprite")
  );
  gulp.watch(
    _.sprite.svg.dir + _.sprite.svg.select,
    gulp.parallel("svgSprite")
  );

  //конвертация
  gulp.watch(_.fonts.dir + _.fonts.select, gulp.parallel("font2css"));
});
gulp.task("browser-sync", function () {
  browserSyns.init({
    server: {
      baseDir: dirDist,
    },
  });
});


let clear = (dir) => {
  return gulp
    .src(dir, {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean())
}
gulp.task("clear-css", () => { return clear(dirDist + "css/") });
gulp.task("clear-js", () => { return clear(dirDist + "js/") });
gulp.task("clear-pages", () => { return clear(dirDist + "*.html") });
gulp.task("clear-сache", () => { return clear("./.cache/") });
gulp.task("clear-docs", () => { return clear(dirDocs) });
gulp.task("clear-build", gulp.parallel("clear-css", "clear-js", "clear-pages"));
gulp.task("clear-build-folder", () => { return clear(dirDist) });

gulp.task("copyDist", function () {
  return gulp.src(dirDist + "**/*").pipe(gulpCopy(dirDocs, { prefix: 1 }));
});


gulp.task("pre-scss", gulp.parallel("pngSprite", "svgSprite", "font2css"));
gulp.task("styles", gulp.series("pre-scss", "scss"));
gulp.task("build-start", gulp.parallel("styles", "js", "pug", "images"));
gulp.task("dev-tools", gulp.parallel("browser-sync", "watch"));

gulp.task("build", gulp.series("clear-build", "build-start"));
gulp.task("dev", gulp.series("build", "dev-tools"));
gulp.task("deploy", gulp.series("build", "clear-docs", "copyDist"));
gulp.task(
  "final-build",
  gulp.series("clear-сache", "clear-build-folder", "deploy")
);
gulp.task("default", gulp.parallel("dev"));
