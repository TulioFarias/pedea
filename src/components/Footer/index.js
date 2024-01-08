import React from 'react'
import '../../sass/footer/footer.scss'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  return (
    <Container fluid className=" my-div-footer">
      <p className="footer-textOne">
        {t(
          'Dados do mapa © 2024 Governo do Estado do Ceará. Todos os direitos reservados.'
        )}
      </p>

      <a
        href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://pedea.sema.ce.gov.br/portal/termos_e_condicoes_de_uso_pedea.pdf"
        target="_blank"
        className="footer-textTwo"
      >
        {t('Termos e Condições de Uso')}
      </a>

      <a
        href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://pedea.sema.ce.gov.br/portal/aviso_privacidade_pedea.pdf"
        target="_blank"
        className="footer-textTwo"
      >
        {t('Aviso de Privacidade')}
      </a>
    </Container>
  )
}

export default Footer
