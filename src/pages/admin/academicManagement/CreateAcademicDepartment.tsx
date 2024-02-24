import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { Button, Col, Flex } from "antd";
import PhForm from "../../../component/form/PhForm";
import PHSelect from "../../../component/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../Schemas/academicManagement.Schema";
import { TResponse } from "../../../types";
import PhInput from "../../../component/form/PhInput";
import { TAcademicDepartment } from "../../../types/academicManagement.types";

const CreateAcademicDepartment = () => {
  const { data: facultyData, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions = facultyData?.data?.map((faculty) => ({
    value: faculty?._id,
    label: faculty?.name,
  }));
  console.log(academicFacultyOptions);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester added successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Error adding semester", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PhInput type="text" name="name" label="Name" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
            loading={isFetching}
          />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
