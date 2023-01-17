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

import { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NotebookList from "@submarine/pages/workbench/notebook/NotebookList";
import NotebookForm from "@submarine/pages/workbench/notebook/NotebookForm";
import Header from "@submarine/components/Header";

const { Content } = Layout;

function Notebook() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [userId, setUserId] = useState<String>("");
  // const [notebookList, setNotebookList] = useState([]);
  // const [subscription, setSubscription] = useState();

  // useEffect(() => {
  //   set userId when initiate
  //   userService.fetchUserInfo().subscribe((res) => {
  //     setUserId(res.userId);
  //     refreshNotebook(true);
  //   });
  // });

  // TODO: Check how add, update, and remove of notebook is implemented,
  // this refresh implementation might cause bug
  // function refreshNotebook(total: boolean) {
  //   notebookService.fetchNotebookList(userId).subscribe((res) => {
  //     if (total) {
  //       // Direct override of all, suitable in case of add/delete
  //       setNotebookList(res);
  //     } else {
  //       // Partial refresh required
  //       // Current list size
  //       const currentListSize = notebookList.length;
  //       // Backednd returns a real-time list
  //       const newListsize = res.length;
  //       for (let i = 0; i < newListsize; i++) {}
  //     }
  //   });
  // }

  return (
    <Content data-testid="notebook-page">
      <div style={{ margin: "15px", padding: "15px", backgroundColor: "white" }}>
        <div style={{ textAlign: "right" }}>
          <Button
            id="btn-newNotebook"
            type="primary"
            style={{ margin: "10px 4px 10px 4px" }}
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            New Notebook
          </Button>
        </div>
        <NotebookList />
        <NotebookForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </div>
    </Content>
  );
}
export default Notebook;
