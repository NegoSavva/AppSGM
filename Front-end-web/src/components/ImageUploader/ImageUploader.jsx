import React, { useState, useEffect } from "react";
import { Button } from '@mui/material'; // Importando o Button do Material-UI
import './ImageUploader.css';

const ImageUploader = ({ setFile }) => {
    const [currentFile, setCurrentFile] = useState(undefined);

    const selectFile = (event) => {
        const selectedFile = event.target.files[0];
        const previewImage = URL.createObjectURL(selectedFile);
        setCurrentFile(selectedFile);
    };

    useEffect(() => {
        setFile(currentFile);
    }, [currentFile, setFile]);

    const deleteFile = () => {
        setCurrentFile(undefined);
    };

    return (
        <div className="img-card">
            <div className="d-flex">
                <label htmlFor="uploadImage" className="btn-open-image">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component="span" // Isso permite disparar o input de tipo file
                        startIcon={<i className="bi bi-image"></i>}
                    >
                        Escolher Imagem
                    </Button>
                </label>

                <p className="fw-bold fst-italic d-block mx-auto">
                    {currentFile ? currentFile.name : 'Nenhum arquivo escolhido'}
                </p>

                {currentFile && (
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="small" 
                        onClick={deleteFile}
                        startIcon={<i className="bi bi-x-circle"></i>}
                    >
                        Excluir
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
