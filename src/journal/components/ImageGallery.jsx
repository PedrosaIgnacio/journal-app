import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ imageUrls }) => {
	return (
		<ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
			{imageUrls?.map((image, ind) => {
				return (
					<ImageListItem key={image}>
						<img
							src={`${image}?w=164&h=164&fit=crop&auto=format`}
							srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							alt={ind}
							loading="lazy"
						/>
					</ImageListItem>
				);
			})}
		</ImageList>
	);
};
