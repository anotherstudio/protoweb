window.onload = function () {
	fetch("images.php")
		.then((response) => response.json())
		.then((data) => {
			const gallery = document.getElementById("gallery");
			data.forEach((image) => {
				let imgElement = document.createElement("img");
				imgElement.src = `images/${image}`; // Ensure the path here matches the PHP script
				imgElement.alt = "Portfolio Image";
				gallery.appendChild(imgElement);
			});
		})
		.catch((error) => console.error("Error loading the images:", error));
};
