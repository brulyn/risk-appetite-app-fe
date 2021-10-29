import React, { useEffect, useState } from "react";
import { Progress } from "semantic-ui-react";
import ToleranceMetric from "./toleranceMetric";
import ToleranceTitle from "./toleranceTitle";

const getColor = (val, dir) => {
  if (dir === "greater") {
    if (val < 10) return "red";
    else if (val < 40) return "orange";
    else if (val < 60) return "yellow";
    else if (val < 80) return "olive";
    else return "green";
  } else {
    if (val < 10) return "green";
    else if (val < 40) return "olive";
    else if (val < 60) return "yellow";
    else if (val < 80) return "orange";
    else return "red";
  }
};

export default function TolQualitativeInput({
  title,
  setQualValues,
  value,
  direction,
}) {
  return (
    <div>
      {/* Row */}
      {/* Input field */}
      <div className="flex flex-row items-center justify-center">
        <div className="flex-1">
          <ToleranceMetric
            name={title}
            setValue={setQualValues}
            value={value}
          />
        </div>
        {/* Progress bar */}
        <div className="w-1/3 pt-7 mr-10">
          <Progress
            percent={value}
            color={getColor(value, direction)}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
