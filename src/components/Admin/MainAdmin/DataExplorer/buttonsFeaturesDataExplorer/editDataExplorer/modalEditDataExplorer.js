import { yupResolver } from '@hookform/resolvers/yup'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Toast } from 'primereact/toast'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import apiPEDEA from '../../../../../../services/api'
import '../../../../../../sass/admin/DataExplorer/modalsDataExplorer/editModalDataExplorer.scss'

function EditaModalDataExplorer({ show, handleClose, handleTableUpdate }) {
  const toast = useRef(null)

  const [dataExplorer, setDataExplorer] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const userData = useSelector((state) => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData
  const [user, setUser] = useState([])

  const schema = Yup.object().shape({
    categoria_de_informacao: Yup.string().required('Campo obrigatório'),
    classe_maior: Yup.string().required('Campo obrigatório'),
    sub_classe_maior: Yup.string().nullable(),
    classe_menor: Yup.string().nullable(),
    nomenclatura_greencloud: Yup.string().required('Campo obrigatório'),
    nomenclatura_pedea: Yup.string().required('Campo obrigatório'),
    fonte: Yup.string().required('Campo obrigatório'),
    coluna_atributo: Yup.string().required('Campo obrigatório'),
    link_drive_shp: Yup.string().url('URL inválida'),
    link_drive_kml: Yup.string().url('URL inválida'),
    key_rotulos: Yup.string().nullable()
  })

  const {
    register,
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
      }
    }
    getInfoDataExplorer()

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

  const handleSelectChange = e => {
    const selectedId = e.target.value
    setSelectedId(selectedId)
    setIsEditable(false)
    const selectedData = dataExplorer.find(
      item => item.id === parseInt(selectedId)
    )

    if (selectedData) {
      Object.keys(selectedData).forEach(key => {
        setValue(key, selectedData[key])
      })
    }
  }

  const enableEditing = () => {
    setIsEditable(true)
    reset()
  }

  const onSubmit = async data => {
    if (!selectedId) {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Selecione um ID antes de atualizar', life: 3000 })
      return
    }

    toast.current.show({ severity: 'info', summary: 'Atualizando', detail: 'Atualizando dados...', sticky: true })

    try {
      await apiPEDEA.put('/updateDataExplorer', {
        id: parseInt(selectedId),
        categoriadeinformacao: data.categoria_de_informacao,
        classemaior: data.classe_maior,
        subclassemaior: data.sub_classe_maior,
        classemenor: data.classe_menor,
        nomenclaturagreencloud: data.nomenclatura_greencloud,
        nomenclaturapedea: data.nomenclatura_pedea,
        fonte: data.fonte,
        colunaatributo: data.coluna_atributo,
        linkdriveshp: data.link_drive_shp,
        linkdrivekml: data.link_drive_kml,
        key_rotulos: data.key_rotulos,
        user_id: loggedInUserId
      })

      toast.current.clear()
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Dados atualizados no banco de dados', life: 3000 })
      reset()
      handleClose()
      handleTableUpdate()
    } catch (error) {
      toast.current.clear()
      const message = (error.response && error.response.data && error.response.data.error) || 'Erro desconhecido, fale com o administrador do sistema.'
      toast.current.show({ severity: 'error', summary: 'Erro', detail: message, life: 5000 })
      console.error('Erro ao atualizar os dados:', error)
      reset()
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        id="ContainerModalEditDataExplorer"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Informação do Explorer de Dados</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="selectId" className="ContainerId">
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
              <>
                <div className="BtnEditDE">
                  <Button
                    variant="secondary"
                    onClick={enableEditing}
                    disabled={isEditable}
                  >
                    <EditNoteRoundedIcon /> Editar
                  </Button>
                </div>

                <p className='titleTxt'>Os campos com * marcados são obrigatórios</p>

                {dataExplorer.map(
                  item =>
                    item.id === parseInt(selectedId) && (
                      <React.Fragment key={item.id}>
                        <div className="ContainerAllInfoEdit">
                          <Form.Group controlId="categoria_de_informacao">
                            <Form.Label>Categoria de Informação *</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('categoria_de_informacao')}
                              isInvalid={errors.categoria_de_informacao}
                              defaultValue={item.categoria_de_informacao}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.categoria_de_informacao?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="classe_maior">
                            <Form.Label>Classe Maior *</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('classe_maior')}
                              isInvalid={errors.classe_maior}
                              defaultValue={item.classe_maior}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.classe_maior?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="sub_classe_maior">
                            <Form.Label>Subclasse Maior </Form.Label>
                            <Form.Control
                              type="text"
                              {...register('sub_classe_maior')}
                              isInvalid={errors.sub_classe_maior}
                              defaultValue={item.sub_classe_maior}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.sub_classe_maior?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="classe_menor">
                            <Form.Label>Classe Menor</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('classe_menor')}
                              isInvalid={errors.classe_menor}
                              defaultValue={item.classe_menor}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.classe_menor?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="nomenclatura_greencloud">
                            <Form.Label>Nomenclatura Green Cloud *</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('nomenclatura_greencloud')}
                              isInvalid={errors.nomenclatura_greencloud}
                              defaultValue={item.nomenclatura_greencloud}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.nomenclatura_greencloud?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="nomenclatura_pedea">
                            <Form.Label>Nomenclatura PEDEA *</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('nomenclatura_pedea')}
                              isInvalid={errors.nomenclatura_pedea}
                              defaultValue={item.nomenclatura_pedea}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.nomenclatura_pedea?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="fonte">
                            <Form.Label>Fonte *</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('fonte')}
                              isInvalid={errors.fonte}
                              defaultValue={item.fonte}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.fonte?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="coluna_atributo">
                            <Form.Label>Coluna Atributo *</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('coluna_atributo')}
                              isInvalid={errors.coluna_atributo}
                              defaultValue={item.coluna_atributo}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.coluna_atributo?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="link_drive_shp">
                            <Form.Label>Link Drive SHP</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('link_drive_shp')}
                              isInvalid={errors.link_drive_shp}
                              defaultValue={item.link_drive_shp}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.link_drive_shp?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="link_drive_kml">
                            <Form.Label>Link Drive KML</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('link_drive_kml')}
                              isInvalid={errors.link_drive_kml}
                              defaultValue={item.link_drive_kml}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.link_drive_kml?.message}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group controlId="key_rotulos">
                            <Form.Label>Key Rotulos</Form.Label>
                            <Form.Control
                              type="text"
                              {...register('key_rotulos')}
                              isInvalid={errors.key_rotulos}
                              defaultValue={item.key_rotulos}
                              disabled={!isEditable}
                              className="inputEditModalDE"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.key_rotulos?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </React.Fragment>
                    )
                )}
              </>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            className='BtnEditAtualizar'
            disabled={!isEditable}
            onClick={handleSubmit(onSubmit)}
          >
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

EditaModalDataExplorer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
}

export default EditaModalDataExplorer
