
import geoCSVReader from '../../assets/js/geoCSVReader'
import { ServerTypeHelper } from './helpers'



const geoWorkspace = 'zcm'
const serverURL = 'https://pedea.sema.ce.gov.br/geoserver/zcm/wms'
const serverType = ServerTypeHelper.GEOSERVER


const fetchZmcData = async () => {
  try {
    const response = await fetch('http://localhost:3001/infoDataExplorer');
    
    if (!response.ok) {
      throw new Error('Erro na rede: ' + response.statusText);
    }

    const data = await response.json();
    const sortedData = data.sort((a, b) => a.id - b.id)

    const zcmDataFormatted = sortedData.map((item) => {
      return `${item.id};${item.categoria_de_informacao};${item.classe_maior};${item.sub_classe_maior || ''};${item.classe_menor || ''};${item.nomenclatura_greencloud};${item.nomenclatura_pedea};${item.fonte};${item.coluna_atributo}`;
    }).join('\n');


    return zcmDataFormatted;
    
  } catch (error) {
    console.error(error);
    return null;
  }
};

const zcmData = await fetchZmcData()




const { tree, layers } = geoCSVReader(
  zcmData,
  geoWorkspace,
  serverURL,
  serverType
)

export { layers, tree }
