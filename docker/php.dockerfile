ARG PHP_VERSION=7.4

FROM php:${PHP_VERSION}-cli AS php

ARG GID=1001
ARG UID=1001
ARG APP_ENV=dev

# Prevent Symfony Flex from generating a project ID at build time
ARG SYMFONY_SKIP_REGISTRATION=1

ENV APP_ENV=${APP_ENV}
ENV APP_PATH=/var/www/app

RUN apt update;
RUN apt install -y libzip-dev wget git unzip;

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions zip opcache intl

# Install Composer globally
ENV COMPOSER_ALLOW_SUPERUSER 1

RUN set -eux; \
    composer global require "symfony/flex" --prefer-dist --no-progress --no-suggest --classmap-authoritative;
ENV PATH="${PATH}:/root/.composer/vendor/bin:./vendor/bin"

RUN wget https://get.symfony.com/cli/installer -O - | bash


WORKDIR ${APP_PATH}

COPY composer.json composer.lock symfony.lock ./
RUN set -eux; \
    composer install --prefer-dist --no-autoloader --no-scripts --no-progress --no-suggest; \
    composer clear-cache

COPY . ./

RUN set -eux; \
    mkdir -p var/cache var/log; \
    composer dump-autoload --classmap-authoritative; \
    composer run-script post-install-cmd;

RUN addgroup --system --gid "$GID" appgroup; \
    adduser --system --ingroup appgroup --uid "$UID" --disabled-password appuser;

RUN mv /root/.symfony /home/appuser/.symfony
ENV PATH="/home/appuser/.symfony/bin:$PATH"

RUN chown -R $UID:$GID ${APP_PATH}; \
    chown -R $UID:$GID ${APP_PATH}/var; \
    chown -R $UID:$GID ${APP_PATH}/data; \
    chown -R $UID:$GID /home/appuser; \
    chmod +x bin/console; sync

USER $UID:$GID

EXPOSE 8000
CMD ["bash"]

