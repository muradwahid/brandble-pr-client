export const publicationStatus = [
  { label: "Submitted", value: "submitted", color: "bg-[#222425]" },
  { label: "Published", value: "published", color: "bg-[#008CFF]" },
  { label: "Processing", value: "processing", color: "bg-[#36B37E]" },
  {
    label: "Unable to Publish",
    value: "unabletopublish",
    color: "bg-[#D96612]",
  },
];

export const statusBgColor = {
  submitted: "bg-[#222425]",
  published: "bg-[#008CFF]",
  processing: "bg-[#36B37E]",
  unabletopublish: "bg-[#D96612]",
};



export const createInvoiceDataFromOrder = (order=[]) => {
  if (!order) return null;
  
  // Map order status to invoice payment status
  const statusMap = {
    pending: 'Pending',
    processing: 'Pending',
    published: 'Paid',
    completed: 'Paid',
  };

  const paymentStatus = statusMap[order?.status] || 'Pending';

  return {
    id: order?.orderId || order?.id,
    issueDate: new Date(order?.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    dueDate: new Date(Date.parse(order?.createdAt) + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    paymentStatus,
    taxRate: 0, 

    company: {
      name: "Your Company Name",
      address: "123 Business Street\nNew York, NY 10001",
      email: "billing@yourcompany.com",
    },

    client: {
      name: order?.user?.name || 'Client',
      address: 'N/A',
      email: order?.user?.email,
    },

    items: [
      {
        description:
          order?.orderType === 'wonArticle'
            ? `Guest Post on ${order?.publication?.title || 'Publication'} (Won Article)`
            : `Write & Publish Article on ${order?.publication?.title || 'Publication'}`,
        quantity: 1,
        unitPrice: order?.amount,
      },
    ],

    notes: `Thank you for your purchase! This invoice is for your ${order?.orderType === 'wonArticle' ? 'guest post placement' : 'write & publish'
      } order?. Payment was processed via ${order?.paymentMethod?.brand?.toUpperCase()} ending in ${order?.paymentMethod?.last4}.`,
  };
};