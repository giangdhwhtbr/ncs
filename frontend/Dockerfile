FROM node:alpine as build-stage

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY nginx.conf .
RUN yarn install

# Arguments
ARG VITE_REACT_APP_API_URL
# Set environment variables
ENV VITE_REACT_APP_API_URL $VITE_REACT_APP_API_URL

COPY . .

RUN yarn build

# production-stage
FROM nginx:alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx.conf /etc/nginx/

EXPOSE 80

CMD ["nginx",  "-g", "daemon off;"]
