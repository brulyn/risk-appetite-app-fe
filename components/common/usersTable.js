import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/solid";
import {
  ChatIcon,
  DotsHorizontalIcon,
  CheckIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Table } from "semantic-ui-react";
import MTextView from "./mTextView";
import MLable from "./mLabel";
import MPagination from "./pagination";
import { paginate } from "../../utils/paginate";

const MStatusIndicator = ({ status }) => {
  if (status === "active")
    return (
      <div className="flex flex-row">
        <CheckIcon className="h-5 w-5 text-green-500" />
        <MTextView content={status} />
      </div>
    );
  else if (status === "suspended") {
    return (
      <div className="flex flex-row">
        <XIcon className="h-5 w-5 text-red-500" />
        <MTextView content={status} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />
        <MTextView content={status} />
      </div>
    );
  }
};

export default function UsersTable({ data, handelOpen, handelChangeStatus }) {
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  function handlePageChange(e, data) {
    console.log(data);
    setPageNumber(data.activePage);
  }

  const pData = paginate(data, pageNumber, pageSize);
  return (
    <div className="hidden md:block">
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Names</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Profile</Table.HeaderCell>
            {/* <Table.HeaderCell>Roles</Table.HeaderCell> */}
            <Table.HeaderCell>Created On</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {pData.map((row) => {
            return (
              <Table.Row key={row._id}>
                <Table.Cell>
                  <MTextView content={row.names} />
                </Table.Cell>
                <Table.Cell>
                  <MTextView content={row.email} />
                </Table.Cell>

                <Table.Cell>
                  <MTextView content={row.company} />
                </Table.Cell>

                <Table.Cell>
                  <MTextView content={row.profile} />
                </Table.Cell>

                {/* <Table.Cell>
                  <div className="grid grid-cols-2 gap-1">
                    {row.roles.map((role) => {
                      return (
                        <div className="bg-green-50 rounded-md ring-1 ring-green-300 shadow-sm text-center">
                          <MTextView content={role} />
                        </div>
                      );
                    })}
                  </div>
                </Table.Cell> */}

                <Table.Cell>
                  <MTextView
                    content={new Date(row.createdOn).toLocaleString("en-US")}
                  />
                </Table.Cell>

                <Table.Cell>
                  <MStatusIndicator status={row.status} />
                </Table.Cell>

                <Table.Cell>
                  <div className="flex flex-row mr-2">
                    <div
                      onClick={() => handelOpen(row)}
                      className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 mr-4 hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <DotsHorizontalIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div
                      onClick={() => handelChangeStatus(row, "active")}
                      className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 mr-4 hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <CheckIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <div
                      onClick={() => handelChangeStatus(row, "suspended")}
                      className="flex items-center justify-evenly w-11 h-8 bg-white rounded-full shadow-md cursor-pointer p-2 hover:scale-105 active:scale-95 active:shadow-sm"
                    >
                      <XIcon className="h-5 w-5 text-red-400" />
                    </div>
                  </div>
                </Table.Cell>
                {/* <Table.Cell>{row.createdOn}</Table.Cell>
                <Table.Cell>{row.createdBy}</Table.Cell>
                <Table.Cell>{row.permit}</Table.Cell>
                <Table.Cell>{row.duration}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <MPagination
        count={data.length}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </div>
  );
}
