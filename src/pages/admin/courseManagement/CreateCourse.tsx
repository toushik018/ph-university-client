import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../component/form/PhForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../component/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import PhInput from "../../../component/form/PhInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating..");

    const courseData = {
      ...data,
      isDeleted: false,
      credits: Number(data.credits),
      code: Number(data.code),
      preRequisiteCourses: data.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Course created Successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Error while creating course", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhInput type="text" name="title" label="Title" />
          <PhInput type="text" name="prefix" label="Prefix" />
          <PhInput type="text" name="code" label="Code" />
          <PhInput type="text" name="credits" label="Credits" />

          <PHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
