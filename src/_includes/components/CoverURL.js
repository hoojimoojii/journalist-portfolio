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

async function CoverURL({id}) {

    try {
        data = await loadAlbum(id)
        return data["album"]["coverUrl"]
    }
    catch (error) {
        console.error(error);
        return "/assets/images/cover__default.jpg"
    }

}

module.exports = CoverURL;