const {html} = require('common-tags');
const apiUrl = 'https://journalist-portfolio-backnd-fbf7c6d6dgdscubd.westus-01.azurewebsites.net/albums/id';

function buildApiUrl(id) {
    return `${apiUrl}/${id}`;
}

async function loadAlbum(id) {
    const response = await fetch(buildApiUrl(id));
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function getGenreTags(genres) {
    res = ""
    for (const genre of genres) {
        res += "<h3>"
        res += genre
        res += "</h3>"
    }
    return res
}

async function AlbumCard({id}) {

    try {
        data = await loadAlbum(id)
        album = data.album
        return html`
        <div class="album-card">
            <div class="album-card__tags card__tags">
                ${await getGenreTags(album.genre)}
            </div>
            <a class="album-card__container card__container" href="/albums/id/${id}">
                <div class="album-card__cover card__cover"  style="background-image: url('${album.coverUrl || "/assets/images/cover__default"}');"></div>
                <div class="album-card__info card__info">
                    <h3>${album.title}</h3>
                    <h3>${album.artistNames?.join(' & ') || 'Unknown Artist'}, ${album.date}</h3>
                </div>
            </a>
        </div>`
    }
    catch (error) {
        console.error(error);
        return ""
    }

}

module.exports = AlbumCard;