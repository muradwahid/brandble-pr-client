/**
 * Main Invoice Component - Renders the invoice using provided data.
 */
const Invoice = ({ data, ref }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div ref={ref} id="invoice-content" className="bg-white p-4 sm:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto">

      {/* Header Section */}
      <div className="max-w-[700px] w-full mx-auto bg-white p-10">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" className="mb-4">
          <tr>
            <td valign="top" className="w-[60%]">
              <img src="https://media.brandable-pr.com/upload/brandable-pr-mail-logo.png" alt="Brandable PR"  className="block h-[54px]" />
              <p className="m-0 mt-5 text-[#222425] font-sans text-base font-medium leading-[140%]">Austin, Texas</p>
              <p className="m-0 mt-2 text-[#222425] font-sans text-base font-normal leading-[140%]">&#9742; (512) 698-7373</p>
              <p className="m-0 mt-2 text-[#222425] font-sans text-base font-normal leading-[140%]">&#9993; hello@brandable-pr.com</p>
            </td>
            <td valign="top" className="text-left">
              <h3 className="m-0 uppercase text-[#222425] font-sans text-base font-semibold leading-[140%]">Invoice</h3>
              <p className="m-0 mt-1 text-[#5F6368] font-sans text-sm font-medium leading-5">Date: {formattedDate}</p>
            </td>
          </tr>
        </table>


        <div className="border-t border-[#B2B5B8] pt-6"></div>


        <table width="100%" cellPadding="0" cellSpacing="0" border="0">
          <tr>
            <td>
              <p className="m-0 uppercase text-[#004A87] font-sans text-base font-semibold leading-5">Bill to:</p>
              <p className="m-0 mt-3 text-[#0A0A0A] font-sans text-sm font-semibold leading-5">{data?.[0]?.user?.name}</p>
              <p className="m-0 mt-2 text-[#4A5565] font-sans text-sm font-normal leading-5">{data?.[0]?.user?.email}</p>
              <p className="m-0 mt-1 text-[#4A5565] font-sans text-sm font-normal leading-5">{data?.[0]?.user?.phoneNumber}</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellPadding="0" cellSpacing="0" border="0" className="mt-10 border-collapse">
          <thead>
            <tr className="bg-[#F2F2F3]">
              <th className="px-3 py-2 text-[#36383A] font-sans text-sm font-semibold border border-[#DCDEDF] text-left">Publication</th>
              <th className="px-3 py-2 text-[#36383A] font-sans text-sm font-semibold border border-[#DCDEDF] text-center">QTY</th>
              <th className="px-3 py-2 text-[#36383A] font-sans text-sm font-semibold border border-[#DCDEDF] text-right">UNIT PRICE</th>
              <th className="px-3 py-2 text-[#36383A] font-sans text-sm font-semibold border border-[#DCDEDF] text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => <tr key={idx}>
              <td className="p-3 text-sm font-medium text-[#36383A] border border-[#DCDEDF] border-collapse">
                {item.publication.title}
              </td>
              <td className="p-3 text-sm font-medium text-[#36383A] border border-[#DCDEDF] border-collapse">
                1
              </td>
              <td className="p-3 text-sm font-medium text-[#36383A] border border-[#DCDEDF] border-collapse">
                ${item.amount.toFixed(2)}
              </td>
              <td className="p-3 text-sm font-medium text-[#36383A] border border-[#DCDEDF] border-collapse">
                ${item.amount.toFixed(2)}
              </td>
            </tr>)}
          </tbody>
        </table>

        <table width="40%" cellPadding="0" cellSpacing="0" border="0" align="right" className="mt-[28px]">
          <tr>
            <td className="py-2 text-[#364153] font-sans text-sm font-normal leading-5 border-b border-[#E5E7EB]">Subtotal:</td>
            <td className="py-2 text-[#36383A] font-sans text-sm font-semibold leading-5 border-b border-[#E5E7EB] text-right">${totalAmount}</td>
          </tr>
          <tr>
            <td className="py-3 text-[#222425] font-sans text-base font-semibold leading-7">Total:</td>
            <td className="py-3 text-[#222425] font-sans text-base font-semibold leading-7 text-right">{totalAmount}</td>
          </tr>
        </table>

        <div className="clear-both"></div>


        <table width="100%" cellPadding="0" cellSpacing="0" border="0" className="mt-14">
          <tr>
            <td className="p-5 text-center">
              <p className="m-0 text-[#004A87] font-sans text-lg font-semibold leading-7">Thank you for your business!</p>
              <p className="m-0 mt-2 text-[#364153] font-sans text-sm leading-5 font-normal">If you have any questions about this invoice, please contact us at <a href="mailto:hello@brandable-pr.com" className="text-[#006AC2] underline">hello@brandable-pr.com</a>.</p>
            </td>
          </tr>
        </table>

      </div>
    </div>
  );
};

export default Invoice;