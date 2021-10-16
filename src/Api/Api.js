async function fetchImages(searchValue, page) {
  const images = await fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=23056173-38182a6d52ebc31115cd52ab2&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject({
      error: new Error(
        `No images for you request: ${searchValue}, please enter more specific query!`
      ),
    });
  });
  return images.hits;
}

async function popularImages(page) {
  const images = await fetch(
    `https://pixabay.com/api/?q=&page=${page}&key=23056173-38182a6d52ebc31115cd52ab2&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject({
      error: new Error(
        `No images for you request, please enter more specific query!`
      ),
    });
  });

  return images.hits;
}

export { fetchImages, popularImages };
