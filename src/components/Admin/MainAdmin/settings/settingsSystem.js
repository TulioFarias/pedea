import { yupResolver } from '@hookform/resolvers/yup';
import '../../../../sass/admin/Settings/settings.scss';
import { useEffect, useState } from 'react';
import BadgeIcon from '@mui/icons-material/Badge';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import api from '../../../../services/api';
import ModalChangePassword from './modalSettings/PasswordChange';
import ModalChangePhotoUser from './modalSettings/PhotoUserChange';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext'; 
import { Button } from 'primereact/button';
import PasswordIcon from '@mui/icons-material/Password';
function SettingsSystemAndUser() {
  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState([]);
  const userData = useSelector(state => state.userInfoSlice.infoUser);
  const { id: loggedInUserId } = userData;

  const handleShowPhoto = () => setShowModalPhoto(true);
  const handleShowPassword = () => setShowPassword(true);
  const { t } = useTranslation();

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
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();

    return `${dia} de ${mes} de ${ano}`;
  };

  return (
    <>
      <div className="containerInfoSettings">
        <BadgeIcon />
        <p>{t("Informações cadastrais")}</p>
      </div>

      {user && user.map((value) => (
        <div key={value.id} className=''>
          <div className="containerUserSettings">
            <label className="customLabelUser">{t(" Nome:")}</label>
            <InputText
              type="text"
              name="name"
              value={value.name}
              readOnly
              className="p-inputtext-sm valueInputCustom"
              style={{ width: '100%', borderRadius: '10px' }} 
            />

            <label className="customLabelUser">{t(" Email:")}</label>
            <InputText
              type="text"
              name="email"
              value={value.email}
              readOnly
              className="p-inputtext-sm valueInputCustom"
              style={{ width: '100%', borderRadius: '10px' }} 
            />

            <label className="customLabelUser">{t("Criado em:")}</label>
            <InputText
              type="text"
              name="createdAt"
              value={formatarDataLegivel(value.createdAt)}
              readOnly
              className="p-inputtext-sm valueInputCustom"
              style={{ width: '100%', borderRadius: '10px' }} 
            />

            <label className="customLabelUser">{t("Trocar sua senha?")}</label>
            <div className="d-flex align-items-center">
              <InputText
                type="password"
                name="password"
                value="XXXXXXXXXXX"
                readOnly
                className="p-inputtext-sm valueInputCustom"
                style={{ width: '100%', borderRadius: '10px' }} 
              />
              <Button onClick={handleShowPassword} className='btnPass'>
                <PasswordIcon/>
              </Button>
            </div>
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
    </>
  );
}

export default SettingsSystemAndUser;
