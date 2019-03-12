import './src/utils/theme.css';

export const onRouteUpdate = () => {
  // Load JS required for github cards
  if (document.querySelector('.github-card') !== null) {
    const cards = document.querySelectorAll('.github-card');
    console.log(cards);
    for (let card of cards) {
      const url = 'https://api.github.com/repos/' + card.dataset.user + '/' + card.dataset.repo

      fetch(url)
        .then(res => res.json())
        .then(data => {
          card.innerHTML = `
          <div class="card">
            <div class="main">
              <div class="user"><a href=${data.owner.html_url}><img class="avatar" src="${data.owner.avatar_url}" width="50" height="50"/></a>
                <div class="user-details">
                  <h3><a href="https://github.com/${data.full_name}" target="_blank">${data.name}</a></h3>
                  <p class="desc">${data.description || 'Visit the repo for more info...'}</p>
                </div>
              </div>
            </div>
            <div class="stats">
              <span class="summary">
              <span><b>${data.stargazers_count}</b> Stars</span> | 
              <span><b>${data.forks}</b> Forks</span>
              </span>
            </div>
          </div>
          <p class="card-caption">
            <a href=${card.dataset.url} target="_blank">${card.dataset.url}</a>
          </p>
          `;
        });
    }
  }

}