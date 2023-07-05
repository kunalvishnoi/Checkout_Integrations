import React, { useCallback, useEffect } from "react";
import useRazorpay from "./useRazorpay";

const App = () => {


  const { open } = useRazorpay();

  useEffect(() => {
    handlePayment();
  } , [])

  const handlePayment = useCallback(() => {
    // create your order here
    // const order = await createOrder(params);
    // complete options list
    // https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/#checkout-options

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // your key
      amount: "100", // amount
      currency: "INR", // currency
      name: "Razorpay", // merchant name
      description: "Test Transaction", // payment description
      prefill: {
        name: "Dummy", // customer name
        email: "youremail@example.com", // customer email
        contact: "9999999999" // customer contact
      },
      handler: function(resp){ alert(resp.razorpay_payment_id)},
      theme: {
        color: "#3399cc"
      }
    };

    open(options);
  }, [open]);

  return <button onClick={handlePayment}>Buy Now</button>;
};

export default App;
