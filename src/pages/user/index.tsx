import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Avatar,
  Space,
  Segmented,
  App,
  Empty,
} from "antd";
import { TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import CustomPagination from "../../components/Pagination";
import UserCardView from "../../components/UserCardView";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  userList,
} from "../../services/userService";
import UserForm from "./UserForm";

const { Search } = Input;

interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserList: React.FC = () => {
  const { modal, message } = App.useApp();

  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ page: 1, per_page: 5 });
  const [editState, setEditState] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });

  // Fetch user list Query
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["userList", pagination],
    queryFn: () => userList(pagination),
  });

  // Fetch single user details Query
  const { data: userData, isFetching: userLoading } = useQuery({
    queryKey: ["userDetails", editState.id],
    queryFn: () => getUser(editState.id),
    enabled: !!editState.id,
  });

  // Update user Mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success("User updated successfully");
      handleCloseForm();
      refetch();
    },
    onError: () => message.error("Failed to update user"),
  });

  // Create new user Mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (res:any) => {
      console.log("res",res)
      message.success("User created successfully");
      handleCloseForm();
      const data = [res?.data]
      setFilteredUsers((prev)=>[...data,...prev,])
      // refetch();
    },
    onError: () => message.error("Failed to create user"),
  });

  // Delete user Mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success("User deleted successfully");
      // refetch();
    },
    onError: () => message.error("Failed to delete user"),
  });

  // Open edit form
  const handleEdit = (record: UserType) => {
    setEditState({ open: true, id: record.id });
  };

  // Confirm and delete user
  const handleDelete = (record: UserType) => {
    modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: `${record.first_name} ${record.last_name}`,
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      centered: true,
      onOk: () =>
        new Promise((resolve) => {
          deleteUserMutation.mutate(record.id, {
            onSettled: () => resolve(true),
            onSuccess:(res:any)=>{
              const deletedData = filteredUsers.filter((x:any)=> x.id !== record?.id)
              setFilteredUsers(deletedData)
            }
          },);
          
        }),
    });
  };

  // Handle pagination change
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, per_page: pageSize });
  };

  // Handle create/update form submission
  const handleSubmit = (values: any) => {
    if (editState.id) {
      updateUserMutation.mutate({ id: editState.id, data: values });
    } else {
      createUserMutation.mutate(values);
    }
  };

  // Close modal form
  const handleCloseForm = () => setEditState({ open: false, id: null });

  const columns: ColumnsType<UserType> = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
      align: "center",
      render: (avatar: string) => <Avatar src={avatar} size={38} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
      render: (email: string) => (
        <a className="text-blue-500 hover:text-blue-600">{email}</a>
      ),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: 100,
    },

    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            danger
            loading={deleteUserMutation.isPending && record.id === editState.id}
            className="!bg-red-500 !text-white"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const handleSearch = (value: string) => {
    setSearchText(value);

    const allUsers = data?.data?.data || [];

    if (!value.trim()) {
      setFilteredUsers(allUsers);
      return;
    }

    const search = value.toLowerCase();

    const filtered = allUsers.filter(
      (user: any) =>
        user.first_name.toLowerCase().includes(search) ||
        user.last_name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    setFilteredUsers(data?.data?.data || []);
  }, [data]);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Users</h1>
          <div className="flex items-center gap-4">
            <Search
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              onClick={() => setEditState({ open: true, id: null })}
            >
              Create User
            </Button>
          </div>
        </div>

        {/* View Mode Switch */}
        <Segmented
          options={[
            { label: "Table", value: "table", icon: <TableOutlined /> },
            { label: "Card", value: "card", icon: <AppstoreOutlined /> },
          ]}
          value={viewMode}
          onChange={(val) => setViewMode(val as "table" | "card")}
          className="mb-4"
        />

        {/* Conditional View */}
        {viewMode === "table" ? (
          <Table
            columns={columns}
            dataSource={filteredUsers}
            loading={isFetching}
            rowKey="id"
            pagination={false}
            scroll={{ y: "calc(100vh - 380px)" }}
            style={{ minHeight: "calc(100vh - 380px)" }}
            locale={{
              emptyText: (
                <div className="flex flex-col justify-center items-center !h-full text-gray-400">
                  <Empty description=" No Users Found" />
                </div>
              ),
            }}
          />
        ) : (
          <UserCardView
            users={filteredUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={isFetching}
          />
        )}
      </div>

      {/* Pagination */}
      <CustomPagination
        current={pagination.page}
        total={data?.data?.total}
        pageSize={pagination.per_page}
        onChange={handlePageChange}
      />

      {/* User Form Modal */}
      <UserForm
        open={editState.open}
        onSubmit={handleSubmit}
        onClose={handleCloseForm}
        userData={userData?.data?.data}
        loading={updateUserMutation.isPending || createUserMutation.isPending}
        userLoading={userLoading}
      />
    </div>
  );
};

export default UserList;
