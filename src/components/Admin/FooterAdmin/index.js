import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import '../../../sass/admin/footerAdmin/footeradmin.scss'

function FooterAdmin() {
  const { t } = useTranslation()
  return (
    <Container fluid className=" my-div-footerAdmin">
      <p className="footer-textOneAdmin">
        {t(
          'Informações do Sistema © 2024 Governo do Estado do Ceará. Todos os direitos reservados.'
        )}
      </p>

      <a
        href="https://pedea.sema.ce.gov.br/portal/termos_e_condicoes_de_uso_pedea.pdf"
        target="_blank"
        className="footer-textTwoAdmin"
        rel="noreferrer"
      >
        {t('Termos e Condições de Uso')}
      </a>

      <a
        href="https://pedea.sema.ce.gov.br/portal/aviso_privacidade_pedea.pdf"
        target="_blank"
        className="footer-textTwoAdmin"
        rel="noreferrer"
      >
        {t('Aviso de Privacidade')}
      </a>
    </Container>
  )
}

export default FooterAdmin
