import "../styles/pages/Recommend.css";

import { useEffect, useState } from "react";

import Header from "../components/Header";
import Menu from "../components/Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import recommendTest from "../data/recommendTest";

export default function Recommend() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // 서버로부터 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/main");
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (name) => {
    navigate(`/detail/${name}`);
  };

  return (
    <div className="recommend">
      <Header />
      <Menu />
      <div className="recommend__title">
        <span>추천 종목</span>
        <span>TOP 10</span>
      </div>
      <p className="recommend__notice">
        ※ 머신러닝 알고리즘을 통해 예측된 주가 상승 가능성, 수익성 지표(ROE,
        PER, PBR), 거래량, 기술적 지표(MACD 및 볼린저 밴드) 등을 종합 분석한
        결과입니다. ※
      </p>
      <table className="recommend__table">
        <thead>
          <tr className="recommend__table-header">
            <th>종목명</th>
            <th>현재가</th>
            <th>예상 주가</th>
            <th>ROE</th>
            <th>MACD 신호</th>
            <th>볼린저밴드 상태</th>
            <th>배당수익률</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleItemClick(item.name)}>
              <td>{item.name}</td>
              <td>{item.currentPrice} KRW</td>
              <td>{item.expectedReturn} KRW</td>
              <td>{item.roe}%</td>
              <td>{item.macdSignal}</td>
              <td>{item.bollingerStatus}</td>
              <td>{item.dividendYield}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="recommend__bottom">
        <div className="recommend__box">
          {/* <p>예상 수익률: 머신러닝 모델로 예측된 주가 상승 가능성</p> */}
          <p>
            ROE (자기자본이익률): 회사가 자기자본으로 얼마나 수익을 냈는지
            나타냅니다.
          </p>
          {/* <p>
            PER (주가수익비율): 주가가 수익에 비해 저평가/고평가 되었는지를
            판단하는 지표입니다.
          </p> */}
          <p>MACD: 가격 추세의 변화를 분석해 매수·매도 신호를 제공합니다.</p>
          <p>
            볼린저 밴드: 주가 변동성을 기반으로 매수·매도 타이밍을 시사합니다.
          </p>
          <br />
          <p>※ 유의사항 ※</p>
          <p>
            본 추천은 투자에 참고용으로 제공되며, 실제 투자 결과에 대해 책임지지
            않습니다. 주식 시장에는 항상 변동성과 리스크가 따르니 신중히
            판단하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
