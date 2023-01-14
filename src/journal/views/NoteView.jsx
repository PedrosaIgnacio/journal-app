import {
	DeleteOutline,
	Note,
	SaveOutlined,
	UploadOutlined,
} from "@mui/icons-material";
import { Grid, Typography, Button, TextField, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useMemo, useEffect } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
	startDeletingNote,
	startSavingNote,
	startUploadingFiles,
} from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useRef } from "react";

export const NoteView = () => {
	const { active, messageSaved, isSaving } = useSelector(
		(store) => store.journal
	);

	const dispatch = useDispatch();

	const { onInputChange, title, body, date, formState } = useForm(active);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, []);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	const onSave = () => {
		dispatch(startSavingNote());
	};

	const onDelete = () => {
		dispatch(startDeletingNote());
	};

	const fileInputRef = useRef();

	const onFileInputChange = ({ target }) => {
		if (target.files.length === 0) return;
		dispatch(startUploadingFiles(target.files));
	};

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire("Nota Actualizada", messageSaved, "success");
		}
	}, [messageSaved]);

	return (
		<Grid
			className="animate__animated animate__fadeIn animate__faster"
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					multiple
					ref={fileInputRef}
					onChange={onFileInputChange}
					style={{ display: "none" }}
				/>
				<IconButton
					disabled={isSaving}
					color="primary"
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>
				<Button
					color="primary"
					sx={{ p: 2 }}
					disabled={isSaving}
					onClick={onSave}
				>
					<SaveOutlined s x={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un título"
					label="Título"
					sx={{ border: "none", mb: 1 }}
					name="title"
					value={title}
					onChange={onInputChange}
				/>
				<TextField
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Que sucedió hoy?"
					minRows="5"
					sx={{ border: "none", mb: 1 }}
					name="body"
					value={body}
					onChange={onInputChange}
				/>
			</Grid>
			<Grid container sx={{ justifyContent: "end" }}>
				<Button
					disabled={isSaving}
					onClick={onDelete}
					sx={{ mt: 2 }}
					color="error"
				>
					<DeleteOutline />
					Borrar
				</Button>
			</Grid>

			<ImageGallery imageUrls={active.imageUrls} />
		</Grid>
	);
};
