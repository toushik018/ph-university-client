import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../component/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../component/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../component/form/PHDatePicker";
import PhInput from "../../../component/form/PhInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester, isError } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  console.log(isError);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester has been registered", { id: toastId });
      }
    } catch (err) {
      toast.error("Error while semester registration", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />

          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PhInput type="text" name="minCredit" label="min Credit" />
          <PhInput type="text" name="maxCredit" label="max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
