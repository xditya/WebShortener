/*
(c) @xditya
View the license: https://github.com/xditya/WebShortener/blob/master/LICENSE
*/

const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

document
  .getElementById("shortenForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const longURL = document.getElementById("longURL").value;

    // Check if the input is empty
    if (longURL.trim() === "") {
      alert("Please enter a URL");
      return;
    }
    if (!isValidUrl(longURL)) {
      alert("Please enter a valid URL");
      return;
    }
    // Get the shortened link
    const res = await fetch("/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longURL }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    if (data.hash) {
      shortenedLink = data.hash;
    }

    // Show the custom popup with the shortened link
    showPopup(window.location.href + shortenedLink);

    // Clear the input box after showing the popup
    document.getElementById("longURL").value = "";
  });

function closePopup() {
  const popup = document.getElementById("customPopup");
  popup.style.display = "none";
}

function showPopup(shortenedLink) {
  const popup = document.getElementById("customPopup");
  const shortLinkElement = document.getElementById("shortLink");
  shortLinkElement.textContent = shortenedLink;
  shortLinkElement.href = shortenedLink; // Set the "href" attribute to the shortened link
  popup.style.display = "block";
}
function copyToClipboard() {
  const shortLinkElement = document.getElementById("shortLink");
  const shortenedLink = shortLinkElement.href;

  navigator.clipboard
    .writeText(shortenedLink)
    .then(function () {
      alert("Copied: " + shortenedLink);
    })
    .catch(function (err) {
      console.error("Failed to copy: ", err);
    });
}
