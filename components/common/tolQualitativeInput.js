import { get } from "lodash-es";
import React, { useEffect, useState } from "react";
import { Progress } from "semantic-ui-react";
import ToleranceMetric from "./toleranceMetric";
import ToleranceTitle from "./toleranceTitle";

const getColor = (val, dir) => {
  if (dir === "greater") {
    if (val == 0) return "red";
    else if (val == 1) return "orange";
    else if (val == 2) return "yellow";
    else if (val == 3) return "olive";
    else if (val >= 4) return "green";
    else return "green";
  } else {
    if (val == 0) return "green";
    else if (val == 1) return "green";
    else if (val == 2) return "olive";
    else if (val == 3) return "yellow";
    else if (val == 4) return "orange";
    else return "red";
  }
};

const getPercent = (val) => {
  if (val === 1) {
    return 100;
  } else if (val === 2) {
    return 80;
  } else if (val === 3) {
    return 50;
  } else if (val === 4) {
    return 10;
  } else if (val === 5) {
    return 0;
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
      <div className="flex flex-row items-center justify-center w-2/3">
        <div className="flex-1">
          <ToleranceMetric
            name={title}
            setValue={setQualValues}
            value={value}
          />
        </div>
        {/* Progress bar */}
        {/* <div className="w-1/3 pt-7 mr-10">
          <Progress
            percent={20 * value}
            color={getColor(value, direction)}
            size="small"
          />
        </div> */}
      </div>
    </div>
  );
}
