import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import '../../../../../sass/admin/Rotulos/containerImportCSV.scss'
import ModalSendInfoCSV from "./modalSendInfoCSV";
import apiPEDEA from "../../../../../services/api";
import { useTranslation } from 'react-i18next'
import DownloadIcon from '@mui/icons-material/Download';

function CreateRotulosCSV() {
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {

        setShowModal(true)
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome do arquivo é obrigatório'),
        file: Yup.mixed().required('O arquivo CSV é obrigatório')
    });


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        try {
            const formData = new FormData()
            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0])
                formData.append('name', data.name)
            }

            await toast.promise(
                apiPEDEA.post('/createRotulosCSV', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }),
                {
                    pending: 'Cadastrando...',
                    success: 'Arquivo de rótulos criado com sucesso!',
                    error: 'Chave ou arquivo inválido, verifique novamente.'
                }
            )

            reset()
        } catch (error) {
            console.log(error)
        }
    };

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
        <div className="ContainerAllImportCSVRotulos">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formFileName">
                    <Form.Label className="LabelCSV">
                       {t(" Nome:")}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t("Digite o nome do arquivo")}
                        {...register('name')}
                        isInvalid={!!errors.name}
                        className="inputCSV"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="containerExempleDownload">

                    <p className="titleExempleDownload">{t("Arquivo exemplo de import .csv *")}</p>
                    <Button variant="primary" className="BtnDownloadExemple" onClick={handleDownload}>
                        <DownloadIcon />
                        <span>{t("Arquivo exemplo")}</span>
                    </Button>

                </div>



                <Form.Group controlId="formFileCSV" className="formGroupTwo">
                    <Form.Label className="LabelCSV">{t("Arquivo CSV:")}</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".csv"
                        {...register('file')}
                        isInvalid={!!errors.file}
                        className="inputCSV"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.file?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="containerBtnsSubmit">
                    <Button variant="primary" type="submit" className="BtnSubmitRotulosCSV">
                        {t("Enviar")}
                    </Button>



                    <Button variant="primary" onClick={openModal} className="BtnSubmitRotulosCSV">
                      {t("Adicionar dados do .csv")}
                    </Button>
                </div>
            </Form>

            <ModalSendInfoCSV showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default CreateRotulosCSV;