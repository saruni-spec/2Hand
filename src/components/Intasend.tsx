import "intasend-inlinejs-sdk";
import { useNavigate } from "react-router-dom";

interface IntaSend {
  new (options: { publicAPIKey: string; live: boolean }): IntaSendInstance;
}

interface IntaSendInstance {
  on(
    event: "COMPLETE" | "FAILED" | "IN-PROGRESS",
    callback: (response: Response) => void
  ): IntaSendInstance;
}

interface Response {
  status: string;
  message: string;
}

declare global {
  interface Window {
    IntaSend: IntaSend;
  }
}

const IntaSendButton = ({
  amount,
  phone,
  email,
}: {
  amount: string;
  phone: string;
  email: string;
}) => {
  const navigate = useNavigate();
  // Destructure amount prop
  new window.IntaSend({
    publicAPIKey: "ISPubKey_live_2f2708f5-446a-4be2-a8ee-12ab537ee2c9",
    live: true, //or true for live environment
  })
    .on("COMPLETE", (response: Response) => {
      console.log("COMPLETE:", response);
      alert("Payment Complete");
      navigate("/shop");
    })
    .on("FAILED", (response: Response) => {
      console.log("FAILED", response);
      alert("Payment Failed");
    })
    .on("IN-PROGRESS", () => {
      console.log("INPROGRESS ...");
    });

  return (
    <div>
      <button
        className="intaSendPayButton"
        data-amount={amount} // Set data-amount directly on button
        data-currency="KES"
        data-email={email}
        data-phone_number={phone}
      >
        Pay Now
      </button>
    </div>
  );
};

export default IntaSendButton;
