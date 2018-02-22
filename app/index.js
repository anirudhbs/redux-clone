const React = require('react')
const ReactDOM = require('react-dom')

const initialState = {
  nextNoteId: 1,
  notes: {}
}

window.state = initialState

const onAddNote = () => {
  const id = window.state.nextNoteId
  window.state.notes[id] = {
    id,
    content: ''
  }
  window.state.nextNoteId += 1
  renderApp()
}

const NoteApp = ({notes}) => (
  <div>
    <ul className='note-list'>
      {
        Object.keys(notes).map(id => (
          <li className='note-list-item' key={id}>{id}</li>
        ))
      }
    </ul>
    <button className='editor-button' onClick={onAddNote}>New Note</button>
  </div>
)

const renderApp = () => {
  ReactDOM.render(
    <NoteApp notes={window.state.notes} />,
    document.getElementById('app')
  )
}

renderApp()
