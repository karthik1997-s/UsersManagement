import { Card, Avatar, Button, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserCardViewProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  loading: boolean;
}

const UserCardView: React.FC<UserCardViewProps> = ({
  users,
  onEdit,
  onDelete,
  loading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 h-[calc(100vh-335px)] overflow-x-auto">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="text-center">
              <Skeleton className="h-full" />
            </Card>
          ))
        : users?.map((user) => (
            <div key={user?.id} className="relative group">
              <Card
                className="text-center hover:shadow-lg transition-all"
                variant={"outlined"}
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <Avatar src={user?.avatar} size={120} />
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {user?.first_name} {user?.last_name}
                </h3>

                {/* Email */}
                <p className="text-gray-500 mb-0">{user?.email}</p>
              </Card>

              {/* Overlay mask on hover */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg"></div>

              {/* Action Buttons */}
              <div className="absolute top-[42%] left-[38%] opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(user)}
                  className="!bg-purple-500 text-white hover:text-white hover:bg-purple-500"
                />
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  className="!bg-red-500 text-white hover:text-white hover:bg-red-600"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(user)}
                />
              </div>
            </div>
          ))}
    </div>
  );
};

export default UserCardView;
