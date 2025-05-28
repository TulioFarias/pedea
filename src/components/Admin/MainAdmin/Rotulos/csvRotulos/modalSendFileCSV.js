import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Form, Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Toast } from 'primereact/toast';
import '../../../../../sass/admin/Rotulos/containerImportCSV.scss';
import apiPEDEA from "../../../../../services/api";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


function CreateRotulosCSV({ showModalFile, setShowModalFile }) {
    const { t } = useTranslation();
    const toast = useRef(null);
    const userData = useSelector(state => state.userInfoSlice.infoUser);
    const { id: loggedInUserId } = userData;

    const handleClose = () => setShowModalFile(false);

    const schema = Yup.object().shape({
        name: Yup.string().required(t('O nome do arquivo é obrigatório')),
        file: Yup.mixed().required(t('O arquivo CSV é obrigatório'))
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        try {
            const formData = new FormData();
            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0]);
                formData.append('name', data.name);
                formData.append('user_id', loggedInUserId)
            }

            toast.current.show({ severity: 'info', summary: t('Aguarde...'), detail: t('Cadastrando...'), life: 2000 });

            await apiPEDEA.post('/createRotulosCSV', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.current.show({ severity: 'success', summary: t('Sucesso'), detail: t('Arquivo de rótulos criado com sucesso!'), life: 3000 });
            reset();
            handleClose();
        } catch (error) {
            console.error(error);
            toast.current.show({ severity: 'error', summary: t('Erro'), detail: t('Chave ou arquivo inválido, verifique novamente.'), life: 4000 });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Modal show={showModalFile} onHide={handleClose} centered id="modalImportCsvBilingue">
                <Modal.Header closeButton>
                    <Modal.Title>{t("Importar Rótulos via CSV")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} className="ContainerAllImportCSVRotulos">
                        <Form.Group controlId="formFileName">
                            <Form.Label className="LabelCSV">{t("Nome:")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("Digite o nome do arquivo")}
                                {...register('name')}
                                isInvalid={!!errors.name}
                                className="inputCSV"
                            />
                            {errors.name && (
                                <small className="text-danger">{errors.name.message}</small>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formFileCSV" className="formGroupTwo mt-3">
                            <Form.Label className="LabelCSV">{t("Arquivo CSV:")}</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".csv"
                                {...register('file')}
                                isInvalid={!!errors.file}
                                className="inputCSV"
                            />
                            {errors.file && (
                                <small className="text-danger">{errors.file.message}</small>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        variant="primary"
                        onClick={handleSubmit(onSubmit)}
                        className="BtnSubmitRotulosCSV"
                    >
                        {t("Enviar")}
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

CreateRotulosCSV.propTypes = {
    showModalFile: PropTypes.bool.isRequired,
    setShowModalFile: PropTypes.func.isRequired
};

export default CreateRotulosCSV;
