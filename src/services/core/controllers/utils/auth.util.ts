import { hash, compare } from "bcrypt";
import { checkSchema } from "express-validator";
import { sign, verify } from "jsonwebtoken";

const SALBOUND = 10;
const JWT_KEY = "49U3Z16Plt$VoG2JZkm^9O*$wEBDeQt|@XK1_La/eE]Wt-[tnclANZ";

export const hashPassword = async (password: string): Promise<string> => await hash(password, SALBOUND);

export const comparePassword = async (passwordToCompared: string, password: string): Promise<boolean> =>
  await compare(passwordToCompared, password);

type Payload = {
  id: string;
  profile: {
    username: string;
    email: string;
    role: string;
  };
};

export const generateToken = (payload: Payload): string =>
  sign(payload, process.env.JWT_KEY || JWT_KEY, {
    algorithm: "HS512",
    expiresIn: "1h",
  });

export const checkToken = (token: string): Payload | null | string => {
  let parsedToken: Payload | null = null;
  verify(token, JWT_KEY, (err, parsed) => {
    if (err) {
      switch (err.name) {
        case "TokenExpiredError":
          return "Token has expired";
          break;
        case "JsonWebTokenError":
          return "Invalid token";
          break;
        case "NotBeforeError":
          return "Token is not active";
          break;
        default:
          "Other Error";
          break;
      }
    } else parsedToken = parsed as Payload;
  });
  return parsedToken;
};

export const assertRequiredRegisterFieldsIsNotEmpty = checkSchema({
  email: {
    exists: {
      errorMessage: "Email is required",
    },
    isEmail: {
      bail: true,
      errorMessage: "Email is in wrong format",
    },
  },
  username: {
    exists: {
      errorMessage: "Username is required",
    },
    trim: true,
    isLength: {
      errorMessage: "Usename must have length more than 5",
      options: { min: 6 },
    },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
    matches: {
      errorMessage: "Password must have at least one uppercase, lowercase, digit and spacial character",
      options: new RegExp("(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*()+=]).{8,20})", "g"),
    },
  },
  dateNaiss: {
    exists: {
      errorMessage: "Date if birth is required",
    },
    isISO8601: {
      bail: true,
      options: {
        strict: true,
        strictSeparator: true,
      },
      errorMessage: "Date od bird doesn't respect the format",
    },
    toDate: true,
  },
});

export const assertRequiredLoginFieldsIsNotEmpty = checkSchema({
  email: {
    exists: {
      errorMessage: "Email is required",
    },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
  },
});
