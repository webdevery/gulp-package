Для npm:
    -загрузка зависимостей
        $ npm install


Для yarn:
    -загрузка зависимостей
        $ yarn

Общее
    -Для использования Тасков установите модуль gulp-cli глобально
        $ npm gulp-cli -g

    -Настройки тасков тут 
        ./gulpfile.js

    -Проект собираеться в папку
        ./app
        
    -Исходники проекта лежат в папке
        ./dist
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
                    из папки ./dist/static/fonts/
                    в папку ./app/fonts

            - pngSprite
                формирование спрайта из .png
                    из файлов ./dist/static/images/pngSprite/*.png
                    в файл ./app/images/sprite.png
            - svgSprite
                формирование спрайта из .svg
                    из файлов ./dist/static/images/svgSprite/*.png
                    в файл ./app/images/sprite.svg

            - scss
                минификация и объединение всех файлов стилей в 
                    ./app/css/style.css

            - libs-js
                минификация и объединение всех скриптов плагинов указанных в файле ./gulpfile.js в опциях в файл
                    ./app/js/libs.min.js

            - js
                преобразование скриптов проекта 
                    es6 => es5
                    в ./app/js/main.js

            - images
                сжатие изображений без потери качества
                    в папку ./app/images/

            - pug
                сборка страниц
                    ./app

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
