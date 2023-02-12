import { Box, Typography, Drawer } from "@mui/material";
import type { GridColumns, GridRowParams } from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import type { Jobs } from "../../../src/xata";
import { useState } from "react";
import { JobDetails } from "~/components/JobDetails";

export const loader = async () => {
  const response = await axios.get(
    "https://japandev-jobs-notion.vercel.app/api/jobs"
  );
  return json(response.data.data);
};

type SideDrawerProps = {
  jobId: number | null;
  open: boolean;
};
export default function JobsPage() {
  const [sideDrawerState, setSideDrawerState] = useState<SideDrawerProps>({
    jobId: null,
    open: false,
  });
  const jobs = useLoaderData<Jobs[]>();
  console.log(jobs.find((job) => job.jobId === sideDrawerState.jobId));
  const viewCellAction = (params: GridRowParams) => {
    return [
      <GridActionsCellItem
        key={params.row?.id}
        icon={<ViewSidebarRoundedIcon color="info" />}
        label="View Job"
        onClick={() => {
          console.log(params.row.jobId);
          setSideDrawerState({ jobId: params.row.jobId as number, open: true });
        }}
      />,
    ];
  };

  const columns: GridColumns<Jobs> = [
    { field: "jobId", headerName: "Job Id", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "companyLocation", headerName: "Location", flex: 1 },
    { field: "jobLocation", headerName: "Remote or In-Office", flex: 1 },
    { field: "postedDate", headerName: "Date Posted", flex: 1 },
    {
      field: "actions",
      type: "actions",
      width: 150,
      getActions: viewCellAction,
    },
  ];

  const rows = jobs.map((job) => {
    const {
      id,
      jobId,
      jobTitle,
      companyName,
      companyLocation,
      jobLocation,
      postedDate,
    } = job;
    return {
      id: id,
      jobId: jobId,
      jobTitle: jobTitle,
      companyName: companyName,
      companyLocation: companyLocation,
      jobLocation: jobLocation,
      postedDate: postedDate,
    };
  });

  return (
    <Box className=" h-[720px] w-full px-12">
      <Typography
        variant="h1"
        className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text underline text-center py-6"
      >
        Japan Dev Jobs
      </Typography>
      <DataGrid
        className="border-none"
        columns={columns}
        rows={rows}
        pageSize={50}
        rowsPerPageOptions={[50]}
        getRowId={(row) => row.id}
        disableSelectionOnClick
      />
      <Drawer
        sx={{
          width: 500,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 500,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="right"
        open={sideDrawerState.open}
      >
        {sideDrawerState.open && (
          <JobDetails
            job={jobs.find((job) => job?.jobId === sideDrawerState.jobId)}
            closeDrawer={() => setSideDrawerState({ jobId: null, open: false })}
          />
        )}
      </Drawer>
    </Box>
  );
}
