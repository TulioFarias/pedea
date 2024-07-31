import { yupResolver } from '@hookform/resolvers/yup'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import apiPEDEA from '../../../../../../services/api'
import '../../../../../../sass/admin/DataExplorer/modalsDataExplorer/editModalDataExplorer.scss'

function EditDataExplorerCSV({ show, handleCloseModalCSV}) {
  
console.log(show)
console.log(handleCloseModalCSV)

  const schema = Yup.object().shape({
    
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

 
  

  const onSubmit = async data => {
    try {
    
      reset()
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error)
      reset()
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleCloseModalCSV}
      id="ContainerModalEditDataExplorerCSV"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Informação do Explorer de Dados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          Aqui editar a partir de um csv
        </Form>
      </Modal.Body>
    </Modal>
  )
}

EditDataExplorerCSV.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseModalCSV: PropTypes.func.isRequired
}

export default EditDataExplorerCSV
