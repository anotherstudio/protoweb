// Define modal-related variables globally
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var span = document.getElementsByClassName("close")[0];

document.addEventListener("DOMContentLoaded", function () {
	setupModal(); // Setup modal first to ensure elements are initialized
	fetchImages();
	document
		.getElementById("shuffleButton")
		.addEventListener("click", function () {
			window.location.reload(true); // Force reload without cache
		});
});

function setupModal() {
	// Use the globally defined 'modal' and related elements
	span.onclick = function () {
		modal.style.left = "100%"; // Slide out
		setTimeout(() => {
			modal.style.display = "none";
		}, 500);
	};
}

function fetchImages() {
	fetch("images.php")
		.then((response) => {
			if (!response.ok) throw new Error("Network response was not ok");
			return response.json();
		})
		.then((images) => {
			const gallery = document.getElementById("gallery");
			gallery.innerHTML = ""; // Clear the gallery before adding new images
			images.forEach((image) => {
				const imageRatio = (image.height / image.width) * 100;
				const container = document.createElement("a");
				container.className = "image-container";
				container.href = "#";
				container.style.backgroundImage = `url('${image.url}')`;
				container.style.paddingTop = `${imageRatio}%`; // Sets the aspect ratio
				container.style.display = "block"; // Ensure it behaves like a block element
				container.style.cursor = "pointer";

				container.onclick = function (event) {
					event.preventDefault();
					modal.style.display = "block";
					modalImg.src = image.url;
					setTimeout(() => {
						modal.style.left = "0"; // Slide in
					}, 10);
				};

				gallery.appendChild(container);
			});
		})
		.catch((error) => console.error("Error loading the images:", error));
}
