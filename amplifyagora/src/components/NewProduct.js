import React from "react";
import { Storage, Auth, graphqlOperation, API } from 'aws-amplify'
import { PhotoPicker } from 'aws-amplify-react'
import { createProduct } from '../graphql/mutations'
import awsExports from '../aws-exports'
import { convertDollarsToCents } from '../utils'
// prettier-ignore
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

class NewProduct extends React.Component {
  initialState = { description: '', price: '', shipped: false, imagePreview: '', image: '', isUploading: false }
  state = { ...this.initialState };

  handleAddProduct = async () => {
    try {
      this.setState({ isUploading: true })
      const visibility = 'public'
      const { identityId } = await Auth.currentCredentials()
      const filename = `/${visibility}/${identityId}/${Date.now()}-${this.state.image.name}`
      const uploadedFile = await Storage.put(filename, this.state.image.file, {
        contentType: this.state.image.type
      })
      const file = {
        key: uploadedFile.key,
        bucket: awsExports.aws_user_files_s3_bucket,
        region: awsExports.aws_project_region
      }
      const input = {
        productMarketId: this.props.marketId,
        description: this.state.description,
        shipped: this.state.shipped,
        price: convertDollarsToCents(this.state.price),
        file
      }

      const result = await API.graphql(graphqlOperation(createProduct, { input }))
      console.log('Created new product', result)
      Notification({
        title: 'Success',
        message: 'Product succesfully created!',
        type: 'success'
      })

      this.setState(...this.initialState)
    }
    catch (e) {
      console.log(e)
    }

  }

  render() {
    const { shipped, imagePreview, image, price, description, isUploading } = this.state
    return (
      <div className='flex-center'>
        <h2 className="header">
          Add new product
        </h2>
        <div>
          <Form className="market-header">
            <Form.Item label='Add product description'>
              <Input type='text' icon='information' placeholder='Description' value={description} onChange={description => this.setState({ description })} />
            </Form.Item>
            <Form.Item label='Set product price'>
              <Input type='number' icon='plus' placeholder='Price($USD)' value={price} onChange={price => this.setState({ price })} />
            </Form.Item>
            <Form.Item label='Is the product shipped or emailed to a costumer'>
              <div className="text-center">
                <Radio value='true' checked={shipped === true} onChange={() => this.setState({ shipped: true })}>
                  Shipped
                  </Radio>
                <Radio value='false' checked={shipped === false} onChange={() => this.setState({ shipped: false })}>
                  Emailed
                  </Radio>
              </div>
            </Form.Item>
            {imagePreview && (
              <img
                className='image-preview'
                src={imagePreview}
                alt='Product Preview'
              />
            )}
            <PhotoPicker
              preview='hidden'
              onLoad={url => this.setState({ imagePreview: url })}
              onPick={file => this.setState({ image: file })}
            />
            <Form.Item>
              <Button disabled={!image || !description || !price || isUploading}
                type='primary' onClick={this.handleAddProduct}
                loading={isUploading}
              >
                Add Product
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default NewProduct;
