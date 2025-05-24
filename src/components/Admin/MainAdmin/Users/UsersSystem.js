import React, { useState, useEffect } from 'react'
import '../../../../sass/admin/Users/users.scss'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import PeopleIcon from '@mui/icons-material/People'
import apiPEDEA from '../../../../services/api'
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
function UserSystem() {

  const { t } = useTranslation()

  
  const [searchParams, setSearchParams] = useState({ cpf: '', nome: '' })
  const [users, setUsers] = useState([])
  


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

 
 const handleClear = () => {
  setSearchParams({ cpf: '', nome: '' })
  setUsers([]) 
}

  


const handleSearch = async () => {
  try {
    const params = {}

    if (searchParams.cpf.trim()) {
      params.cpf = searchParams.cpf.replace(/\D/g, '') 
    }

    if (searchParams.nome.trim()) {
      params.nome = searchParams.nome.trim()
    }

    const { data } = await apiPEDEA.get('/users', { params })
    setUsers(data)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    setUsers([])
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
        <div className="containerHeaderUsers">
          <PeopleIcon />
          <p>{t("Consultar usuários")}</p>
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
              <Button className='btnSearch' onClick={handleSearch}>
                <SearchIcon/>
                {t("Pesquisar")}
              </Button>
      
              <Button variant="secondary" className='btnClean' onClick={handleClear}>
                <CleaningServicesIcon/>
                {t("Limpar")}
              </Button>
            </div>
              
           
          </Row>
        </Form>
      </div>

     
     <div className="ContainerTable">
        <DataTable
          value={users}
          dataKey="id"
          emptyMessage={t("Nenhum usuário encontrado.")}
          stripedRows
          responsiveLayout="scroll"
        >
          <Column field="id" header={t("Id")} />
          <Column field="name" header={t("Nome")} />
          <Column field="cpf" header={t("CPF")} />
          <Column field="email" header={t("Email")} />
          <Column
            field="admin"
            header={t("Administrador")}
            body={rowData => (rowData.admin ? t("Sim") : t("Não"))}
          />
          <Column
            field="gerente"
            header={t("Gerente")}
            body={rowData => (rowData.gerente ? t("Sim") : t("Não"))}
          />
          <Column
            header={t("Editar")}
            body={rowData => (
              <Button className="btnEditUser" onClick={() => handleEdit(rowData.id)}>
                <EditNoteRoundedIcon />
              </Button>
            )}
          />
        </DataTable>
      </div>
    </div>
  )

  function handleEdit(userId) {
    console.log('Editando usuário com ID:', userId)
   
  }
}

export default UserSystem

