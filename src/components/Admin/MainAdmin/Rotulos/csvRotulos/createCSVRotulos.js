import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import '../../../../../sass/admin/Rotulos/containerImportCSV.scss';
import ModalSendInfoCSV from "./modalSendInfoCSV";
import ModalSendFileCsv from "./modalSendFileCSV";
import apiPEDEA from "../../../../../services/api";
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

function CreateRotulosCSV() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [showModalFile, setShowModalFile] = useState(false);
    const toast = useRef(null);

    const openModal = () => setShowModal(true);
    const openModalFile = () => setShowModalFile(true);

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

            toast.current.show({ severity: 'success', summary: 'Download', detail: 'Arquivo exemplo baixado com sucesso', life: 3000 });

        } catch (error) {
            console.error('Erro ao iniciar o download:', error);
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao baixar o arquivo', life: 3000 });
        }
    };

    return (
        <>
            <Toast ref={toast} />

            <Button 
                label="Baixar arquivo exemplo" 
                icon="pi pi-download" 
                className="BtnDownloadExemple p-button-primary" 
                onClick={handleDownload} 
            />

            <div className="containerBtnsSubmit">
                <p>Upload do arquivo e envio de informações para o banco de dados:</p>

                <Button 
                    label="Enviar arquivo" 
                    icon="pi pi-upload" 
                    className="BtnSubmitRotulosCSV p-button-secondary" 
                    onClick={openModalFile} 
                />

                <Button 
                    label={t("Enviar dados ao banco")} 
                    icon="pi pi-database" 
                    className="BtnSubmitRotulosCSV p-button-success" 
                    onClick={openModal} 
                />
            </div>

            <ModalSendFileCsv showModalFile={showModalFile} setShowModalFile={setShowModalFile} />
            <ModalSendInfoCSV showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}

export default CreateRotulosCSV;
