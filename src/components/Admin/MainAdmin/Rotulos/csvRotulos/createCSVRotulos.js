import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import '../../../../../sass/admin/Rotulos/containerImportCSV.scss'
import ModalSendInfoCSV from "./modalSendInfoCSV";



function CreateRotulosCSV() {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => {

        setShowModal(true)
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome do arquivo é obrigatório'),
        file: Yup.mixed().required('O arquivo CSV é obrigatório')
    });


    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    
        toast.success("Arquivo e nome enviados com sucesso.");
    };

    return (
        <div className="ContainerAllImportCSVRotulos">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formFileName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite o nome do arquivo" 
                        {...register('name')}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="formFileCSV">
                    <Form.Label>Arquivo CSV</Form.Label>
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <Form.Control 
                                type="file" 
                                accept=".csv"
                                {...field}
                                isInvalid={!!errors.file}
                            />
                        )}
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