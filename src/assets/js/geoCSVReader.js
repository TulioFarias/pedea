const visibleLayers = [`zcm:0100_ce_limites_municipais_2021_pol`]

function geoCSVReader(resource, geoWorkspace, serverURL, serverType) {
  const tree = []
  const layers = []
  const rows = resource.split('\n')

  function populateTree(object, title, folderSequence, hasSubFolder = true) {
    if (title && object && !object.find(e => e.title === title)) {
      object.push({
        title,
        folderSequence,
        subFolder: hasSubFolder ? [] : null
      })
    }
    return object.findIndex(e => e.title === title) >= 0
      ? object.findIndex(e => e.title === title)
      : 0
  }

  function layerInclude(
    object,
    wmsName,
    title,
    folder,
    folderSequence,
    url,
    serverType
  ) {
    const visibility = !!visibleLayers.find(layer => layer === wmsName)

    object.push({
      wmsName,
      title,
      folder,
      folderSequence,
      url,
      visibility,
      queryable: true,
      serverType
    })
  }

  rows.map(row => {
    const data = row.split(';')
    let folderSequence = data[1]
    let layerLevel = 1
    const categoryId = populateTree(
      tree,
      data[1],
      folderSequence,
      data[2] !== ''
    )

    if (data[2]) {
      folderSequence += `_${data[2]}`
      const majorClassId = populateTree(
        tree[categoryId].subFolder,
        data[2],
        folderSequence,
        data[3] !== ''
      )
      layerLevel++
      if (data[3]) {
        folderSequence += `_${data[3]}`
        const subClassId = populateTree(
          tree[categoryId].subFolder[majorClassId].subFolder,
          data[3],
          folderSequence,
          data[4] !== ''
        )
        layerLevel++
        if (data[4]) {
          folderSequence += `_${data[4]}`
          populateTree(
            tree[categoryId].subFolder[majorClassId].subFolder[subClassId]
              .subFolder,
            data[4],
            folderSequence,
            false
          )
          layerLevel++
        }
      }
    }

    layerInclude(
      layers,
      geoWorkspace + ':' + data[5].toLowerCase(),
      data[6],
      data[layerLevel],
      folderSequence,
      serverURL,
      serverType
    )

    return true
  })

  return { tree, layers }
}

export default geoCSVReader
