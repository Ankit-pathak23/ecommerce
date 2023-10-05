import Axios from "axios";


// import { server } from "./server";
import { server } from "../../Pages/server";


  

  

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await Axios({
        url: `${server}/razorpay/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          window.location.href = "/order";
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  export const showRazorpay = async (props) => {
    console.log(props);
    const { price, id } = props
    console.log("hiii");

    console.log("hii");
    const res = await loadScript();

    let bodyData = new FormData();
    
    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", price);
    bodyData.append("id", 1);
    

    const data = await Axios({
      url: `${server}/razorpay/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: "rzp_test_0ZY6EjrHkFQgpY", // in react your environment variable must start with REACT_APP_
      key_secret: "1D9WkKS7t1QcSyn4qezp0rpA",
      amount: price,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        console.log(response);
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "Ankit Pathak",
        email: "pathakankit2309@gmail.com",
        contact: "6203370516",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  


