import { useState } from 'react';
import styled from 'styled-components';
import { updateProfile } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Container = styled.main`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  height: 35px;
  border-color: #f2f2f2;
`;

const Button = styled.button`
  height: 40px;
  background-color: ${(props) => props.$bgColor};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out 0s;
  &:hover {
    background-color: #5a6268;
  }
`;

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('avatar', avatar);
    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate('/');
    }
  };

  return (
    <div>
      <Container>
        <Section>
          프로필 수정
          <br />
          <br />
          닉네임
          <Input
            type="text"
            value={nickname}
            placeholder="닉네임"
            minLength="1"
            maxLength="10"
            onChange={handleNicknameChange}
          />
          아바타 이미지
          <label htmlFor="avatar"></label>
          <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
          <Button $bgColor="#6c757d" onClick={handleUpdateProfile}>
            프로필 업데이트
          </Button>
        </Section>
      </Container>
    </div>
  );
};

export default Profile;
