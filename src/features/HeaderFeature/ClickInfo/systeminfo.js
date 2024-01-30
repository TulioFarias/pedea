import React, { useState, useEffect, useRef } from 'react'

import { vector } from '../../../_config/layers/index'
import { mapInstance } from '../../../_config/layers/map'
import { createTitle, createRecord } from '../../../utils/JSXHandler/JSXHandler'

function ClickInfo() {
  const htmlElement = useRef()
  const [modalValue, setModalValue] = useState('')
  const [active, setActive] = useState(false)
  const clientWidth = document.documentElement.clientWidth

  const checkQueryableLayers = () => {
    const queryableLayers = []

    for (let i = 0; i < mapInstance.getLayers().getArray().length; i++) {
      if (
        mapInstance.getLayers().getArray()[i].getVisible() &&
        mapInstance.getLayers().getArray()[i].get('queryable')
      ) {
        queryableLayers.push(mapInstance.getLayers().getArray()[i])
      }
    }

    return queryableLayers
  }

  const requestFeatureInfo = async (evt, queryableLayers) => {
    const featureInfo = []

    vector.getSource().clear()

    for (let i = 0; i < queryableLayers.length; i++) {
      const view = mapInstance.getView()
      const viewResolution = view.getResolution()
      const source = queryableLayers[i].getSource()
      const url = source?.getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        view.getProjection(),
        { INFO_FORMAT: 'application/json', FEATURE_COUNT: 50 }
      )
      if (url) {
        await fetch(url).then(response => {
          return response
            .json()
            .then(data => {
              if (data && data.features && data.features.length > 0) {
                featureInfo.push(createTitle(queryableLayers[i].get('title')))
                for (let i = 0; i < data.features.length; i++)
                  featureInfo.push(createRecord(i, data.features[i].properties))
                return true
              } else return false
            })
            .catch(err => {
              console.log(err)
            })
        })
      }
    }

    return featureInfo
  }
  return (
    <>
      <p>eaae</p>
    </>
  )
}

export default ClickInfo
