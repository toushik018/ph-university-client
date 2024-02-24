import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types";
import { useState } from "react";
import PhForm from "../../../component/form/PhForm";
import PHSelect from "../../../component/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const Courses = () => {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courseData?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix} ${code}`,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },

    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
      ;
    </div>
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultyData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = (data) => {
    console.log(data);
    const facultyData = {
      courseId: facultyInfo.key,
      data: data,
    };
    addFaculties(facultyData);
  };

  console.log(facultyData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PhForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions}
            name="faculties"
            label="Faculties"
          />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Modal>
    </>
  );
};

export default Courses;
