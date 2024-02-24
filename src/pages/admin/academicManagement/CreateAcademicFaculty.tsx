import { Button, Col, Flex } from "antd";
import PhForm from "../../../component/form/PhForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../Schemas/academicManagement.Schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.types";
import PHSelect from "../../../component/form/PHSelect";
import { facultyOptions } from "../../../constants/faculty";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..");
    const name = facultyOptions[Number(data.name) - 1]?.label;

    const facultyData = {
      name,
    };

    try {
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFaculty>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty added successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Error adding Faculty", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHSelect label="Name" name="name" options={facultyOptions} />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
