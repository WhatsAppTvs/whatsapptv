import {
  CustomContainer,
  FlexColumn,
  ScreenTitle,
  AppSpan,
  AppText,
  AppLink,
} from "../../app-styles";
import "./index.scss";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../../provider/state-manager/userProvider";
import ApiContext from "../../../provider/API/call-service";
import { formatDate } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const ScamTv = () => {
  const {
    user: { allListing },
  } = useContext(UserContext);
  const { API } = useContext(ApiContext);
  const navigate = useNavigate()

  useEffect(() => {
    API.fetchAllListing();
    
  }, []);
  return (
    <CustomContainer topPadding="10" style={{ minHeight: "100vh" }}>
      <BsArrowLeft
        style={{
          position: "absolute",
          top: "11rem",
          left: "2rem",
          cursor: "pointer",
        }}
        size={20}
        onClick={() => navigate(-1)}
      />
      <ScreenTitle
        align="center"
        textSize="4"
        color="rgba(0,0,0,.7)"
        fontWeight="500"
      >
        All Scam TVs
      </ScreenTitle>
      <FlexColumn wrap="wrap" gap="2">
        {allListing
          .filter((list) => list.category === 1)
          .map((list) => (
            <CustomContainer
              width="35"
              borderColor="#4ade80"
              radius="1"
              key={list.key}
            >
              <CustomContainer width="35" height="20">
                <img src={list.image} alt="" width="100%" height="100%" />
              </CustomContainer>

              <FlexColumn
                style={{ width: "100%" }}
                leftPadding="2"
                rightPadding="2"
                topMargin="2"
                alignItems="flex-start"
                gap="1"
                bottomPadding="2"
              >
                <AppText textSize="2" color="rgba(0,0,0,.7)">
                  {list.title.toUpperCase()}
                </AppText>
                <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="500">
                  Added on: {formatDate(list.dateCreated)}
                </AppText>
                <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="600">
                  TV Number:{" "}
                  <AppSpan color="rgba(0,0,0,.6)" fontWeight="500" textSize="2">
                    {list.number}
                  </AppSpan>
                  <CustomContainer>
                    <AppSpan
                      color="rgba(0,0,0,.7)"
                      textSize="1.7"
                      fontWeight="600"
                    >
                      Whatsapp TV Link:{" "}
                    </AppSpan>
                    <AppLink
                      decoration="none"
                      fontWeight="500"
                      href={list.link}
                      target="_blank"
                    >
                      {list.link}
                    </AppLink>
                  </CustomContainer>
                  <AppText
                    color="rgba(0,0,0,.7)"
                    textSize="1.7"
                    fontWeight="600"
                  >
                    Email Address:{" "}
                    <AppSpan
                      color="rgba(0,0,0,.7)"
                      fontWeight="500"
                      textSize="1.5"
                    >
                      {list.email}
                    </AppSpan>
                  </AppText>
                </AppText>
              </FlexColumn>
            </CustomContainer>
          ))}
      </FlexColumn>
    </CustomContainer>
  );
};

export default ScamTv;
