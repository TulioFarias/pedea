import { yupResolver } from '@hookform/resolvers/yup'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import '../../../../../sass/admin/Rotulos/tableResultSearchWithKey.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../../services/api'

function ContainerGetInfoRotulos() {
  const [findDataRotulos, setfindDataRotulos] = useState({
    key: ''
  })
  const [rotulosData, setRotulosData] = useState([])
  const [filesRotulosData, setFilesRotulosData] = useState([])
  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória')
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

  const onSubmit = async data => {
    try {
      const responseRotulos = await toast.promise(
        api.post('/getRotulos', {
          key: data.key
        }),
        {
          pending: 'Buscando...',
          success: 'Dados encontrados.',
          error: 'Chave não encontrada, verifique e tente novamente...'
        }
      )

      if (responseRotulos.data.result) {
        setRotulosData([responseRotulos.data.result])

        const responseFiles = await api.post('/getAllRotulosCSV', {
          key: data.key
        })

        if (responseFiles.data.result) {
          setFilesRotulosData(responseFiles.data.result)
        } else {
          console.log('Arquivos não encontrados para esta chave.')
        }
      } else {
        toast.error(
          'Dados não encontrados... Verificar a chave e tentar novamente.'
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(filesRotulosData)

  return (
    <>
      <div className="containerResultofRotulos">
        <p className="titleGetRotulosWithKey">
          Buscar valores e arquivos de um rótulo:
        </p>
        <Form className="ResultRotulos" onSubmit={handleSubmit(onSubmit)}>
          <div className="containerSearchWithKey">
            <Form.Group>
              <Form.Label className="LabelRotulos">Chave:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o valor da chave..."
                className="InputRotulos"
                {...register('key')}
                onChange={handleChange}
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className="btnSubmitGetRotulos"
            >
              <ManageSearchRoundedIcon />
            </Button>
          </div>
        </Form>

        <div className="ContainerValuesDataRotulos">
          {rotulosData &&
            rotulosData.map(value => (
              <div key={value.id}>
                <p>Aqui estão os valores encontrados:</p>
                <Table striped bordered hover>
                  <div key={value.id}>
                    <Table striped bordered hover>
                      <thead>
                        <tr className="tableResultHeader">
                          <th>ID</th>
                          <th>Chave</th>
                          <th>Português</th>
                          <th>Inglês</th>
                          <th>Espanhol</th>
                        </tr>
                      </thead>
                      <tbody className="containerResultRotulosTable">
                        <tr>
                          <td>{value.id}</td>
                          <td>{value.key}</td>
                          <td>{value.pt_br}</td>
                          <td>{value.en}</td>
                          <td>{value.es}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Table>
              </div>
            ))}
          <hr className="LineHR" />

          <div className="containerTableResultFiles">
            {Object.keys(filesRotulosData).length > 0 ? (
              <div className="containerTableResultFiles">
                <p>Arquivos encontrados relacionados à chave:</p>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Tipo de arquivo</th>
                      <th>Path</th>
                      <th>Data de Criação</th>
                      <th>Última Atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={filesRotulosData.id}>
                      <td>{filesRotulosData.name}</td>
                      <td>{filesRotulosData.type_files}</td>
                      <td>{filesRotulosData.path}</td>
                      <td>{filesRotulosData.createdAt}</td>
                      <td>{filesRotulosData.updatedAt}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="containerTableResultFiles">
                <p>Nenhum arquivo relacionado à chave foi encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ContainerGetInfoRotulos
