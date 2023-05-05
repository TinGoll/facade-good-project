# Используем официальный образ nginx
FROM nginx:1.21-alpine

# Копируем конфигурационный файл nginx в контейнер
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранный проект в директорию /var/www/html, где nginx ищет файлы
COPY ./facade-good/public/ /var/www/html/

# Открываем порт 80 для внешних соединений
EXPOSE 80

# Запускаем nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]