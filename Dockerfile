FROM node:11.13.0-slim

ARG APP_PORT

RUN apt-get -y update \
	&& apt-get install -y git

RUN npm i -g @vue/cli

# Configure the main working directory. This is the base
# directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN apt-get autoremove -y \
    && apt-get autoclean -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

EXPOSE ${APP_PORT}

USER node

# The main command to run when the container starts. Also
# tell the Rails dev server to bind to all interfaces by
# default.
CMD ["npm", "run", "serve"]
