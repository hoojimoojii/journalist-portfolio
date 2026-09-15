const CoverURL = require('./src/_includes/components/CoverURL.js')
const AlbumCard = require('./src/_includes/components/AlbumCard.js')
const AlbumInfo = require('./src/_includes/components/AlbumInfo.js')

module.exports = async function(eleventyConfig) {
    const { HtmlBasePlugin } = await import("@11ty/eleventy");
    
    eleventyConfig.addPlugin(HtmlBasePlugin);

    eleventyConfig.addPassthroughCopy("src/assets/")
    eleventyConfig.addPassthroughCopy("src/css/")

    eleventyConfig.addWatchTarget("src/css/")

    eleventyConfig.addShortcode("CoverURL", CoverURL)
    eleventyConfig.addShortcode("AlbumCard", AlbumCard)
    eleventyConfig.addShortcode("AlbumInfo", AlbumInfo)

    eleventyConfig.addCollection("weeks", function(collectionApi) {
        return collectionApi.getFilteredByTag("highlight").reverse()
    })
    eleventyConfig.addCollection("articles", function(collectionApi) {
        return collectionApi.getFilteredByTag("feature").reverse()
    })

    eleventyConfig.addFilter("date", require("./src/filters/date.js"));
    eleventyConfig.addFilter("limit", require("./src/filters/limit.js"));
    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'docs'
        },
        pathPrefix: "/journalist-portfolio/",
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    }
}