import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Toast } from 'primereact/toast'

import '../../../../../../../sass/admin/DataExplorer/modalsDataExplorer/addModalDataExplorer.scss'
import apiPEDEA from '../../../../../../../services/api'
import dataValues from './values'

function ModalAddDataExplorer({ show, handleClose }) {
  const [user, setUser] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const toastRef = useRef(null)
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
    register,
    handleSubmit,
    reset,
    control,
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

  const onSubmit = async (data) => {
    toastRef.current?.show({ severity: 'info', summary: 'Aguarde', detail: 'Adicionando novo registro...', life: 2000 })

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

      toastRef.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Registro criado com sucesso!' })
      reset()
      handleClose()
    } catch (error) {
      console.error('Erro:', error)
      const msg = error?.response?.data?.error || 'Erro ao adicionar novo registro.'
      toastRef.current?.show({ severity: 'error', summary: 'Erro', detail: msg })
    }
  }

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

  return (
    <>
      <Toast ref={toastRef} />

      <Dialog
        header="Adicionar informação ao Explorer de Dados"
        visible={show}
        onHide={handleClose}
        style={{ width: '50vw' }}
        modal
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

          <div className="p-float-label mb-3">
            <Controller
              name="categoriaDeInformacao"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={Object.keys(dataValues.Categorias).map((cat) => ({ label: cat, value: cat }))}
                  className={errors.categoriaDeInformacao ? 'p-invalid' : ''}
                />
              )}
            />
            <label>Categoria de Informação *</label>
          </div>
          {errors.categoriaDeInformacao && <Message severity="error" text={errors.categoriaDeInformacao.message} />}

          <div className="p-float-label mb-3">
            <Controller
              name="classeMaior"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={subcategorias.map((item) => ({ label: item, value: item }))}
                  className={errors.classeMaior ? 'p-invalid' : ''}
                />
              )}
            />
            <label>Classe Maior *</label>
          </div>
          {errors.classeMaior && <Message severity="error" text={errors.classeMaior.message} />}

          {[
            { name: 'subclasseMaior', label: 'Subclasse Maior' },
            { name: 'classeMenor', label: 'Classe Menor' },
            { name: 'nomeclaturaGreenCloud', label: 'Nomenclatura Green Cloud *' },
            { name: 'nomenclaturaPedea', label: 'Nomenclatura PEDEA *' },
            { name: 'fonte', label: 'Fonte *' },
            { name: 'colunaAtributo', label: 'Coluna Atributo *' },
            { name: 'linkDriveShp', label: 'Link Drive SHP *' },
            { name: 'linkDriveKml', label: 'Link Drive KML *' },
            { name: 'key_rotulos', label: 'Chave Rótulo' }
          ].map((fieldInfo) => (
            <div className="p-float-label mb-3" key={fieldInfo.name}>
              <InputText
                id={fieldInfo.name}
                {...register(fieldInfo.name)}
                className={errors[fieldInfo.name] ? 'p-invalid' : ''}
              />
              <label htmlFor={fieldInfo.name}>{fieldInfo.label}</label>
              {errors[fieldInfo.name] && (
                <Message severity="error" text={errors[fieldInfo.name].message} />
              )}
            </div>
          ))}

          <div className="mt-3 flex justify-content-end gap-2">
            <Button label="Adicionar" icon="pi pi-check" type="submit" />
            <Button label="Fechar" icon="pi pi-times" severity="secondary" onClick={handleClose} />
          </div>
        </form>
      </Dialog>
    </>
  )
}

ModalAddDataExplorer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ModalAddDataExplorer
