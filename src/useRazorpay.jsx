import { useEffect, useCallback } from "react";

/* Constants */
const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const useRazorpay = () => {
  const checkScriptLoaded = useCallback(() => {
    if (!("Razorpay" in window)) return false;
    return true;
  }, []);

  const loadScript = useCallback((scriptUrl) => {
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement("script");
      scriptTag.src = scriptUrl;
      scriptTag.onload = (ev) => resolve(ev);
      scriptTag.onerror = (err) => reject(err);
      document.body.appendChild(scriptTag);
    });
  }, []);

  const open = async (options) => {
    if (!checkScriptLoaded()) {
          try {
            await loadScript(RAZORPAY_SCRIPT);
          } catch (error) {
            throw new Error(error);
          }
      }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  

  return { open };
};

export default useRazorpay;
