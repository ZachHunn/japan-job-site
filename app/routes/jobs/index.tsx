import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { Box, Button, Drawer, Typography } from "@mui/material";
import type { GridColumns, GridRowParams } from "@mui/x-data-grid";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useMemo, useState } from "react";
import { JobDetails } from "~/components/JobDetails";
import { ResponseModal } from "~/components/ResponseModal";
import type { Jobs } from "../../../src/xata";

export const loader = async () => {
  const response = await axios.get(
    "https://japandev-job-search-api.vercel.app/api/jobs"
  );
  return json(response.data.data);
};

type SideDrawerProps = {
  jobId: number | null;
  open: boolean;
};

type ModalProps = {
  modalTitle: string;
  modalResponse: string;
};

type ButtonTextProps = {
  addButtonText: string;
  deleteButtonText: string;
};

export default function JobsPage() {
  const [modalIsopen, setModalIsOpen] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<ButtonTextProps>({
    addButtonText: "Add Jobs",
    deleteButtonText: "Remove Jobs",
  });
  const [responseInfo, setResponseInfo] = useState<ModalProps>({
    modalTitle: "",
    modalResponse: "",
  });
  const [sideDrawerState, setSideDrawerState] = useState<SideDrawerProps>({
    jobId: null,
    open: false,
  });
  const jobs = useLoaderData<Jobs[]>();

  const postJobsResponse = async (): Promise<void> => {
    const res = await axios.post(
      "https://japandev-job-search-api.vercel.app/api/jobs/create"
    );
    setResponseInfo({
      modalTitle: "New Jobs On Japan-Dev.com",
      modalResponse: res.data.data,
    });
    setModalIsOpen(true);
    setButtonText({ ...buttonText, addButtonText: "Add Jobs" });
  };

  const deleteJobsResponse = async (): Promise<void> => {
    const res = await axios.delete(
      "https://japandev-job-search-api.vercel.app/api/jobs/delete"
    );
    setResponseInfo({
      modalTitle: "Jobs Removed From Japan-Dev.com",
      modalResponse: res.data.data,
    });
    setModalIsOpen(true);
    setButtonText({ ...buttonText, deleteButtonText: "Remove Jobs" });
  };

  const viewCellAction = (params: GridRowParams) => {
    return [
      <GridActionsCellItem
        key={params.row?.id}
        icon={<ViewSidebarRoundedIcon color="info" />}
        label="View Job"
        onClick={() => {
          setSideDrawerState({ jobId: params.row.jobId, open: true });
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
      headerName: "View Job",
      width: 150,
      getActions: viewCellAction,
    },
  ];

  const rows = useMemo(() => {
    return jobs.map((job) => {
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
      } as Jobs;
    });
  }, [jobs]);

  const GridToolbarAddJobsButton = (): JSX.Element => {
    return (
      <Button
        disabled={buttonText.addButtonText === "Searching..."}
        onClick={() => {
          setButtonText({ ...buttonText, addButtonText: "Searching..." });
          postJobsResponse();
        }}
        className="w-[145px]"
        color="secondary"
        startIcon={<AddToQueueIcon />}
      >
        {buttonText.addButtonText}
      </Button>
    );
  };

  const GridToolbarDeleteStaleJobsButton = (): JSX.Element => {
    return (
      <Button
        disabled={buttonText.deleteButtonText === "Searching..."}
        onClick={() => {
          setButtonText({ ...buttonText, deleteButtonText: "Searching..." });
          deleteJobsResponse();
        }}
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        {buttonText.deleteButtonText}
      </Button>
    );
  };

  const CustomToolabr = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton color="secondary" />
        <GridToolbarAddJobsButton />
        <GridToolbarDeleteStaleJobsButton />
      </GridToolbarContainer>
    );
  };

  return (
    <Box className=" md:h-[540px] w-full px-12">
      <Typography
        variant="h1"
        className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text underline text-center py-4"
      >
        Japan Dev Jobs
      </Typography>
      <Typography
        className="text-center pb-4"
        variant="h4"
        component="h2"
      >{`${jobs.length} Jobs`}</Typography>
      <DataGrid
        className="border-none"
        columns={columns}
        rows={rows}
        pageSize={50}
        rowsPerPageOptions={[50]}
        getRowId={(row) => row.id}
        components={{ Toolbar: CustomToolabr }}
        pagination
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
      <ResponseModal
        modalTitle={responseInfo.modalTitle}
        isOpen={modalIsopen}
        setModalIsOpen={setModalIsOpen}
        response={responseInfo.modalResponse}
      />
    </Box>
  );
}
