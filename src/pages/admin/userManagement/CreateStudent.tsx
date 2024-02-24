/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../component/form/PhForm";
import PhInput from "../../../component/form/PhInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { bloodGroupOptions, gendersOptions } from "../../../constants/global";
import PHSelect from "../../../component/form/PHSelect";
import PHDatePicker from "../../../component/form/PHDatePicker";
import {
  useGetAllDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TStudent } from "../../../types";

const studentDummyData = {
  password: "admin123",
  student: {
    name: {
      firstName: "Tayeb",
      middleName: "Hossain",
      lastName: "Toushik",
    },
    gender: "male",
    dateOfBirth: "1995-05-15T00:00:00.000Z",
    bloodGroup: "A+",

    email: "tayeb@example.com",
    contactNo: "1234567890",
    emergencyContactNo: "9876543210",
    presentAddress: "123 Main Street, Cityville",
    permanentAddress: "456 Oak Avenue, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "1112223333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "4445556666",
    },
    localGuardian: {
      name: "Jane Smith",
      occupation: "Doctor",
      contactNo: "7778889999",
      address: "789 Pine Lane, Villagetown",
    },

    admissionSemester: "65c0c55b419b5a5457a90d9f",
    academicDepartment: "65be77087e5cf7a2cbc8bab1",
  },
};

// this is only for development, should be removed

const studentDefaultsValues = {
  name: {
    firstName: "MD",
    middleName: "Toushik",
    lastName: "Hossain",
  },
  gender: "male",
  bloodGroup: "AB+",

  email: "tayebhossain@example.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Oak Avenue, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1112223333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "4445556666",
  },
  localGuardian: {
    name: "Jane Smith",
    occupation: "Doctor",
    contactNo: "7778889999",
    address: "789 Pine Lane, Villagetown",
  },
  admissionSemester: "65c0c55b419b5a5457a90d9f",
  academicDepartment: "65be77087e5cf7a2cbc8bab1",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log(data, error);
  const { data: sData, isLoading: sIsloading } =
    useGetAllSemestersQuery(undefined);

  const { data: dData, isLoading: dIsloading } =
    useGetAllDepartmentsQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}  ${item.year}`,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating..");
 
    try {
      const studentData = {
        password: "student123",
        student: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.image);

      const res = (await addStudent(formData)) as TResponse<TStudent>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Student created successfully", { id: toastId });
      }
    } catch (error) {
      // Show error toast if there's an error during the process
      console.error("Error adding student:", error);
      toast.error("Failed to add student");

      // Close the loading toast if an error occurs
      toast.dismiss(toastId);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PhForm onSubmit={onSubmit} defaultValues={studentDefaultsValues}>
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

            <Divider>Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>

            <Divider>Local Guaredian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
            <Divider>Academic Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsloading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
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

export default CreateStudent;
