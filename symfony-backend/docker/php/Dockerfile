# Usamos una imagen oficial de PHP (versión 8.2) ligera (Alpine)
FROM php:8.2-alpine

# Copiamos Composer (gestor de paquetes de PHP) desde su imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Variables de entorno para las dependencias de 'phpsize' (para compilar)
ENV PHPIZE_DEPS autoconf dpkg-dev dpkg file g++ gcc libc-dev make pkgconf re2c

# Instalamos las dependencias del sistema operativo
# 'apk' es el gestor de paquetes de Alpine (como 'apt' en Ubuntu)
RUN apk add --no-cache \
    $PHPIZE_DEPS \
    icu-dev \
    libzip-dev \
    libpq-dev \
    # ---- CORRECCIÓN AQUÍ ----
    # Añadimos 'postgresql-client' que contiene 'pg_isready'
    postgresql-client \
    # -------------------------
    # Dependencias para Symfony CLI (¡muy importante!)
    curl \
    git \
    # Dependencias para otras extensiones
    zlib-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libsodium-dev \
    oniguruma-dev \
    libxml2-dev

# Instalamos las "extensiones" de PHP que Symfony necesita.
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    intl \
    zip \
    gd \
    sodium \
    mbstring \
    exif

# 'opcache' es una extensión que viene con PHP pero necesita ser "activada"
RUN docker-php-ext-enable opcache

# Instalamos el Symfony CLI (la herramienta de comandos de Symfony)
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | sh
RUN apk add symfony-cli

# Establecemos el directorio de trabajo DENTRO del contenedor
WORKDIR /var/www/app

# Por defecto, el contenedor no hace nada.
CMD ["php", "-a"]