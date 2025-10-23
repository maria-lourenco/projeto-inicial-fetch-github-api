const screen ={
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class = "info"><img src = "${
              user.avatarUrl
            }" alt="Foto do usuário"/>
                <div class="data">
                <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p>
                <h4>Followers:${user.followers}  Following: ${user.following} </h4>
                </div>
                `
                
                let repositoriesItens = ''
                user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}"target="_blank">${repo.name}</a>
                  <div class = "repo-info">
                  ${repo.stargazers_count} |
                  ${repo.forks_count} |
                  ${repo.watchers_count} |
                  ${repo.language ?? "Não informado"}
                  </div>
                  </li>`)
                
                if(user.repositories.length > 0){
                  this.userProfile.innerHTML += `<div class="repositories section">
                  <h2>Repositórios</h2>
                  <ul>${repositoriesItens}</ul>
                  </div>`
                   
                }  
                //EVENTOS
               if (user.events && user.events.length > 0) {
      let eventsItens = '';
      user.events.forEach(event => {
        if (event.type === 'CreateEvent') {
          eventsItens += `<li>🆕 CreateEvent no repositório <strong>${event.repo.name}</strong></li>`;
        } else if (event.type === 'PushEvent') {
          const commits = event.payload?.commits
          ?event.payload.commits.map(commit => `• ${commit.message}`).join('<br>')
          :'sem mensagens de commit';

          eventsItens += `<li>📦 PushEvent no repositório <strong>${event.repo.name}</strong><br>${commits}</li>`;
        }
      });

      this.userProfile.innerHTML += `
        <div class="events section">
          <h2>Últimos eventos</h2>
          <ul>${eventsItens}</ul>
        </div>
      `;
    }
  },
    renderNotFound(){
            this.userProfile.innerHTML = "<h3>Usuário não encontrado.😥</h3>"
        }
}

export{screen}