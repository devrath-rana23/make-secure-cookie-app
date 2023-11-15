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
  res.setHeader(
    "Set-Cookie",
    `${APP_CONSTANTS.ACCESS_TOKEN_NAME}="; Path=/; httpOnly; ${
      process.env.environment === "production" ? "Secure" : ""
    }; Max-Age=0`
  );
  return res.status(200).json({ message: "Success" });
}
