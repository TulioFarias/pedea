import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import { Toast } from 'primereact/toast'

import '../../../../../../../sass/admin/DataExplorer/modalsDataExplorer/addModalDataExplorer.scss'
import apiPEDEA from '../../../../../../../services/api'
import dataValues from './values'

function ModalAddDataExplorer({ show, handleClose, handleTableUpdate }) {
  const [user, setUser] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const toast = useRef(null)
  const userData = useSelector((state) => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData

  const schema = Yup.object().shape({
    categoriaDeInformacao: Yup.string().required('Campo obrigatório'),
    classeMaior: Yup.string().required('Campo obrigatório'),
    subclasseMaior: Yup.string().nullable(),
    classeMenor: Yup.string().nullable(),
    nomeclaturaGreenCloud: Yup.string().required('Campo obrigatório'),
    nomenclaturaPedea: Yup.string().required('Campo obrigatório'),
    fonte: Yup.string().required('Campo obrigatório'),
    colunaAtributo: Yup.string().required('Campo obrigatório'),
    linkDriveShp: Yup.string().url('URL inválida').required('Campo obrigatório'),
    linkDriveKml: Yup.string().url('URL inválida').required('Campo obrigatório'),
    key_rotulos: Yup.string().nullable()
  })

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoriaDeInformacao: '',
      classeMaior: ''
    }
  })

  const selectedCategoria = watch('categoriaDeInformacao')

  useEffect(() => {
    setSubcategorias(dataValues.Categorias[selectedCategoria] || [])
  }, [selectedCategoria])

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await apiPEDEA.get('/admin')
        const loggedInUser = data.find((user) => user.id === loggedInUserId)
        if (loggedInUser) setUser(loggedInUser)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
      }
    }
    loadUserData()
  }, [loggedInUserId])

  const onSubmit = async (data) => {
    toast.current.show({ severity: 'info', summary: 'Processando', detail: 'Adicionando novo registro...', life: 2000 })
    try {
      await apiPEDEA.post('/createDataExplore', {
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
        key_rotulos: data.key_rotulos,
        user_id: loggedInUserId
      })

      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Registro criado com sucesso!', life: 3000 })
      reset()
      handleClose()
      handleTableUpdate()
    } catch (error) {
      console.error('Erro:', error)
      const msg = error?.response?.data?.error || 'Erro ao adicionar novo registro.'
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 })
    }
  }

  const dropdownFields = [
    {
      name: 'categoriaDeInformacao',
      label: 'Categoria de Informação *',
      options: Object.keys(dataValues.Categorias).map((cat) => ({ label: cat, value: cat }))
    },
    {
      name: 'classeMaior',
      label: 'Classe Maior *',
      options: subcategorias.map((item) => ({ label: item, value: item }))
    }
  ]

  const inputFields = [
    { name: 'subclasseMaior', label: 'Subclasse Maior' },
    { name: 'classeMenor', label: 'Classe Menor' },
    { name: 'nomeclaturaGreenCloud', label: 'Nomenclatura Green Cloud *' },
    { name: 'nomenclaturaPedea', label: 'Nomenclatura PEDEA *' },
    { name: 'fonte', label: 'Fonte *' },
    { name: 'colunaAtributo', label: 'Coluna Atributo *' },
    { name: 'linkDriveShp', label: 'Link Drive SHP *' },
    { name: 'linkDriveKml', label: 'Link Drive KML *' },
    { name: 'key_rotulos', label: 'Chave Rótulo' }
  ]

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <Modal show={show} onHide={handleClose} size="lg" centered id="ContainerModalAdd">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar informação ao Explorer de Dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className='ContainerForm'>
            {dropdownFields.map(({ name, label, options }) => (
              <Form.Group className="mb-3" controlId={name} key={name}>
                <Form.Label>{label}</Form.Label>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <Form.Select {...field} isInvalid={!!errors[name]}>
                      <option value="">Selecione</option>
                      {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                />
                {errors[name] && <Form.Control.Feedback type="invalid">{errors[name].message}</Form.Control.Feedback>}
              </Form.Group>
            ))}

            {inputFields.map(({ name, label }) => (
              <Form.Group className="mb-3" controlId={name} key={name}>
                <Form.Label>{label}</Form.Label>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <Form.Control type="text" {...field} isInvalid={!!errors[name]} />
                  )}
                />
                {errors[name] && <Form.Control.Feedback type="invalid">{errors[name].message}</Form.Control.Feedback>}
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button className='btnAdd' onClick={handleSubmit(onSubmit)}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalAddDataExplorer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
}

export default ModalAddDataExplorer
