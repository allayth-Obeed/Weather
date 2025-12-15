import { Button, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";

moment.locale("ar");

export default function Card() {
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });

  const cancelAxios = useRef(null);

  const { t, i18n } = useTranslation();

  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
  }

  useEffect(() => {
    setDateAndTime(moment().format("D MMMM YYYY - h:mm:ss"));

    i18n.changeLanguage("ar");
    moment.locale("ar");

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.71355&lon=46.67530&appid=4051d3e944938c6cc7c19a0227f1bba1",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios.current = c;
          }),
        }
      )
      .then((response) => {
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      if (cancelAxios.current) {
        cancelAxios.current();
      }
    };
  }, []);

  return (
    <div
      style={{
        direction: "rtl", //locale === "ar" ? "rtl" : "ltr",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          background: "#21a2a6",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 10px 1px rgba(0,0,0,0.05)",
        }}
      >
        {/* Card Title */}
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "start",
          }}
        >
          <Typography variant="h2">{t("reyadh")}</Typography>

          <Typography variant="h5" marginRight="20px">
            {dateAndTime}
          </Typography>
        </div>

        <hr />

        {/* Temperature Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "-20px -10px 0 10px",
          }}
        >
          <div>
            <Typography
              variant="h1"
              style={{
                textAlign: "right",
                paddingRight: "32%",
              }}
            >
              {temp.number !== null ? temp.number : "--"}
            </Typography>

            <img src={temp.icon} alt="weather icon" />

            <Typography
              variant="h6"
              textAlign="center"
              margin="0px 10px"
              fontSize="30px"
              letterSpacing="2px"
            >
              {temp.description}
            </Typography>

            {/* Min & Max */}
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: "100",
                marginRight: "32%",
              }}
            >
              <h5 style={{ margin: "0px" }}>
                {t("min")}: {temp.min !== null ? temp.min : "--"}
              </h5>

              <h5 style={{ margin: "0px 5px" }}>|</h5>

              <h5 style={{ margin: "0px" }}>
                {t("max")}: {temp.max !== null ? temp.max : "--"}
              </h5>
            </div>
          </div>

          <CloudIcon style={{ fontSize: 200 }} />
        </div>
      </div>

      {/* Language Button */}
      <div style={{ width: "100%", textAlign: "left" }}>
        <Button
          variant="text"
          style={{ color: "white" }}
          onClick={handleLanguageClick}
        >
          {locale === "en" ? "عربي" : "English"}
        </Button>
      </div>
    </div>
  );
}
