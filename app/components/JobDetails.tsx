import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import type { FC } from "react";
import type { Jobs } from "src/xata";
import { Link } from "@remix-run/react";

type JobDetailProps = {
  job: Jobs | undefined;
  closeDrawer: () => void;
};
export const JobDetails: FC<JobDetailProps> = ({
  job,
  closeDrawer,
}): JSX.Element => {
  return (
    <Container>
      <div className=" p-6 flex flex-col space-y-2 max-h-[688px]">
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Company Name
        </Typography>
        <Typography className="pl-4 text-2xl">{`${job?.companyName}`}</Typography>
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Job Title
        </Typography>
        <Typography className="pl-4">{`${job?.jobTitle}`}</Typography>
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Intership
        </Typography>
        {job?.internship === true ? (
          <Typography className="pl-4"> Yes</Typography>
        ) : (
          <Typography className="pl-4">No</Typography>
        )}
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Skills
        </Typography>
        <Typography className="pl-4">{`${job?.skills}`}</Typography>
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Salary Range
        </Typography>
        {job?.minSalary !== null && job?.maxSalary !== null ? (
          <Typography className="pl-4">
            &#165;{`${job?.minSalary}`} - &#165;{`${job?.maxSalary}`}
          </Typography>
        ) : (
          <Typography className="pl-4"> N/A</Typography>
        )}
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Application Email
        </Typography>
        {job?.applicationEmail ? (
          <a
            href={`mailto:${job?.applicationEmail}`}
            target="_blank"
            rel="noreferrer"
          >
            <Typography className="pl-4">{job?.applicationEmail}</Typography>
          </a>
        ) : (
          <Typography className="pl-4">N/A</Typography>
        )}
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Application Url
        </Typography>
        {job?.applicationUrl ? (
          <Link
            className="overflow-hidden text-ellipsis"
            to={job?.applicationUrl as string}
            target="_blank"
          >
            <Typography className="pl-4">{job?.applicationUrl}</Typography>
          </Link>
        ) : (
          <Typography className="pl-4">N/A</Typography>
        )}
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Japanese Level
        </Typography>
        {job?.japaneseLevel ? (
          <Typography className="pl-4">
            {job?.japaneseLevel.replaceAll("_", " ").toUpperCase()}
          </Typography>
        ) : null}
        <Typography
          className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variant="h5"
        >
          Canidate Location
        </Typography>
        <Typography className="pl-4">
          {job?.candidateLocation?.replaceAll("_", " ").toUpperCase()}
        </Typography>
      </div>
      <Button variant="contained" onClick={closeDrawer}>
        Close
      </Button>
    </Container>
  );
};
