import { Button, Table, TableColumnsType } from "antd";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.types";

export type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: departmentData, isFetching } =
    useGetAllDepartmentsQuery(undefined);

  const tableData = departmentData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Department",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default AcademicDepartment;
