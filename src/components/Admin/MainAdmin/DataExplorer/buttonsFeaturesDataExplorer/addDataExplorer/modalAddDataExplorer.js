import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

function ModalAddDataExplorer({ show, handleClose }) {
  const schema = Yup.object().shape({
    categoriaDeInformacao: Yup.string().required('Campo obrigatório'),
    classeMaior: Yup.string().required('Campo obrigatório'),
    subclasseMaior: Yup.string().required('Campo obrigatório'),
    classeMenor: Yup.string().required('Campo obrigatório'),
    nomenclaturaPedea: Yup.string().required('Campo obrigatório'),
    fonte: Yup.string().required('Campo obrigatório'),
    colunaAtributo: Yup.string().required('Campo obrigatório'),
    linkDriveShp: Yup.string()
      .url('URL inválida')
      .required('Campo obrigatório'),
    linkDriveKml: Yup.string().url('URL inválida').required('Campo obrigatório')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    console.log(data)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Informação ao Explorer de Dados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="categoriaDeInformacao">
            <Form.Label>Categoria de Informação</Form.Label>
            <Form.Control
              type="text"
              {...register('categoriaDeInformacao')}
              isInvalid={errors.categoriaDeInformacao}
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoriaDeInformacao?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="classeMaior">
            <Form.Label>Classe Maior</Form.Label>
            <Form.Control
              type="text"
              {...register('classeMaior')}
              isInvalid={errors.classeMaior}
            />
            <Form.Control.Feedback type="invalid">
              {errors.classeMaior?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="subclasseMaior">
            <Form.Label>Subclasse Maior</Form.Label>
            <Form.Control
              type="text"
              {...register('subclasseMaior')}
              isInvalid={errors.subclasseMaior}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subclasseMaior?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="classeMenor">
            <Form.Label>Classe Menor</Form.Label>
            <Form.Control
              type="text"
              {...register('classeMenor')}
              isInvalid={errors.classeMenor}
            />
            <Form.Control.Feedback type="invalid">
              {errors.classeMenor?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="nomenclaturaPedea">
            <Form.Label>Nomenclatura PEDEA</Form.Label>
            <Form.Control
              type="text"
              {...register('nomenclaturaPedea')}
              isInvalid={errors.nomenclaturaPedea}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nomenclaturaPedea?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fonte">
            <Form.Label>Fonte</Form.Label>
            <Form.Control
              type="text"
              {...register('fonte')}
              isInvalid={errors.fonte}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fonte?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="colunaAtributo">
            <Form.Label>Coluna Atributo</Form.Label>
            <Form.Control
              type="text"
              {...register('colunaAtributo')}
              isInvalid={errors.colunaAtributo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.colunaAtributo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="linkDriveShp">
            <Form.Label>Link Drive SHP</Form.Label>
            <Form.Control
              type="text"
              {...register('linkDriveShp')}
              isInvalid={errors.linkDriveShp}
            />
            <Form.Control.Feedback type="invalid">
              {errors.linkDriveShp?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="linkDriveKml">
            <Form.Label>Link Drive KML</Form.Label>
            <Form.Control
              type="text"
              {...register('linkDriveKml')}
              isInvalid={errors.linkDriveKml}
            />
            <Form.Control.Feedback type="invalid">
              {errors.linkDriveKml?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Adicionar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

ModalAddDataExplorer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ModalAddDataExplorer
