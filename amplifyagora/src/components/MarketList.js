import React from "react";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { listMarkets } from '../graphql/queries'
import { onCreateMarket } from '../graphql/subscriptions'
import Error from './Error'
import { Link } from 'react-router-dom'

import { Loading, Card, Icon, Tag } from "element-react";

const MarketList = props => {
  const onNewMarket = (prev, newData) => {
    let updatedQuery = { ...prev }
    const newMarketList = [newData.onCreateMarket, ...prev.listMarkets.items]
    updatedQuery.listMarkets.items = newMarketList
    return updatedQuery

  }
  return (
    <Connect
      query={graphqlOperation(listMarkets)}
      subscription={graphqlOperation(onCreateMarket)}
      onSubscriptionMsg={onNewMarket}>
      {({ data, loading, errors }) => {
        if (errors.length > 0) return <Error errors={errors} />
        if (loading || !data.listMarkets) return <Loading fullscreen={true} />
        const markets = props.searchResults.length > 0 ? props.searchResults : data.listMarkets.items

        return (
          <>
            {props.searchResults.length > 0 ?
              <h2 className='text-green'>
                <icon type='success' name='check' className='icon' />
                {props.searchResults.length} Results
              </h2> :

              <h2 className='header'>
                <img src='https://icon.now.sh/store_mall_directory/527fff' alt='Store Icon' className='large-icon' />
                Markets
            </h2>
            }
            {markets.map(market => (
              <div className='my-2' key={market.id}>
                <Card
                  bodyStyle={{
                    padding: "0.7em",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                  <div>
                    <span className='flex'>
                      <Link className='link' to={`/markets/${market.id}`}>
                        {market.name}
                      </Link>
                      <span style={{ color: 'var(--darkAmazonOrange)' }}>
                        {market.products.length}
                      </span>
                      <img src='https://icon.now.sh/shopping_cart/f60' alt='Shopping cart' />
                    </span>
                    <div style={{ color: 'var(--lightSquidInk)' }}>
                      {market.owner}
                    </div>
                  </div>
                  <div>
                    {market.tags && market.tags.map(tag => (
                      <Tag key={tag} type='danger' className='mx-1'>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </>
        )


      }}
    </Connect >
  );
};

export default MarketList;
