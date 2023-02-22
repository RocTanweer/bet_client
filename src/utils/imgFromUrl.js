/**
 *
 * @param {string} url - URl of the image given by google oauth jwt
 * @return {image} - Image file containing same data as provided by the url
 */
export async function imageFromURL(url, handleImageString) {
  let headersList = {
    Accept: "*/*",
  };

  let response = await fetch(url, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.blob();

  const reader = new FileReader();
  reader.readAsDataURL(data);

  reader.onload = () => {
    handleImageString(reader.result);
  };
}
