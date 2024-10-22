import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Layout, Space } from "antd";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

export default function AppLayout({ children }) {
  const { user, handleSignOut } = useAuthContext();

  const items = [
    {
      key: "1",
      label: (
        <Button type="link" onClick={handleSignOut}>
         Logout <LogoutOutlined/> 
        </Button>
      ),
    },
  ];

  return (
    <Flex gap="middle" wrap>
      <Layout className="min-h-[100vh]">
        <Layout.Header className="bg-slate-200 flex justify-between items-center">
          <Link to={user? '/main' : '/'} className="md:text-lg sm:text-base">Covid19 Health Declaration System</Link>
          <div>
            {user ? (
              <Dropdown
                menu={{items}}
              >
                <Button type="link">
                  <Space>
                  {user.name}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </Layout.Header>
        <Layout.Content className="mx-20 my-5">{children}</Layout.Content>
        <Layout.Footer className="bg-slate-200">
          Created by Giang Do
        </Layout.Footer>
      </Layout>
    </Flex>
  );
}


AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};