import { Button, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useEffect, useState } from "react";

// external library
import axios from "axios";
export default function Card() {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.71355&lon=46.67530&appid=4051d3e944938c6cc7c19a0227f1bba1"
      )
      .then(function (response) {
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        setTemp(responseTemp);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div
        style={{
          direction: "rtl",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* card */}
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
          <div>
            {/* card title */}
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
              }}
              dir="rtl"
            >
              <Typography variant="h2">الرياض</Typography>
              <Typography variant="h5" marginRight="20px">
                الاثنين 10-10- 2025
              </Typography>
            </div>
            {/* card title */}
            <hr />
            <div>
              {/* Temp */}
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
                    style={{ textAlaign: "right", paddingRight: "32%" }}
                  >
                    {temp}
                  </Typography>
                  {/* TODO:temp image */}
                  <Typography
                    variant="h6"
                    textAlign="center"
                    margin="0px 10px"
                    fontSize="30px"
                    letterSpacing="2px"
                  >
                    brokencloud
                  </Typography>
                  {/* MIN & MAX */}
                  <div
                    style={{
                      display: "flex",
                      fontSize: "20px",
                      fontWeight: "100",
                      marginRight: "32%",
                    }}
                  >
                    <h5 style={{ margin: "0px" }}>الصغرى:34</h5>
                    <h5 style={{ margin: "0px 5px" }}>|</h5>
                    <h5 style={{ margin: "0px" }}>الكبرى:34</h5>
                  </div>
                </div>
                <CloudIcon style={{ fontSize: "200" }}></CloudIcon>
                {/* degreee & descruption */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", textAlign: "left" }}>
          <Button variant="text" style={{ color: "white" }}>
            english
          </Button>
        </div>
        {/* card */}
      </div>
    </>
  );
}
