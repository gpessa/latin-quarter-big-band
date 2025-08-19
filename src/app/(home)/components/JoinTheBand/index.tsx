"use client";

import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Section } from "@/components";
import { QUERYResult } from "../../../../../sanity.types";
import { PortableText } from "next-sanity";

const JoinTheBand: React.FC<QUERYResult["joinTheBand"]> = (joinTheBand) => (
  <Section color="secondary">
    <Typography variant="h2" component="h2" gutterBottom>
      {joinTheBand?.title}
    </Typography>
    <Typography gutterBottom>
      {joinTheBand?.content && <PortableText value={joinTheBand?.content} />}
    </Typography>

    <List dense={true} component={"ol"}>
      {joinTheBand?.instruments?.map(({ instrumentName, notes, emoticon }) => (
        <ListItem key={instrumentName} component={"li"}>
          <ListItemIcon>{emoticon}</ListItemIcon>
          <ListItemText
            primary={`${instrumentName}`}
            secondary={notes ? `(${notes})` : null}
            slotProps={{
              secondary: { variant: "caption", color: "secondary" },
            }}
          />
        </ListItem>
      ))}
    </List>
  </Section>
);

export default JoinTheBand;
