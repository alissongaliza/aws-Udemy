import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import { API, graphqlOperation } from 'aws-amplify'
import { createNote, deleteNote, updateNote } from './graphql/mutations'
import { listNotes } from './graphql/queries'
import { onCreateNote, onDeleteNote, onUpdateNote } from './graphql/subscriptions'

const App = () => {
  const [noteState, setState] = useState({ notes: [], note: "", id: '' })

  useEffect(() => {
    const updateNotes = async () => {
      const { data: { listNotes: { items } } } = await API.graphql(graphqlOperation(listNotes))
      await setState(prev => ({ ...prev, notes: items }))
    }
    updateNotes()
  }, [])

  useEffect(() => {
    const onCreateSub = API.graphql(graphqlOperation(onCreateNote)).subscribe({
      next: noteData => {
        const newNote = noteData.value.data.onCreateNote
        const prevNotes = noteState.notes.filter(el => el.id !== newNote.id)
        setState(prev => ({ ...prev, notes: [...prevNotes, newNote] }))
      }
    })
    const onDeleteSub = API.graphql(graphqlOperation(onDeleteNote)).subscribe({
      next: noteData => {
        const deletedNote = noteData.value.data.onDeleteNote
        setState(prev => ({ ...prev, notes: [...noteState.notes.filter(el => el.id !== deletedNote.id)] }))
      }
    })
    const onUpdateSub = API.graphql(graphqlOperation(onUpdateNote)).subscribe({
      next: noteData => {
        const { notes, id } = noteState
        const updatedNote = noteData.value.data.onUpdateNote
        const index = notes.findIndex(el => el.id === id)
        setState(prev => ({ ...prev, note: '', id: '', notes: [...notes.slice(0, index), updatedNote, ...notes.slice(index + 1)] }))
      }
    })
    return () => {
      onCreateSub.unsubscribe()
      onUpdateSub.unsubscribe()
      onDeleteSub.unsubscribe()
    };
  }, [noteState])

  const renderNotes = el => (
    <div key={el.id}
      className='flex items-center'>
      <li className='list pa1 f3' onClick={() => handleClick(el)}>
        {el.note}
      </li>
      <button className='bg-transparent bn f4' onClick={() => handleDelete(el.id)}>
        <span>&times;</span>
      </button>
    </div>
  )

  const handleDelete = async id => {
    const input = { id }
    await API.graphql(graphqlOperation(deleteNote, { input }))
  }

  const handleUpdate = async () => {
    const { note, id } = noteState
    const input = { note, id }
    await API.graphql(graphqlOperation(updateNote, { input }))
  }

  const handleClick = item => setState(prev => ({ ...prev, note: item.note, id: item.id }))

  const handleChange = ({ target: { value } }) => setState(prev => ({ ...prev, note: value }))

  const hasExistingNote = () => noteState.notes.findIndex(el => el.id === noteState.id) > -1

  const handleSubmit = async e => {
    e.preventDefault()

    if (hasExistingNote()) {
      handleUpdate()
    }
    else {
      const { note } = noteState
      const input = { note }
      await API.graphql(graphqlOperation(createNote, { input }))
      // setState(prev => ({ ...prev, note: '', id: '' }))
    }
  }

  return (
    <div className='flex flex-column items-center justify-center pa3 bg-washed-red'>
      <h1 className='code f2-l'> Amplify Notetaker</h1>
      <form onSubmit={e => handleSubmit(e)} className='mb3'>
        <input className='pa2 f4' type='text' placeholder='Write your note' onChange={e => handleChange(e)} value={noteState.note} />
        <button className='pa2 f4' type='submit'>Add note</button>
      </form>
      <div >
        {noteState.notes.map(renderNotes)}
      </div>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
