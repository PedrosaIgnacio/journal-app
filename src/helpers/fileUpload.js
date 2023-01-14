export const fileUpload = async (file) => {
	if (!file) throw new Error("Ningun archivo a subir");
	const cloudURL = "https://api.cloudinary.com/v1_1/djh1k6vfr/upload";

	const formData = new FormData();

	formData.append("upload_preset", "react-journal");
	formData.append("file", file);

	try {
		const res = await fetch(cloudURL, {
			method: "POST",
			body: formData,
		});

		if (!res.ok) throw new Error("No se pudo subir imagen");

		const cloudResponse = await res.json();

		return cloudResponse.secure_url;
	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
};
