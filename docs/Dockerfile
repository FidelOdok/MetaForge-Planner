# MetaForge Documentation - Jekyll + Mermaid
FROM ruby:3.2-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

# Copy Gemfile
COPY Gemfile* ./

# Install Jekyll
RUN bundle install

# Copy site
COPY . ./

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
