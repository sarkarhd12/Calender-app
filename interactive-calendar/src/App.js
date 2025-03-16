// import React, { useState } from "react";
// import { Container, Button, Box } from "@mui/material";
// import Sidebar from "./components/Sidebar";
// import MainCalendar from "./components/MainCalendar";
// import EventFormDialog from "./components/EventFormDialog";

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);

//   const addEvent = (newEvent) => {
//     setEvents([...events, newEvent]);
//   };

//   return (
//     <Container>
//       <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
//         Create Event
//       </Button>

//       {/* Replace Grid with CSS Flexbox using Box */}
//       <Box display="flex" gap={2} mt={2}>
//         <Box flex="1">
//           <Sidebar events={events} />
//         </Box>

//         <Box flex="3">
//           <MainCalendar events={events} addEvent={addEvent} />
//         </Box>
//       </Box>

//       <EventFormDialog open={openDialog} setOpen={setOpenDialog} addEvent={addEvent} />
//     </Container>
//   );
// };

// export default App;


import { EventProvider } from "./context/EventContext";
import Home from "./pages/Home";

export default function App() {
    return (
        <EventProvider>
            <Home />
        </EventProvider>
    );
}
