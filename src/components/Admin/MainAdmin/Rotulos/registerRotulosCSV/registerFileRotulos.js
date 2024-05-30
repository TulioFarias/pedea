import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'

import '../../../../../sass/admin/Rotulos/importRotulos.scss'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../../services/api'

function ImportFileRotulos() {
  const [findDataRotulos, setfindDataRotulos] = useState({
    key: '',
    fileType: '',
    file: null,
    name: ''
  })
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')
  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    fileType: Yup.string().required('O tipo de arquivo é obrigatório'),
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

  const onSubmit = async data => {
    try {
      const formData = new FormData()
      if (data.file && data.file.length > 0) {
        formData.append('file', data.file[0])
        formData.append('key', data.key)
        formData.append('name', data.name)
        formData.append('type_files', data.fileType)
      }

      const response = await toast.promise(
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
      return console.log(error)
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

  return (
    <>
      <div className="containerImportRotulos">
        <p className="titleFilesImports">
          Selecione um arquivo para atribuir a um rótulo:
        </p>
        <div className="customContainerImporRotulos">
          <Form
            className="customFormsFileImports"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group>
              <Form.Label className="LabelRotulosImports">
                Nome do arquivo:
              </Form.Label>
              <Form.Control
                type="text"
                className="inputRotulosImports"
                {...register('name')}
                onChange={handleChange}
              />
              <p className="txtErrorPassword">{errors.name?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulosImports">
                Tipo de Arquivo:
              </Form.Label>
              <Form.Select
                className="customDropDownItems"
                {...register('fileType')}
                value={findDataRotulos.fileType}
                onChange={handleChange}
              >
                <option value="" className="customOptionsSelect">
                  Selecione um tipo de arquivo
                </option>
                <option value="CSV" className="customOptionsSelect">
                  CSV
                </option>
                <option value="XML" className="customOptionsSelect">
                  XML
                </option>
                <option value="SHP" className="customOptionsSelect">
                  SHP
                </option>
              </Form.Select>
              <p className="txtErrorPassword">{errors.type_files?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulosImports">Arquivo:</Form.Label>
              <Form.Control
                type="file"
                className="inputRotulosImportsFiles"
                {...register('file')}
                onChange={handleFileChange}
              />

              <p className="txtErrorPassword">{errors.file?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulosImports">Chave:</Form.Label>
              <Form.Control
                type="text"
                className="inputRotulosImports"
                {...register('key')}
                onChange={handleChange}
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className="BtnSubmitImport"
            >
              Atribuir
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ImportFileRotulos
