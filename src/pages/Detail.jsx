import "../styles/pages/Detail.css";

import { useEffect, useState } from "react";

import Header from "../components/Header";
import Menu from "../components/Menu";
import axios from "axios";
import { useParams } from "react-router-dom";

// import graph from "../assets/graph.png";

// import detailTest from "../data/detailTest";

export default function Detail() {
  const { name } = useParams();
  const [detailData, setDetailData] = useState({});

  // 서버로부터 데이터 받아오기
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/detail/${name}`
        );
        console.log(response);
        setDetailData(response.data);
      } catch (err) {
        console.error("Failed to fetch detail data:", err);
      }
    };

    fetchDetailData();
  }, [name]);

  return (
    <div className="detail">
      <Header />
      <Menu />
      <div className="detail__title">
        <span>{name}</span>
        <span>{detailData.symbol}</span>
        <span>코스피</span>
      </div>
      <div className="detail__box">
        <div className="detail__price">
          <span
            style={{
              color:
                detailData.priceChange && detailData.priceChange.startsWith("-")
                  ? "#1D66D7"
                  : "#D00000",
            }}
          >
            {detailData.currentPrice}
          </span>
          <span>
            전일대비&nbsp;{" "}
            <b
              style={{
                color:
                  detailData.priceChange &&
                  detailData.priceChange.startsWith("-")
                    ? "#1D66D7"
                    : "#D00000",
              }}
            >
              {detailData.priceChange && detailData.priceChange.startsWith("-")
                ? detailData.priceChange
                : `+${detailData.priceChange}`}
            </b>
            &nbsp; |{" "}
            <b
              style={{
                color:
                  detailData.priceChange &&
                  detailData.percentageChange.startsWith("-")
                    ? "#1D66D7"
                    : "#D00000",
              }}
            >
              {" "}
              &nbsp;
              {detailData.priceChange &&
              detailData.percentageChange.startsWith("-")
                ? detailData.percentageChange
                : `+${detailData.percentageChange}`}
            </b>
          </span>
        </div>
        <div className="detail__info">
          <div className="detail__info-row1">
            <span>
              전일&nbsp; <b>{detailData.previousClose}</b>
            </span>
            <span>
              | 고가&nbsp; <b>{detailData.highPrice}</b> (상한가{" "}
              {detailData.upperLimit})
            </span>
            <span>{/* | 거래량&nbsp; <b>{detailData.volume}</b> */}</span>
          </div>
          <div className="detail__info-row2">
            <span>
              시가&nbsp; <b>{detailData.openPrice}</b>
            </span>
            <span>
              | 저가&nbsp; <b>{detailData.lowPrice}</b> (하한가{" "}
              {detailData.lowerLimit})
            </span>
            <span>
              {/* | 거래대금&nbsp; <b>{detailData.transactionAmount}</b> */}
            </span>
          </div>
        </div>
      </div>
      <div className="detail__graph">
        <span>선차트</span>
      </div>
      <img className="detail__img" src={detailData.imagePath} alt="선차트" />
    </div>
  );
}
