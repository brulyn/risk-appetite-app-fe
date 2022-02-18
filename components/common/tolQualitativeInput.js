import { get, isEmpty } from "lodash-es";
import React from "react";
import { Progress } from "semantic-ui-react";
import ToleranceMetric from "./toleranceMetric";
import ToleranceTitle from "./toleranceTitle";

export default function TolQualitativeInput({
  title,
  setQualValues,
  value,
  direction,
  validateQualVal,
  setError,
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
            error={
              validateQualVal &&
              (value < 0 || value > 5 || value.toString().length < 1)
            }
            setError={setError}
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
