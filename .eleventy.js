const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("excursions", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_excursions/*.md");
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addFilter("listPhotos", function(dir) {
    const fullPath = path.join(__dirname, 'images', dir);
    console.log(`Szukam zdjęć w: ${fullPath}`); // Debugowanie
    try {
      const photos = fs.readdirSync(fullPath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
      console.log(`Znalezione zdjęcia: ${photos}`); // Debugowanie
      return photos;
    } catch (e) {
      console.error(`Błąd przy odczycie katalogu ${fullPath}: ${e.message}`);
      return [];
    }
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};