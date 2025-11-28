import { Button, Drawer, Form, Input, Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";

interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

type UserFormProps = {
  open: boolean;
  userData: UserType | null;
  onClose: () => void;
  onSubmit: (values: any) => void;
  loading: boolean;
  userLoading: boolean;
};

const UserForm: React.FC<UserFormProps> = ({
  open,
  userData,
  onClose,
  onSubmit,
  loading,
  userLoading,
}) => {
  const [form] = Form.useForm();

  // Submit funtion
  const handleSubmit = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };
  // Close funtion
  const handleClose = () => {
    onClose();
    form.resetFields();
  };
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        avatar: userData.avatar,
      });
    }
  }, [userData, form]);
  return (
    <Drawer
      loading={userLoading}
      title={
        <div className="flex flex-row justify-between items-center">
          <div className="text-lg font-semibold text-black"> {userData?.id ? "Edit" : "Add"} User</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseOutlined className="text-base" />
          </div>
        </div>
      }
      closable={false}
      destroyOnHidden
      open={open}
      width={400}
      footer={
        <div className="flex justify-end gap-2 py-2">
          <Button
            onClick={handleClose}
            className="!h-9 !px-4 !rounded-md !text-sm"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={loading}
            className="!h-9 !px-4 !rounded-md !text-sm font-medium bg-blue-500 hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        name="userForm"
        layout="vertical"
        className="w-full"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="first_name"
              label={<span className="text-sm">First Name</span>}
              rules={[
                { required: true, message: "Please enter first name" },
                { min: 2, message: "First name must be at least 2 characters" },
                {
                  max: 50,
                  message: "First name must not exceed 50 characters",
                },
              ]}
            >
              <Input placeholder="Emma" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="last_name"
              label={<span className="text-sm">Last Name</span>}
              rules={[
                { required: true, message: "Please enter last name" },
                { min: 2, message: "Last name must be at least 2 characters" },
                { max: 50, message: "Last name must not exceed 50 characters" },
              ]}
            >
              <Input placeholder="Wong" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="email"
              label={<span className="text-sm">Email</span>}
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="emma.wong@reqres.in" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="avatar"
              label={<span className="text-sm">Profile Image Link</span>}
              rules={[
                { required: true, message: "Please enter profile image link" },
                { type: "url", message: "Please enter a valid URL" },
              ]}
            >
              <Input placeholder="https://reqres.in/img/faces/3-image.jpg" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default UserForm;
