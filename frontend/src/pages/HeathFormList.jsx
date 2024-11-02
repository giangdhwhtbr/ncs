import { Button, Checkbox, Input, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { handleFetchWithCredentials } from "../helper/fetch";
import { debounce } from "../helper/utils";
import HealthFormDeclaration from "../components/HealthFormDeclaration";

export default function HealthFormList() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleFetch = (name) => {
    setLoading(true);
    handleFetchWithCredentials(
      name ? `/health-forms?name=${name}` : "/health-forms"
    )
      .then((data) => setResponse(data))
      .catch((error) => message.error(error.message))
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    handleFetch(value);
  };

  const handleRefresh = () => {
    setVisible(false);
    handleFetch();
  }

  useEffect(() => {
    if (!response) {
      handleFetch();
    }
  }, [response]);



  const debouncedSearch = debounce(handleSearch, 300);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Temperature",
      dataIndex: "temperature",
      key: "temperature",
    },
    {
      title: "Cough",
      dataIndex: "cough",
      key: "cough",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Sore Throat",
      dataIndex: "soreThroat",
      key: "soreThroat",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Loss of Smell",
      dataIndex: "lossOfSmell",
      key: "lossOfSmell",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Fever",
      dataIndex: "fever",
      key: "fever",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Breathing Difficulty",
      dataIndex: "breathingDifficulty",
      key: "breathingDifficulty",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Body Aches",
      dataIndex: "bodyAches",
      key: "bodyAches",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Headache",
      dataIndex: "headache",
      key: "headache",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Fatigue",
      dataIndex: "fatigue",
      key: "fatigue",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Diarrhea",
      dataIndex: "diarrhea",
      key: "diarrhea",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Runny Nose",
      dataIndex: "runnyNose",
      key: "runnyNose",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Contact With Covid Patient",
      dataIndex: "contactWithCovidPatient",
      key: "contactWithCovidPatient",
      render: (val) => <Checkbox checked={val} disabled />,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h1>Health Form List</h1>
      <div className="flex flex-row justify-between">
        <div className="max-w-[500px]">
          <Input.Search
            placeholder="Search by name"
            onChange={debouncedSearch}
            allowClear
          />
        </div>
        <Button type="primary" title="Create" onClick={() => setVisible(true)}>
          Create
        </Button>
      </div>
      <Table
        dataSource={response?.results || []}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          pageSize: response?.limit,
          total: response?.totalResults,
          current: response?.page,
          onChange: (page, limit) => {
            handleFetchWithCredentials(
              `/health-forms?page=${page}&limit=${limit}`
            )
              .then((data) => setResponse(data))
              .catch((error) => message.error(error.message));
          },
        }}
      />
      <Modal
        open={visible}
        width={700}
        onClose={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <HealthFormDeclaration onSuccess={handleRefresh} />
      </Modal>
    </div>
  );
}
