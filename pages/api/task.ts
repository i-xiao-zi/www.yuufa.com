import api from "@/api";
import YNP from "@/ynp.api";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse<any[]>) => {
  const tokens = (await api.ynp.tokens()).data;
  let rtn: any[] = [];
  for (const token of tokens??[]) {
    const info: YNP.ZhunongInfo = await api.ynp.zhunongInfo(token.token);
    const draw = await api.ynp.draw(token.token);
    const sign = await api.ynp.sign(token.token);
    let id = info.recommendProducts[Math.floor(Math.random() * info.recommendProducts.length)].productMainId;
    const view = await api.ynp.view(token.token, id);
    id = info.recommendProducts[Math.floor(Math.random() * info.recommendProducts.length)].productMainId;
    const share = await api.ynp.share(token.token, id);
    rtn.push({draw, sign, view, share});
  }
  res.status(200).json(rtn);
}