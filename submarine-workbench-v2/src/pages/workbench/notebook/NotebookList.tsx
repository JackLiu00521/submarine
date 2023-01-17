/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useState } from "react";
import { Table, Tag, Popconfirm } from "antd";
import { NotebookInfo } from "@submarine/interfaces/notebook-info";
import { CheckCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/lib/table";
import { NotebookSpec, NotebookMeta } from "@submarine/rest";

function NotebookList() {
  // const [notebookList, setNotebookList] = useState<NotebookInfo[]>([]);

  const statusColor: { [key: string]: string } = {
    creating: "gold",
    waiting: "gold",
    running: "green",
    terminating: "blue",
  };

  const notebookList: NotebookInfo[] = [
    {
      notebookId: "001",
      name: "test_name",
      uid: "001",
      url: "123",
      status: "running",
      reason: "test",
      createdTime: "test",
      deletedTime: "test",
      spec: {
        meta: undefined,
        environment: { name: "test-environment", dockerImage: "test-docker" },
        spec: { resources: "cpu=1, memory=1024M" },
      },
    },
    {
      notebookId: "002",
      name: "test_name2",
      uid: "002",
      url: "123",
      status: "waiting",
      reason: "test",
      createdTime: "test",
      deletedTime: "test",
      spec: {
        meta: undefined,
        environment: { name: "test-environment", dockerImage: "test-docker" },
        spec: { resources: "cpu=1, memory=1024M" },
      },
    },
  ];

  interface DataType {
    name: string;
    url?: string;
    environment?: string;
    dockerImage?: string;
    resources?: string;
    status: string;
    statusColor: string;
    action: string;
  }

  // convert notebookInfo[] into DataType[] for antd table
  function notebookListConverter(notebookList?: NotebookInfo[]): DataType[] {
    let data: DataType[] = [];
    if (notebookList) {
      notebookList.forEach((notebookInfo) => {
        let currData: DataType = {
          name: notebookInfo.name,
          url: notebookInfo.url,
          environment: notebookInfo.spec.environment?.name,
          dockerImage: notebookInfo.spec.environment?.dockerImage,
          resources: notebookInfo.spec.spec?.resources,
          status: notebookInfo.status,
          statusColor: statusColor[notebookInfo.status],
          action: "action",
        };
        data.push(currData);
      });
    }
    return data;
  }

  // TODO
  function onDeleteNotebook(): void {}

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "statusIcon",
      render: (_, { status }) => {
        return status === "running" ? (
          <CheckCircleTwoTone twoToneColor={"#52c41a"} style={{ fontSize: "24px" }} />
        ) : (
          <LoadingOutlined style={{ color: "#08c", fontSize: "24px" }} spin />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, { status, name, url }) => {
        return status === "running" ? <a href={url}>{name}</a> : <>{name}</>;
      },
    },
    { title: "Environment", dataIndex: "environment" },
    { title: "Docker Image", dataIndex: "dockerImage" },
    { title: "Resources", dataIndex: "resources" },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, { status, statusColor }) => <Tag color={statusColor}>{status}</Tag>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Popconfirm
          title="Are you sure you want to delete?"
          okText="Ok"
          cancelText="Cancel"
          placement="left"
          onConfirm={onDeleteNotebook}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  return <Table columns={columns} dataSource={notebookListConverter(notebookList)} />;
}
export default NotebookList;
