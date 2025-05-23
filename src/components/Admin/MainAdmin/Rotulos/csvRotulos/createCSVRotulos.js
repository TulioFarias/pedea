import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import '../../../../../sass/admin/Rotulos/containerImportCSV.scss'
import ModalSendInfoCSV from "./modalSendInfoCSV";
import apiPEDEA from "../../../../../services/api";
import { useTranslation } from 'react-i18next'
import DownloadIcon from '@mui/icons-material/Download';
import { Snackbar, Alert } from '@mui/material';
import ModalSendFileCsv from "./modalSendFileCSV";
import FileUploadIcon from '@mui/icons-material/FileUpload';
function CreateRotulosCSV() {
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)
    const [showModalFile, setShowModalFile] = useState(false)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const openModal = () => {

        setShowModal(true)
    }

    const openModalFile = () => {

        setShowModalFile(true)
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome do arquivo é obrigatório'),
        file: Yup.mixed().required('O arquivo CSV é obrigatório')
    });


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const handleDownload = async () => {
        try {
            const response = await apiPEDEA.get('/downloadExemploCSVRotulos', {
                responseType: 'blob', 
            });
    
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'exemplo-rotulos-bilingue.csv'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao iniciar o download:', error);
        }
    };

    return (
        <>
             <Button variant="primary" className="BtnDownloadExemple" onClick={handleDownload}>
                        Baixar arquivo exemplo
                        <DownloadIcon />
                        
                    </Button>
             <div className="containerBtnsSubmit">
                    <p >Upload do arquivo e envio de informações para o banco de dados:</p>
                     <Button onClick={openModalFile} className="BtnSubmitRotulosCSV">
                        Enviar arquivo 
                        <FileUploadIcon/>
                     </Button>


                    <Button variant="primary" onClick={openModal} className="BtnSubmitRotulosCSV">
                      {t("Enviar dados ao banco")}
                    </Button>
                </div>

            <ModalSendFileCsv showModalFile={showModalFile} setShowModalFile={setShowModalFile}/>

            <ModalSendInfoCSV showModal={showModal} setShowModal={setShowModal} />

            <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert 
                onClose={() => setSnackbar({ ...snackbar, open: false })} 
                severity={snackbar.severity}
                sx={{ width: '300px' }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
        </>
    );
}

export default CreateRotulosCSV;