import React, { useEffect, useState, useRef } from "react";
import { Card } from 'primereact/card';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import apiPEDEA from "../../../../services/api";
import { Toast } from 'primereact/toast';
import '../../../../sass/admin/HomeAdmin/carditems.scss';

function CardItems({ setActiveButton, handleOptionChange }) {
    const { t } = useTranslation();
    const [user, setUser] = useState();
    const userData = useSelector(state => state.userInfoSlice.infoUser);
    const { id: loggedInUserId } = userData;
    const toast = useRef(null);

    const handleButtonClick = (option) => {
        if (option === 'Configurações' || user?.admin) {
            setActiveButton(option);
            handleOptionChange(option);
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Acesso negado',
                detail: 'Você não tem permissão para acessar esses módulos, acesso apenas para administradores.',
                life: 5000
            });
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

    const cardsData = [
        {
            title: "1. " + t("Módulo de Rótulos Bilíngues"),
            option: "Rotulos Bilingue",
            description: t("Neste módulo, você terá o controle das chaves de tradução..."),
            items: [
                t("Criar novas chaves: Defina o nome da chave..."),
                t("Editar ou excluir chaves existentes..."),
                t("Importar chaves via CSV..."),
                t("Pesquisar chaves por camada e idioma...")
            ]
        },
        {
            title: "2. " + t("Módulo de Explorador de Dados"),
            option: "DataExplorer",
            description: t("O Explorador de Dados permite que você gerencie categorias..."),
            items: [
                t("Criação de novas categorias..."),
                t("Edição e exclusão de dados..."),
                t("Importação de dados via CSV..."),
                t("Tabela dinâmica...")
            ]
        },
        {
            title: "3. " + t("Módulo de Perguntas Frequentes"),
            option: "FAQ",
            description: t("Este módulo é dedicado à gestão das perguntas frequentes..."),
            items: [
                t("Adicionar, editar ou excluir perguntas e respostas..."),
                t("Card de Informações Ativas..."),
                t("Card de Atualizações da Plataforma...")
            ]
        },
       
    ];

    return (
        <div className="ContainerCards">
            <Toast ref={toast} />
            {cardsData.map((card, index) => (
                <div key={index} className="CardContainers" onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(card.option);
                }}>
                    <Card
                        title={card.title}
                        subTitle={card.description}
                        className="CardBodys"
                    >
                        <ul className="CardTxts">
                            {card.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </Card>
                </div>
            ))}
        </div>
    );
}

CardItems.propTypes = {
    setActiveButton: PropTypes.func.isRequired,
    handleOptionChange: PropTypes.func.isRequired,
};

export default CardItems;
