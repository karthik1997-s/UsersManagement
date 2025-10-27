import { Pagination } from 'antd';

type CustomPaginationProps = {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
}) => {
  return (
    <div className="flex justify-end mt-4">
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default CustomPagination;