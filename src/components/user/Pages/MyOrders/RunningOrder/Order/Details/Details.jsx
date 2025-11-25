import { Link, useParams } from 'react-router';
import { LeftArrowIcon } from '../../../../../../../utils/icons';
import OrderStatusAndChat from '../OrderStatusAndChat';
import { MdAttachFile, MdOutlineAddLink } from 'react-icons/md';
import { useOrderQuery } from '../../../../../../../redux/api/orderApi';

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useOrderQuery(id);

  const writeArticle = data?.writeArticle

  if (isLoading) {
    return <div className="h-[70vh] w-full flex justify-center items-center">Loading...</div>;
  }
  return <div className="w-full h-full">
      {/* back button */}
      <button
        className="text-[#002747] hover:text-[#075ca1] hover:fill-[#075ca1] text-[16px] flex items-center gap-2.5 cursor-pointer"
        onClick={() => window.navigation.back()}
      >
        <LeftArrowIcon />
        Back
      </button>
      <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare mt-11 mb-6">
        Order Details
      </h2>
      <div className="w-full h-full flex gap-6 flex-col md:flex-row">
        {/* order details */}
        <div className="w-full md:w-[70%]">
          <div className="w-full border p-6 border-[#DCDEDF]">
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3">
              Spokesperson Information
            </h3>
            <div className="space-y-6">
              <div className="flex md:w-1/2 w-full justify-between">
                <div className="space-y-1">
                  <p className="text-[#5F6368] text-sm pt-3 pb-2.5 tracking-[0.1px] leading-[20px]">
                    Full Name
                  </p>
                  <p className="text-[#171819] font-medium  leading-[140%]">
                  {data.user.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#5F6368] text-sm pt-3 pb-2.5 tracking-[0.1px] leading-[20px]">
                    Designation
                  </p>
                  <p className="text-[#171819] font-medium  leading-[140%]">
                    {data.user.designation}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#5F6368] text-sm pt-3 pb-2.5 tracking-[0.1px] leading-[20px]">
                  Company Name
                </p>
                <p className="text-[#171819] font-medium  leading-[140%]">
                {data.user.company}
                </p>
              </div>
            </div>

            {/* url link */}
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3 mt-10">
              URL and Links
            </h3>
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
            {/* goal */}
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3 mt-10">
              Goals
            </h3>
            <div className="space-y-10 mt-5">
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  What is the main goal of this PR campaign?
                </p>
                <p className="text-[#171819] leading-[140%]">
                {writeArticle?.mainGoal}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  What is the main message or theme that you want?
                </p>
                <p className="text-[#171819] leading-[140%]">
                  {writeArticle?.mainTheme}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  What specific points or information do you want to include?
                </p>
                <p className="text-[#171819]  leading-[140%]">
                {writeArticle?.points}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Who is the target audience?
                </p>
                <p className="text-[#171819]  leading-[140%]">
                  {writeArticle?.audience}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  If you'd like, provide a few “wish list” headline ideas we can
                  share with the editor.
                </p>
                <div>
                  <p className="space-y-5 list-decimal list-inside text-[#171819] leading-[140%]">
                    {writeArticle?.wishList}
                  </p>
                </div>
              </div>
            </div>

            {/* future */}
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3 mt-10">
              Future
            </h3>
            <div className="space-y-10 mt-5">
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Please list any specific announcements that are upcoming in
                  the next 3-12 months and the specific dates if applicable
                  (what should you audience be looking forward to)?
                </p>
                <p className="text-[#171819] leading-[140%]">
                {writeArticle?.announcement}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Is there anything else that you would like to add / that you
                  think our publicist should know in order to create an
                  effective and successful article?
                </p>
                <p className="text-[#171819] leading-[140%]">
                {writeArticle?.additionalContent}
                </p>
              </div>
            </div>

            {/* image upload */}
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3 mt-10">
              Upload Image
            </h3>
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Upload one high-resolution, professional photo of you or the
                  person for this PR. *
                </p>
                <p className="flex gap-2">
                  <MdAttachFile className="text-[#878C91] mt-0.5" />
                <Link download to={writeArticle?.personImage} className="text-[#006AC2] break-all">
                  {writeArticle?.personImage }
                  </Link>
                </p>
              </div>
              {
                writeArticle?.serviceImage && <>
            <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
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
              writeArticle?.brandLogo &&
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
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

        {/* order status and order message */}
        <OrderStatusAndChat orderDetails={data} />
      </div>
    </div>
};

export default Details;