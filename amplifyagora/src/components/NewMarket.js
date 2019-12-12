import React, { useState } from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMarket } from '../graphql/mutations'
import { UserContext } from '../App'

const NewMarket = props => {

  const [dialogState, setDialogState] = useState(false)
  const [nameState, setNameState] = useState('')
  const [tagsState, setTagsState] = useState(['Arts', 'Technology', 'craft', 'food', 'toys', 'web dev'])
  const [selectedTagsState, setSelectedTagsState] = useState([])
  const [optionsState, setOptionsState] = useState([])

  const handleAddMarket = async (name, user, tags) => {
    try {
      console.log({ user, name, tags });
      const input = { name, owner: user.username, tags }
      const result = await API.graphql(graphqlOperation(createMarket, { input }))
      console.log(`Created marketplace of id: ${result.data.createMarket.id}`)
      setNameState('')
      setDialogState(false)
      setSelectedTagsState([])
    }
    catch (e) {
      Notification.error({
        title: 'Error',
        message: `${e.message || 'Error adding market'}`
      })
    }
  }

  const handleFilterTags = query => {
    const options = tagsState
      .map(tag => ({ value: tag, label: tag }))
      .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()))
    setOptionsState(options)
  }

  return (
    <UserContext.Consumer>
      {({ user }) => <>
        <div className='market-header'>
          <h1 className='market-title'>
            Create Your Marketplace
            <Button type='text' icon='edit' className='market-title-button' onClick={() => setDialogState(true)} />
          </h1>
        </div>
        <Dialog
          title='Create New Market'
          visible={dialogState}
          onCancel={() => setDialogState(false)}
          size='large'
          customClass='dialog'>
          <Dialog.Body>
            <Form labelPosition='top'>
              <Form.Item label='Add Market Name'>
                <Input
                  placeholder='Market Name'
                  trim={true}
                  onChange={name => setNameState(name)}
                  value={nameState}
                />
              </Form.Item>
              <Form.Item>
                <Select
                  multiple={true}
                  filterable={true}
                  placeholder='Market Tags'
                  onChange={selectedTags => setTagsState(selectedTags)}
                  remoteMethod={handleFilterTags}
                  remote={true}
                >
                  {optionsState.map(option => (<Select.Option key={option.value} value={option.value} label={option.label} />))}
                </Select>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => setDialogState(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleAddMarket(nameState, user, tagsState)} type='primary' disabled={!nameState}>
              Add
            </Button>
          </Dialog.Footer>

        </Dialog>
      </>}
    </UserContext.Consumer >

  )
}

export default NewMarket;
