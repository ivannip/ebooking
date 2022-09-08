import React from "react";

function ResultPage(props) {

  const returnSearch = () => {
    props.back(2);
  }

  return (
  <div>ResultPage
    <button onClick={returnSearch}>Back</button>
  </div>);
}

export default ResultPage;