import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import '../../../../../../../sass/admin/DataExplorer/modalsDataExplorer/addModalDataExplorer.scss'
import apiPEDEA from '../../../../../../../services/api'
import dataValues from './values'

function ModalAddDataExplorer({ show, handleClose }) {
  const [subcategorias, setSubcategorias] = useState([])

  const schema = Yup.object().shape({
    categoriaDeInformacao: Yup.string().required('Campo obrigatório'),
    classeMaior: Yup.string().required('Campo obrigatório'),
    subclasseMaior: Yup.string().nullable(),
    classeMenor: Yup.string().nullable(),
    nomeclaturaGreenCloud: Yup.string().required('Campo obrigatório'),
    nomenclaturaPedea: Yup.string().required('Campo obrigatório'),
    fonte: Yup.string().required('Campo obrigatório'),
    colunaAtributo: Yup.string().required('Campo obrigatório'),
    linkDriveShp: Yup.string()
      .url('URL inválida')
      .required('Campo obrigatório'),
    linkDriveKml: Yup.string()
      .url('URL inválida')
      .required('Campo obrigatório'),
    key_rotulos: Yup.string().nullable()
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleCategoriaChange = categoria => {
    setSubcategorias(dataValues.Categorias[categoria] || [])
  }

  const onSubmit = async data => {
    console.log(data)
    try {
      const response = await toast.promise(
        apiPEDEA.post('/createDataExplore', {
          categoriadeinformação: data.categoriaDeInformacao,
          classemaior: data.classeMaior,
          subclassemaior: data.subclasseMaior,
          classemenor: data.classeMenor,
          nomenclaturagreencloud: data.nomeclaturaGreenCloud,
          nomenclaturapedea: data.nomenclaturaPedea,
          fonte: data.fonte,
          colunaatributo: data.colunaAtributo,
          linkdriveshp: data.linkDriveShp,
          linkdrivekml: data.linkDriveKml,
          key_rotulos: data.key_rotulos
        }),
        {
          pending: 'Adicionando novo registro...',
          success: 'Registro criado com sucesso!',
          error: 'Erro ao adicionar novo registro.'
        }
      )

      reset()
      handleClose()
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error)
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        id="ContainerAddDataExplorer"
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar informação ao Explorer de Dados</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Crie um rótulo no explorador de dados preenchendo os campos abaixo:
          </p>
          <Form onSubmit={handleSubmit(onSubmit)} className="BodyModalAdd">
            <Form.Group controlId="categoriaDeInformacao">
              <Form.Label>Categoria de Informação</Form.Label>
              <Form.Control
                as="select"
                {...register('categoriaDeInformacao')}
                onChange={e => {
                  handleCategoriaChange(e.target.value)
                }}
                isInvalid={errors.categoriaDeInformacao}
                className="inputDataExplorer"
              >
                <option value="">Selecione...</option>
                {Object.keys(dataValues.Categorias).map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.categoriaDeInformacao?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="classeMaior">
              <Form.Label>Classe Maior</Form.Label>
              <Form.Control
                as="select"
                {...register('classeMaior')}
                isInvalid={errors.classeMaior}
                className="inputDataExplorer"
              >
                <option value="">Selecione...</option>
                {subcategorias.map(subcategoria => (
                  <option key={subcategoria} value={subcategoria}>
                    {subcategoria}
                  </option>
                ))}
              </Form.Control>
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
                className="inputDataExplorer"
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
                className="inputDataExplorer"
              />
              <Form.Control.Feedback type="invalid">
                {errors.classeMenor?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="nomenclaturaPedea">
              <Form.Label>Nomenclatura Green Cloud</Form.Label>
              <Form.Control
                type="text"
                {...register('nomeclaturaGreenCloud')}
                isInvalid={errors.nomeclaturaGreenCloud}
                className="inputDataExplorer"
              />
              <Form.Control.Feedback type="invalid">
                {errors.nomeclaturaGreenCloud?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="nomenclaturaPedea">
              <Form.Label>Nomenclatura PEDEA</Form.Label>
              <Form.Control
                type="text"
                {...register('nomenclaturaPedea')}
                isInvalid={errors.nomenclaturaPedea}
                className="inputDataExplorer"
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
                className="inputDataExplorer"
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
                className="inputDataExplorer"
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
                className="inputDataExplorer"
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
                className="inputDataExplorer"
              />
              <Form.Control.Feedback type="invalid">
                {errors.linkDriveKml?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="keyRotulo">
              <Form.Label>Chave Rotulo</Form.Label>
              <Form.Control
                type="text"
                {...register('key_rotulos')}
                isInvalid={errors.key_rotulos}
                className="inputDataExplorer"
              />
              <Form.Control.Feedback type="invalid">
                {errors.key_rotulo?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <div className="ContainerBtnModalAdd">
            <Button
              variant="primary"
              onClick={handleSubmit(onSubmit)}
              className="BtnAddDataExplorer"
            >
              Adicionar
            </Button>

            <Button
              variant="primary"
              className="BtnCloseAddDataExplorer"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

ModalAddDataExplorer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ModalAddDataExplorer
