/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFromConfig;

const PhForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFromProps) => {
  const formConfig: TFromConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PhForm;
