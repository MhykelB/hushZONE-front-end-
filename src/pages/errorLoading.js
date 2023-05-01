import React from "react";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <>
      <section className="errorPage">
        <div> OOps! something went wrong</div>
        <p className="error-msg">please check your network connection </p>
        <Link to="/">
          <button className="back-btn">back to Home</button>
        </Link>
      </section>
    </>
  );
}

export function defaultErrorPage() {
  return (
    <div>
      <h1>Unathorized access</h1>
    </div>
  );
}
