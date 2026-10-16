 
"use client";

import { Grid, Stack, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Section } from "@/components";
import { SECTIONS, STANDARD_MARGIN_BOTTOM, STANDARD_SPACING } from "@/contants";
import { BookUsFormData, bookUsSchema } from "@/sanity/formSchemas";
import { Alert, Button, TextField } from "@mui/material";
import { PortableText } from "next-sanity";
import { useState } from "react";
import { QUERYResult } from "@/sanity/types/sanity.types";

export type { BookUsFormData };

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
    resolver: yupResolver(bookUsSchema) as any,
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
    <Section color="primary" id={SECTIONS.bookUs}>
      <Grid
        container
        spacing={STANDARD_SPACING}
        direction={{ md: "row-reverse" }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" component="h2" mb={STANDARD_MARGIN_BOTTOM}>
            {title}
          </Typography>
          <Typography component="div">
            <PortableText value={content} />
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4} component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label={form?.name}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="filled"
              required
            />
            <TextField
              label={form?.email}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="filled"
              required
            />
            <TextField
              label={form?.phone}
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              variant="filled"
            />
            <TextField
              label={form?.message}
              multiline
              minRows={4}
              variant="filled"
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
        </Grid>
      </Grid>
    </Section>
  );
};

export default BookUs;
