import { useParams } from "react-router";
import { useOrderQuery } from "../../../../../redux/api/orderApi";
import Footer from "../../../../ui/Footer/Footer";
import TopNavBar from "../../../TopNavBar/TopNavBar";
import Details from "./Details";
import Order from "./Order";

const OrderDetailsPage = () => {

  const { id } = useParams();
  const { data, isLoading } = useOrderQuery(id)
  if (isLoading) {
    return <div className="h-[70vh] w-full flex justify-center items-center">Loading...</div>;
  }

  const isSubmitDetails = data?.detailsSubmitted === 'not-yet';

  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <TopNavBar />

      {/* main */}
      <main className="flex-1 flex my-10">
        <div className="flex xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto gap-6">
          {/* order details and chat */}
          {isSubmitDetails ? <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-6">
            <p className="text-[#36383A] text-lg">You have not submitted the details for this order yet.</p>
            <a href={`/user/checkout/order-submit/${data?.id}`} className="bg-[#FF5630] text-white text-sm font-medium font-poppins shadow py-2 px-4 rounded-[8px] tracking-[0px] hover:shadow-lg transition-all duration-300">
              Submit Details
            </a>
          </div> : (
            <>
              {data?.orderType === 'wonArticle' && <Order data={data} key={isLoading} />}
              {data?.orderType === 'writeArticle' && <Details data={data} key={isLoading} />}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;