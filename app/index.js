const React = require('react')
const ReactDOM = require('react-dom')

const CREATE_NOTE = 'CREATE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      const id = state.nextNoteId
      const newNote = {
        id,
        content: ''
      }
      return {
        ...state,
        nextNoteId: id + 1,
        notes: {
          ...state.notes,
          [id]: newNote
        }
      }
    }
    case UPDATE_NOTE: {
      const {id, content} = action
      const editedNote = {
        ...state.notes[id],
        content
      }
      return {
        ...state,
        notes: {
          ...state.notes,
          [id]: editedNote
        }
      }
    }
    default:
      return state
  }
}

const state0 = reducer(undefined, {
  type: CREATE_NOTE
})

const state1 = reducer(state0, {
  type: UPDATE_NOTE,
  id: 1,
  content: 'Hello, world! xo'
})
