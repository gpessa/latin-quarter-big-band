"use client";

import { Card, CardContent, Stack } from "@mui/material";
import React from "react";

export function FormCard({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <Card
      component="form"
      raised={false}
      noValidate
      onSubmit={onSubmit}
    >
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
