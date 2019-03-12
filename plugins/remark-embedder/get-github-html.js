const { URL } = require('url');

function shouldTransform(string) {
  return getUrl(string) !== null;
}

function getUrl(string) {
  if (!string.includes('github')) {
    return null;
  }
  if (!string.startsWith('http')) {
    string = `https://${string}`;
  }
  let url;
  try {
    url = new URL(string);
  } catch (error) {
    return null;
  }
  if (!url.host.endsWith('github.com')) {
    return null;
  }
  return url;
}

function getGithubHTML(string) {
  const matcher = string.match(/(https:\/\/w?w?w?.?github.com\/(.*?)\/([^/]*)\/?.*$)/);
  if (matcher) {
    return `<div class="gh-card-wrap"><div class="github-card" data-user="${matcher[2]}" data-repo="${matcher[3]}" data-url="${matcher[1]}"> <span class="loading"/></div></div>`;
  }
  return 'not matched';
}

module.exports = getGithubHTML;
module.exports.shouldTransform = shouldTransform;