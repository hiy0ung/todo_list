/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const [principalData, setPrincipalData] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <div css={s.imgBox}>
          <div css={s.profileImg}>
            <img
              src="https://media.istockphoto.com/id/824883238/ko/%EC%82%AC%EC%A7%84/%EA%B2%BD%EA%B2%AC-%EC%8B%A4%ED%96%89.jpg?s=2048x2048&w=is&k=20&c=Tbmry5c8vbInOI7Kdf2DgkwQCSyaVOAcdDCS6ozwWIY="
              alt="강아지프로필"
            />
          </div>
        </div>

        <div css={s.infoBox}>
          <div css={s.infoText}>견주 이름: 이승아</div>
          <div css={s.infoText}>강아지 이름: 쪼꼬미</div>
          <div css={s.emailBox}>
            <div css={s.infoText}>이메일: jjokkomi@example.com</div>
            {principalData ? (
              <div css={s.emailCheck}>✔</div>
            ) : (
            <button css={s.infoButton}>인증</button>
            )}
          </div>

          <div css={s.infoButtons}>
            <button css={s.infoButton}>정보 수정</button>
            <button css={s.infoButton} onClick={() => navigate('/todo')}>비밀번호 수정</button>
          </div>
        </div>
      </div>

      <div css={s.bottom}>
        하위 영역
      </div>
    </div>
  );
}
