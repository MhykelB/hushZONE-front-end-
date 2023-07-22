import React from "react";
import { DotLoader } from "react-spinners";
import { BsCheck2Circle } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BsEmojiNeutral } from "react-icons/bs";

const SignUpSuccessModal = () => {
  return (
    <div className="signUpSuccessful">
      <Logo />
      <div className="check-container">
        <IconContext.Provider value={{ className: "sign-up-icon" }}>
          <BsCheck2Circle
            size={120}
            /* color="rgba(255, 165, 0, 1)"*/
          />
        </IconContext.Provider>
      </div>
      <h3>Sign up successful....</h3>
    </div>
  );
};
const Spinner = ({ loadingState, classID, color, size }) => {
  return (
    <div className={classID}>
      <DotLoader
        size={size || 45}
        color={color || "rgba(255, 165, 0, 1)"}
        loading={loadingState}
      />
      {/* <ClimbingBoxLoader size={10} color={"#123abc"} loading={loadingState} /> */}
    </div>
  );
};
// correct to sign up succesful
export default function RequestStatus({ message }) {
  return (
    <section className="requestStatus">
      <h3> {message}</h3>
    </section>
  );
}

const Logo = () => {
  return (
    <div className="small-logo">
      <BsEmojiNeutral color="rgba(255, 165, 0, 1)" />
      <div className="small-logo-name">
        {" "}
        hush<span>ZONE</span>
      </div>
    </div>
  );
};

export { SignUpSuccessModal, Spinner, RequestStatus };
