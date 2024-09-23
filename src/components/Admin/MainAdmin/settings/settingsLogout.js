import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { logout } from '../../../../utils/redux/user/actions';
import { useNavigate } from 'react-router-dom'
import '../../../../sass/admin/Settings/logoutsystemsettings.scss'
function LogoutComponent() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const voltar = () => {
    dispatch(logout())

    navigate('/login')
  }
  

  return (
    <Container className="ContainerLogoutUserSettings">
      <div className="logout-div">
        <p>Deseja sair?</p>
        <Button variant="danger" onClick={voltar}>
          Sair
        </Button>
      </div>
    </Container>
  );
}

export default LogoutComponent;
