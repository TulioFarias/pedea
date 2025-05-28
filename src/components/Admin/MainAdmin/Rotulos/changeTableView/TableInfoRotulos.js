
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'
import api from '../../../../../services/api';
import ModalConfirmDelete from '../modalsRotulos/modalDelete';
import EditModalRotulos from '../modalsRotulos/modalEdit';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TranslateIcon from '@mui/icons-material/Translate';
import '../../../../../sass/admin/Rotulos/tableRotulos.scss'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
function ContainerInfoRotulos({
  tableUpdated,
  handleTableUpdate,
  setEditItemId,
  editItemId
}) {


  const { t } = useTranslation()
  const [rotulosData, setRotulosData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);


  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await api.get('/getRotulosBilingue');
        setRotulosData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    loadRotulosData();
  }, [tableUpdated]);

  const openModalNow = () => {
    setOpenModal(true);
  };

  const openEditModalNow = (id) => {
    setOpenModalEdit(true);
    setEditItemId(id);
  };

  const formatarDataLegivel = (dataString) => {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = data.getHours();
    const minutos = data.getMinutes().toString().padStart(2, '0');

    return `${dia} de ${mes} de ${ano} - ${horas}:${minutos}`;
  };

  const header = (
    <div className="flex justify-between items-center containerHeader">

      <div className='containerTitle'>
        <TranslateIcon/>
        <h3 className="text-lg font-semibold">{t("Tabela de rótulos bilíngue cadastrados:")}</h3>
      </div>
      
      <span className="p-input-icon-left">
         <FloatLabel>
          <InputText
            id="busca"
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className='valueInputCustom'
            style={{borderRadius: '10px'}}
          />
          <label htmlFor="busca">Pesquisar...</label>
        </FloatLabel>
      </span>
    </div>
  );

  return (
    
    <div className="card containerTableBilingue">
      <DataTable
        ref={dt}
        value={rotulosData}
        header={header}
        globalFilter={globalFilter}
        dataKey="id"
        emptyMessage={t("Nenhum dado encontrado.")}
        stripedRows
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '60rem' }}
      >
        <Column field="id" header="ID" 
                headerStyle={{ textAlign: 'center'
                 }}
                bodyStyle={{ textAlign: 'center' }}/>
                
        <Column field="key" header="Chave" 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>

        <Column field="pt_br" header="Português" 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>

        <Column field="en" header="Inglês" 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>

        <Column field="es" header="Espanhol" 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>

        <Column header="Enviado por" 
                body={(rowData) => rowData.user?.name || ''} 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>

        <Column field="createdAt" header="Criado em" 
                body={(rowData) => formatarDataLegivel(rowData.createdAt)} 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>

        <Column field="updatedAt" header="Atualizado em" 
                body={(rowData) => formatarDataLegivel(rowData.updatedAt)} 
                headerStyle={{ textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center' }}/>
        <Column
            header="Editar ou Excluir"
            body={(rowData) => (
              <div className="containerBtnsTableView">
                <button
                  onClick={() => openEditModalNow(rowData.id)}
                  className="btnEditCustom"
                >
                  <EditNoteRoundedIcon />
                </button>
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setEditItemId(rowData.id);
                  }}
                  className="btnRemoveCustom"
                >
                  <DeleteSweepRoundedIcon />
                </button>
              </div>
            )}
            style={{ textAlign: 'center', width: '8rem' }}
/>
      </DataTable>

      <ModalConfirmDelete
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleTableUpdate={handleTableUpdate}
      />
      <EditModalRotulos
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        handleTableUpdate={handleTableUpdate}
        editItemId={editItemId}
      />
    </div>
  );
}

ContainerInfoRotulos.propTypes = {
  tableUpdated: PropTypes.bool.isRequired,
  handleTableUpdate: PropTypes.func.isRequired,
  setEditItemId: PropTypes.func.isRequired,
  editItemId: PropTypes.string.isRequired
};

export default ContainerInfoRotulos;