// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APP_CONSTANTS } from "@/utilities/Constants";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

type Data = {
  message: string;
  name?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method?.toLowerCase() !== "post")
    return res.status(403).json({ message: "Invalid Request Method" });

  const { username, password } = req.body;
  const user = APP_CONSTANTS.REGISTERED_USERS.find((item) => {
    return item.username === username;
  });
  //logged in success then set access-token in cookie for authentication and authorization
  if (!!user && user.password === password) {
    const jwtTokenValue = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          username,
          name: "Devsaz",
          age: 25,
        },
      },
      process.env.APP_SECRET
    );
    res.setHeader(
      "Set-Cookie",
      `${APP_CONSTANTS.ACCESS_TOKEN_NAME}=${jwtTokenValue}; Path=/; httpOnly; ${
        process.env.environment === "production" ? "Secure" : ""
      }`
    );
    return res.status(200).json({ message: "Success" });
  }
  return res.status(403).json({ message: "Unauthenticated" });
}
