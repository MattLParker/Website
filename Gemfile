# frozen_string_literal: true

source "https://rubygems.org"


git_source(:github) { |MattLParker/Website| "https://github.com/#{repo_name}" }

gemspec

gem "html-proofer", "~> 5.0", group: :test

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:mingw, :x64_mingw, :mswin]

gem "github-pages", group: :jekyll_plugins