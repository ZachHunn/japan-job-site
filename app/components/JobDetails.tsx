import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import type { FC } from "react";
import type { Jobs } from "src/xata";

type JobDetailProps = {
  job: Jobs;
  closeDrawer: () => void;
};
export const JobDetails: FC<JobDetailProps> = ({
  job,
  closeDrawer,
}): JSX.Element => {
  return (
    <Container>
      <Typography variant="h3">Job Title</Typography>
      <Typography>{`${job?.jobTitle}`}</Typography>

      <Button variant="contained" onClick={closeDrawer}>
        Close
      </Button>
    </Container>
  );
};
