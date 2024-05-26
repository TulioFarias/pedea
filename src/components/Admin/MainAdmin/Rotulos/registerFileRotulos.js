import { yupResolver } from '@hookform/resolvers/yup'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import React, { useState } from 'react'

import '../../../../sass/admin/Rotulos/importRotulos.scss'
import { Button, Form, Dropdown } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

function ImportFileRotulos() {
  const [findDataRotulos, setfindDataRotulos] = useState({
    key: '',
    fileType: '',
    file: null,
    name: ''
  })
  const [rotulosData, setRotulosData] = useState([])
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const formData = new FormData()
    formData.append('file', findDataRotulos.file)
    formData.append('key', data.key)
    formData.append('fileType', data.fileType)

    try {
      const response = await toast.promise(
        api.post('/getRotulos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        {
          pending: 'Buscando...',
          success: 'Dados encontrados.',
          error:
            'Não foi possível encontrar os dados. Verifique e tente novamente.'
        }
      )

      if (response.data.result) {
        setRotulosData([response.data.result])
      } else {
        toast.error(
          'Dados não encontrados... Verificar a chave e tentar novamente.'
        )
      }
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

  const onSelectFileType = eventKey => {
    setfindDataRotulos(prevState => ({
      ...prevState,
      fileType: eventKey
    }))
  }

  console.log(findDataRotulos)

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
                {...register('type_files')}
                value={findDataRotulos.type_files}
                onChange={onSelectFileType}
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
                onChange={handleFileChange}
                {...register('file')}
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
