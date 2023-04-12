const clientId = `081ec8649e04484db985e59036fcf95e`;
const clientSecret = `1402946e78e746df914faa147cefd6c1`;

let _data = [];

const getToken = async (clientId, clientSecret) => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  })

  const data = await result.json();
  return data.access_token;
}

const loadData = async (clientId, clientSecret) => {
  const token = await getToken(clientId, clientSecret);
  const categories = await getCategory(token);

  _data = await Promise.all(
    categories.map(async (category) => {
      let playlistData = await getPlaylistByCategory(token, category.id);
      playlistData = await Promise.all(
        playlistData.map(async (playlist) => {
          const trackData = await getTracksByPlaylist(token, playlist.tracks.href);
          const tracks = trackData.map(({ track: { name, artists, external_urls: { spotify } } }) => {
            return {
              name,
              artist: artists.map((artist) => artist.name).join(", "),
              url: spotify,
            };
          });
          return {...playlist, tracks};
        })
        
      );  
      return { ...category, playlistData };
    })
  )
}

const renderData = (filterTerm) => {
  let source = _data;

  if (filterTerm) {
    console.log(filterTerm);
    const term = filterTerm.toLowerCase();
    source = source.filter(({ name }) => {
      console.log(name.toLowerCase().includes(term));
      return name.toLowerCase().includes(term);
    });
  }

  const root = document.getElementById(`root`);
  const html = source.reduce((acc, { name, icons: [icon], playlistData }) => {
    const playlists = playlistData.map(({ name, external_urls: { spotify }, images: [image], tracks }) =>
      `<li>
                  <a href="${spotify}" alt="${name}" target="_blank">
                      <img src="${image.url}" width="180" height="180" />
                  </a>
                  <details>
                  <summary>Tracks</summary>
                  <div>
                    <ol class="tracks">${getTrackList(tracks)}</ol>
                  </div>
                </details>
              </li>`
    ).join(``);
    if (playlistData) {
      return (
        acc +
        `
                <article class="category-card">
                    <div class="category">
                        <div class="category--div">
                            <img class="image-category" src="${icon.url}" width="${icon.width}" height="${icon.height}" alt="${name}"/>
                            <h4 class="category--h4">${name}</h4>
                        </div>
                        <div class="playlists">
                            <ol>${playlists}</l>
                        </div>
                    </div>
                </article>
            `
      );
    }
  }, ``)
  root.innerHTML = html;
}

const getTrackList = (tracks) => {
  const tracklist = tracks.map(({ name, artists, url }) => `<li><a href=${url}>${name} - ${artists}</a></li>`).join('');
  return tracklist;
}

const getCategory = async (token) => {
  const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_IN&limit=10`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },

    });

  const data = await result.json();
  return data.categories.items;
}

const getPlaylistByCategory = async (token, categoryId) => {
  const result = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN&limit=10`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token }
    })
  const data = await result.json();
  return data.playlists.items;
}

const getTracksByPlaylist = async (token, href) => {
  const result = await fetch(href, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data.items;
}

loadData(clientId, clientSecret).then(renderData);

const onSubmit = (event) => {
  event.preventDefault();
  const term = event.target.term.value;
  renderData(term);
}

const resetForm = () => location.reload();

