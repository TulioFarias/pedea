import React from 'react'

function RegisterSystem() {
  return (
    <div>
      <h1>Sistema de registro</h1>
      <label>Nome:</label>
      <input type="name" />

      <label>Email:</label>
      <input type="email" />

      <label>Senha:</label>
      <input type="password" />

      <button type="submit">Enviar</button>
    </div>
  )
}

export default RegisterSystem
