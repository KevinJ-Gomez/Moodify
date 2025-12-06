# Usamos una imagen oficial de PHP (versión 8.2) ligera (Alpine)
FROM php:8.2-alpine

# Copiamos Composer (gestor de paquetes de PHP) desde su imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Variables de entorno para las dependencias de compilación
ENV PHPIZE_DEPS autoconf dpkg-dev dpkg file g++ gcc libc-dev make pkgconf re2c

# Instalamos las dependencias del sistema operativo
RUN apk add --no-cache \
    $PHPIZE_DEPS \
    icu-dev \
    libzip-dev \
    libpq-dev \
    postgresql-client \
    git \
    bash \
    zlib-dev \
    libpng-dev \
    libxml2-dev

# Instalamos las extensiones de PHP necesarias para Symfony
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    intl \
    zip \
    gd \
    opcache

# Activamos opcache para mejor rendimiento
RUN docker-php-ext-enable opcache

# Establecemos el directorio de trabajo DENTRO del contenedor
WORKDIR /var/www/app

# Comando por defecto (aunque docker-compose lo sobrescribe, es buena práctica)
CMD ["php", "-a"]