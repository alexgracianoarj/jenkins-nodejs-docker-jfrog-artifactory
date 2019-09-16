FROM node:latest
LABEL Maintainer="Alex Graciano"
LABEL Description="foo bar"

ENV NODE_ENV="qa"

COPY package.json /var/www/
COPY .env.qa /var/www/
COPY dist /var/www/dist/
COPY swagger /var/www/swagger/
COPY documentation /var/www/documentation/
COPY node_modules /var/www/node_modules/

WORKDIR /var/www/

ENTRYPOINT npm run prod
EXPOSE 3000