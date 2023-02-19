import { Typography, Button } from "@mui/material";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "ease" }}
      className="h-screen bg-contain bg-no-repeat py-72"
      style={{ background: "url('/img/tokyo.jpg')" }}
    >
      <div className="w-full z-0 inline-block fixed md:top-[370px] md:left-[450px]">
        <div className=" h-screen bg-white md:-rotate-45 transform origin-bottom-left opacity-90 "></div>
      </div>
      <div className="flex flex-col justify-center items-center pb-12">
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
    </motion.div>
  );
}
