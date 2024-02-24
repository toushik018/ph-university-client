import { Button, Row } from "antd";
import PhForm from "../../component/form/PhForm";
import PhInput from "../../component/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.api";
import { TResponse } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ChanagePassword = () => {
  const [chanagePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await chanagePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());

      return navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <PhInput type="text" name="oldPassword" label="Old Password: " />
        <PhInput type="text" name="newPassword" label="New Password: " />
        <Button htmlType="submit">Change</Button>
      </PhForm>
    </Row>
  );
};

export default ChanagePassword;
