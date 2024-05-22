@echo off

:: Перевірка, чи був переданий шлях для збереження
if "%1"=="" (
    echo Помилка: Вкажіть шлях для збереження.
    pause
    exit /b
)

:: Перевірка, чи існує вказана папка
if not exist "%1" (
    echo Помилка: Вказана папка не існує.
    pause
    exit /b
)

:: Введення даних для підключення до бази даних MongoDB
set mongo_uri="mongodb+srv://yanaibabak:MxUz1v307EHU7yNi@cluster0.jcntvne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

:: Виконання архівації бази даних MongoDB
if "%2"=="" (
    mongodump --uri="%mongo_uri%" --db=medical_center --out="%1"
) else (
    mongodump --uri="%mongo_uri%" --db=medical_center --collection="%2" --out="%1"
)
echo Архівація завершена.
pause