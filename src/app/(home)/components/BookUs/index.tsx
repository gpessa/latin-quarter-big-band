/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Section } from "@/app/components";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup
      .string()
      .min(10, "Message too short")
      .required("Message is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function BookUs() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    const res = await fetch("/api/send-email", {
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
    <Section color="secondary">
      <Typography variant="h2" component="h2" gutterBottom>
        Book Us
      </Typography>
      <Grid container spacing={4}>
        <Grid size={6}>
          <Typography gutterBottom>
            Looking to bring explosive rhythm, rich brass harmonies, and the
            vibrant energy of Latin music to your event? Latin Quarter Big Band
            is available for:
          </Typography>
          <Box component="ul" sx={{ listStyleType: "disc", paddingLeft: 2 }}>
            <Typography component="li">Festivals</Typography>
            <Typography component="li">Corporate events</Typography>
            <Typography component="li">Private parties & weddings</Typography>
            <Typography component="li">
              City concerts & open-air shows
            </Typography>
            <Typography component="li">
              Cultural and community events
            </Typography>
          </Box>
          <Typography gutterBottom>
            With a 18-piece lineup inspired by legends like Tito Puente and
            Paquito D'Rivera, we deliver a powerful and unforgettable live
            experience that gets every audience moving. Let’s make your event
            unforgettable! Get in touch to check our availability, prices, and
            technical requirements.
          </Typography>
        </Grid>
        <Grid size={6}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
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
              />

              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                color="secondary"
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
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
