import { yupResolver } from '@hookform/resolvers/yup'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

import '../../../../sass/admin/Settings/photouserModal.scss'

function ModalChangePhotoUser({ showModalPhoto, setShowModalPhoto }) {
  const [fileName, setFileName] = useState(null)
  const [user, setUser] = useState([])
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData

  const schema = Yup.object().shape({
    file: Yup.mixed()
      .required('Por favor, carregue um arquivo')
      .test(
        'fileFormat',
        'Formato de arquivo inválido. Por favor, envie apenas arquivos PNG ou JPG.',
        value => {
          if (!value || !value[0]) {
            return false
          }
          return value[0].type === 'image/png' || value[0].type === 'image/jpeg'
        }
      )
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleClose = () => setShowModalPhoto(false)

  const onSubmit = async data => {
    try {
      const formData = new FormData()
      if (data.file && data.file.length > 0) {
        formData.append('file', data.file[0])
      }

      const response = await toast.promise(
        api.put(`/admin/update-user/${loggedInUserId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        {
          pending: 'Enviando sua foto...',
          success: 'Imagem atualizada com sucesso.',
          error: 'Ocorreu algum erro, tente novamente!'
        }
      )

      console.log('Arquivo enviado:', response)
      handleClose()
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin')
        const loggedInUser = data.filter(user => user.id === loggedInUserId)

        if (loggedInUser) {
          setUser(loggedInUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [])

  return (
    <>
      <Modal
        show={showModalPhoto}
        onHide={handleClose}
        id="ContainerModalChangePhoto"
      >
        <Modal.Header closeButton>
          <Modal.Title className="titleModalChangePhoto">
            Mudar foto de perfil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="customBodyModalChangePhoto">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formFile" className="mb-3">
              <p className="txtInfo">
                {' '}
                ⚠️ : Só serão aceitas imagens em png ou jpeg. Clique abaixo para
                selecionar uma imagem:
              </p>
              <Form.Label htmlFor="fileInput" className="fileImageLabel">
                {fileName || 'Selecione uma imagem:'}
                <UploadFileRoundedIcon fontSize="large" className="iconImg" />
              </Form.Label>

              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                className="in-file"
                {...register('file')}
                onChange={value => {
                  setFileName(value.target.files[0].name)
                }}
              />

              <p className="error-messageFile">{errors.file?.message}</p>
            </Form.Group>
            <Button variant="secondary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalChangePhotoUser.propTypes = {
  showModalPhoto: PropTypes.bool.isRequired,
  setShowModalPhoto: PropTypes.func.isRequired
}

export default ModalChangePhotoUser
