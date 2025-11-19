// components/PaymentMethodSelector.jsx
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const PaymentMethodSelector = ({ onPaymentSuccess, savedPaymentMethods }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [selectedMethod, setSelectedMethod] = useState('new');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        try {
            // For new payment method
            if (selectedMethod === 'new') {
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: `${window.location.origin}/payment-success`,
                        // Save payment method for future use
                        setup_future_usage: 'on_session',
                    },
                });

                if (error) {
                    console.error('Payment failed:', error);
                    alert('Payment failed: ' + error.message);
                }
            }
            // For saved payment method
            else {
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        payment_method: selectedMethod,
                        return_url: `${window.location.origin}/payment-success`,
                    },
                });

                if (error) {
                    console.error('Payment failed:', error);
                    alert('Payment failed: ' + error.message);
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Saved Payment Methods */}
            {savedPaymentMethods && savedPaymentMethods.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Saved Payment Methods</h3>
                    {savedPaymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center mb-2">
                            <input
                                type="radio"
                                id={method.id}
                                name="paymentMethod"
                                value={method.id}
                                checked={selectedMethod === method.id}
                                onChange={(e) => setSelectedMethod(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor={method.id}>
                                {method.card.brand.toUpperCase()} •••• {method.card.last4}
                                - Expires {method.card.exp_month}/{method.card.exp_year}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Option for new payment method */}
            <div className="flex items-center mb-4">
                <input
                    type="radio"
                    id="new"
                    name="paymentMethod"
                    value="new"
                    checked={selectedMethod === 'new'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="mr-2"
                />
                <label htmlFor="new">Use new payment method</label>
            </div>

            {/* New payment method form (only show when 'new' is selected) */}
            {selectedMethod === 'new' && (
                <div className="border p-4 rounded-lg">
                    <PaymentElement />
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isLoading}
                className="bg-[#002747] text-white py-2 px-8 hover:bg-[#002747]/90 transition cursor-pointer w-full inline-block mt-4 text-center disabled:opacity-50"
            >
                {isLoading ? 'Processing...' : 'Confirm Payment'}
            </button>
        </form>
    );
};

export default PaymentMethodSelector;