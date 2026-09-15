const {html} = require('common-tags');
const apiUrl = 'http://127.0.0.1:5001/albums/id';

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

async function AlbumInfo({id}) {

    try {
        data = await loadAlbum(id)
        album = data.album
        return html`
        <div class="album-info">
            <div class="album-info__container">
                <div class="album-info__cover" style="background-image: url('${album.coverUrl || "/assets/images/cover__default"}');"></div>
                <div class="album-info__info">
                    <h2>${album.title}</h2>
                    <h3>Artist: ${album.artistNames?.join(' & ') || 'Unknown Artist'}</h3>
                    <h3>Date: ${album.date}</h3>
                    <h3 style="text-transform:capitalize;">Genre: ${album.genre?.join(', ') || 'Unknown Genre'}</h3>
                </div>
            </div>
        </div>`
    }
    catch (error) {
        console.error(error);
        return ""
    }

}

module.exports = AlbumInfo;