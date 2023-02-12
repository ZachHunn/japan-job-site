import { Typography, Button } from "@mui/material";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div
      className="h-screen bg-contain bg-no-repeat py-72"
      style={{ background: "url('/img/tokyo.jpg')" }}
    >
      <div className="w-full z-0 inline-block fixed top-96 left-96">
        <div className=" h-screen bg-white -rotate-45 transform origin-bottom-left "></div>
      </div>
      <div className="flex flex-col justify-center items-center pb-12 mr-96">
        <Typography
          variant="h1"
          className=" text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text z-10"
        >
          日本での仕事のチャンス
        </Typography>
        <Typography variant="h3" className=" text-black z-10">
          (Job Opportunies in Japan)
        </Typography>
        <Button variant="text" className="w-1/5 rounded-lg mt-4">
          <Link to="/jobs">
            <Typography
              variant="h3"
              className="p-2 text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center"
            >
              Enter
            </Typography>
          </Link>
        </Button>
      </div>
    </div>
  );
}
