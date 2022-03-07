import React, { useContext, useEffect, useState } from "react";
import StructuredTable from "../common/structuredTable";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { QuaterContext } from "../../contexts/quaterContext";
import { Tab, Dropdown } from "semantic-ui-react";
import StructuredTableQual from "../common/structuredTableQual";
import Image from "next/dist/client/image";
import { UserContext } from "../../contexts/userContext";
import { toast, ToastContainer } from "react-toastify";
export default function OutputView() {
  const { loaded, setLoaded } = useContext(DataLoadedContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const { user, setUser } = useContext(UserContext);

  const [queryCompany, setQueryCompany] = useState(user.selectedCompany);
  const [companies, setCompanies] = useState([]);

  const [quater, setQuater] = globalQuater
    ? useState(globalQuater?.substr(0, 2))
    : useState("Q1");
  const [year, setYear] = globalQuater
    ? useState(globalQuater?.substr(globalQuater.length - 4))
    : useState(new Date().getFullYear());

  const [quaterYear, setQuaterYear] = useState(
    `Q1 ${new Date().getFullYear()}`
  );

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/companies/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setCompanies(response))
      .catch((err) => {
        toast.error("Failed to fetch List of companies");
      });
  }, []);

  const quaterList = [
    {
      qtext: "Quarter 1",
      abbr: "Q1",
    },
    {
      qtext: "Quarter 2",
      abbr: "Q2",
    },
    {
      qtext: "Quarter 3",
      abbr: "Q3",
    },
    {
      qtext: "Quarter 4",
      abbr: "Q4",
    },
  ];
  const quaterOptions = _.map(quaterList, (quater, index) => ({
    key: quaterList[index].abbr,
    text: quaterList[index].qtext,
    value: quaterList[index].abbr,
  }));

  const panes = [
    {
      menuItem: "Quantitative Metrics",
      render: () => (
        <div className="mr-5">
          <div className="flex flex-row w-2/5 mt-2 mr-5">
            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Quarter
              </label>
              <Dropdown
                placeholder="Quarter"
                search
                selection
                value={quater}
                options={quaterOptions}
                onChange={(e, { value }) => {
                  setQuater(value);
                  // setQuaterYear(value + " " + year);
                  setGlobalQuater(value + " " + year);
                }}
              />
            </div>

            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Year
              </label>
              <input
                className="focus:outline-none border-2 border-gray-200 focus:border-blue-cvl-300 py-2.5 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
                value={year}
                type="number"
                onChange={(e) => {
                  setYear(e.target.value);
                  // setQuaterYear(quater + " " + e.target.value);
                  setGlobalQuater(quater + " " + e.target.value);
                }}
              />
            </div>

            {(user.profile === "Admin" ||
              user.profile === "EXCO" ||
              user.profile === "Tech" ||
              user.profile === "RD" ||
              user.profile === "SROF") && (
              <div class="flex flex-col mr-5">
                <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                  Company
                </label>
                <Dropdown
                  placeholder="Company"
                  search
                  selection
                  value={queryCompany}
                  options={companies.map((c) => {
                    return {
                      key: c.name,
                      value: c.name,
                      text: c.name,
                    };
                  })}
                  onChange={(e, { value }) => {
                    setQueryCompany(value);
                    let _user = { ...user };
                    _user.selectedCompany = value;
                    setUser(_user);
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {loaded && (
              <div className="flex flex-col">
                {/* Title */}

                <div className="flex flex-col mr-4 mt-2 mb-10">
                  <StructuredTable />
                </div>
              </div>
            )}

            {!loaded && (
              <div className="flex flex-col h-full justify-center items-center">
                {/* <DocumentSearchIcon className="text-gray-300 h-32 w-32" /> */}
                <Image height="300" width="300" src="/nodata1.svg" />
                <div className="text-gray-500 text-lg">No data!</div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      menuItem: "Qualitative Metrics",
      render: () => (
        <div className="mr-5 mb-5">
          <div className="flex flex-row w-2/5 mt-2 mr-5">
            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Quarter
              </label>
              <Dropdown
                placeholder="Quarter"
                search
                selection
                value={quater}
                options={quaterOptions}
                onChange={(e, { value }) => {
                  setQuater(value);
                  // setQuaterYear(value + " " + year);
                  setGlobalQuater(value + " " + year);
                }}
              />
            </div>

            <div class="flex flex-col mr-5">
              <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                Year
              </label>
              <input
                className="focus:outline-none border-2 border-gray-200 focus:border-blue-cvl-300 py-2.5 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
                value={year}
                type="number"
                onChange={(e) => {
                  setYear(e.target.value);
                  // setQuaterYear(quater + " " + e.target.value);
                  setGlobalQuater(quater + " " + e.target.value);
                }}
              />
            </div>

            {(user.profile === "Admin" ||
              user.profile === "EXCO" ||
              user.profile === "Tech" ||
              user.profile === "RD" ||
              user.profile === "SROF") && (
              <div class="flex flex-col mr-5">
                <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                  Company
                </label>
                <Dropdown
                  placeholder="Company"
                  search
                  selection
                  value={queryCompany}
                  options={companies.map((c) => {
                    return {
                      key: c.name,
                      value: c.name,
                      text: c.name,
                    };
                  })}
                  onChange={(e, { value }) => {
                    setQueryCompany(value);
                    let _user = { ...user };
                    _user.selectedCompany = value;
                    setUser(_user);
                  }}
                />
              </div>
            )}
          </div>
          {loaded && (
            <div className="flex flex-col">
              {/* Title */}

              <div className="flex flex-col mr-4 mt-2 mb-10">
                <StructuredTableQual />
              </div>
            </div>
          )}

          {!loaded && (
            <div className="flex flex-col h-full justify-center items-center">
              {/* <DocumentSearchIcon className="text-gray-300 h-32 w-32" /> */}
              <Image height="300" width="300" src="/nodata1.svg" />
              <div className="text-gray-500 text-lg">No data!</div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-y-auto h-screen pb-20">
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      <ToastContainer />
    </div>
  );
}
