"use client";

import { Grid, Stack, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { LabeledField, Section } from "@/components";
import { FormCard } from "@/components/FormCard";
import { SECTIONS } from "@/contants";
import { GRID_SPACING, SPACING } from "@/theme";
import { Alert, Box, Button } from "@mui/material";
import { PortableText } from "next-sanity";
import { useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";

type BookContent = Exclude<QUERYResult["bookUs"], null>["content"];
type BookBlock = BookContent[number];

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().min(2, "Name too short").required("Name is required"),
    phone: yup
      .string()
      .test(
        "phone",
        "Phone too short",
        (value) => !value || value.trim().length >= 2
      ),
    message: yup
      .string()
      .min(10, "Message too short")
      .required("Message is required"),
  })
  .required();

export type BookUsFormData = yup.InferType<typeof schema>;

const BookUs: React.FC<Exclude<QUERYResult["bookUs"], null>> = ({
  title,
  content,
  form,
}) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookUsFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: BookUsFormData) => {
    setStatus("idle");
    const res = await fetch("/api/book-us", {
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
    <Section id={SECTIONS.bookUs}>
      <Grid container spacing={GRID_SPACING} sx={{ alignItems: "flex-start" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: "primary.main",
              fontSize: { xs: "2.88rem", md: "4.1rem" },
              mb: 3,
              maxWidth: 560,
            }}
          >
            {title}
          </Typography>
          <Box sx={{ maxWidth: 520 }}>
              <PortableText value={content} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormCard onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={SPACING}>
              <LabeledField
                id="book-name"
                label={form?.name ?? undefined}
                autoComplete="name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
              <LabeledField
                id="book-email"
                label={form?.email ?? undefined}
                type="email"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
              />
              <LabeledField
                id="book-phone"
                label={form?.phone ?? undefined}
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <LabeledField
                id="book-message"
                label={form?.message ?? undefined}
                multiline
                minRows={4}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message}
                required
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                loading={isSubmitting}
              >
                {form?.button}
              </Button>
              {status === "success" && (
                <Alert severity="success">{form?.confirmationMessage}</Alert>
              )}
              {status === "error" && (
                <Alert severity="error">{form?.errorMessage}</Alert>
              )}
            </Stack>
          </FormCard>
        </Grid>
      </Grid>
    </Section>
  );
};

export default BookUs;
