import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'

const newSource = new VectorSource()

const vector = new VectorLayer({
  source: newSource,
  style: [
    new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new CircleStyle({
        radius: 4,
        fill: new Fill({
          color: 'rgba(171,0,204,0.9)'
        })
      })
    }),
    new Style({
      image: new CircleStyle({
        radius: 30, // Raio do círculo externo (raio de alcance)
        fill: new Fill({
          color: 'rgba(171,0,204,0.2)' // Cor com opacidade para o fundo
        }),
        stroke: new Stroke({
          color: 'rgba(171,0,204,0.2)',
          width: 2 // Largura do raio de alcance
        })
      })
    })
  ]
})

const vectorForCSV = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    fill: new Fill({
      color: 'rgba(247, 149, 6, 0.7)'
    }),
    stroke: new Stroke({
      color: 'rgba(247, 149, 6, 1)',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      stroke: new Stroke({
        color: 'rgba(247, 149, 6, 1)'
      }),
      fill: new Fill({
        color: 'rgba(247, 149, 6, 0.7)'
      })
    })
  })
})

export { vector, vectorForCSV, newSource }
