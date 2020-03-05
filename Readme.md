Для npm:
    -загрузка зависимостей
        $ npm install
    -сборка проекта
        $ npm build
    -режим отслеживания изменений
        $ npm watch
    -режим разработки(включает в себя 2 предыдущих + browser-sync)
        $ npm dev


Для yarn:
    -загрузка зависимостей
        $ yarn
    -сборка проекта
        $ yarn build
    -режим отслеживания изменений
        $ yarn watch
    -режим разработки(включает в себя 2 предыдущих + browser-sync)
        $ yarn dev
    

Общее
    -Для использования Тасков установите модуль gulp-cli глобально
        $ npm gulp-cli -g

    -Настройки тасков тут 
        ./gulpfile.js

    -Проект собираеться в папку
        ./dist
        
    -Исходники проекта лежат в папке
        ./app
            |-data              контент для pug
            |-templates
            | |-layouts         шаблоны для pug
            | |-mixins          миксины для pug
            | |-pages           страницы проекта
            |-scripts           исходные файлы скриптов
            |-scss              исходные файлы стилей
            | |-base            подключение шрифтов, миксины, стили для спрайтов
            |-static    
              |-fonts           исходные файлы шрифтов
              |-images          изображения проекта (будут автоматически ужиматься и создаваться в ./app/images/)
                |-pngSprite     изображени .png формата для спрайта
                |                   class"icon-file_name"
                |   
                |-svgSprite     изображени .svg формата для спрайта
                                    class"icon svg-file_name"
    
    -запуск сервера
        $ gulp
            если пакет gulp-cli не был установлен то
                $ yarn gulp

    -tasks
        -для вызова таска пропишите
            $ gulp имя_таска
                или если нет пакета gulp-cli
                    $ yarn gulp имя_таска

        -таски:

            - ttf2woff2
                конвертация шрифтов ttf в woff2
                    из папки ./app/static/fonts/
                    в папку ./dist/fonts

            - pngSprite
                формирование спрайта из .png
                    из файлов ./app/static/images/pngSprite/*.png
                    в файл ./dist/images/sprite.png
            - svgSprite
                формирование спрайта из .svg
                    из файлов ./app/static/images/svgSprite/*.png
                    в файл ./dist/images/sprite.svg

            - scss
                минификация и объединение всех файлов стилей в 
                    ./dist/css/style.css

            - libs-js
                минификация и объединение всех скриптов плагинов указанных в файле ./gulpfile.js в опциях в файл
                    ./dist/js/libs.min.js

            - js
                преобразование скриптов проекта 
                    es6 => es5
                    в ./dist/js/main.js

            - images
                сжатие изображений без потери качества
                    в папку ./dist/images/

            - pug
                сборка страниц
                    ./dist

            - watch
                запуск observer для контроля изменений в файлах и запуска необходимых тасков для пересборки проекта

            - browser-sync
                запуск локального сервера, с автоперезагрузкой страницы при изменении проекта


            -При использовании команды
                $ gulp
                    будет выполнен список тасков
                        "scss",
                        "libs-js",
                        "js",
                        "pug",
                        "images",
                        "pngSprite",
                        "svgSprite",
                        "browser-sync",
                        "watch"
