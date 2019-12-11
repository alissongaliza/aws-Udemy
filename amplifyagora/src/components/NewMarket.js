import React, { useState } from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMarket } from '../graphql/mutations'

const NewMarket = props => {

  const [dialogState, setDialogState] = useState(false)
  const [nameState, setNameState] = useState('')

  const handleAddMarket = async name => {
    try {
      const result = await API.graphql(graphqlOperation(createMarket, { name }))
      console.log(`Created marketplace of id: ${result.data.createMarket.id}`)
      setNameState('')
    }
    catch (e) {
      Notification.error({
        title: 'Error',
        message: `${e.message || 'Error adding market'}`
      })
    }
  }

  return (
    <>
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
          </Form>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setDialogState(false)}>
            Cancel
            </Button>
          <Button onClick={() => handleAddMarket(nameState)} type='primary' disabled={!nameState}>
            Add
            </Button>
        </Dialog.Footer>

      </Dialog>
    </>
  )
}

export default NewMarket;
