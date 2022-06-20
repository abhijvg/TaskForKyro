import React, { useState, useEffect, useCallback } from "react";
import KyroTypography from "../../components/KyroTypography";
import KyroProfileBody from "./KyroProfileBody";
import KyroProfilePreview from "./KyroProfilePreview";
import UsersApi from "../../api/users/UsersApi";
import { FetchUserResponse } from "../../models/KyroApiDataModels";
import KyroCircularIndicator from "../../components/KyroCircularIndicator";

interface Props {}
const KyroProfile: React.FC<Props> = () => {
  const [userData, setUserData] = useState<FetchUserResponse>({
    id: "",
  });
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(true);

  
  const firstNameHandler = (value: string) => {
    setFirstname(value);
  };
  const lastNameHandler = (value: string) => {
    setLastname(value);
  };
  const emailHandler = (value: string) => {
    setEmail(value);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      loadUserData(userId);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserData = useCallback(
    async (userId: string) => {
      UsersApi.fetchEmployeeFromId(userId).then((userResponseData) => {
        setUserData(userResponseData.data);
        setFirstname(
          userResponseData.data.first_name
            ? userResponseData.data.first_name
            : ""
        );
        setEmail(userResponseData.data.email);
        setLoading(false);
      });
    },
    [isLoading]
  );

  const getWishOnTime = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      return "Good Morning ";
    } else if (curHr < 18) {
      return "Good Afternoon ";
    } else {
      return "Good Evening ";
    }
  };

  const getDate = () => {
    const today = new Date();
    const month = today.toLocaleString("en-EN", { month: "long" });
    const date = today.getDate();
    const year = today.getFullYear();
    return month + " " + date + ", " + year;
  };

  return (
    <div>
      {isLoading ? (
        <KyroCircularIndicator
          style={{ marginTop: "25%", marginLeft: "50%" }}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <KyroTypography
              text={getWishOnTime() + firstName}
              type={"title"}
            ></KyroTypography>
            <KyroTypography text={getDate()} disabled={true}></KyroTypography>
            <KyroProfileBody
              firstNameHandler={firstNameHandler}
              lastNameHandler={lastNameHandler}
              emailHandler={emailHandler}
              userData={userData}
            ></KyroProfileBody>
          </div>
          <KyroProfilePreview
            name={firstName + " " + lastName}
            email={email}
          ></KyroProfilePreview>
        </div>
      )}
    </div>
  );
};

export default KyroProfile;
