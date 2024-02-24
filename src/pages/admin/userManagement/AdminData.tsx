import {
    Button,
    Modal,
    Pagination,
    Space,
    Table,
    TableColumnsType,
    TableProps,
  } from "antd";
  import { useState } from "react";
  import { TQueryParam, TStudent } from "../../../types";
  import {
    useChangeUserStatusMutation,
    useGetAllAdminsQuery,
  } from "../../../redux/features/admin/userManagement.api";
  import { Link } from "react-router-dom";
  
  export type TTableData = Pick<
    TStudent,
    "fullName" | "id" | "email" | "contactNo"
  >;
  
  const AdminData = () => {
    const [changeUserStatus] = useChangeUserStatusMutation();
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const { data: adminData, isFetching } = useGetAllAdminsQuery([
      { name: "page", value: page },
      { name: "sort", value: "id" },
      ...params,
    ]);
  
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
      null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<"block" | "unblock" | null>(
      null
    );
  
    const metaData = adminData?.meta;
  
    const tableData = adminData?.data?.map(
      ({ _id, fullName, id, email, contactNo, user }) => ({
        key: _id,
        id,
        email,
        contactNo,
        fullName,
        userId: user._id,
        status: user.status,
      })
    );
  
    const columns: TableColumnsType<TTableData> = [
      {
        title: "Name",
        key: "name",
        dataIndex: "fullName",
      },
  
      {
        title: "Roll No",
        key: "id",
        dataIndex: "id",
      },
      {
        title: "Email",
        key: "email",
        dataIndex: "email",
      },
      {
        title: "Contact No",
        key: "contactNo",
        dataIndex: "contactNo",
      },
      {
        title: "Action",
        key: "x",
        render: (item) => {
          return (
            <Space>
              <Link to={`/admin/admin-data/${item.key}`}>
                <Button>Details</Button>
              </Link>
              <Button>Update</Button>
              {item.status === "blocked" ? (
                <Button
                  danger
                  onClick={() => {
                    setSelectedStudentId(item.userId);
                    setIsModalOpen(true);
                    setModalAction("unblock");
                  }}
                >
                  Blocked
                </Button>
              ) : (
                <Button
                  type="dashed"
                  onClick={() => {
                    setSelectedStudentId(item.userId);
                    setIsModalOpen(true);
                    setModalAction("block");
                  }}
                >
                  In Progress
                </Button>
              )}
            </Space>
          );
        },
        width: "1%",
      },
    ];
  
    const onChange: TableProps<TTableData>["onChange"] = (
      _pagination,
      filters,
      _sorter,
      extra
    ) => {
      if (extra.action === "filter") {
        const queryParams: TQueryParam[] = [];
  
        filters.name?.forEach((item) =>
          queryParams.push({ name: "name", value: item })
        );
        filters.year?.forEach((item) =>
          queryParams.push({ name: "year", value: item })
        );
        setParams(queryParams);
      }
    };
  
    const handleOk = async () => {
      setIsModalOpen(false);
      if (selectedStudentId && modalAction) {
        const status = modalAction === "block" ? "blocked" : "in-progress";
        await changeUserStatus({
          userId: selectedStudentId,
          status: status,
        });
        // Reset state
      }
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      setSelectedStudentId(null); // Reset selected student id
      setModalAction(null); // Reset modal action
    };
    return (
      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          pagination={false}
        />
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
  
        <Modal
          title={modalAction === "block" ? "Block Student" : "Unblock Student"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            Are you sure you want to{" "}
            {modalAction === "block" ? "block" : "unblock"} this student?
          </p>
        </Modal>
      </>
    );
  };
  
  export default AdminData;
  