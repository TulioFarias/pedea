import { yupResolver } from '@hookform/resolvers/yup'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import '../../../../../sass/admin/Rotulos/tableResultSearchWithKey.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { saveAs } from 'file-saver'

import api from '../../../../../services/api'

function ContainerGetInfoRotulos() {
  const [findDataRotulos, setfindDataRotulos] = useState({
    key: ''
  })
  const [rotulosData, setRotulosData] = useState([])
  const [filesRotulosData, setFilesRotulosData] = useState([])
  const [valuesDataFileRotulos, setValuesDataFileRotulos] = useState([])
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

        const responseFiles = await api.post('/getWithKeyRotulosCSV', {
          key: data.key
        })

        if (responseFiles.data.result) {
          setFilesRotulosData([responseFiles.data.result])
        }

        if (responseFiles.data.dataRotulos) {
          setValuesDataFileRotulos(responseFiles.data.dataRotulos)
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

  const formatarDataLegivel = dataString => {
    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ]

    const data = new Date(dataString)
    const dia = data.getDate()
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
    const horas = data.getHours()
    const minutos = data.getMinutes().toString().padStart(2, '0')

    return `${dia} de ${mes} de ${ano} - ${horas}:${minutos}`
  }

  const getIdFilesToDownload = async id => {
    toast.promise(
      api
        .get(`/downloadFile/${id}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'text/csv' })
          saveAs(blob, 'nome_do_arquivo.csv')
        }),
      {
        pending: 'Baixando o arquivo...',
        success: 'Arquivo baixado com sucesso!',
        error: 'Erro ao baixar o arquivo.'
      }
    )
  }

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
                isInvalid={errors.key}
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
            ))}

          <div className="containerTableResultFiles">
            {filesRotulosData &&
              filesRotulosData.length > 0 &&
              filesRotulosData[0] &&
              filesRotulosData.map((filesArray, index) => (
                <div key={index}>
                  {filesArray.length > 0 ? (
                    <React.Fragment>
                      <p>Arquivos encontrados relacionados à chave:</p>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Tipo de arquivo</th>
                            <th>Arquivo</th>
                            <th>Data de Criação</th>
                            <th>Última Atualização</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filesArray.map(value => (
                            <tr key={value.id}>
                              <td>{value.name}</td>
                              <td>{value.type_files}</td>
                              <td id="valuePathWithIcon">
                                {value.path}{' '}
                                <DownloadRoundedIcon
                                  className="iconDownload"
                                  onClick={() => getIdFilesToDownload(value.id)}
                                />
                              </td>
                              <td>{formatarDataLegivel(value.createdAt)}</td>
                              <td>{formatarDataLegivel(value.updatedAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </React.Fragment>
                  ) : (
                    <p>
                      Arquivos relacionado a essa chave não foram encontrados.
                    </p>
                  )}
                </div>
              ))}
          </div>

          {valuesDataFileRotulos && valuesDataFileRotulos.length > 0 && (
            <div className="containerTableResultValues">
              <p>
                Valores encontrados relacionados à chave no explorador de dados:
              </p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Categoria de Informação</th>
                    <th>Classe Maior</th>
                    <th>Subclasse Maior</th>
                    <th>Classe Menor</th>
                    <th>Coluna Atributo</th>
                    <th>Fonte</th>
                    <th>Nomenclatura GreenCloud</th>
                    <th>Nomenclatura PEDEA</th>
                    <th>Link Drive SHP</th>
                    <th>Link Drive KML</th>
                    <th>Data de Criação</th>
                    <th>Última Atualização</th>
                  </tr>
                </thead>
                <tbody>
                  {valuesDataFileRotulos
                    .slice()
                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                    .map(value => (
                      <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.categoria_de_informacao}</td>
                        <td>{value.classe_maior}</td>
                        <td>{value.sub_classe_maior}</td>
                        <td>{value.classe_menor}</td>
                        <td>{value.coluna_atributo}</td>
                        <td>{value.fonte}</td>
                        <td>{value.nomenclatura_greencloud}</td>
                        <td>{value.nomenclatura_pedea}</td>
                        <td>{value.link_drive_shp}</td>
                        <td>{value.link_drive_kml}</td>
                        <td>{formatarDataLegivel(value.createdAt)}</td>
                        <td>{formatarDataLegivel(value.updatedAt)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default ContainerGetInfoRotulos
