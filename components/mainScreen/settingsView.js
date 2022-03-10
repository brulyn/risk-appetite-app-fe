import React, { useState, useContext, useEffect } from "react";
import ToleranceInput from "../common/toleranceInput";
import { Button, Accordion, Icon, Dropdown } from "semantic-ui-react";
import TolQualitativeInput from "../common/tolQualitativeInput";
import ToleranceTitle from "../common/toleranceTitle";
import { UserContext } from "../../contexts/userContext";
import { CornerDialog } from "evergreen-ui";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuaterContext } from "../../contexts/quaterContext";
import Image from "next/dist/client/image";
import _ from "lodash";

export default function SettingsView() {
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  //Strategic Values
  const [pdctDev, setPdctDev] = useState("");
  const [investNewTech, setInvestNewTech] = useState("");
  const [businessCont, setBusinessCont] = useState("");
  const [expToNewMarket, setExpToNewMarket] = useState("");
  const [brandRisk, setBrandRisk] = useState("");

  //Operational Values
  const [disruptionOp, setDisruptionOp] = useState("");
  const [lossOfKeyStaff, setLossOfKeyStaff] = useState("");
  const [compromisePrdt, setCompromisePrdt] = useState("");
  const [serviceDelays, setServiceDelays] = useState("");
  const [disruptionSupplyChain, setDisruptionSupplyChain] = useState("");

  //Financial Values
  const [customerDefaultRisk, setCustomerDefaultRisk] = useState("");
  const [cashFlowConstraints, setCashFlowConstraints] = useState("");
  const [fraudAndCorruption, setFraudAndCorruption] = useState("");
  const [errorsAndMisstatements, setErrorsAndMisstatements] = useState("");
  const [underUtilCapital, setUnderUtilCapital] = useState("");

  //Compliance
  const [tax, setTax] = useState("");
  const [contract, setContract] = useState("");
  const [financialReporting, setFinancialReporting] = useState("");
  const [govLicence, setGovLicence] = useState("");

  const [savedValues, setSavedValues] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const { user, setUser } = useContext(UserContext);

  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const [queryCompany, setQueryCompany] = useState(user.selectedCompany);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [year, setYear] = globalQuater
    ? useState(globalQuater?.substr(globalQuater.length - 4))
    : useState(new Date().getFullYear());

  const handleExpand = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  const [presetValues, setPresetValues] = useState({});
  const host = `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001`;

  function getRangeValue(tolerance) {
    if (tolerance === 100) return 0;
    else if (tolerance === 80) return 1;
    else if (tolerance === 60) return 2;
    else if (tolerance === 50) return 3;
    else if (tolerance === 30) return 4;
    else if (tolerance === 10) return 5;
    else return tolerance;
  }

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
      .catch((err) => toast.error("Failed to fetch List of Companies!"));
  }, []);

  useEffect(() => {
    setLoading(true);
    setSavedValues([]);
    getToleranceValues()
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.quantitative.length > 0) {
          toast.info("Data already saved!");
          setSavedValues(response.quantitative);
          //Strategic
          setPdctDev(getRangeValue(response?.strategic[0]?.pdctDev));
          setBrandRisk(getRangeValue(response?.strategic[0]?.brandRisk));
          setBusinessCont(getRangeValue(response?.strategic[0]?.businessCont));
          setExpToNewMarket(
            getRangeValue(response?.strategic[0]?.expToNewMarket)
          );
          setInvestNewTech(
            getRangeValue(response?.strategic[0]?.investNewTech)
          );

          //Operational
          setCompromisePrdt(
            getRangeValue(response?.operational[0]?.compromisePrdt)
          );
          setLossOfKeyStaff(
            getRangeValue(response?.operational[0]?.lossOfKeyStaff)
          );
          setDisruptionOp(
            getRangeValue(response?.operational[0]?.disruptionOp)
          );
          setDisruptionSupplyChain(
            getRangeValue(response?.operational[0]?.disruptionSupplyChain)
          );
          setServiceDelays(
            getRangeValue(response?.operational[0]?.serviceDelays)
          );

          //financial
          setCashFlowConstraints(
            getRangeValue(response?.financial[0]?.cashFlowConstraints)
          );
          setCustomerDefaultRisk(
            getRangeValue(response?.financial[0]?.customerDefaultRisk)
          );
          setErrorsAndMisstatements(
            getRangeValue(response?.financial[0]?.errorsAndMisstatements)
          );
          setFraudAndCorruption(
            getRangeValue(response?.financial[0]?.fraudAndCorruption)
          );
          setUnderUtilCapital(
            getRangeValue(response?.financial[0]?.underUtilCapital)
          );

          //compliance
          setContract(getRangeValue(response?.compliance[0]?.contract));
          setFinancialReporting(
            getRangeValue(response?.compliance[0]?.financialReporting)
          );
          setGovLicence(getRangeValue(response?.compliance[0]?.govLicence));
          setTax(getRangeValue(response?.compliance[0]?.tax));
        } else {
          toast.warning("No data found!");

          //Strategic
          setPdctDev("");
          setBrandRisk("");
          setBusinessCont("");
          setExpToNewMarket("");
          setInvestNewTech("");

          //Operational
          setCompromisePrdt("");
          setLossOfKeyStaff("");
          setDisruptionOp("");
          setDisruptionSupplyChain("");
          setServiceDelays("");

          //financial
          setCashFlowConstraints("");
          setCustomerDefaultRisk("");
          setErrorsAndMisstatements("");
          setFraudAndCorruption("");
          setUnderUtilCapital("");

          //compliance
          setContract("");
          setFinancialReporting("");
          setGovLicence("");
          setTax("");
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Can't find Tolerance Values!");
        setLoading(false);
      });
  }, [queryCompany]);

  function getToleranceValues() {
    return fetch(`${host}/allRiskTolerance/${queryCompany}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    });
  }

  function validateInputs() {
    if (emptyProps.length > 0) setEmptyProps(true);
    else setEmptyProps(false);

    if (negativeProps.length > 0) setNegativeProps(true);
    else setNegativeProps(false);
  }

  const saveData = () => {
    let qualVals = {
      pdctDev,
      investNewTech,
      businessCont,
      expToNewMarket,
      brandRisk,
      disruptionOp,
      lossOfKeyStaff,
      compromisePrdt,
      serviceDelays,
      disruptionSupplyChain,
      customerDefaultRisk,
      cashFlowConstraints,
      fraudAndCorruption,
      errorsAndMisstatements,
      underUtilCapital,
      tax,
      contract,
      financialReporting,
      govLicence,
    };

    let emptyProps = [];
    let negativeProps = [];
    let outOfRangeProps = [];
    _.forIn(presetValues, (v, key) => {
      if (v?.length == 0 || _.isUndefined(v)) {
        emptyProps.push(key);
      }
    });

    _.forIn(qualVals, (v, key) => {
      if (v?.length == 0 || _.isUndefined(v)) {
        emptyProps.push(key);
      }
    });

    // _.forIn(presetValues, (v, key) => {
    //   if (v < 0) {
    //     negativeProps.push(key);
    //   }
    // });

    _.forIn(qualVals, (v, key) => {
      if (v < 0) {
        negativeProps.push(key);
      }
    });

    _.forIn(qualVals, (v, key) => {
      if (v > 5) {
        outOfRangeProps.push(key);
      }
    });

    if (emptyProps.length > 0) {
      toast.error("Some fields are empty!");
    }
    if (negativeProps.length > 0) {
      toast.error("Some values are Negative!");
    }
    if (outOfRangeProps.length > 0) {
      toast.error("Values out of range!");
    }
    if (
      emptyProps.length == 0 &&
      negativeProps.length == 0 &&
      outOfRangeProps.length == 0
    ) {
      // toast.info("Sending data!");
      Promise.all([
        fetch(`${host}/riskTolerance/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName: user.selectedCompany,
            username: user.username,
            riskToleranceValues: presetValues,
            year,
            createdBy: user.id,
          }),
        }),

        fetch(`${host}/strategicTolerance/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdctDev,
            investNewTech,
            businessCont,
            expToNewMarket,
            brandRisk,
            companyName: user.selectedCompany,
            username: user.username,
            year,
            createdBy: user.id,
          }),
        }),

        fetch(`${host}/operationalTolerance/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            disruptionOp,
            lossOfKeyStaff,
            compromisePrdt,
            serviceDelays,
            disruptionSupplyChain,
            companyName: user.selectedCompany,
            username: user.username,
            year,
            createdBy: user.id,
          }),
        }),

        fetch(`${host}/financialTolerance/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerDefaultRisk,
            cashFlowConstraints,
            fraudAndCorruption,
            errorsAndMisstatements,
            underUtilCapital,
            companyName: user.selectedCompany,
            username: user.username,
            year,
            createdBy: user.id,
          }),
        }),

        fetch(`${host}/complianceTolerance/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tax,
            contract,
            financialReporting,
            govLicence,
            companyName: user.selectedCompany,
            username: user.username,
            year,
            createdBy: user.id,
          }),
        }),
      ])
        .then((responses) => {
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then((response) => {
          toast.success("Saved successfully!");
          createEvent("toleranceValuesSaved", {
            title: "Tolerance Values Saved",
            description: `Tolerance values for ${queryCompany} saved`,
            payload: { quantVals: presetValues, qualVals, year },
            author: user.username,
          });
        })
        .catch((err) => {
          toast.error("Error while saving!");
          setMessageTitle("Operation Failed!");
          setErrorMessage(`An error occured : ${err}`);
          setDialogIsShown(true);
        });
    }
  };

  function createEvent(eventType, data) {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        data,
      }),
    })
      .then((res) => res.json())
      .then((response) => {})
      .catch((err) => {});
  }

  return (
    <div className="overflow-y-auto h-screen pb-32">
      <CornerDialog
        title={messageTitle}
        hasFooter={false}
        isShown={dialogIsShown}
        onCloseComplete={() => setDialogIsShown(false)}
      >
        {errorMessage}
      </CornerDialog>
      <ToastContainer />
      {/* <div className="font-semibold text-gray-500">Settings</div> */}

      {(user.profile === "Admin" ||
        user.profile === "EXCO" ||
        user.profile === "Tech" ||
        user.profile === "RD" ||
        user.profile === "SROF") && (
        <div className="flex flex-row w-2/5 mt-2 mr-5">
          <div class="flex flex-col mr-10">
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
                // setGlobalQuater(quater + " " + e.target.value);
              }}
            />
          </div>
        </div>
      )}
      {!loading && (
        <div className="flex flex-row transition duration-150 ease-out">
          <div className="flex flex-col w-1/2">
            <div className="font-semibold text-gray-600 mt-5">
              Quantitative Metrics
            </div>
            <ToleranceInput
              setPresetValues={setPresetValues}
              savedData={savedValues}
            />
            <div className="pt-5">
              <Button onClick={() => saveData()} color="blue">
                Save
              </Button>
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <div className="font-semibold text-gray-600 mt-5">
              Qualitative Metrics
            </div>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Strategic" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <TolQualitativeInput
                  direction="lesser"
                  title="Product dev. and innovation"
                  setQualValues={setPdctDev}
                  value={pdctDev}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Investment in new Technologies"
                  setQualValues={setInvestNewTech}
                  value={investNewTech}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Business continuity and disaster recovery"
                  setQualValues={setBusinessCont}
                  value={businessCont}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Expansion to new markets"
                  setQualValues={setExpToNewMarket}
                  value={expToNewMarket}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Brand/reputation risk"
                  setQualValues={setBrandRisk}
                  validateQualVal={true}
                  value={brandRisk}
                />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Operational" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <TolQualitativeInput
                  direction="lesser"
                  title="Disruption of operations"
                  setQualValues={setDisruptionOp}
                  value={disruptionOp}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Loss of key staff"
                  setQualValues={setLossOfKeyStaff}
                  value={lossOfKeyStaff}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Compromise of product and service quality"
                  setQualValues={setCompromisePrdt}
                  value={compromisePrdt}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Service delays"
                  setQualValues={setServiceDelays}
                  value={serviceDelays}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Disruptions to supply chain"
                  setQualValues={setDisruptionSupplyChain}
                  value={disruptionSupplyChain}
                  validateQualVal={true}
                />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Financial" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <TolQualitativeInput
                  direction="lesser"
                  title="Customer default risk"
                  setQualValues={setCustomerDefaultRisk}
                  value={customerDefaultRisk}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Cash-flow constraints"
                  setQualValues={setCashFlowConstraints}
                  value={cashFlowConstraints}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Fraud and corruption"
                  setQualValues={setFraudAndCorruption}
                  value={fraudAndCorruption}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Errors and misstatements"
                  setQualValues={setErrorsAndMisstatements}
                  value={errorsAndMisstatements}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Under-utilization of capital"
                  setQualValues={setUnderUtilCapital}
                  value={underUtilCapital}
                  validateQualVal={true}
                />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Compliance" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3}>
                <TolQualitativeInput
                  direction="lesser"
                  title="Tax compliance"
                  setQualValues={setTax}
                  value={tax}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Contract compliance"
                  setQualValues={setContract}
                  value={contract}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Financial reporting compliance"
                  setQualValues={setFinancialReporting}
                  value={financialReporting}
                  validateQualVal={true}
                />
                <TolQualitativeInput
                  direction="lesser"
                  title="Government licenses and regulations"
                  setQualValues={setGovLicence}
                  value={govLicence}
                  validateQualVal={true}
                />
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col h-full justify-center items-center">
          <Image height="300" width="300" src="/relax.svg" />
          <div className="text-gray-500 text-lg">
            Relax! We are gathering relevant data!
          </div>
        </div>
      )}
    </div>
  );
}
