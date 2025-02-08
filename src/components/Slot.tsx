import React from "react";

import redToken from "../assets/redToken.svg";
import yellowToken from "../assets/yellowToken.svg";

const Slot = ({ token, x, y }: { token?: string; x: number; y: number }) => {
  return (
    <div className="slot" data-x={x} data-y={y}>
      {token && (
        <img
          src={token === "X" ? redToken : yellowToken}
          alt="Token"
          style={
            {
              "--startHeight": `${-(70 + y * 120)}px`,
              animation: `fall ${
                (70 + y * 120) / 600 + 0.2
              }s cubic-bezier(0.3, 0.7, 0.8, 1) forwards`,
            } as React.CSSProperties
          }
        />
      )}
    </div>
  );
};

export default Slot;
