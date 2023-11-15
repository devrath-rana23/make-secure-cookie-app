// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APP_CONSTANTS } from "@/utilities/Constants";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

type Data = {
  message: string;
  name?: string;
  data?: { description: string; image: string; title: string }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  jwt.verify(
    req.cookies[APP_CONSTANTS.ACCESS_TOKEN_NAME],
    process.env.APP_SECRET,
    function (err: any, decoded: any) {
      console.log("err", err);
      if (err) {
        return res.status(403).json({ message: "Unauthorized" });
      }
    }
  );
  return res.status(200).json({
    message: "Success",
    data: [
      {
        image: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
        title: "Lizard",
        description: `Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica`,
      },
    ],
  });
}
