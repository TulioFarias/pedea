import React from 'react'
import '../../sass/footer/footer.scss'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <Container fluid className=" my-div-footer">
      <p className="footer-text">
        Dados do mapa © 2023 Governo do Estado do Ceará. Todos os direitos
        reservados.
      </p>

      <span className="footer-divider">|</span>

      <a
        href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://pedea.sema.ce.gov.br/portal/termos_e_condicoes_de_uso_pedea.pdf"
        target="_blank"
        className="footer-link"
      >
        Termos e Condições de Uso
      </a>

      <span className="footer-divider">|</span>

      <a
        href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://pedea.sema.ce.gov.br/portal/aviso_privacidade_pedea.pdf"
        target="_blank"
        className="footer-link"
      >
        Aviso de Privacidade
      </a>
    </Container>
  )
}

export default Footer
