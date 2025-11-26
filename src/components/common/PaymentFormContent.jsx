import { useState, useEffect } from 'react';
import { useStripe,useElements,PaymentElement } from '@stripe/react-stripe-js';
import { useSaveMethodMutation } from '../../redux/api/stripepaymentApi';
import toast from 'react-hot-toast';

const PaymentFormContent = ({ clientSecret, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const [saveMethod] = useSaveMethodMutation()

  useEffect(() => {
    if (!stripe) {
      return;
    }

  const checkElementReady = async () => {
      const element = elements?.getElement('payment');
      if (element) {
        setCanSubmit(true);
      }
    };

    checkElementReady();
  }, [stripe, elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...",e);

    setIsLoading(true);

    try {
      
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        payment_method_data: {
          billing_details: {
            // Email required করুন
            email: '', // Stripe automatically collect করবে
            name: '',  // Stripe automatically collect করবে
            phone: '', // Stripe automatically collect করবে
            address: {
              line1: '',
              city: '',
              state: '',
              postal_code: '',
              country: 'US', // Default country
            }
          }
        },
        client_secret: clientSecret,
        redirect: 'if_required',
      });

      if (error) {
        let userFriendlyMessage = error.message;
        
        // User-friendly error messages in Bengali
        switch (error.code) {
          case 'setup_intent_unexpected_state':
            userFriendlyMessage = 'Session expired. Please try again.';
            break;
          case 'invalid_request_error':
            userFriendlyMessage = 'Request is not correct. Please try again.';
            break;
          case 'card_error':
            userFriendlyMessage = 'Card not accepted. Please use another card.';
            break;
          case 'validation_error':
            userFriendlyMessage = 'Provide the correct card information.';
            break;
          default:
            userFriendlyMessage = error.message;
        }
        toast.error(userFriendlyMessage);
      } else if (setupIntent) {
        console.log("get setup intent:",setupIntent);
        if (setupIntent.status === 'succeeded') {
          console.log('Saving payment method:', setupIntent.payment_method);
          try {
            await saveMethod({paymentMethodId:setupIntent.payment_method});
            onSuccess();
            toast.success('Card saved successfully!');
          // eslint-disable-next-line no-unused-vars
          } catch (saveError) {
            toast.error("Couldn't save the card. Please try again.");
          }
        } else if (setupIntent.status === 'processing') {
          toast.success('Card saved and processing.');
        } else if (setupIntent.status === 'requires_payment_method') {
          toast.error('Please select a valid payment method.');
        } else {
          toast.error('The setup is not complete. Please try again.');
        }
      } else {
        toast.error('No response. Please try again.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleElementChange = (event) => {
    if (event.error) {
      toast.error(event.error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="stripe-form z-50">
        <PaymentElement 
          onChange={handleElementChange}
          
          options={{
            layout: {
              type: 'tabs',
              defaultCollapsed: true
            },
            paymentMethodOrder: [
              'card',
              'us_bank_account',
            ],
            // fields: {
            //   billingDetails:"auto"
            // }
          }}
        />

        <div className="form-buttons flex justify-between mt-8">
          <button
            type="submit"
            disabled={!stripe || !canSubmit || isLoading}
            className="bg-[#004A87] px-8 py-2 cursor-pointer hover:bg-[#023d6d] transition text-white"
          >
            {isLoading ? 'Saving..' : 'Save Card'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-[#004A87] px-8 py-2 cursor-pointer hover:bg-[#023d6d] transition text-black hover:text-white"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentFormContent;