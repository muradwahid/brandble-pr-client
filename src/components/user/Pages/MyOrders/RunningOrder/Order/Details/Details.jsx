import React from 'react';
import { tableData } from '../../data';
import { Link, useParams } from 'react-router';
import { LeftArrowIcon } from '../../../../../../../utils/icons';
import OrderStatusAndChat from '../OrderStatusAndChat';
import { MdAttachFile, MdOutlineAddLink } from 'react-icons/md';

const Details = () => {
    const { id } = useParams();
    const orderDetails = tableData.find((order) => order.id === id);
  return (
    <div className="w-full h-full">
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
                    Nicholi Johnson
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#5F6368] text-sm pt-3 pb-2.5 tracking-[0.1px] leading-[20px]">
                    Designation
                  </p>
                  <p className="text-[#171819] font-medium  leading-[140%]">
                    CEO
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#5F6368] text-sm pt-3 pb-2.5 tracking-[0.1px] leading-[20px]">
                  Company Name
                </p>
                <p className="text-[#171819] font-medium  leading-[140%]">
                  Brandable PR Inc.
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
                  <Link download className="text-[#006AC2] break-all">
                    https://docs.google.com/document/d/11zlsmYxMaukBmpAWsjcR2Uezfb0Pl
                    YDO/edit?
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
                  <Link download className="text-[#006AC2] break-all">
                    https://docs.google.com/document/d/11zlsmYxMaukBmpAWsjcR2Uezfb0Pl
                    YDO/edit?
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
                  <Link download className="text-[#006AC2] break-all">
                    https://docs.google.com/document/d/11zlsmYxMaukBmpAWsjcR2Uezfb0Pl
                    YDO/edit?
                  </Link>
                </p>
              </div>
            </div>
            {/* goal */}
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3 mt-10">
              URL and Links
            </h3>
            <div className="space-y-10 mt-5">
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  What is the main goal of this PR campaign?
                </p>
                <p className="text-[#171819] leading-[140%]">
                  Increasing awareness of their healthcare services and
                  residential facilities tailored for doctors. Establishing
                  credibility by showcasing expertise, quality care, and unique
                  offerings like housing solutions for physicians. Fostering
                  community engagement to position Doctors' Hope as a reliable
                  and patient-centered institution.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  What is the main message or theme that you want?
                </p>
                <p className="text-[#171819] leading-[140%]">
                  Doctors' Hope Private Ltd. is dedicated to empowering doctors
                  with supportive residences and delivering exceptional
                  healthcare to strengthen the heart of our community.
                  <br />
                  <br />
                  Healing Homes: Highlighting the unique residential facilities
                  designed for doctors, fostering their well-being and
                  professional growth. Caring Hearts: Emphasizing compassionate,
                  patient-centered medical care provided by a trusted hospital
                  in Dhaka. Community Strength: Showcasing a commitment to
                  improving health and building trust across Bangladesh.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  What specific points or information do you want to include?
                </p>
                <p className="text-[#171819]  leading-[140%]">
                  Highlight Doctors' Hope’s distinctive combination of a private
                  hospital and residential facilities tailored for doctors.
                  Example: "Doctors' Hope is more than a hospital—it’s a home
                  for physicians, offering modern residences to support their
                  professional and personal lives."
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Who is the target audience?
                </p>
                <p className="text-[#171819]  leading-[140%]">
                  Doctors and Medical Professionals, Patients and Their
                  Families.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  If you'd like, provide a few “wish list” headline ideas we can
                  share with the editor.
                </p>
                <div>
                  <ul className="space-y-5 list-decimal list-inside text-[#171819] leading-[140%]">
                    <li>
                      Doctors' Hope: Where Physicians Find Home and Patients
                      Find Care"
                      <ul className="list-disc list-inside text-[#171819] leading-[140%]">
                        <li>
                          Highlights the dual role of residential and healthcare
                          services, appealing to both doctors and patients.
                        </li>
                      </ul>
                    </li>
                    <ul className="list-decimal list-inside text-[#171819] leading-[140%]">
                      <li>
                        "Healing Dhaka: Doctors' Hope Combines Compassion with
                        Community"
                        <ul className="list-disc list-inside text-[#171819] leading-[140%]">
                          <li>
                            Emphasizes local impact and compassionate care,
                            targeting the Dhaka community and patients.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </ul>
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
                  Doctors' Hope may introduce new medical specialties or
                  advanced equipment, as private hospitals in Dhaka often
                  upgrade to stay competitive. Look for updates on their website
                  or Facebook page for announcements about new departments
                  (e.g., cardiology, oncology) or diagnostic tools.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Is there anything else that you would like to add / that you
                  think our publicist should know in order to create an
                  effective and successful article?
                </p>
                <p className="text-[#171819] leading-[140%]">
                  Healthcare PR thrives on human connection. Stories of doctors
                  living in Doctors' Hope residences or patients receiving
                  life-changing care can make the article relatable and
                  memorable.
                </p>
              </div>
            </div>

            {/* image upload */}
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3 mt-10">
              Future
            </h3>
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Upload one high-resolution, professional photo of you or the
                  person for this PR. *
                </p>
                <p className="flex gap-2">
                  <MdAttachFile className="text-[#878C91] mt-0.5" />
                  <Link download className="text-[#006AC2] break-all">
                    Unhappy-businessman-520108
                  </Link>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Upload one photo of your brand/product/service you want to
                  highlight. (Optional)
                </p>
                <div className="space-y-2">
                  <p className="flex gap-2">
                    <MdAttachFile className="text-[#878C91] mt-0.5" />
                    <Link download className="text-[#006AC2] break-all">
                      Unhappy-businessman-520108
                    </Link>
                  </p>
                  <p className="flex gap-2">
                    <MdAttachFile className="text-[#878C91] mt-0.5" />
                    <Link download className="text-[#006AC2] break-all">
                      Unhappy-businessman-520108
                    </Link>
                  </p>
                  <p className="flex gap-2">
                    <MdAttachFile className="text-[#878C91] mt-0.5" />
                    <Link download className="text-[#006AC2] break-all">
                      Unhappy-businessman-520108
                    </Link>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[#5F6368] text-sm">
                  Upload your company or brand logo. (Optional)
                </p>
                <div className="space-y-2">
                  <p className="flex gap-2">
                    <MdAttachFile className="text-[#878C91] mt-0.5" />
                    <Link download className="text-[#006AC2] break-all">
                      Unhappy-businessman-520108
                    </Link>
                  </p>
                    <p className="flex gap-2">
                    <MdAttachFile className="text-[#878C91] mt-0.5" />
                    <Link download className="text-[#006AC2] break-all">
                      Unhappy-businessman-520108
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* order status and order message */}
        <OrderStatusAndChat orderDetails={orderDetails} />
      </div>
    </div>
  );
};

export default Details;