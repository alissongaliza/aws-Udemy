import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify'
// import { getMarket } from '../graphql/queries'
import { Loading, Tabs, Icon } from "element-react";
import { Link } from 'react-router-dom'
import NewProduct from '../components/NewProduct'
import Product from '../components/Product'


const getMarket = `query GetMarket($id: ID!) {
  getMarket(id: $id) {
    id
    name
    tags
    owner
    createdAt
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
        file{
          key
        }
      }
      nextToken
    }
  }
}
`;

const MarketPage = props => {

  const [state, setState] = useState({ market: null, isLoading: true, isMarketOwner: false })
  const { market, isLoading } = state

  useEffect(() => {
    handleGetMarket()
  }, [])

  useEffect(() => {
    if (market) checkMarketOwner()
  }, [state.market])

  const handleGetMarket = async () => {

    const result = await API.graphql(graphqlOperation(getMarket, { id: props.marketId }))
    setState(prev => ({ ...prev, market: result.data.getMarket, isLoading: false }))
  }

  const checkMarketOwner = () => {
    const { user } = props
    if (user) {
      setState(prev => ({ ...prev, isMarketOwner: user.username === market.owner }))
    }
  }

  return (
    isLoading ?
      <Loading fullscreen={true} /> :
      <>
        <Link className='link' to='/'>
          Back to Market list
        </Link>
        <span className='items-center pt-2'>
          <h2 className='mb-mr'>
            {market.name}
          </h2> - {market.owner}
        </span>
        <div className='items-center pt-2'>
          <span style={{ color: 'var(--lightSquidInk)', paddingBottom: '1em' }}>
            <Icon name='date' className='icon' />
            {market.createdAt}
          </span>
        </div>

        <Tabs type='border-card' value={state.isMarketOwner ? '1' : '2'}>
          {state.isMarketOwner && (
            <Tabs.Pane
              label={
                <>
                  <Icon name='plus' className='icon' />
                  Add product
                </>
              }
              name='1'>
              <NewProduct marketId={props.marketId} />

            </Tabs.Pane>
          )}
          <Tabs.Pane
            label={
              <>
                <Icon name='menu' className='icon' />
                Products({market.products.items.length})
                </>
            }
            name='2'>

            <div className='product-list'>
              {state.market.products.items.map(product => (
                <Product key={product.id} product={product} />
              ))}

            </div>

          </Tabs.Pane>

        </Tabs>
      </>

  );

}

export default MarketPage;
