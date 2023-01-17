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
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";

interface NotebookFormProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function NotebookForm({ isModalVisible, setIsModalVisible }: NotebookFormProps) {
  // User Information
  const [userId, setUserId] = useState<string>("");

  // Environment
  // original environment
  let envList;
  // convert original environment to a list of names
  let envNameList = [
    { value: "notebook-env", label: "notebook-env" },
    { value: "notebook-gpu-env", label: "notebook-gpu-env" },
  ];

  const MEMORY_UNITS = [
    { value: "M", label: "M" },
    { value: "Gi", label: "Gi" },
  ];

  function initModal() {
    setIsModalVisible(true);
    initFormStatus();
  }

  function initFormStatus() {}

  function fetchEnvList() {}

  function handleSubmit() {}

  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <Modal
      title="Create Notebook"
      visible={isModalVisible}
      width={700}
      onCancel={handleCancel}
      footer={[
        <Button key="nb-fomr-btn-cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="nb-fomr-btn-create" type="primary" onClick={handleSubmit}>
          Create
        </Button>,
      ]}
    >
      <Form labelCol={{ sm: 6, xs: 24 }} wrapperCol={{ sm: 14, xs: 24 }}>
        <Form.Item label="Notebook Name" name="notebookName" required>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Environment" name="environment" required>
          <Select defaultValue={envNameList[0].value} options={envNameList} />
        </Form.Item>
        <Form.Item label="CPU" name="cpus" required>
          <InputNumber min={0} step={1} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="GPU" name="gpus" required>
          <InputNumber min={0} step={1} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="Memory" name="memoryNum" required>
          <div>
            <InputNumber min={0} step={1} placeholder="EX:1024" style={{ width: 200 }} />
            <Select defaultValue={MEMORY_UNITS[0]} options={MEMORY_UNITS} style={{ width: 100 }} />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NotebookForm;
