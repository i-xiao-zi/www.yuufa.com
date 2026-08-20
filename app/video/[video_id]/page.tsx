import React from "react";
import {Metadata} from "next";
import { Anchor, Breadcrumbs } from "@mantine/core";
import api from "@/api";
import VideoPlayer from "./player";
import Page from ".";


export const metadata: Metadata = {
  title: "影视",
  description: "影视",
};

export default async (params) => <Page {...params} />