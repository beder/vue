FROM node:11.13.0-slim

ARG APP_PORT

RUN npm i -g json-server

# Configure the main working directory. This is the base
# directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

EXPOSE $APP_PORT

USER node

# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
CMD ["json-server", "--host", "0.0.0.0", "--watch", "db.json"]
