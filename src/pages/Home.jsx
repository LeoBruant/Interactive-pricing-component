import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Button from "../atoms/Button";
import Card from "../components/Card";
import IconCheck from "../assets/svg/icon-check.svg";
import Slider from "../atoms/Slider";
import Switch from "../atoms/Switch";

export default function Home() {
  const [discount] = useState(25);
  const [maxByMonth] = useState(200000);
  const [pricePerView, setPricePerView] = useState({
    price: 0.02,
    views: 125,
  });
  const [views, setViews] = useState(100000);

  const [pros] = useState([
    "Unlimited websites",
    "100% data ownership",
    "Email reports",
  ]);

  const getPageViews = () => {
    let viewNumber = Math.floor(views);

    return viewNumber >= 1000
      ? Math.floor(viewNumber / 1000) + "K"
      : viewNumber;
  };

  const toggleBilling = (active) => {
    const price = pricePerView.price;

    setPricePerView((pricePerView) => ({
      ...pricePerView,
      price: active
        ? price - (price * discount) / 100
        : price + price * (discount / 100 / (-discount / 100 + 1)),
    }));
  };

  return (
    <div id="home">
      <div className="container">
        <header className="header">
          <h1 className="header__title">simple, traffic-based pricing</h1>
          <p className="header__description">
            Sign-up for our 30-day trial. No credit card required.
          </p>
        </header>
        <Card>
          <>
            <h2 className="card__title">{getPageViews()} pageviews</h2>
            <Slider
              action={(percentage) => setViews((percentage / 100) * maxByMonth)}
              className="card__slider"
              max={maxByMonth}
              value={views}
            />
            <p className="card__price-container">
              <span className="card__price">
                $
                {((views / pricePerView.views) * pricePerView.price).toFixed(2)}
              </span>
              <span className="card__by-month">/ month</span>
            </p>
            <div className="card__choice">
              <p>monthly billing</p>
              <Switch action={toggleBilling} />
              <p>
                yearly billing
                <span className="discount">
                  <span className="discount__sign">-</span>
                  {discount}% <span className="discount__text">discount</span>
                </span>
              </p>
            </div>
          </>
          <>
            <div className="card__pros">
              {pros.map((pro) => (
                <p className="card__pro" key={uuidv4()}>
                  <img src={IconCheck} alt="icon check" />
                  {pro}
                </p>
              ))}
            </div>
            <Button className="card__button" text="start my trial" />
          </>
        </Card>
      </div>
    </div>
  );
}
