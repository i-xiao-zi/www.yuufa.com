import {Metadata} from "next";
import VideoList from "./list";

export const metadata: Metadata = {
  title: "影视",
  description: "影视",
};

export default async function VideoPage() {
  return (
    <main className="container mx-auto flex-auto z-1">
      <VideoList />
    </main>
  )
}