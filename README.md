# gulp-starter-kit

## Introduction

Additional Information:
1. Included Bootstrap 4 (2018)
```
npm install bootstrap --save-dev
```
2. Included Font Awesome (2018)
```
npm install font-awesome --save-dev
```

This repo mainly uses [Bootstrap](https://getbootstrap.com/) and [Font Awesome](https://fontawesome.com/).

Please feel free to replace them if you're after other resources, such as:

###### Front-End Frameworks
- [Pure](http://purecss.io/)
- [Foundation](https://foundation.zurb.com/)
- [Materialize](https://materializecss.com/)
###### Fonts
- [Ionicons](http://ionicons.com/)
- [Symbolset](https://symbolset.com/icons)
- [Fontello](http://fontello.com/)
- [Modern Pictograms](http://thedesignoffice.org/project/modern-pictograms)
- [Typicons](http://typicons.com/)
- [Foundation icon fonts](http://zurb.com/playground/foundation-icons)
- [Pictonic](https://pictonic.co/)
- [Pictos](http://pictos.cc/classic/font)

## Usage / Useful gulp task commands

### 1. Clone repo
```
git clone https://github.com/brifiction/gulp-starter-kit.git
cd gulp-starter-kit
```

### 2. Install all dependencies (make sure nodejs with npm is installed on your machine)
```
npm install
```

### 3. Run default gulp task (will open browser window with live reload - using browser-sync)
```
gulp
```

## Build

File structure should look like this:
```
.
+-- dist
+-- node_modules
+-- src
|   +-- css
|   +-- fonts
|   +-- js
|   +-- pages
|   +-- scss
|   +-- templates
|   |   +--macros
|   |   +--partials
|   +-- videos
+-- index.html
+-- ...
+-- ...
+-- ...
+-- ...
+-- .gitignore
+-- gulpfile.js
+-- package.json
+-- README.md
```

To build the production version of your project, run __gulp build__ or __node build__ from the main repo.

### Additional Notes:

Run __gulp bootstrap-sass__ only __once__, to bring all bootstrap sass files from node_modules.

To use nunjucks, run manually __gulp nunjucks__ in a separate / same terminal being used.

If you're not a fan of nunjucks, you can always remove it. The file structure will have to change as well, removing 'templates', 'partials' and 'macros'.

## Other Manual Builds

For reference, the three main tasks currently being used below are as explained via comments

Clean and reset for each build / watch, used in 'build' gulp task.
This is to clear all dist files.
```
gulp.task('clean', function() {
  return del([config.dist]);
});
```

For command 'gulp build' - running 'html', 'js', 'css', 'img' gulp tasks with 'clean'
```
gulp.task('build', function() {
  sequence('clean', ['html', 'js', 'css', 'img', 'videos']);
});
```

For command 'gulp' and using 'serve' task
```
gulp.task('default', ['serve', 'fonts']);
```

Used with command 'gulp' where the Gulp + Browsersync + SASS reloads for each change
'serve' = 'watch' for most gulp developers (i think - its just the name of gulp task)
```
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: config.src
  });

  gulp.watch([config.htmlin, config.jsin], ['reload']);
  gulp.watch(config.scssin, ['sass']);
});
```

## List of npm packages used

- gulp
- bootstrap
- browser-sync
- gulp-sass
- gulp-sourcemaps
- gulp-autoprefixer
- gulp-clean-css
- gulp-uglify
- gulp-concat
- gulp-imagemin
- gulp-changed
- gulp-html-replace
- gulp-htlmin
- del
- run-sequence
- gulp-nunjucks-render
- gulp-data
