import React from "react";

const Rank = props => {
  return (
    <section>
      <p className="f3 white">{`${
        props.named
      } Your current Entry Count is `}</p>
      <p className="f1 white">{props.ranked}</p>
    </section>
  );
};

export default Rank;
