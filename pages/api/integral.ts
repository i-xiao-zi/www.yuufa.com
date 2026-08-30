import api from "@/api";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {
  const tokens = (await api.ynp.tokens()).data;
  let rtn: any[] = [];
  for (const token of tokens??[]) {
    const user = await api.ynp.login(token.phone, token.pwd);
    const integral = await api.ynp.integral(user.accessToken);
    console.log(integral);
    rtn.push(integral);
  }
  res.status(200).json(rtn);
}