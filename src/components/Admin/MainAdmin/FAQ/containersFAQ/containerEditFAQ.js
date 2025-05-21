import React, { useState, useEffect } from 'react';
import { Carousel, Button, Form } from 'react-bootstrap';
import '../../../../../sass/admin/FAQ/EditAndDeleteFAQ.scss';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import apiPEDEA from '../../../../../services/api';
import ModalFAQDelete from '../modalFAQ/modalDeleteFAQ';
import ModalEditFAQ from '../modalFAQ/modalEditFAQ';
import { useTranslation } from 'react-i18next';

function ShowContainerEditFAQ() {
  const { t } = useTranslation(); // Hook para tradução
  const [valuesFAQ, setValuesFAQ] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idEditValueFAQ, setIdEditValueFAQ] = useState(null);

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/allValuesFAQ');
        setValuesFAQ(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    loadRotulosData();
  }, []);

  const openModalNow = (id) => {
    setOpenModal(true);
    setIdEditValueFAQ(id);
  };

  const OpenModalDeleteFAQ = (id) => {
    setOpenModalDelete(true);
    setIdEditValueFAQ(id);
  };

  return (
    <div className="ContainerFAQAllItens">
      <p>
        {t("Todas as perguntas ativas na página de perguntas frequentes estão abaixo:")}
      </p>
      <Carousel 
      interval={null} 
      controls={true} 
      className="carouselCustomFAQ">
        {valuesFAQ.map((faq, index) => (
          <Carousel.Item key={index}>
            <div className="ContainerItensCarousel">
              <Form.Group>
                <Form.Label className="LabelFAQEditAndDelete">
                  {t("Pergunta ativa:")}
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={faq.question}
                  readOnly
                  className='inputValuesFAQ'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="LabelFAQEditAndDelete">
                  {t("Resposta ativa:")}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={faq.answer}
                  readOnly
                  className='inputValuesFAQ'
                />
              </Form.Group>
              <div className="ContainerBtnsFAQ">
                <Button
                  className="BtnsIconsEditFAQ"
                  onClick={() => openModalNow(faq.id)}
                >
                  <DrawRoundedIcon />
                </Button>
                <Button
                  className="BtnsIconsFAQDelete"
                  onClick={() => OpenModalDeleteFAQ(faq.id)}
                >
                  <DeleteForeverRoundedIcon />
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <ModalEditFAQ
        setOpenModal={setOpenModal}
        openModal={openModal}
        idEditValue={idEditValueFAQ}
      />
      <ModalFAQDelete
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        idEditValue={idEditValueFAQ}
      />
    </div>
  );
}

export default ShowContainerEditFAQ;

