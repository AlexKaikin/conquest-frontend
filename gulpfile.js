import gulp from 'gulp'; // основной модуль
import { path } from './gulp/config/path.js'; // импорт путей
import { plugins } from './gulp/config/plugins.js'; // импорт общих плагинов

global.app = { // передаём значения в глобальную переменную
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js'; // удалить файл из dist, если удалили из src
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { ghDeploy } from './gulp/tasks/ghPages.js';

function watcher() { // наблюдатель за изменениями в файлах
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprive }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle); // последовательная обработка шрифтов

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)); // основные задачи

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); // построение сценариев выполнения задач

const build = gulp.series(reset, mainTasks);

const deployZIP = gulp.series(reset, mainTasks, zip);

const deployFTP = gulp.series(reset, mainTasks, ftp);

const deployGh = gulp.series(reset, mainTasks, ghDeploy);

// экспорт сценартев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }
export { deployGh }

gulp.task('default', dev); // выполнение сценария по умолчанию