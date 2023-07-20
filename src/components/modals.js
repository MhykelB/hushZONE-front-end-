import React from "react";
import { DotLoader } from "react-spinners";
// import { ClimbingBoxLoader } from "react-spinners";

const LoginSuccessModal = () => {
  return (
    <div>
      <h3 className="loginSuccessful">Sign up successful....</h3>
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
export default function RequestStatus({ error, message }) {
  return (
    <section className="requestStatus">
      <h3> {message}</h3>
    </section>
  );
}

export { LoginSuccessModal, Spinner, RequestStatus };
