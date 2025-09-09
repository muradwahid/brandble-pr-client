import OrderLists from "./OrderLists";
import OrderStatus from "./OrderStatus";
import RevenueStatistic from "./RevenueStatistic";

import './style.css';
import TopPublication from "./TopPublication";

const Home = () => {
  return <div className="w-full">
    
    <OrderStatus />
    <RevenueStatistic />
    <OrderLists />
    <TopPublication/>
    </div>
};

export default Home;