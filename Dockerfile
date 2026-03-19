FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev zip \
    && docker-php-ext-install zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# Copy project
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

# Fix permissions
RUN chmod -R 777 storage bootstrap/cache

# Expose port
EXPOSE 10000

# ✅ Run artisan at runtime (NOT build time)
CMD php artisan config:clear && \
    php artisan cache:clear && \
    php artisan config:cache && \
    php -S 0.0.0.0:10000 -t public
