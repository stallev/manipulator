# land_starter - Front-end Starter Template

The `land_starter` repository is a front-end starter template designed for rapid development of landing pages. It utilizes [Gulp.js](https://gulpjs.com/) as its task runner to automate various development and production tasks. Use **Node.js 22.x**.

## Project Structure

The project's directory structure is organized as follows:

- `assets/`: Holds all asset files such as fonts, images, JavaScript, and SCSS.
- `templates/`: Includes Nunjucks templates for HTML generation.
- `index.html`: The main HTML file.
- `build/`: The output directory where production-ready files are generated.
- `gulpfile.js`: Defines Gulp tasks for automating development workflows.
- `package.json`: Lists project dependencies and scripts.

## CSS Methodology and Structure

This project follows the [BEM (Block, Element, Modifier)](https://en.bem.info/methodology/) methodology for naming HTML element classes. Styles for individual blocks are organized in separate SCSS files within the `src/assets/scss/components` directory.

## Best Practices for Styling Components

To ensure maintainable and scalable CSS, follow these best practices when styling components:

- **Modular SCSS Files**: Create a separate SCSS file for each BEM block in `src/assets/scss/components/`. For example, a button component should have its own `button.scss` file.
- **Consistent Naming**: Use lowercase letters and hyphens for class names (e.g., `.header-nav__item--active`). Avoid underscores or camelCase.
- **Avoid Deep Nesting**: Limit SCSS nesting to 2-3 levels to prevent overly specific selectors and improve readability.
- **Use Variables**: Define colors, font sizes, and other reusable values in `src/assets/scss/_variables.scss` to ensure consistency and ease of updates.
- **Responsive Design**: Utilize relative units (`rem`, `vw`, `%`) and media queries to ensure components are responsive. Group media queries automatically using `gulp-group-css-media-queries`.
- **Minimize !important**: Avoid using `!important` unless absolutely necessary, as it can complicate debugging and maintenance.
- **Leverage Mixins**: Use SCSS mixins in `src/assets/scss/_mixins.scss` for repetitive patterns like flexbox layouts or transitions.
- **Commenting**: Add clear comments to document complex styles or sections, e.g., `// Header navigation styles`.

## Guidelines for Writing JavaScript

To maintain clean, efficient, and modular JavaScript code, adhere to the following guidelines:

- **Modular Structure**: Organize JavaScript code into separate files within `src/assets/js/` based on functionality (e.g., `nav.js`, `slider.js`). Each file should handle a specific feature or component.
- **ES6+ Syntax**: Use modern JavaScript features like arrow functions, destructuring, and `const`/`let` for variable declarations. The `gulp-babel` task ensures compatibility with older browsers.
- **Avoid Global Scope Pollution**: Wrap code in immediately invoked function expressions (IIFE) or use ES6 modules to prevent global variable conflicts.
- **Event Delegation**: Use event delegation for dynamic elements to improve performance, e.g., attach a single event listener to a parent element instead of multiple child elements.
- **Error Handling**: Implement try-catch blocks for asynchronous operations or critical functions to prevent runtime errors from breaking the application.
- **Code Comments**: Add concise comments to explain the purpose of functions or complex logic, e.g., `// Initialize slider with custom options`.
- **Optimize Performance**: Minimize DOM manipulations and use debouncing/throttling for events like `scroll` or `resize`.
- **Consistent Formatting**: Follow a consistent code style (e.g., 2-space indentation) and use tools like ESLint (optional setup) to enforce standards.
- **File Naming**: Use descriptive, lowercase file names with hyphens (e.g., `form-validation.js`) to align with project conventions.

## 📦 Key NPM Packages

The project leverages several NPM packages to streamline development:

### Gulp and Plugins
- `gulp`: The core task runner.
- `gulp-sass`: Compiles SCSS to CSS.
- `gulp-sass-glob`: Enables glob imports in SCSS.
- `gulp-group-css-media-queries`: Groups media queries.
- `gulp-clean-css`: Minifies CSS files.
- `gulp-postcss` & `autoprefixer`: Adds vendor prefixes to CSS.
- `gulp-concat`: Concatenates files.
- `gulp-uglify`: Minifies JavaScript files.
- `gulp-babel`: Transpiles ES6+ JavaScript.
- `gulp-nunjucks-render`: Renders Nunjucks templates.
- `gulp-rename`: Renames files.
- `gulp-sourcemaps`: Generates source maps.
- `gulp-replace`: Performs string replacements.
- `gulp-plumber`: Prevents pipe breaking caused by errors.
- `browser-sync`: Live-reloads the browser during development.
- `gulp-svgstore` & `gulp-svgmin`: Optimizes and combines SVGs into a sprite.
- `gulp-imagemin`: Optimizes image files.
- `gulp-webp` & `imagemin-optipng`: Converts images to WebP format and optimizes PNG images.

### Others
- `del`: Deletes files and directories.

## ⚙️ Gulp Build Process

The `gulpfile.js` defines a series of tasks to automate the build process:

### Styles
Compiles SCSS files into minified CSS, adds vendor prefixes, groups media queries, and generates source maps.

```javascript
function styles() {
  return gulp.src(paths.assets + 'scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(groupMediaQueries())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.build + 'css/'))
    .pipe(gulp.dest(paths.wp + 'css/'));
}
```

### Scripts
Transpiles ES6 JavaScript using Babel, concatenates, and outputs to the build directory.

```javascript
function scripts() {
  return gulp.src(paths.assets + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
    .pipe(gulp.dest(paths.wp + 'js/'));
}
```

### HTML
Processes Nunjucks templates and outputs HTML files to the build directory.

```javascript
function htmls() {
  return gulp.src(paths.src + '*.html')
    .pipe(plumber())
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(nunjucksRender({path: paths.src + 'templates'}))
    .pipe(gulp.dest(paths.build));
}
```

### Images
Optimizes images using `imagemin-optipng`.

```javascript
function images() {
  return import('gulp-imagemin').then(imageminModule => {
    const imagemin = imageminModule.default;
    return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png,gif,svg,ico}')
      .pipe(imagemin([imageminOptipng({ optimizationLevel: 10 })]))
      .pipe(gulp.dest('build/img'))
      .pipe(gulp.dest(paths.wp + 'img/'));
  });
}
```

### WebP Conversion
Converts images to WebP format.

```javascript
function toWebp() {
  return import('gulp-webp').then(webpModule => {
    const webp = webpModule.default;
    return gulp.src(paths.assets + 'img/**/*.{jpg,jpeg,png}')
      .pipe(webp())
      .pipe(gulp.dest('build/img'));
  });
}
```

### SVG Sprite
Minifies SVG files and combines them into a single sprite.

```javascript
function svgSprite() {
  return gulp.src(paths.assets + 'svg/*.svg')
    .pipe(svgmin({ plugins: [{ cleanupIDs: { minify: true } }] }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite-svg.svg'))
    .pipe(gulp.dest(paths.build + 'img/'));
}
```

### Watch and Serve
Watches for file changes and reloads the browser using BrowserSync.

```javascript
function watch() {
  gulp.watch(paths.assets + 'scss/**/*.scss', styles);
  gulp.watch(paths.assets + 'js/**/*.js', scripts);
  gulp.watch(paths.src + '**/*.html', htmls);
}

function serve() {
  browserSync.init({ server: { baseDir: paths.build } });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}
```

### Clean
Deletes the build and WordPress theme directories.

```javascript
async function clean() {
  const delModule = await import('del');
  return delModule([paths.build, paths.wp]);
}
```

### Build and Default Tasks
Defines the main build and default tasks.

```javascript
gulp.task('build', gulp.series(
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, images, toWebp, svgSprite)
));

gulp.task('default', gulp.series(
  gulp.parallel(styles, scripts, scriptsVendors, jsLibs, htmls, images, toWebp, svgSprite),
  gulp.parallel(watch, serve)
));
```

## 🚀 Getting Started

### Install Dependencies
Run the following command to install all necessary packages:

```bash
npm install
```

### Start Development Server
Start the development server with live reloading:

```bash
gulp
```

### Build for Production
Generate production-ready files:

```bash
gulp build
```