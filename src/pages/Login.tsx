import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../component/form/PhForm";
import PhInput from "../component/form/PhInput";

const Login = () => {
  const defaultValues = {
    userId: "2024010002",
    password: "student123",
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // Onsubmit here
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput type="text" name="userId" label="ID: " />
        <PhInput type="text" name="password" label="Password: " />
        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
