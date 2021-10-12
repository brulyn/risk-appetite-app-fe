"use strict";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import readXlsxFile from "read-excel-file";

export default function InputView() {
  const [startDate, setStartDate] = useState(new Date());
  const [fileName, setFileName] = useState("Select a file");
  const [currentFigures, setCurrentFigures] = useState({});
  const [previousFigures, setPreviousFigures] = useState({});

  useEffect(() => {
    fetch(
      `http://localhost:3001/operationalEfficiency/${currentFigures["currentOperatingProfit"]}/${currentFigures["currentTotalRevenues"]}`,
      {
        method: "GET",
        // headers: new Headers({
        //   Accept: "application/vnd.github.cloak-preview",
        // }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, [currentFigures]);
  return (
    <div className="flex flex-col">
      {/* Title */}
      <h2 className="font-semibold text-gray-500">Input</h2>
      {/* Input form */}
      <div className="mt-10">
        <form>
          <DatePicker
            className="border-2 py-2 px-3 focus:border-gray-100 rounded-lg "
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Reporting Date"
            showPopperArrow={false}
          />

          <div className="flex w-full bg-grey-lighter pt-5">
            <label className="w-64 flex flex-col items-center px-2 py-3 bg-white text-gray-500 rounded-lg shadow-lg tracking-wide uppercase border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">{fileName}</span>
              <input
                type="file"
                className="hidden"
                webkitdirectory
                directory
                multiple
                // value={fileName}
                onChange={(e) => {
                  setFileName(e.target.files[0].name);
                  readXlsxFile(e.target.files[0]).then((rows) => {
                    // console.log(rows);
                    //previous quater figures
                    let prevTotalRevenues = rows[12][10];
                    let prevDepreciation = rows[17][10];
                    let prevGrossProfit = rows[21][10];
                    let prevOperatingProfit = rows[27][10];
                    let prevNetProfit = rows[32][10];
                    let prevEBITDA = rows[34][10];

                    setPreviousFigures({
                      prevTotalRevenues,
                      prevDepreciation,
                      prevGrossProfit,
                      prevOperatingProfit,
                      prevNetProfit,
                      prevEBITDA,
                    });
                    //current quater figures
                    let currentTotalRevenues = rows[12][15];
                    let currentDepreciation = rows[17][15];
                    let currentGrossProfit = rows[21][15];
                    let currentOperatingProfit = rows[27][15];
                    let currentNetProfit = rows[32][15];
                    let currentEBITDA = rows[34][15];

                    setCurrentFigures({
                      currentTotalRevenues,
                      currentDepreciation,
                      currentGrossProfit,
                      currentOperatingProfit,
                      currentNetProfit,
                      currentEBITDA,
                    });
                  });
                }}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
