import axios from 'axios';
import { useState } from 'react';
import Confetti from 'react-confetti';

import './App.css';
import useWindowSize from './hook/useWindowSize';
import Loader from './loader';

function App() {
  const [pw, setPw] = useState('');
  const [sendRes, setSendRes] = useState(null);
  const [pending, setPending] = useState(false);
  const { width, height } = useWindowSize();

  const clickConfirm = (e) => {
    e.preventDefault();
    setPw(e.target[0].value);
    e.target[0].value = '';
  };

  const clickSendMail = async (e) => {
    e.preventDefault();
    if (pw === 'ju') {
      setPending(true);
      const { data } = await axios.post(
        'https://stock-mailer.herokuapp.com/resend',
        // 'http://localhost:8000/resend',
        {
          data: pw,
        }
      );
      if (data.success) {
        setSendRes(true);
      } else {
        setSendRes(false);
      }
      setPending(false);
    }
  };

  if (sendRes) {
    return (
      <header className="App-header">
        <Confetti width={width} height={height} />
        <div>메일을 보냈습니다</div>
      </header>
    );
  }

  if (pending) {
    return (
      <header className="App-header">
        <Loader />
      </header>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        {sendRes && <Confetti width={width} height={height} />}
        <div>본인확인</div>
        <form onSubmit={clickConfirm}>
          <input type={'text'} />
          <input type={'submit'} />
        </form>
        {pw === 'ju' ? (
          <>
            <div>현 시간 기준으로 엑셀을 다시 받고 싶다면 클릭</div>
            <form onSubmit={clickSendMail}>
              <input type="submit" value={'메일 보내기'} />
            </form>
          </>
        ) : null}
        {sendRes === false && <div>에러 발생, 개발자에게 연락주세요</div>}
      </header>
    </div>
  );
}

export default App;
