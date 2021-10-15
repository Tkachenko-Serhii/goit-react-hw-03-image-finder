export default function getImages(searchValue, page) {
  fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=23056173-38182a6d52ebc31115cd52ab2&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(
        new Error("No images for you request, please enter more specific query")
      );
    })
    .then((images) => this.setState({ images, status: "resolved" }))
    .catch((error) => this.setState({ error, status: "rejected" }));
}
