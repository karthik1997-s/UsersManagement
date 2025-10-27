import { Form, Input, Button, Checkbox, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utills/auth';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/authService';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const LoginPage = () => {
  const { message } = App.useApp(); 
  const navigate = useNavigate();
  const {mutate,isPending} = useMutation({
    mutationFn:login
  })
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    if (values?.email && values?.password) {
      mutate(values,{
        onSuccess:(res:any)=>{
          console.log("res",res)
          if(res?.data?.token){
            setToken(res?.data?.token, "/");
            navigate("/");
            message.success("Login successful!");
          }else{
            message.error(res?.data?.error);
          }
        }
      })
      // const token = "Test";
     

      // Navigate to home/dashboard
    
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-black-400" />}
              placeholder="eve.holt@reqres.in"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-black-400" />}
              placeholder="Password"
              size="large"
              className="rounded-md"
              iconRender={() => null} 
            />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={isPending}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;