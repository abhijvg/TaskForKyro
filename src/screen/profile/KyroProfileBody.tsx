import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  CardHeader,
  Tooltip,
} from "@mui/material";
import KyroTextInput from "../../components/KyroTextInput";
import PersonIcon from "@mui/icons-material/Person";
import Phone from "@mui/icons-material/Phone";
import Location from "@mui/icons-material/LocationOn";
import Email from "@mui/icons-material/Email";
import AccountBox from "@mui/icons-material/AccountBox";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import {
  FetchUserResponse,
  RegisterUserRequest,
  PhoneNumbers,
  PhoneNumberType,
} from "../../models/KyroApiDataModels";
import UsersApi from "../../api/users/UsersApi";
import KyroAlertDialog from "../../components/dialog/common/KyroAlertDialog";
import KyroInfoDialog from "../../components/dialog/common/KyroInfoDialog";
import KyroPhoneNumberInput from "../../components/KyroPhoneNumberInput";

interface Props {
  firstNameHandler: (value: string) => any;
  lastNameHandler: (value: string) => any;
  emailHandler: (value: string) => any;
  userData: FetchUserResponse;
}

const KyroProfileBody: React.FC<Props> = (props) => {
  // state variables
  const [firstName, setFirstName] = useState(props.userData.first_name ?? "");
  const [lastName, setLastName] = useState(props.userData.last_name ?? "");
  const [email, setEmail] = useState(props.userData.email ?? "");
  const [displayName, setDisplayName] = useState(
    props.userData.display_name ?? ""
  );
  const [personalNumber, setPersonalNumber] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [location, setLocation] = useState(props.userData.primary_location ?? "");
  const [firstNameHelperText, setFirstNameHelperText] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameHelperText, setLastNameHelperText] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [displayNameHelperText, setDisplayNameHelperText] = useState("");
  const [displayNameError, setDisplayNameError] = useState(false);
  const [mailHelperText, setMailHelperText] = useState("");
  const [mailError, setMailError] = useState(false);
  const [isSaveData, setIsSaveData] = useState(false);
  const [onSaveSuccess, setOnSaveSuccess] = useState(false);
  const [saveResultMessage, setSaveResultMessage] = useState("");

  // AfterEffects to be performed
  useEffect(() => {
    setPhoneData();
  }, [props.userData.phone]);

  // Handler methods to support state and props changes
  const onFirstNameChange = (value: string) => {
    props.firstNameHandler(value);
    setFirstName(value);
    setFirstNameError(false);
    setFirstNameHelperText("");
  };
  const onLastNameChange = (value: string) => {
    props.lastNameHandler(value);
    setLastName(value);
    setLastNameError(false);
    setLastNameHelperText("");
  };
  const onEmailChange = (value: string) => {
    props.emailHandler(value);
    setEmail(value);
    setMailError(false);
    setMailHelperText("");
  };
  const onDisplayNameChange = (value: string) => {
    setDisplayName(value);
    setDisplayNameError(false);
    setDisplayNameHelperText("");
  };
  const onLocationChange = (value: string) => {
    setLocation(value);
  };
  const onPhoneNumberChange = (
    targetValue: string,
    numberType: PhoneNumberType
  ) => {
    switch (numberType) {
      case PhoneNumberType.office:
        setOfficeNumber(targetValue);
        break;
      case PhoneNumberType.home:
        setPersonalNumber(targetValue);
        break;

      default:
        break;
    }
  };

  const isValidEmailAddress = (emailOrUndefined?: string): boolean => {
    const emailAddressRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailOrUndefined) {
      return false;
    }
    return emailAddressRegExp.test(emailOrUndefined);
  };

  const onCancelSaveDialog = React.useCallback(async () => {
    setIsSaveData(false);
  }, []);

  const onSaveDialog = React.useCallback(async () => {
    if (!firstName) {
      setFirstNameHelperText("First Name not Set");
      setFirstNameError(true);
    } else if (!lastName) {
      setLastNameHelperText("Last Name not Set");
      setLastNameError(true);
    } else if (!isValidEmailAddress(email)) {
      setMailHelperText("Mail not Valid");
      setMailError(true);
    } else if (!displayName) {
      setDisplayNameHelperText("Display Name not Valid");
      setDisplayNameError(true);
    } else {
      setIsSaveData(true);
    }
  }, [firstName, lastName, displayName, email]);

  const onCancelSaveSuccessDialog = React.useCallback(async () => {
    setOnSaveSuccess(false);
  }, [onSaveSuccess]);

  // Reset profile data to default
  const resetdata = () => {
    setLastName(props.userData.last_name ?? "");
    setDisplayName(props.userData.display_name ?? "");
    setLocation(props.userData.primary_location ??"");
    onEmailChange(props.userData.email ?? "");
    onFirstNameChange(props.userData.first_name ?? "");
    props.lastNameHandler(props.userData.last_name ?? "");
    setPhoneData()
  };

  const setPhoneData = () => {
    const phone = props.userData.phone;
    if (phone) {
      props.userData.phone?.map((phonedata) => {
        const phoneNumber = phonedata.number;
        switch (phonedata.type) {
          case PhoneNumberType.office:
            setOfficeNumber(phoneNumber ? phoneNumber : "");
            break;
          case PhoneNumberType.home:
            setPersonalNumber(phoneNumber ? phoneNumber : "");
            break;

          default:
            break;
        }
      });
    } else {
      setOfficeNumber("");
      setPersonalNumber("");
    }
  }

  // callback function to save data to DB
  const saveProfileData = useCallback(async () => {
    setIsSaveData(false);
    const data: RegisterUserRequest = {};
    const homeNumber: PhoneNumbers = {};
    const officialNumber: PhoneNumbers = {};
    const phoneData: PhoneNumbers[] = [];
    data.first_name = firstName;
    data.last_name = lastName;
    data.email = email;
    data.primary_location = location;
    data.display_name = displayName;
    data.status = "Invited";
    data.roles = ["Admin", "Engineer"];
    data.organization = "62ab658fcbc5677a0ab14f96";
    homeNumber.type = PhoneNumberType.home;
    homeNumber.number = personalNumber;
    phoneData.push(homeNumber);
    officialNumber.type = PhoneNumberType.office;
    officialNumber.number = officeNumber;
    phoneData.push(officialNumber);
    data.phone = phoneData;
    UsersApi.registerUsers(data)
      .then((response) => {
        console.log(response.data.user_id);
        localStorage.setItem("userId", response.data.user_id);
        setSaveResultMessage("Profile Registered Successfully");
        setOnSaveSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setSaveResultMessage("Profile Registered Failed");
        setOnSaveSuccess(true);
      });
  }, [
    firstName,
    lastName,
    displayName,
    officeNumber,
    personalNumber,
    location,
    email,
  ]);

  return (
    <>
      <Card sx={{ width: "90%", height: "100%", marginTop: 10 }}>
        <CardHeader title="My Profile"></CardHeader>
        <CardActions style={{ width: "100%", justifyContent: "flex-end" }}>
          <Tooltip title="Save">
            <IconButton onClick={onSaveDialog}>
              <SaveRoundedIcon color={"primary"} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton onClick={resetdata}>
              <CachedRoundedIcon color={"primary"} />
            </IconButton>
          </Tooltip>
        </CardActions>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <KyroTextInput
                id={"firstName"}
                label={"First Name"}
                error={firstNameError}
                helperText={firstNameHelperText}
                displayImage={<PersonIcon />}
                value={firstName}
                changeAction={onFirstNameChange}
              ></KyroTextInput>
            </Grid>
            <Grid item xs={6}>
              <KyroTextInput
                id={"lastName"}
                label={"Last Name"}
                error={lastNameError}
                helperText={lastNameHelperText}
                displayImage={<PersonIcon />}
                value={lastName}
                changeAction={onLastNameChange}
              ></KyroTextInput>
            </Grid>
            <Grid item xs={6}>
              <KyroTextInput
                id={"displayName"}
                label={"Display Name"}
                error={displayNameError}
                helperText={displayNameHelperText}
                value={displayName}
                displayImage={<AccountBox />}
                changeAction={onDisplayNameChange}
              ></KyroTextInput>
            </Grid>
            <Grid item xs={6}>
              <KyroTextInput
                id={"email"}
                label={"Email"}
                error={mailError}
                helperText={mailHelperText}
                value={email}
                displayImage={<Email />}
                changeAction={onEmailChange}
              ></KyroTextInput>
            </Grid>
            <Grid item xs={6}>
              <KyroPhoneNumberInput
                id={"phoneNumber"}
                label={"Phone No(Work)"}
                displayImage={<PersonIcon />}
                inputType={PhoneNumberType.office}
                changeAction={onPhoneNumberChange}
                value={officeNumber}
              ></KyroPhoneNumberInput>
            </Grid>
            <Grid item xs={6}>
              <KyroPhoneNumberInput
                id={"phonePersonal"}
                label={"Phone No(Personal)"}
                displayImage={<Phone />}
                inputType={PhoneNumberType.home}
                changeAction={onPhoneNumberChange}
                value={personalNumber}
              ></KyroPhoneNumberInput>
            </Grid>
            <Grid item xs={6}>
              <KyroTextInput
                id={"location"}
                label={"Location"}
                value={location}
                displayImage={<Location />}
                changeAction={onLocationChange}
              ></KyroTextInput>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <KyroAlertDialog
        open={isSaveData}
        title={"Register User Profile"}
        message={"Do you want to Save Profile ?"}
        handleClose={onCancelSaveDialog}
        saveData={saveProfileData}
      ></KyroAlertDialog>

      <KyroInfoDialog
        open={onSaveSuccess}
        message={saveResultMessage}
        handleClose={onCancelSaveSuccessDialog}
      ></KyroInfoDialog>
    </>
  );
};

export default KyroProfileBody;
