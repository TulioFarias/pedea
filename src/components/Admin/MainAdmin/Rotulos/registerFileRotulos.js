import { yupResolver } from '@hookform/resolvers/yup'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/importRotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

function ImportFileRotulos() {
  const [findDataRotulos, setfindDataRotulos] = useState({
    key: '',
    fileType: '',
    file: null
  })
  const [rotulosData, setRotulosData] = useState([])
  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    fileType: Yup.string().required('O tipo de arquivo é obrigatório'),
    file: Yup.mixed().required('O arquivo é obrigatório')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

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
  }

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
                Tipo de Arquivo:
              </Form.Label>
              <Form.Control
                as="select"
                className="inputRotulosImports"
                {...register('fileType')}
                onChange={handleChange}
              >
                <option value="" className="customOptionsSelect">
                  Selecione um arquivo
                </option>
                <option value="csv" className="customOptionsSelect">
                  CSV
                </option>
                <option value="xml" className="customOptionsSelect">
                  XML
                </option>
                <option value="shp" className="customOptionsSelect">
                  SHP
                </option>
              </Form.Control>
              <p className="txtErrorPassword">{errors.fileType?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulosImports">Arquivo:</Form.Label>
              <Form.Control
                type="file"
                className="inputRotulosImportsFiles"
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
