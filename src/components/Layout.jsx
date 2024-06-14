import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../pages/Detail';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/auth';

const Navbar = styled.header`
  width: 100%;
  height: 55px;
  position: fixed;
  background-color: #3f3f3f;
  color: white;
  top: 0;
  padding: 1rem;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const LeftSide = styled.div`
  left: 30px;
  display: flex;
  align-items: center;
  position: relative;
  width: 25%;
  flex-direction: row;
  gap: 1.5rem;
`;

const RightSide = styled.div`
  left: -30px;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: row;
  gap: 1.5rem;
`;

const NavItem = styled(Link)`
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const ImageBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 70%;
  overflow: hidden;
  background-color: red;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NickName = styled.span`
  color: white;
  margin-left: -10px;
`;

const LogOutButton = styled(Button)`
  padding: 8px 10px;
  background-color: #ff4d4d;

  &:hover {
    background-color: #cc0000;
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem;
`;

const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
        console.log('현재 로그인된 유저: ', res);
      } else {
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/signin');
    localStorage.clear();
  };

  return (
    <>
      <Navbar>
        <LeftSide>
          <NavItem to="/">HOME</NavItem>
          <NavItem to="/profile">내 프로필</NavItem>
        </LeftSide>

        <RightSide>
          {user && (
            <>
              <ImageBox>
                <Image src={user.avatar} alt="프로필 이미지" />
              </ImageBox>
              <NickName>{user.nickname}</NickName>
              <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
            </>
          )}
        </RightSide>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
};

export default Layout;
