import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import '../../../../../sass/admin/Rotulos/containerImportCSV.scss'
import ModalSendInfoCSV from "./modalSendInfoCSV";
import apiPEDEA from "../../../../../services/api";



function CreateRotulosCSV() {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => {

        setShowModal(true)
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome do arquivo é obrigatório'),
        file: Yup.mixed().required('O arquivo CSV é obrigatório')
    });


    const { register, handleSubmit,  reset, formState: { errors } } = useForm({
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

    return (
<div className="ContainerAllImportCSVRotulos">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formFileName">
                    <Form.Label className="LabelCSV">Nome:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite o nome do arquivo" 
                        {...register('name')}
                        isInvalid={!!errors.name}
                        className="inputCSV"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="formFileCSV" className="formGroupTwo">
                    <Form.Label className="LabelCSV">Arquivo CSV:</Form.Label>
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
                        Enviar
                    </Button>

                    <Button variant="primary" onClick={openModal} className="BtnSubmitRotulosCSV">
                        Adicionar dados do .csv
                    </Button>
                </div>
            </Form>

            <ModalSendInfoCSV showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
}

export default CreateRotulosCSV;