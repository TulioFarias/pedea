import React, { useState } from 'react'

import '../../sass/admin/settings.scss'

function SettingsAdmin() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Dados do formulário enviados:', formData)
  }
  return (
    <>
      <div className="containerAll">
        <div className="containerSettings">
          <h2>Configurações</h2>
        </div>
      </div>
    </>
  )
}

export default SettingsAdmin
