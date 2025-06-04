import { yupResolver } from '@hookform/resolvers/yup'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Toast } from 'primereact/toast'

import apiPEDEA from '../../../../../../services/api'
import '../../../../../../sass/admin/DataExplorer/modalsDataExplorer/removeModalDataExplorer.scss'

function DeletaModalDataExplorer({ show, handleClose,handleTableUpdate }) {
  const toast = useRef(null)

  const [dataExplorer, setDataExplorer] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isDeletable, setIsDeletable] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const schema = Yup.object().shape({
    id: Yup.number().required('Campo obrigatório')
  })

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    async function getInfoDataExplorer() {
      try {
        const { data } = await apiPEDEA.get('/infoDataExplorer')
        const sortedData = data.sort((a, b) => a.id - b.id)
        setDataExplorer(sortedData)
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error)
        toast.current?.show({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível buscar os dados',
          life: 4000
        })
      }
    }
    getInfoDataExplorer()
  }, [])

  const handleSelectChange = e => {
    const selectedId = e.target.value
    setSelectedId(selectedId)
    setIsDeletable(true)
    const selectedData = dataExplorer.find(
      item => item.id === parseInt(selectedId)
    )

    if (selectedData) {
      Object.keys(selectedData).forEach(key => {
        setValue(key, selectedData[key])
      })
    }
  }

  const onDelete = async (data, event) => {
    try {
      const payload = {
        id: parseInt(selectedId)
      }

      toast.current?.show({
        severity: 'info',
        summary: 'Atualizando',
        detail: 'Excluindo dados...',
        life: 2000
      })

      await apiPEDEA.delete('/deleteDataExplorer', {
        data: payload
      })

      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Dados excluídos do banco de dados',
        life: 4000
      })

      reset()
      setSelectedId(null)
      setIsDeletable(false)
      setIsChecked(false)
      handleClose()
      handleTableUpdate()
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível excluir os dados',
        life: 4000
      })
      console.log(error)
    }
  }

  const handleCheckboxChange = e => {
    setIsChecked(e.target.checked)
  }

  return (
    <>
      <Toast ref={toast} />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        id="ContainerModalDeleteDataExplorer"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletar Informação do Explorer de Dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="selectId" className="ContainerRemove">
              <Form.Label>Selecione o ID</Form.Label>
              <Form.Control
                as="select"
                onChange={handleSelectChange}
                value={selectedId || ''}
                className="inputID"
              >
                <option value="" disabled>
                  Selecione um ID
                </option>
                {dataExplorer.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedId && (
              <div className="ContainerAllInfoDelete">
                {dataExplorer.map(
                  item =>
                    item.id === parseInt(selectedId) && (
                      <React.Fragment key={item.id}>
                        <Form.Group controlId="categoria_de_informacao">
                          <Form.Label>Categoria de Informação</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.categoria_de_informacao}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.categoria_de_informacao?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="classe_maior">
                          <Form.Label>Classe Maior</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.classe_maior}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.classe_maior?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="sub_classe_maior">
                          <Form.Label>Subclasse Maior</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.sub_classe_maior}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.sub_classe_maior?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="classe_menor">
                          <Form.Label>Classe Menor</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.classe_menor}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.classe_menor?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="nomenclatura_pedea">
                          <Form.Label>Nomenclatura PEDEA</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.nomenclatura_pedea}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nomenclatura_pedea?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="fonte">
                          <Form.Label>Fonte</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.fonte}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fonte?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="coluna_atributo">
                          <Form.Label>Coluna Atributo</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.coluna_atributo}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.coluna_atributo?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="link_drive_shp">
                          <Form.Label>Link Drive SHP</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.link_drive_shp}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.link_drive_shp?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="link_drive_kml">
                          <Form.Label>Link Drive KML</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.link_drive_kml}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.link_drive_kml?.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="key_rotulos">
                          <Form.Label>Chave</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={item.key_rotulos}
                            disabled
                            className="inputDeleteModalDE"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.key_rotulos?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </React.Fragment>
                    )
                )}
              </div>
            )}

            {selectedId && (
              <Form.Group
                controlId="confirmationCheckbox"
                className="containerConfirmDelete"
              >
                <p>
                  ⚠️ : Para excluir permanetemente a camada do explorador de
                  dados, confirme aqui:
                </p>
                <Form.Check
                  type="checkbox"
                  label="Confirmo que desejo deletar esta informação."
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
              </Form.Group>
            )}
          </Form>
          {isDeletable && isChecked && (
            <div className="containerBtnsDelete">
              <Button variant="danger" onClick={handleSubmit(onDelete)}>
                <DeleteOutlineRoundedIcon className="iconDelete" />
                Deletar
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

DeletaModalDataExplorer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
}

export default DeletaModalDataExplorer
