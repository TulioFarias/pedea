import React, { useState, useEffect } from 'react'
import '../../../../sass/admin/Users/users.scss'

import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import PeopleIcon from '@mui/icons-material/People'
import axios from 'axios'

function UserSystem({ setActiveButton, handleOptionChange }) {

  const { t } = useTranslation()

  // Estado para armazenar os valores de CPF, Nome e os usuários
  const [searchParams, setSearchParams] = useState({ cpf: '', nome: '' })
  const [users, setUsers] = useState([])

  // Função para atualizar os campos de CPF e Nome
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Função para buscar os usuários
  const handleSearch = () => {
    fetchUsers()
  }

  // Função para limpar os campos
  const handleClear = () => {
    setSearchParams({ cpf: '', nome: '' })
  }


  const fetchUsers = async (data) => {
    const cpfSemMascara = data.cpf.replace(/\D/g, '');
    try {
      const response = await axios.get('/users', { 
        params: searchParams 
      })

      console.log(response)
      setUsers(response.data) 
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

   const maskCPF = (value) => {
    const numeric = value.replace(/\D/g, '').slice(0, 11);
    return numeric
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  return (
    <div className="ContainerUsers">

      <div className="ContainerSearch">
        <div className="containerHeader">
          <PeopleIcon />
          <h6>{t("Consultar usuários")}</h6>
        </div>

        <Form>
          <Row className="align-items-center">
            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder={t('Digite o CPF')}
                name="cpf"
                value={searchParams.cpf}
               onChange={(e) => {
                const masked = maskCPF(e.target.value);
                handleInputChange({ target: { name: 'cpf', value: masked } });
              }}
              />
            </Col>


            <Col sm={6}>
              <Form.Control
                type="text"
                placeholder={t('Digite o Nome')}
                name="nome"
                value={searchParams.nome}
                onChange={handleInputChange}
              />
            </Col>


            <div className='containerButtons'>
              <Button variant="primary" onClick={handleSearch}>
                {t("Pesquisar")}
              </Button>
      
              <Button variant="secondary" onClick={handleClear}>
                {t("Limpar")}
              </Button>
            </div>
              
           
          </Row>
        </Form>
      </div>

      {/* Tabela de Usuários */}
      <div className="ContainerTable">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{t("Nome")}</th>
              <th>{t("CPF")}</th>
              <th>{t("Email")}</th>
              <th>{t("Ações")}</th> 
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(user.id)}>
                      {t("Editar")}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">{t("Nenhum usuário encontrado.")}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )

  function handleEdit(userId) {
    console.log('Editando usuário com ID:', userId)
   
  }
}

UserSystem.propTypes = {
  setActiveButton: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
}

export default UserSystem

