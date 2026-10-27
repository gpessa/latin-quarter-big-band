"use client";

import { Grid, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Section } from "@/components";
import { SECTIONS, pageCopy } from "@/contants";
import { Alert, Box, Button } from "@mui/material";
import { useState, type ReactNode } from "react";
import { QUERYResult } from "../../../../../sanity.types";
import { FormCard, LabeledField, submitButtonSx } from "@/components/FormCard";

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

function plainText(block: BookBlock) {
  const children = block.children || [];
  return children.map((child) => child.text || "").join("").trim();
}

function BookCopy({ value }: { value: BookContent }) {
  const nodes: ReactNode[] = [];
  let items: Array<{ key: string; text: string }> = [];

  const flush = () => {
    if (!items.length) return;
    const list = items;
    nodes.push(
      <Box
        component="ul"
        key={`list-${nodes.length}`}
        sx={{ my: 1.5, pl: "1.15em" }}
      >
        {list.map((item) => (
          <Box component="li" key={item.key} sx={{ mb: 0.45 }}>
            {item.text}
          </Box>
        ))}
      </Box>
    );
    items = [];
  };

  for (const block of value || []) {
    if (block._type !== "block") continue;
    const text = plainText(block);
    if (!text) continue;
    const listLike = text.length < 80 && !/[.!?]$/.test(text);
    if (listLike) {
      items.push({ key: block._key || text, text });
    } else {
      flush();
      nodes.push(
        <Box component="p" key={block._key} sx={{ m: 0, mb: "1em" }}>
          {text}
        </Box>
      );
    }
  }

  flush();
  return nodes;
}

const BookUs: React.FC<Exclude<QUERYResult["bookUs"], null>> = ({
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
      <Grid container spacing={{ xs: 4, md: 8 }} sx={{ alignItems: "flex-start" }}>
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
            {pageCopy.bookTitle}
          </Typography>
          <Box sx={{ maxWidth: 520 }}>
            <BookCopy value={content} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormCard onSubmit={handleSubmit(onSubmit)}>
            <LabeledField
              id="book-name"
              label={form?.name ?? undefined}
              placeholder={pageCopy.placeholders.name}
              autoComplete="name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              required
            />
            <LabeledField
              id="book-email"
              label={form?.email ?? undefined}
              placeholder={pageCopy.placeholders.email}
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
              placeholder={pageCopy.placeholders.phone}
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <LabeledField
              id="book-message"
              label={form?.message ?? undefined}
              placeholder={pageCopy.placeholders.message}
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
              sx={submitButtonSx}
            >
              {form?.button}
            </Button>
            {status === "success" && (
              <Alert severity="success">{form?.confirmationMessage}</Alert>
            )}
            {status === "error" && (
              <Alert severity="error">{form?.errorMessage}</Alert>
            )}
          </FormCard>
        </Grid>
      </Grid>
    </Section>
  );
};

export default BookUs;
