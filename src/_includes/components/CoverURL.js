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

async function CoverURL({id}) {

    try {
        data = await loadAlbum(id)
        return data["album"]["coverUrl"]
    }
    catch (error) {
        console.error(error);
        return "/journalist-portfolio/assets/images/cover__default.jpg"
    }

}

module.exports = CoverURL;