import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function InputView() {
  const [startDate, setStartDate] = useState(new Date());
  const [fileName, setFileName] = useState("Select a file");

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

          <div class="flex w-full bg-grey-lighter pt-5">
            <label class="w-64 flex flex-col items-center px-2 py-3 bg-white text-gray-500 rounded-lg shadow-lg tracking-wide uppercase border border-gray-500 cursor-pointer hover:bg-gray-500 hover:text-white">
              <svg
                class="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">{fileName}</span>
              <input
                type="file"
                class="hidden"
                // value={fileName}
                onChange={(e) => {
                  setFileName(e.target.files[0].name);
                }}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
