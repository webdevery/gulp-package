# Для npm:

1. загрузка зависимостей
   - `$ npm install`
2. сборка проекта
   - `$ npm build`
3. режим отслеживания изменений
   - `$ npm watch`
4. режим разработки(включает в себя 2 предыдущих + browser-sync)
   - `$ npm dev`

# Для yarn:

1. загрузка зависимостей
   - `$ yarn`
2. сборка проекта
   - `$ yarn build`
3. режим отслеживания изменений
   - `$ yarn watch`
4. режим разработки(включает в себя 2 предыдущих + browser-sync)
   - `$ yarn dev`

# Общее

1. Для использования Тасков установите модуль gulp-cli глобально

   - `$ npm gulp-cli -g`

2. Настройки тасков тут
    
    - `./gulpfile.js`

3. Сборка проекта
    - `$ gulp build`
    - `$ yarn build`
    - `$ npm build`
    -  в папку `./dist`

4. Исходники проекта лежат в папках

   - /app
     - |-data контент для pug
     - |-templates
     - | |-layouts шаблоны для pug
     - | |-mixins миксины для pug
     - | |-pages страницы проекта
     - |-scripts исходные файлы скриптов
     - |-scss исходные файлы стилей
     - | |-base подключение шрифтов, миксины, стили для спрайтов
     - |-static
       - |-fonts исходные файлы шрифтов
       - |-images изображения проекта (будут автоматически ужиматься и создаваться в ./app/images/)
       - |-pngSprite изображени .png формата для спрайта
       - | class"icon-file_name"
       - |
       - |-svgSprite изображени .svg формата для спрайта
         class"icon svg-file_name"

5. запуск сервера
    - `$ gulp dev`
    - `$ yarn dev`
    - `$ npm dev`

6. tasks

   1. для вызова таска пропишите
      `$ gulp имя_таска`

      - или если нет пакета gulp-cli
        `$ yarn gulp имя_таска`

   2. таски:

      - ttf2woff2

        - конвертация шрифтов ttf в woff2
          - из папки ./app/static/fonts/
          - в папку ./dist/fonts

      - pngSprite
        - формирование спрайта из .png
          - из файлов ./app/static/images/pngSprite/\*.png
          - в файл ./dist/images/sprite.png
      - svgSprite

        - формирование спрайта из .svg
          - из файлов ./app/static/images/svgSprite/\*.png
          - в файл ./dist/images/sprite.svg

      - scss

        - минификация и объединение всех файлов стилей в
          - ./dist/css/style.css

      - libs-js

        - минификация и объединение всех скриптов плагинов указанных в файле ./gulpfile.js в опциях в файл
          - ./dist/js/libs.min.js

      - js

        - оптимизация скриптов проекта средствами webpack
          - es6 => es5
          - в ./dist/js/main.js

      - images

        - сжатие изображений без потери качества
          - в папку ./dist/images/

      - pug

        - сборка страниц
          - ./dist

      - watch

        - запуск observer для контроля изменений в файлах и запуска необходимых тасков для пересборки проекта

      - browser-sync
        - запуск локального сервера, с автоперезагрузкой страницы при изменении проекта


        * При использовании команды
            `$ gulp`
            * будет выполнен список тасков
                * "scss",
                * "libs-js",
                * "js",
                * "pug",
                * "images",
                * "pngSprite",
                * "svgSprite",
                * "browser-sync",
                * "watch"

# Скрипты

1. Для оптимизации скриптов используеться webpack, благодаря этому есть возможность спользовать экспорты и импорты в js.

2. [Пишите свои скрипты в файле app/scripts/main.js](app/scripts/main.js)

3. Js-библиотеки устанавливаются через npm или yarn в папку node_modules
    * для подключения библиотеки к js-файлу используйте
        - `import $ from 'jquery';`;
        - `import {a, b} from 'название-папки-модуля-в-папке-node_modules';`;

# Стили

1. [Пишите свои стили в папке app/scss/](app/scss/)

2. Шрифты подключать в стилях НЕ НУЖНО, они подключаться сами и сконвертируються в base64

# Шрифты

1. Приведите все шрифты к виду `NAME-{font-weight}-{font-style}.{otf,ttf,woff,woff2}`
    * писать `{` и `}` НЕ НУЖНО
    * `font-weight` должен быть один из 100,200,300, 400,500,600, 700, 800,900. 
        * Вы также можете указать обычно используемое имя веса (за исключением `normal`), которое сопоставляется с одним из этих значений.
    * `font-style` должен быть одним из `normal`, `italic` или `oblique`.

    - Например 
        * Lato.woff
        * Lato-italic.woff
        * Lato-bold.woff
        * Lato-700.woff
        * Lato-thin-italic.woff
        * Lato-100-italic.woff

2. [Все шрифты должны лежать тут app/static/fonts/](app/static/fonts/)

# Изображения

1. [Тут должны лежать исходники изображений app/static/images/](app/static/images/)

2. папки `svgSprite` и `pngSprite` должны содержать исходники для формирования спрайтов

    * png-спрайты можно будет использовать прописав класс `icon-{file-name}`
    * svg-спрайты можно будет использовать прописав класс `svg-{file-name}`