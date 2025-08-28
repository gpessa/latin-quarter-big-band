/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import {
  Grid,
  MenuItem,
  Stack,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Section } from "@/components";
import { Alert, Button, TextField, Select } from "@mui/material";
import { PortableText } from "next-sanity";
import { useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { STANDARD_SPACING } from "@/contants";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().min(2, "Name too short").required("Name is required"),
    phone: yup.string().min(2, "Phone too short").optional(),
    message: yup.string(),
    position: yup.string().required("Position is required"),
  })
  .required();

export type JoinTheBandFormData = yup.InferType<typeof schema>;

const JoinTheBand: React.FC<QUERYResult["joinTheBand"]> = (joinTheBand) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinTheBandFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: JoinTheBandFormData) => {
    setStatus("idle");
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <Section color="primary">
      <Typography variant="h2" component="h2">
        {joinTheBand?.title}
      </Typography>

      <Grid container spacing={STANDARD_SPACING}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography component="div">
            {joinTheBand?.content && (
              <PortableText value={joinTheBand?.content} />
            )}
          </Typography>

          <List dense={true} component="ol">
            {joinTheBand?.instruments?.map(
              ({ instrumentName, notes, emoticon }) => (
                <ListItem key={instrumentName} component={"li"}>
                  <ListItemIcon>{emoticon}</ListItemIcon>
                  <ListItemText
                    primary={`${instrumentName}`}
                    secondary={notes ? `(${notes})` : null}
                    slotProps={{
                      secondary: { variant: "caption", color: "grey.500" },
                    }}
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4} component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="filled"
              required
            />
            <TextField
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="filled"
              required
            />
            <TextField
              label="Phone"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              variant="filled"
            />
            <TextField
              label="Message"
              multiline
              minRows={4}
              variant="filled"
              {...register("message")}
              error={!!errors.message}
              helperText={errors.message?.message}
              required
            />
            <FormControl variant="filled">
              <InputLabel id="position">Position</InputLabel>
              <Select
                label="Position"
                {...register("position")}
                error={!!errors.position}
                variant="filled"
              >
                {joinTheBand?.instruments?.map(({ instrumentName }) => (
                  <MenuItem value={instrumentName} key={instrumentName}>
                    {instrumentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="primary"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>

            {status === "success" && (
              <Alert severity="success">Message sent successfully!</Alert>
            )}
            {status === "error" && (
              <Alert severity="error">Failed to send message.</Alert>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Section>
  );
};

export default JoinTheBand;
