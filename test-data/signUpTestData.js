/**
 * Test Data: Centralized mock data for Sign-Up flow.
 * Organized per user persona (e.g., MALE_USER, FEMALE_USER).
 * Keeps the structure consistent for scalability.
 */
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
      STREETADDRESS: "Pitfall Street/123rd Ave, New Jersey",
      HOMEADRESS: "House No: 172",
      STATE: "New Jersey",
      CITY: "Hamper City",
      ZIPCODE: 456211,
      MOBILENUMBER: 8751096123,
      COUNTRY: "United States",
    },
  },

  FEMALE_USER: {
    USERNAME: "Anamika",
    ACCOUNT_INFO: {
      TITLE: "Mrs",
      PASSWORD: "ComplexPassword123#$%",
      BIRTHDATE: 28,
      BIRTHMONTH: "April",
      BIRTHYEAR: 1998,
    },
    ADDRESS_INFO: {
      FIRST_NAME: "Anamika",
      LAST_NAME: "Deka",
      COMPANY: "Microsoft-Service",
      STREETADDRESS: "Pitfall Street/123rd Ave, New Jersey",
      HOMEADRESS: "House No: 173",
      STATE: "New Jersey",
      CITY: "Hamper City",
      ZIPCODE: 456211,
      MOBILENUMBER: 8751652123,
      COUNTRY: "United States",
    },
  },
};

// Centralized static text/messages for validations
export const EXPECTED_MESSAGES = {
  ACCOUNT_CREATED: "Account Created!",
  ACCOUNT_DELETED: "Account Deleted!",
};

// Added a file to make commit to the local branch will be deleting this after sometime.
