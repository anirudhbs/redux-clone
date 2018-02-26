const React = require('react')
const ReactDOM = require('react-dom')

const CREATE_NOTE = 'CREATE_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'

const initialState = {
  nextNoteId: 1,
  notes: {}
}

const validateAction = action => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!')
  }
  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type!')
  }
}

const createStore = reducer => {
  let state
  const subscribers = []
  const store = {
    dispatch: action => {
      validateAction(action)
      state = reducer(state, action)
      subscribers.forEach(handler => handler())
    },
    getState: () => state,
    subscribe: handler => {
      subscribers.push(handler)
      return () => {
        const index = subscribers.indexOf(handler)
        if (index > 0) {
          subscribers.splice(index, 1)
        }
      }
    }
  }
  store.dispatch({type: '@@redux/INIT'})
  return store
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

const store = createStore(reducer)

store.dispatch({
  type: CREATE_NOTE
})

store.dispatch({
  type: UPDATE_NOTE,
  id: 1,
  content: 'California Love'
})

ReactDOM.render(
  <pre>{JSON.stringify(store.getState(), null, 2)}</pre>,
  document.getElementById('app')
)
