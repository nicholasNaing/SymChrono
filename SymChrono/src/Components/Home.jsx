import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div>
      <div>Hello User</div>

      <motion.div
        animate={{ fontSize: "20px", color: "#ff2994" }}
        className="border-2 border-slate-200 p-3 shadow-slate-100 shadow-inbox"
      >
        <Link to="/calander">This is the link to CALENDAR</Link>
      </motion.div>
    </div>
  );
}

export default Home;
