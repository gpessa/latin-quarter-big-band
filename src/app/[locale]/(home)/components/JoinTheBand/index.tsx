"use client";

import { FormCard, LabeledField, submitButtonSx } from "@/components/FormCard";
import { Section } from "@/components";
import { SECTIONS, copyFor } from "@/contants";
import {
  JoinTheBandFormData,
  createJoinTheBandSchema,
} from "@/sanity/formSchemas";
import type { SiteLocale } from "@/sanity/localeConfig";
import { getValidationMessages } from "@/sanity/validationMessages";
import { displayTitleSx, proseSx } from "@/theme";
import { QUERYResult } from "@/types/query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { PortableText } from "next-sanity";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export type { JoinTheBandFormData };

const JoinTheBand: React.FC<
  Exclude<QUERYResult["joinTheBand"], null> & { locale: SiteLocale }
> = ({ title, content, instruments, form, locale }) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const copy = copyFor(locale);
  const schema = useMemo(
    () => createJoinTheBandSchema(getValidationMessages(locale)),
    [locale]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinTheBandFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: { name: "", email: "", phone: "", message: "", position: "" },
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
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" component="h2" sx={{ ...displayTitleSx, mb: 3 }}>
            {title}
          </Typography>
          <Typography component="div" sx={{ ...proseSx, maxWidth: 480 }}>
            <PortableText value={content} />
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              m: 0,
              mt: 3,
              p: 0,
              display: "flex",
              flexDirection: "column",
              gap: 1.75,
            }}
          >
            {instruments?.map(({ instrumentName, notes, emoticon }) => (
              <Typography
                component="li"
                key={instrumentName}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.25,
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  lineHeight: 1.3,
                }}
              >
                {emoticon ? (
                  <Box component="span" aria-hidden="true">
                    {emoticon}
                  </Box>
                ) : null}
                <span>
                  {instrumentName}
                  {notes ? ` (${notes})` : ""}
                </span>
              </Typography>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormCard onSubmit={handleSubmit(onSubmit)}>
            <LabeledField
              id="join-name"
              label={form?.name}
              placeholder={copy.placeholders.name}
              autoComplete="name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              required
            />
            <LabeledField
              id="join-email"
              label={form?.email}
              placeholder={copy.placeholders.email}
              type="email"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              required
            />
            <LabeledField
              id="join-phone"
              label={form?.phone}
              placeholder={copy.placeholders.phone}
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <LabeledField
              id="join-message"
              label={form?.message}
              placeholder={copy.placeholders.message}
              multiline
              minRows={4}
              {...register("message")}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
            <LabeledField
              id="join-position"
              label={form?.position}
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

export default JoinTheBand;
