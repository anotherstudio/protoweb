fetch("images.php")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	})
	.then((images) => {
		const gallery = document.getElementById("gallery");
		images.forEach((image) => {
			const img = document.createElement("img");
			img.src = image;
			img.alt = "Gallery image";
			gallery.appendChild(img);
		});
	})
	.catch((error) => console.error("Error loading the images:", error));
