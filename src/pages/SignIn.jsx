import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../api/auth';

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

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setId(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitSignIn = async (event) => {
    //인증 로직
    event.preventDefault();

    if (!id.trim()) {
      alert('아이디를 입력하세요.');
      return;
    }

    if (!(4 <= id.length && id.length <= 10)) {
      alert('아이디는 4~10글자로 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      alert('비밀번호를 입력하세요');
      return;
    }

    if (!(4 <= password.length && password.length <= 15)) {
      alert('비밀번호는 4~15글자로 입력해주세요.');
      return;
    }

    try {
      const { userId, nickname, avatar, accessToken } = await login({
        id,
        password,
      });

      localStorage.setItem('accessToken', accessToken);

      alert('로그인 성공!');
      setUser({ userId, nickname, avatar });
      navigate('/');
    } catch (error) {
      alert('로그인에 실패하였습니다.');
      console.error('로그인 에러:', error);
    }
  };

  const handleGoSignUp = () => {
    navigate('../SignUp');
  };

  return (
    <Container>
      <Section>
        로그인
        <br />
        <br />
        아이디
        <Input placeholder="아이디" type="text" value={id} onChange={handleChangeEmail} />
        비밀번호
        <Input placeholder="비밀번호" type="password" value={password} onChange={handleChangePassword} />
        <Button $bgColor="#bdbdbd" onClick={handleSubmitSignIn}>
          로그인
        </Button>
        <Button
          $bgColor="#6c757d"
          onClick={() => {
            handleGoSignUp();
          }}
        >
          회원가입
        </Button>
      </Section>
    </Container>
  );
};

export default SignIn;
