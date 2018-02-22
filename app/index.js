const React = require('react')
const ReactDOM = require('react-dom')

const CREATE_NOTE = 'CREATE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'

const initialState = {
  nextNoteId: 1,
  notes: {}
}

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
        nextNoteId: id + 1,
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
  content: 'California Love'
})

ReactDOM.render(
  <pre>{JSON.stringify(state1, null, 2)}</pre>,
  document.getElementById('app')
)
