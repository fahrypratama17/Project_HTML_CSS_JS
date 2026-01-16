const card = `          
                      <div class="anime-card">
                        <div class="anime-poster" style="background-image: url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpQEss6dHb6ub6eR-AREkCnAKdMeiNK2xGmpMytnI3nTHAbcWHJkxPVrd-DDnyu0pH5SSzEbdsGujUm9y2YFy4Z8Bq6hTrLawzcHWm6WyZTI9a7UStuHL7y-f3Q9MKzPMXrFZMeiYcAuE/s1600/Koe-no-Katachi-Anime-Visual.jpg')" ></div>
                        <div class="anime-info">
                          <div class="anime-info">
                            <div class="anime-title">Koe no Katachi</div>
                            <div class="anime-rating"><i class="fas fa-star"></i> 4.9</div>
                            <div class="anime-genres">Romance</div>
                          </div>
                        </div>
                      </div>
                    `

async function loadAnime() {
  const response = await fetch('https://api.jikan.moe/v4/top/anime');
  const data = await response.json();

  const grid = document.getElementById("animeGrid");
  grid.innerHTML = '';

  data.data.forEach((anime) => {
    const genres = anime.genres ? anime.genres.map ((g) => g.name).join(', ') : "";

    grid.innerHTML += `          
                      <div class="anime-card">
                        <div class="anime-poster" style="background-image: url('${anime.images.jpg.image_url}')" ></div>
                        <div class="anime-info">
                          <div class="anime-info">
                            <div class="anime-title">${anime.title}</div>
                            <div class="anime-rating"><i class="fas fa-star"></i> ${anime.score || 'N/A'}</div>
                            <div class="anime-genres">${genres}</div>
                          </div>
                        </div>
                      </div>
                    `;

    document.querySelectorAll('.anime-card').forEach((card) => {
      card.addEventListener('click', function() {
        const title = this.querySelector('.anime-title').textContent;
        alert(`Opening ${title}...`);
      })
    })
  });
}

document.querySelectorAll('.nav-tab').forEach((card) => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-tab').forEach()
  })
})

loadAnime();