const clientId = `081ec8649e04484db985e59036fcf95e`;
const clientSecret = `1402946e78e746df914faa147cefd6c1`;

const getToken = async (clientId, clientSecret) => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
};

const loadData = async (clientId, clientSecret) => {
    const token = await getToken(clientId, clientSecret);
    const categories = await getCategory(token);
    const root = document.getElementById(`root`);
    for (const { name, id, icons: [icon], href } of categories) {
        const playlistData = await getPlaylistByCategory(token, id);
        const html = `
      <article class="category-card">
        <div class="category">
          <div class="category--div">
            <img
              class="image-category"
              src="${icon.url}"
              width="${icon.width}"
              height="${icon.height}"
              alt="${name}"
            />
            <h4 class="category--h4">${name}</h4>
          </div>
          <div class="playlists">
            <ol>${await getPlaylists(playlistData, token)}</ol>
          </div>
        </div>
      </article>
    `;
        root.insertAdjacentHTML("beforeend", html);
    }
};

const getPlaylists = async (playlistData, token) => {
    const playlistItems = await Promise.all(
        playlistData.map(async ({ name, external_urls: { spotify }, images: [image], tracks: { href } }) => {
            const tracks = await getTracksByPlaylist(token, href);
            const trackList = tracks.map(({ track: { name, artists, external_urls: { spotify } } }) => `<li><a href=${spotify}>${name} - ${artists.map(artist => artist.name).join(', ')}</a></li>`).join('');
            return `
        <li>
          <a href="${spotify}" alt="${name}" target="_blank">
            <img src="${image.url}" width="180" height="180" />
          </a>
          <details>
          <summary>Tracks</summary>
          <div>
            <ol class="tracks">${trackList}</ol>
          </div>
        </details>
        </li>
      `;
        })
    );
    return playlistItems.join('');
};

const getCategory = async (token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_IN&limit=10`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.categories.items;
};

const getPlaylistByCategory = async (token, categoryId) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN&limit=10`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
    });
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

loadData(clientId, clientSecret);
