import {Metadata, ResolvingMetadata} from "next";
import api from "@/api";
import Page from ".";

 
type Props = {
  params: Promise<{ video_id: number }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata({ params, searchParams }: Props,  parent: ResolvingMetadata): Promise<Metadata> {
  const { video_id } = await params
  const video = (await api.video.info(video_id)).data;
 
  return {
    title: `${video?.name} | 影视`,
    description: `${video?.content} | 影视`,
    openGraph: {
      images: [`${video?.pic}`],
    },
  }
}


export default async (props: Props) => <Page video_id={(await props.params).video_id} />