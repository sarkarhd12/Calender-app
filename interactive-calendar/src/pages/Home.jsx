
// import { useState } from "react";
// import { Box, useMediaQuery } from "@mui/material";
// import Sidebar from "../components/Sidebar";
// import Toolbar from "../components/Toolbar";
// import Calendar from "../components/Calendar";
// import EventModal from "../components/EventModal";
// import dayjs from "dayjs";

// export default function Home() {
//     const [selectedDate, setSelectedDate] = useState(dayjs());
//     const [showModal, setShowModal] = useState(false);
//     const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen

//     const handleNavigate = (direction) => {
//         if (direction === 0) setSelectedDate(dayjs());  // Today
//         else setSelectedDate(selectedDate.add(direction, "day"));
//     };

//     return (
//         <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//             <Toolbar selectedDate={selectedDate} onNavigate={handleNavigate} />

//             <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
//                 {/* Sidebar with Smooth Scrolling & Responsive Width */}
//                 <Box
//                     sx={{
//                         width: isMobile ? "60vw" : 300, // Reduce width on mobile
//                         minWidth: 280,
//                         maxWidth: 350,
//                         borderRight: "1px solid #ccc",
//                         overflowY: "auto",
//                         paddingBottom: "20px",
//                         scrollbarWidth: "thin",
//                         '&::-webkit-scrollbar': {
//                             width: "6px",
//                         },
//                         '&::-webkit-scrollbar-thumb': {
//                             backgroundColor: "#aaa",
//                             borderRadius: "4px",
//                         },
//                     }}
//                 >
//                     <Sidebar 
//                         selectedDate={selectedDate} 
//                         onDateChange={setSelectedDate} 
//                         onCreateEvent={() => setShowModal(true)} 
//                     />
//                 </Box>

//                 {/* Calendar Area */}
//                 <Box sx={{ flex: 1, overflowX: "auto" }}>
//                     <Calendar selectedDate={selectedDate} />
//                 </Box>
//             </Box>

//             {showModal && <EventModal selectedDate={selectedDate} close={() => setShowModal(false)} />}
//         </Box>
//     );
// }


import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Calendar from "../components/Calendar";
import EventModal from "../components/EventModal";
import dayjs from "dayjs";

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [showModal, setShowModal] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen
    const isLargeScreen = useMediaQuery("(min-width: 1200px)"); // Detect large screens

    const handleNavigate = (direction) => {
        if (direction === 0) setSelectedDate(dayjs()); // Today
        else setSelectedDate(selectedDate.add(direction, "day"));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Toolbar selectedDate={selectedDate} onNavigate={handleNavigate} />

            <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
                {/* Sidebar with Smooth Scrolling & Responsive Width */}
                <Box
    sx={{
        width: isMobile ? "35vw" : "22%", // Adjust width for mobile and big screens
        minWidth: isMobile ? "35vw" : 280, // Ensure a minimum width
        maxWidth: isMobile ? "35vw" : 350, // Adjust max width
        borderRight: "1px solid #ccc",
        overflowY: "auto",
        paddingBottom: "20px",
        scrollbarWidth: "thin",
        '&::-webkit-scrollbar': {
            width: "6px",
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: "#aaa",
            borderRadius: "4px",
        },
    }}
>

                    <Sidebar
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        onCreateEvent={() => setShowModal(true)}
                    />
                </Box>

                {/* Calendar Area */}
                <Box sx={{ flex: 1, overflowX: "auto" }}>
                    <Calendar selectedDate={selectedDate} />
                </Box>
            </Box>

            {showModal && <EventModal selectedDate={selectedDate} close={() => setShowModal(false)} />}
        </Box>
    );
}
