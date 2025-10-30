export const signUpTestData = {
  MALE_USER: {
    USERNAME: "Dhiman",
    ACCOUNT_INFO: {
      TITLE: "Mr",
      BIRTHDATE: 6,
      BIRTHMONTH: "November",
      BIRTHYEAR: 1997,
    },
    ADDRESS_INFO: {
      FIRST_NAME: "Dhimanjyoti",
      LAST_NAME: "Das",
      COMPANY: "Microsoft-Service",
      STREETADDRESS: "Pitfall street/123rd Ave, New Jersey",
      HOMEADRESS: "House No: 172",
      STATE: "New Jersey",
      CITY: "Hamper City",
      ZIPCODE: 456211,
      MOBILENUMBER: 8751096123,
      COUNTRY: "United States",
    },
  },

  FEMALE_USER: {
    TITLE: "Mrs",
    PASSWORD: "ComplexPassword123#$%",
    BIRTHDATE: 28,
    BIRTHMONTH: "April",
    BIRTHYEAR: 1998,
    FIRST_NAME: "Anamika",
    LAST_NAME: "Deka",
    COMPANY: "Microsoft-Service",
    ADDRESS: "Pitfall street/123rd Ave, New Jersey",
    ADDRESS2: "House No: 173",
    STATE: "New Jersey",
    CITY: "Hamper City",
    ZIPCODE: 456211,
    MOBILE: 8751652123,
    COUNTRY: "United States",
  },
};

// Centralized static text/messages
export const EXPECTED_MESSAGES = {
  SUCCESSFUL_CREATION: "ACCOUNT CREATED!",
  // ... other expected application messages
};
