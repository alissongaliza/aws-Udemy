import React from "react";
import NewMarket from './MarketPage'
import MarketList from '../components/MarketList'
import MarketPage from "./MarketPage";

class HomePage extends React.Component {
  state = {};

  render() {
    return (
      <>
        <MarketPage />
        <MarketList />
      </>
    )
  }
}

export default HomePage;
