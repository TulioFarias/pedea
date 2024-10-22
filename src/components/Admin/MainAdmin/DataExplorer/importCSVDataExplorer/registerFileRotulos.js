import { yupResolver } from '@hookform/resolvers/yup'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import ModalConfirmAddDataExplorer from './modalConfirmRegisteCSV'

import '../../../../../sass/admin/DataExplorer/importcsvdataexplore.scss'
import api from '../../../../../services/api'

function ImportFileRotulos() {

  const { t } = useTranslation()
  const [findDataRotulos, setfindDataRotulos] = useState({
    key: '',
    file: null,
    name: ''
  })
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')
  const [showModalConfirm, setModalConfirm] = useState(false)

  const schema = Yup.object().shape({
    file: Yup.mixed().required('O arquivo é obrigatório'),
    name: Yup.string().required('Nome é obrigatório')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const openModal = () => {
    setModalConfirm(true)
  }

  const onSubmit = async data => {
    try {
      const formData = new FormData()
      if (data.file && data.file.length > 0) {
        formData.append('file', data.file[0])
        formData.append('name', data.name)
      }

      await toast.promise(
        api.post('/rotulosCSV', formData, {
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
  }

  const handleChange = event => {
    const { name, value } = event.target
    setfindDataRotulos(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    setfindDataRotulos(prevState => ({
      ...prevState,
      file
    }))
    setFileName(file ? file.name : 'Nenhum arquivo selecionado')
  }

  const infoUserTutorial = {
    importFile: {
      name: 'Escolha um nome descritivo para o arquivo.',
      file: 'Selecione o arquivo que deseja importar.',
      key: 'Escolha uma chave única para o arquivo.'
    }
  }

  return (
    <>
      <div>
        <p className="titleFilesImports">
          {t("Preencha os campos abaixo para adicionar novo arquivo .csv ao explorador de dados:")}
        </p>
      </div>

      <Form
        className="customFormsFileImports"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group>
          <Form.Label className="LabelRotulosImports">
            {t("Nome do arquivo:")}
            <Tooltip
              title={infoUserTutorial.importFile.name}
              className="toltipCustom"
            >
              <InfoRoundedIcon />
            </Tooltip>
          </Form.Label>
          <Form.Control
            type="text"
            className="inputRotulosImports"
            {...register('name')}
            onChange={handleChange}
            placeholder={t("Escolha um nome para o arquivo.")}
            isInvalid={errors.name}
          />
          <p className="txtErrorPassword">{errors.name?.message}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label className="LabelRotulosImports">
            {t("Arquivo .CSV:")}
            <Tooltip
              title={infoUserTutorial.importFile.file}
              className="toltipCustom"
            >
              <InfoRoundedIcon />
            </Tooltip>
          </Form.Label>
          <Form.Control
            type="file"
            className="inputRotulosImports"
            {...register('file')}
            onChange={handleFileChange}
            isInvalid={errors.file}
          />
          <p className="txtErrorPassword">{errors.file?.message}</p>
        </Form.Group>

        <Button variant="secondary" type="submit" className="BtnSubmitImport">
          {t("Adicionar CSV")}
        </Button>
      </Form>

      <hr className="HRCustom" />
      <div className="containerButtonAddDataCSV">
        <p>
          {t("Para adicionar os dados do arquivo .csv enviados, clique no botão abaixo:")}
        </p>
        <Button className="ButtonAddCSV" onClick={openModal}>
          {t("Adicionar dados do arquivo CSV")}
        </Button>
      </div>

      <ModalConfirmAddDataExplorer
        showModalConfirm={showModalConfirm}
        setModalConfirm={setModalConfirm}
      />
    </>
  )
}

export default ImportFileRotulos
