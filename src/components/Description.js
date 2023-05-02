import React from "react";

const Description = (props) => {
    const paragraphs = props.description.split("\n\n");

    const lastParagraph = paragraphs[paragraphs.length - 1];
    const otherParagraphs = paragraphs.slice(0, -1);
    return (
      <>
        <h2>{props.heading}</h2>
        <div className="props.">
          {otherParagraphs.map((paragraph, index) => {
            return (
              <div key={index}>
                {paragraph}
                <br />
              </div>
            );
          })}
          {lastParagraph.split("\n").map((line, index) => {
            return (
              <div key={index}>
                {line}
                {index < lastParagraph.split("\n").length - 1 && <br />}
              </div>
            );
          })}
        </div>
      </>
    );
}

export default Description;