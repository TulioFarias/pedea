import { yupResolver } from '@hookform/resolvers/yup';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import '../../../../sass/admin/Settings/settings.scss';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import  { useEffect, useState } from 'react';
import BadgeIcon from '@mui/icons-material/Badge';
import {
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Container
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import userIcon from '../../../../assets/icons/icon-user.png';
import api from '../../../../services/api';
import ModalChangePassword from './modalSettings/PasswordChange';
import ModalChangePhotoUser from './modalSettings/PhotoUserChange';
import { useTranslation } from 'react-i18next'
function SettingsSystemAndUser() {
  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);
  const userData = useSelector(state => state.userInfoSlice.infoUser);
  const { id: loggedInUserId } = userData;

  const handleShowPhoto = () => setShowModalPhoto(true);
  const handleShowPassword = () => setShowPassword(true);
  const { t } = useTranslation()
  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin');
        const loggedInUser = data.filter(user => user.id === loggedInUserId);

        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    loadUserData();
  }, [loggedInUserId]);

  const schema = Yup.object().shape({
    file: Yup.mixed().required('Por favor, carregue um arquivo')
  });

  const {
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const formatarDataLegivel = dataString => {
    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ];

    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();

    return `${dia} de ${mes} de ${ano}`;
  };

 return (
  <div className="ContainerSettingsAndUser">
    <div className="containerInfoSettings">
      <BadgeIcon />
      <p>{t("Informações cadastrais")}</p>
    </div>

    {user &&
      user.map((value) => (
        <div key={value.id} className='ContainerInfoUser'>
          <div className="containerUserSettings">

              <Form.Label className="customLabelUser">{t(" Nome:")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={value.name}
                readOnly
                className="valueInputCustom"
              />

              <Form.Label className="customLabelUser">{t(" Email:")}</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={value.email}
                readOnly
                className="valueInputCustom"
              />

              <Form.Label className="customLabelUser">
                {t("Criado em:")}
              </Form.Label>
              <Form.Control
                type="text"
                name="create"
                value={formatarDataLegivel(value.createdAt)}
                readOnly
                className="valueInputCustom"
              />

              <Form.Label className="customLabelUser">
                {t("Trocar sua senha?")}
              </Form.Label>
              <InputGroup>
                <FormControl
                  type="password"
                  name="password"
                  className="valueInputCustom"
                  value={"XXXXXXXXXXX"}
                />
                <Button variant="secondary" onClick={handleShowPassword}>
                  <EditRoundedIcon />
                </Button>
              </InputGroup>
           
          </div>

          <ModalChangePhotoUser
            showModalPhoto={showModalPhoto}
            setShowModalPhoto={setShowModalPhoto}
          />
          <ModalChangePassword
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
      ))}
  </div>
);

}

export default SettingsSystemAndUser;


