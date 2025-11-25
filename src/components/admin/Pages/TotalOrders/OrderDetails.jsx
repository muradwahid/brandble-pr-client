import { MdAttachFile, MdOutlineAddLink } from "react-icons/md";
import { Link, useParams } from "react-router";
import OrderStatus from "./OrderStatus";
import { useOrderQuery } from "../../../../redux/api/orderApi";

const OrderDetails = () => {
    const { id } = useParams();
  const { data, isLoading } = useOrderQuery(id)
  const writeArticle = data?.writeArticle;

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>
  }
  return (
    <div className="w-full h-full">
      <h2 className="font-poppins text-[#5F6368] mb-6">Order Details</h2>
      <div className="w-full h-full flex gap-6 flex-col md:flex-row">
        {/* order details */}
        <div className="w-full md:w-[70%]">
          <div className="w-full space-y-20">
            <div>
              <div className="bg-[#F6F7F7] border-b border-[#DCDEDF] px-3 py-2">
                <h3 className="text-[#222425] font-glare font-normal tracking-[0.1px] leading-[150%]">
                  Submitted information
                </h3>
              </div>

              <div className="space-y-6 mt-5">
                <div className="flex w-full justify-between">
                  <div className="space-y-1">
                    <p className="text-[#878C91] pt-3 pb-2.5 tracking-[0.1px] leading-[150%] font-glare font-normal">
                      Full Name
                    </p>
                    <p className="text-[#222425] font-normal  leading-[140%]">
                      {data?.user?.name}
                    </p>
                  </div>
                  <div className="space-y-1 w-[30%]">
                    <p className="text-[#878C91] pt-3 pb-2.5 tracking-[0.1px] leading-[150%] font-glare font-normal">
                      Designation
                    </p>
                    <p className="text-[#222425] font-normal  leading-[140%]">
                      {data?.user?.designation}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[#878C91] pt-3 pb-2.5 tracking-[0.1px] leading-[150%] font-glare font-normal">
                    Company Name
                  </p>
                  <p className="text-[#222425] font-normal  leading-[140%]">
                    {data?.user?.company}
                  </p>
                </div>
              </div>
            </div>

            {/* url link */}
            <div>
              <div className="bg-[#F6F7F7] border-b border-[#DCDEDF] px-3 py-2">
                <h3 className="text-[#222425] font-glare font-normal tracking-[0.1px] leading-[150%]">
                  URL and Links
                </h3>
              </div>
              <div className="space-y-10 mt-5">
                <div className="space-y-4">
                  <p className="text-[#5F6368] text-sm">
                    Provide links to your website and social media accounts
                  </p>
                  <p className="flex gap-2">
                    <MdOutlineAddLink className="text-[#878C91] mt-0.5" />
                    <Link to={writeArticle?.socialMediaLink} className="text-[#006AC2] break-all">
                      {writeArticle?.socialMediaLink}
                    </Link>
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#5F6368] text-sm">
                    Are there any content pieces you want our writers to
                    reference?
                  </p>
                  <p className="flex gap-2">
                    <MdOutlineAddLink className="text-[#878C91] mt-0.5" />
                    <Link to={writeArticle?.blockContentLink} className="text-[#006AC2] break-all">
                      {writeArticle?.blockContentLink}
                    </Link>
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#5F6368] text-sm">
                    Please provide relevant links for our publicists to research
                    you/your brand (Landing Pages, Social Media, Websites,
                    Reviews, etc.).
                  </p>
                  <p className="flex gap-2">
                    <MdOutlineAddLink className="text-[#878C91] mt-0.5" />
                    <Link to={writeArticle?.additionalLink} download className="text-[#006AC2] break-all">
                      {writeArticle?.additionalLink}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            {/* goal */}
            <div>
              <div className="bg-[#F6F7F7] border-b border-[#DCDEDF] px-3 py-2">
                <h3 className="text-[#222425] font-glare font-normal tracking-[0.1px] leading-[150%]">
                  Goal
                </h3>
              </div>
              <div className="space-y-10 mt-5">
                <div className="space-y-3">
                  <p className="text-[#222425] font-glare">
                    What is the main goal of this PR campaign?
                  </p>
                  <p className="text-[#5F6368] leading-[150%]">
                    {writeArticle?.mainGoal}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-[#222425]  font-glare">
                    What is the main message or theme that you want?
                  </p>
                  <p className="text-[#5F6368] leading-[150%]">
                    {writeArticle?.mainTheme}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-[#222425]  font-glare">
                    What specific points or information do you want to include?
                  </p>
                  <p className="text-[#5F6368]  leading-[150%]">
                    {writeArticle?.points}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#222425]  font-glare">
                    Who is the target audience?
                  </p>
                  <p className="text-[#5F6368]  leading-[150%]">
                    {writeArticle?.audience}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#222425]  font-glare">
                    If you'd like, provide a few “wish list” headline ideas we
                    can share with the editor.
                  </p>
                  <div>
                    <p className="space-y-5 list-decimal list-inside text-[#5F6368] leading-[140%]">
                      {writeArticle?.wishList}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* future */}
            <div>
              <div className="bg-[#F6F7F7] border-b border-[#DCDEDF] px-3 py-2">
                <h3 className="text-[#222425] font-glare font-normal tracking-[0.1px] leading-[150%]">
                  Future
                </h3>
              </div>
              <div className="space-y-10 mt-6">
                <div className="space-y-3">
                  <p className="text-[#222425] font-glare">
                    Please list any specific announcements that are upcoming in
                    the next 3-12 months and the specific dates if applicable
                    (what should you audience be looking forward to)?
                  </p>
                  <p className="text-[#5F6368] leading-[150%]">
                    {writeArticle?.announcement}
                  </p>
                </div>
                <div className="space-y-3 mt-8">
                  <p className="text-[#222425] font-glare">
                    Is there anything else that you would like to add / that you
                    think our publicist should know in order to create an
                    effective and successful article?
                  </p>
                  <p className="text-[#5F6368] leading-[150%]">
                    {writeArticle?.additionalContent}
                  </p>
                </div>
              </div>
            </div>

            {/* image upload */}
            <div>
              <div className="bg-[#F6F7F7] border-b border-[#DCDEDF] px-3 py-2">
                <h3 className="text-[#222425] font-glare font-normal tracking-[0.1px] leading-[150%]">
                  Uploaded Image
                </h3>
              </div>
              <div className="space-y-8 mt-6">
                <div className="space-y-3">
                  <p className="text-[#222425] font-glare">
                    Upload one high-resolution, professional photo of you or the
                    person for this PR. *
                  </p>
                  <p className="flex gap-2">
                    <MdAttachFile className="text-[#878C91] mt-0.5" />
                    <Link download to={writeArticle?.personImage} className="text-[#006AC2] break-all">
                      {writeArticle?.personImage}
                    </Link>
                  </p>
                </div>
                {
                  writeArticle?.serviceImage &&<>
                <div className="space-y-3">
                  <p className="text-[#222425] font-glare">
                    Upload one photo of your brand/product/service you want to
                    highlight. (Optional)
                  </p>
                  <div className="space-y-2">
                    <p className="flex gap-2">
                      <MdAttachFile className="text-[#878C91] mt-0.5" />
                          <Link download to={writeArticle?.serviceImage} className="text-[#006AC2] break-all">
                            {writeArticle?.serviceImage}
                          </Link>
                    </p>
                  </div>
                </div>

                  </>
                }
                {
                  writeArticle?.brandLogo && <div className="space-y-3">
                    <p className="text-[#222425] font-glare">
                      Upload your company or brand logo. (Optional)
                    </p>
                    <div className="space-y-2">
                      <p className="flex gap-2">
                        <MdAttachFile className="text-[#878C91] mt-0.5" />
                        <Link download to={writeArticle?.brandLogo} className="text-[#006AC2] break-all">
                          {writeArticle?.brandLogo}
                        </Link>
                      </p>
                    </div>
                  </div>
                }
           
              </div>
            </div>
          </div>
        </div>
      {/* order status */}
      <div className="md:w-[30%] w-full">
        <OrderStatus data={data} />
      </div>
      </div>
    </div>
  );
};

export default OrderDetails;
