import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import '../../../../sass/admin/HomeAdmin/carditems.scss';
import PropTypes from 'prop-types';
import apiPEDEA from "../../../../services/api";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function CardItems({ setActiveButton, handleOptionChange }) {
    const { t } = useTranslation();
    const [user, setUser] = useState();
    const userData = useSelector(state => state.userInfoSlice.infoUser);
    const { id: loggedInUserId } = userData;

    const handleButtonClick = (option) => {
        if (option === 'Configurações' || user?.admin) {
            setActiveButton(option);
            handleOptionChange(option);
        } else {
            toast.error(t('Você não tem permissão para acessar esses módulos, acesso apenas para administradores.'));
        }
    };

    useEffect(() => {
        async function getUser() {
            try {
                const { data } = await apiPEDEA.get('/admin');
                const loggedInUser = data.find(user => user.id === loggedInUserId);
                if (loggedInUser) {
                    setUser(loggedInUser); 
                }
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    }, []);

    return (
        <div className="ContainerCards">
            <Card className="CardContainers" onClick={e => {
                e.preventDefault();
                handleButtonClick('Rotulos Bilingue');
            }}>
                <Card.Body className="CardBodys">
                    <Card.Title className="CardTitles">1. {t("Módulo de Rótulos Bilíngues")}</Card.Title>
                    <Card.Text className="CardTxts">
                        {t("Neste módulo, você terá o controle das chaves de tradução, essenciais para a internacionalização de nossa plataforma. As chaves estão disponíveis em três idiomas: Português, Inglês e Espanhol. Aqui, você pode:")}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{t("Criar novas chaves: Defina o nome da chave e adicione as traduções correspondentes nos três idiomas.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Editar ou excluir chaves existentes: Gerencie as chaves conforme necessário, atualizando traduções ou removendo chaves que não são mais relevantes.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Importar chaves via CSV: Se preferir, você pode importar um arquivo CSV contendo as chaves e suas respectivas traduções. Esse método agiliza a criação de várias chaves de uma só vez.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Pesquisar chaves por camada e idioma: Facilite a localização de chaves específicas utilizando o sistema de busca, que permite filtrar resultados por idioma ou camada.")}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="CardContainers" onClick={e => {
                e.preventDefault();
                handleButtonClick('DataExplorer');
            }}>
                <Card.Body className="CardBodys">
                    <Card.Title className="CardTitles">2. {t("Módulo de Explorador de Dados")}</Card.Title>
                    <Card.Text className="CardTxts">
                        {t("O Explorador de Dados permite que você gerencie categorias e dados dentro da plataforma. As principais funções incluem:")}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{t("Criação de novas categorias: Estruture os dados criando categorias específicas conforme a necessidade.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Edição e exclusão de dados: Atualize ou remova dados existentes dentro das categorias.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Importação de dados via CSV: Como no módulo anterior, você pode adicionar dados a partir de um arquivo CSV, seguindo um modelo predefinido.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Tabela dinâmica: Navegue entre os dados ativos no explorador e os arquivos enviados ao banco de dados, permitindo uma análise e manipulação de dados mais eficiente.")}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="CardContainers" onClick={e => {
                e.preventDefault();
                handleButtonClick('FAQ');
            }}>
                <Card.Body className="CardBodys">
                    <Card.Title className="CardTitles">3. {t("Módulo de Perguntas Frequentes")}</Card.Title>
                    <Card.Text className="CardTxts">
                        {t("Este módulo é dedicado à gestão das perguntas frequentes da plataforma. Você terá a capacidade de:")}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{t("Adicionar, editar ou excluir perguntas e respostas: Mantenha as informações sempre atualizadas e relevantes.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Card de Informações Ativas: Visualize e manipule os dados ativos relacionados às perguntas frequentes.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Card de Atualizações da Plataforma: Gerencie os dados da página de atualizações evolutivas, mantendo os usuários informados sobre as novidades e melhorias na PEDEA.")}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <Card className="CardContainers" onClick={e => {
                e.preventDefault();
                handleButtonClick('Configurações');
            }}>
                <Card.Body className="CardBodys">
                    <Card.Title className="CardTitles">4. {t("Módulo de Configurações")}</Card.Title>
                    <Card.Text className="CardTxts">
                        {t("Por fim, o módulo de configurações permite que você gerencie suas próprias informações de usuário. As opções incluem:")}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{t("Visualizar dados pessoais: Verifique e mantenha seus dados atualizados.")}</ListGroup.Item>
                        <ListGroup.Item>{t("Troca de imagem e senha: Altere sua foto de perfil e senha diretamente por aqui, garantindo segurança e personalização.")}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}

CardItems.propTypes = {
    setActiveButton: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired,
};

export default CardItems;
