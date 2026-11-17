"use client";

import { createContext, useContext, useState } from "react";

/** Shares the "Regarding: <service>" topic between the services list and the enquiry form. */
type Ctx = { topic: string; setTopic: (t: string) => void };
const EnquiryCtx = createContext<Ctx>({ topic: "", setTopic: () => {} });

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [topic, setTopic] = useState("");
  return <EnquiryCtx.Provider value={{ topic, setTopic }}>{children}</EnquiryCtx.Provider>;
}

export const useEnquiry = () => useContext(EnquiryCtx);
