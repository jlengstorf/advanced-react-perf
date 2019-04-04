import React from 'react'
import { Link } from '@reach/router'
import moment from 'moment'
import Code from './code'
import Controls from './controls'

const loadPrettier = async () => {
  const prettier = await import('prettier/standalone' /* webpackChunkName: "prettier" */)

  const plugins = [
    await import('prettier/parser-graphql'),
    await import('prettier/parser-babylon'),
    await import('prettier/parser-markdown')
  ]

  return { prettier, plugins }
}

// TODO add a `created` field to Firebase and store a timestamp.
export default ({
  id,
  language,
  code,
  user,
  title,
  showUserDetails,
  created,
  showControls,
  deleteShamecap
}) => {
  let prettierCode = code
  loadPrettier().then(({ prettier, plugins }) => {
    try {
      prettierCode = prettier.format(code, {
        parser: language === 'javascript' ? 'babel' : language,
        plugins
      })
    } catch {}
  })

  return (
    <section className="shame-wrapper">
      <div className="shame">
        <div className="terminal">
          <Controls />
          <Code language={language} code={prettierCode} />
        </div>
      </div>
      <h3 className="title">{title}</h3>
      {showUserDetails && (
        <span className="details">
          Posted by{' '}
          <Link
            to={`/user/${user.name}`}
            state={{ username: user.displayName }}
          >
            @{user.name}
          </Link>{' '}
          {moment(created).fromNow()}
        </span>
      )}
      {showControls && (
        <span className="details">
          <button onClick={() => deleteShamecap(id)} className="delete-button">
            delete this shamecap
          </button>
        </span>
      )}
    </section>
  )
}
