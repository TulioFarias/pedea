import React, { useState, useEffect } from 'react';
import '../../../../../sass/admin/FAQ/EditAndDeleteFAQ.scss';
import apiPEDEA from '../../../../../services/api';
import ModalFAQDelete from '../modalFAQ/modalDeleteFAQ';
import ModalEditFAQ from '../modalFAQ/modalEditFAQ';
import { useTranslation } from 'react-i18next';

import { ButtonGroup } from 'primereact/buttongroup';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';

function ShowContainerEditFAQ() {
  const { t } = useTranslation();
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
        console.error('Error fetching FAQ data:', error);
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

  const faqTemplate = (faq, index) => {
    return (
      <Card key={index} className="FAQCard">
        <div className="faqInputGroup">
          <label className="LabelFAQEditAndDelete">{t("Pergunta ativa:")}</label>
          <InputText
            value={faq.question}
            readOnly
            className="inputValuesFAQ p-inputtext-sm valueInputCustom"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        <div className="faqInputGroup">
          <label className="LabelFAQEditAndDelete">{t("Resposta ativa:")}</label>
          <InputTextarea
            value={faq.answer}
            readOnly
            className="inputValuesFAQ p-inputtextarea-sm valueInputCustom"
            rows={4}
            style={{ width: '100%' , borderRadius: '10px'}}
          />
        </div>

        <ButtonGroup className="ButtonGroupFAQ">
          <Button
            label={t("Editar")}
            icon="pi pi-pencil"
            severity="warning"
            onClick={() => openModalNow(faq.id)}
            className='btnEditarFaq'
          />
          <Button
            label={t("Deletar")}
            icon="pi pi-trash"
            severity="danger"
            onClick={() => OpenModalDeleteFAQ(faq.id)}
            className='btnDeleteFaq'
          />
        </ButtonGroup>
      </Card>
    );
  };

  return (
    <>
      <Carousel
        value={valuesFAQ}
        itemTemplate={faqTemplate}
        numVisible={1}
        numScroll={1}
        circular
        showIndicators
        showNavigators
        className="FAQCarousel"
      />

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
    </>
  );
}

export default ShowContainerEditFAQ;
