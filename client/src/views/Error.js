import React from "react";
// import "../styles/SidebarChannel.css";

function Error() {
  return (
    <div>
      <h3 style={{ color: "azure", paddingTop: "5%", fontWeight: "100" }}>
        Invalid Route, please return
        <a
          href="/"
          style={{ color: "blue", paddingTop: "5%", fontWeight: "100" }}
        >
          {" "}
          Home!
        </a>
      </h3>
    </div>
  );
}

export default Error;
