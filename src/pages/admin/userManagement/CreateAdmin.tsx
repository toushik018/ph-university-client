import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../component/form/PhForm";
import PhInput from "../../../component/form/PhInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { bloodGroupOptions, gendersOptions } from "../../../constants/global";
import PHSelect from "../../../component/form/PHSelect";
import PHDatePicker from "../../../component/form/PHDatePicker";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TAdmin, TResponse } from "../../../types";

const studentDummyData = {
  password: "admin123",
  admin: {
    designation: "Admin",
    name: {
      firstName: "Md Tayeb",
      middleName: "Hossain",
      lastName: "Toushik",
    },
    gender: "male",
    dateOfBirth: "1998-04-24",
    email: "tayebhossain018@gmail.com",
    contactNo: "123567",
    emergencyContactNo: "987-654-3210",
    bloogGroup: "A+",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    profileImg: "path/to/profile/image.jpg",
  },
};

// this is only for development, should be removed

const studentDefaultsValues = {
  name: {
    firstName: "Md Tayeb",
    middleName: "Hossain",
    lastName: "Toushik",
  },
  gender: "male",
  bloodGroup: "AB+",

  email: "tayebhossain018@gmail.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Oak Avenue, Townsville",
};

const CreateAdmin = () => {
  const [addAdmin, { data, error }] = useAddAdminMutation();

  console.log(data, error);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const adminData = {
        password: "admin123",
        admin: data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(adminData));
      formData.append("file", data.image);

      const res = (await addAdmin(formData)) as TResponse<TAdmin>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Admin Created Successfull", { id: toastId });
      }
    } catch (error) {
      console.error("Error Adding Admin", error);
      toast.error("Failed to add student");

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
              <PhInput type="text" name="designation" label="Designation" />
            </Col>
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
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
