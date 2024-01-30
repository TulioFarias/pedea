import React from 'react'
const createTitle = title => {
  return (
    <span>
      <h5>{title}</h5>
      <br />
    </span>
  )
}

const createRecord = (id, obj) => {
  const body = []

  for (let key in obj) {
    const value = obj[key]
    key = key.toUpperCase().replaceAll('_', ' ')
    body.push(
      <li className="list-group-item" key={id + ':' + key}>
        {' '}
        <span className="FeatureField">{key}</span>: {value}
      </li>
    )
  }

  return (
    <div>
      <ul key={id + 'ul'} className="FeatureInforRecord list-group">
        {body}
      </ul>
      <br />
    </div>
  )
}

export { createTitle, createRecord }
