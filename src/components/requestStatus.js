import React from "react";

export default function RequestStatus({ message, className }) {
  return (
    <section className={className || "requestStatus"}>
      <h3> {message}</h3>
    </section>
  );
}
