// Define modal-related variables globally
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var span = document.getElementsByClassName("close")[0];
var body = document.body; // Get the body element to modify later

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
		closeModal(); // Use closeModal function to close modal
	};

	// Close the modal when clicking on the background of the modal
	modal.addEventListener("click", function (event) {
		if (event.target === modal) {
			closeModal(); // Use closeModal function to close modal
		}
	});

	// Add event listener for the ESC key to close the modal
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeModal(); // Use closeModal function to close modal
		}
	});
}

function closeModal() {
	span.classList.remove("show"); // Start fade out
	modal.style.left = "100%"; // Slide out
	setTimeout(() => {
		modal.style.display = "none";
		enableScrolling(); // Re-enable scrolling when modal is closed
	}, 500);
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
					disableScrolling(); // Disable scrolling when modal is opened
					if (window.innerWidth < 1000) {
						// Reset scroll position for smaller screens
						modal.scrollLeft = 0;
					}
					setTimeout(() => {
						modal.style.left =
							window.innerWidth >= 1000 ? "89px" : "0"; // Set left position based on screen width
						setTimeout(() => {
							span.classList.add("show"); // Add class to start fade-in after modal is positioned
						}, 200);
					}, 10);
				};

				gallery.appendChild(container);
			});
		})
		.catch((error) => console.error("Error loading the images:", error));
}

function disableScrolling() {
	if (window.innerWidth >= 1000) {
		body.style.overflow = "hidden"; // Disable scrolling on desktop
	}
}

function enableScrolling() {
	body.style.overflow = ""; // Re-enable scrolling
}
