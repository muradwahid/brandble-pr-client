import OrderStatus from "./OrderStatus";
import RevenueStatistic from "./RevenueStatistic";

const Home = () => {
  return  <div className="w-full">
    <OrderStatus />
    <RevenueStatistic />
    </div>
};

export default Home;