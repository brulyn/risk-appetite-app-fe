import React, { useEffect, useState } from "react";
import { Progress } from "semantic-ui-react";
import ToleranceMetric from "./toleranceMetric";
import ToleranceTitle from "./toleranceTitle";

export default function QualitativeInput({ title, setQualValues, value }) {
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
            error={value.toString().length == 0}
          />
        </div>
        {/* Progress bar */}
        <div className="w-1/3 pt-7 mr-10">
          <Progress percent={value} indicating size="small" />
        </div>
      </div>
    </div>
  );
}
