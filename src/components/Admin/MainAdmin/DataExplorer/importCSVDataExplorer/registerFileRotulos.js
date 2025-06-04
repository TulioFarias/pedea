import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Toast } from 'primereact/toast'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { FileUpload } from 'primereact/fileupload'
import { Button } from 'primereact/button'
import ModalConfirmAddDataExplorer from './modalConfirmRegisteCSV'
import api from '../../../../../services/api'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import '../../../../../sass/admin/DataExplorer/importcsvdataexplore.scss'
import apiPEDEA from '../../../../../services/api'
import PropTypes from 'prop-types';
function ImportFileRotulos({handleTableUpdate}) {
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData
  const { t } = useTranslation()

  const [showModalConfirm, setModalConfirm] = useState(false)
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')
  const toast = useRef(null)

  const schema = Yup.object().shape({
    file: Yup.mixed().required('O arquivo é obrigatório'),
    name: Yup.string().required('Nome é obrigatório')
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      file: null,
      name: ''
    }
  })

  const onSubmit = async data => {
    try {
      const formData = new FormData()
      if (data.file) {
        formData.append('file', data.file)
        formData.append('name', data.name)
        formData.append('user_id', loggedInUserId)
      }

      toast.current.show({ severity: 'info', summary: 'Processando...', detail: 'Enviando arquivo...', life: 1000 })

      await api.post('/rotulosCSV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso!', life: 3000 })
      reset()
      setFileName('Nenhum arquivo selecionado')
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Chave ou arquivo inválido.', life: 4000 })
      console.error(error)
    }
  }

  const handleFileChange = ({ files }) => {
    if (files && files.length > 0) {
      const file = files[0]
      setValue('file', file, { shouldValidate: true })
      setFileName(file.name)
    }
  }


  const openModal = () => {
    setModalConfirm(true)
  }



  const handleDownload = async () => {
    try {
      const response = await apiPEDEA.get('/downloadExemple', {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'arquivo-exemplo.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao iniciar o download:', error);
    }
  };

  return (
    <div className='ContainerImports'>
      <Toast ref={toast} />
      <p className="titleFilesImports">
        {t("Primeiro, envie o arquivo e depois importe os dados para o banco de dados.")}
      </p>

      <div className='containerDownload'>
            <p className="titleFilesImports">
                {t("Baixar arquivo exemplo →")}
              </p>
        <Button className='download' onClick={handleDownload}>
          <SimCardDownloadIcon/>
        </Button>

      </div>


      <form className="customFormsFileImports" onSubmit={handleSubmit(onSubmit)}>

        <div className="p-field inputNameCustom">
          <FloatLabel>
            <InputText
              id="name"
              className={`inputRotulosImports valueInputCustom ${errors.name ? 'p-invalid' : ''}`}
              {...register('name')}
              onChange={(e) => setValue('name', e.target.value)}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <label htmlFor="name">{t("Nome para o arquivo")}</label>
          </FloatLabel>
          {errors.name && <p className="txtErrorPassword">{errors.name.message}</p>}
        </div>


        <div className="p-field">
          <label className="LabelRotulosImports">
          </label>
          <FileUpload
            mode="basic"
            name="file"
            chooseLabel={fileName}
            accept=".csv"
            customUpload
            onSelect={handleFileChange}
            className={`inputRotulosImportsUpload valueInputCustom ${errors.file ? 'p-invalid' : ''}`}
          />
          {errors.file && <p className="txtErrorPassword">{errors.file.message}</p>}
        </div>

        <Button type="submit" label={t("Enviar arquivo")} icon="pi pi-upload" className="BtnSubmitImport" />
      </form>

      <hr className="HRCustom" />

      <div className="containerButtonAddDataCSV">
        <p>
          {t("Para adicionar os dados do arquivo .csv enviados, clique no botão abaixo:")}
        </p>
        <Button
          label={t("Importar dados para o banco")}
          icon="pi pi-database"
          className="ButtonAddCSV"
          onClick={openModal}
        />
      </div>

      <ModalConfirmAddDataExplorer
        showModalConfirm={showModalConfirm}
        setModalConfirm={setModalConfirm}
        handleTableUpdate={handleTableUpdate}
      />
    </div>
  )
}


ImportFileRotulos.propTypes = {
    handleTableUpdate: PropTypes.func.isRequired
  };

export default ImportFileRotulos
