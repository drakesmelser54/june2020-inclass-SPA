//st is always going to be st.Gallery
export default st =>
  `<section id="gallery">
    ${st.pictures
      .map(pic => `<img alt="${pic.title}" src="${pic.url}">`)
      .join("")}
  </section>`;
