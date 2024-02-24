/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../component/form/PhForm";
import PhInput from "../../../component/form/PhInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { bloodGroupOptions, gendersOptions } from "../../../constants/global";
import PHSelect from "../../../component/form/PHSelect";
import PHDatePicker from "../../../component/form/PHDatePicker";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TFaculty, TResponse } from "../../../types";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const studentDummyData = {
  password: "faculty123",
  faculty: {
    designation: "Lecturer",
    name: {
      firstName: "Ullash",
      middleName: "Mridul",
      lastName: "Rahman",
    },
    gender: "male",
    email: "faculty3@gmail.com",
    dateOfBirth: "1990-01-01",

    contactNo: "12",
    emergencyContactNo: "12",
    bloodGroup: "A+",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    academicDepartment: "65be77087e5cf7a2cbc8bab1",
    profileImg: "path/to/profile/image.jpg",
  },
};

// this is only for development, should be removed

const facultyDefaultsValues = {
  designation: "Lecturer",
  name: {
    firstName: "Ullash",
    middleName: "Mridul",
    lastName: "Rahman",
  },
  gender: "male",
  bloodGroup: "AB+",

  email: "faculty@gmail.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Oak Avenue, Townsville",
  academicDepartment: "65be77087e5cf7a2cbc8bab1",
};

const CreateFaculty = () => {
  const [addFaculty, { data, error }] = useAddFacultyMutation();
  const { data: dData, isLoading: dIsloading } =
    useGetAllDepartmentsQuery(undefined);

  console.log(data, error);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..");

    try {
      const facultyData = {
        password: "faculty123",
        faculty: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(facultyData));
      formData.append("file", data.image);

      const res = (await addFaculty(formData)) as TResponse<TFaculty>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created successfully", { id: toastId });
      }
    } catch (error) {
      // Show error toast if there's an error during the process
      console.error("Error adding Faculty:", error);
      toast.error("Failed to add Faculty");

      // Close the loading toast if an error occurs
      toast.dismiss(toastId);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PhForm onSubmit={onSubmit} defaultValues={facultyDefaultsValues}>
          <Divider>Designation.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="designation" label="Designation" />
            </Col>
          </Row>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.firstName" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.middleName" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.lastName" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={gendersOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Birth Date" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>

            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>

            <Divider>Academic Info.</Divider>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                name="academicDepartment"
                label="Academic Department"
                disabled={dIsloading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
