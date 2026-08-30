import api from "@/api";
import {YNP} from "@/api/types";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {
  const tokens = (await api.ynp.tokens()).data;
  let rtn: any[] = [];
  for (const token of tokens??[]) {
    const user = await api.ynp.login(token.phone, token.pwd)
    const info: YNP.ZhunongInfo = await api.ynp.zhunongInfo(user.accessToken);
    const draw = await api.ynp.draw(user.accessToken);
    const sign = await api.ynp.sign(user.accessToken);
    let id = info.recommendProducts[Math.floor(Math.random() * info.recommendProducts.length)]?.productMainId ?? Math.ceil(Math.random() * 100);
    const view = await api.ynp.view(user.accessToken, id);
    id = info.recommendProducts[Math.floor(Math.random() * info.recommendProducts.length)]?.productMainId ?? Math.ceil(Math.random() * 100);
    const share = await api.ynp.share(user.accessToken, id);
    rtn.push({draw, sign, view, share});
  }
  res.status(200).json(rtn);
}