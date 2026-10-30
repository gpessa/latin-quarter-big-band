"use client";

import { Grid, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Stack, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Section } from "@/components";
import { Alert, Box, Button } from "@mui/material";
import { PortableText } from "next-sanity";
import { useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";

import { SECTIONS } from "@/contants";
import { FormCard } from "@/components/FormCard";
import LabeledField from "@/components/LabeledField";
import { GRID_SPACING, SPACING } from "@/theme";

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
    message: yup.string(),
    position: yup.string().required("Position is required"),
  })
  .required();

export type JoinTheBandFormData = yup.InferType<typeof schema>;

const JoinTheBand: React.FC<Exclude<QUERYResult["joinTheBand"], null>> = ({
  title,
  content,
  instruments,
  form,
}) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinTheBandFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      position: "",
    },
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
    <Section tone="red" id={SECTIONS.joinTheBand}>
      <Grid container spacing={GRID_SPACING} sx={{ alignItems: "flex-start" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
            {title}
          </Typography>
          <Typography component="div" sx={{ maxWidth: 480 }}>
            <PortableText value={content} />
          </Typography>
          <List>
            {instruments?.map(({ instrumentName, notes, emoticon }) => (
              <ListItem>
                {emoticon ? (
                  <ListItemAvatar>
                    {emoticon}
                  </ListItemAvatar>
                ) : null}
                <ListItemText primary={instrumentName} secondary={notes} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormCard onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={SPACING} >
              <LabeledField
                id="join-name"
                label={form?.name ?? undefined}
                autoComplete="name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
              <LabeledField
                id="join-email"
                label={form?.email ?? undefined}
                type="email"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
              />
              <LabeledField
                id="join-phone"
                label={form?.phone ?? undefined}
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <LabeledField
                id="join-message"
                label={form?.message ?? undefined}
                multiline
                minRows={4}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
              <LabeledField
                id="join-position"
                label={form?.position ?? undefined}
                select
                defaultValue=""
                slotProps={{ select: { displayEmpty: true } }}
                {...register("position")}
                error={!!errors.position}
                helperText={errors.position?.message}
              >
                <MenuItem value="" disabled>
                  {form?.position}
                </MenuItem>
                {instruments?.map(({ instrumentName }) => (
                  <MenuItem value={instrumentName} key={instrumentName}>
                    {instrumentName}
                  </MenuItem>
                ))}
              </LabeledField>
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

export default JoinTheBand;
