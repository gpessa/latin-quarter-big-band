"use client";

import { NAME } from "@/contants";
import { styled } from "@mui/material/styles";
import { sendGAEvent } from "@next/third-parties/google";

import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { QUERYResult } from "../../../sanity.types";

const FloatingWhatsAppStyled = styled(FloatingWhatsApp)(
  ({ theme }) => `
  .floating-whatsapp-chatbox {
    border-radius: 0px;
  }

  .floating-whatsapp-button {
    right: ${theme.spacing(3)};
    bottom: ${theme.spacing(3)};
  }
`
);

const WhatsApp: React.FC<Exclude<QUERYResult["whatsApp"], null>> = ({
  phoneNumber,
  statusMessage,
  chatMessage,
}) => {
  return (
    <FloatingWhatsAppStyled
      accountName={NAME}
      phoneNumber={phoneNumber}
      statusMessage={statusMessage!}
      onSubmit={() => sendGAEvent("event", "submit_on_whatsapp")}
      chatMessage={chatMessage!}
    />
  );
};

export default WhatsApp;
