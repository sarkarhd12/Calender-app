


// import React, { useState } from "react";
// import dayjs from "dayjs";
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

// export default function EventActions({ event, handleClose, updateEvent, deleteEventById }) {

//     const extractTime = (dateTime) => dateTime ? dayjs(dateTime).format("HH:mm") : "";
//     const [title, setTitle] = useState(event?.title || "");
//     const [description, setDescription] = useState(event?.description || "");
//     const [venue, setVenue] = useState(event?.venue || "");
//     const [attendanceEmail, setAttendanceEmail] = useState(event?.attendanceEmail || "");
//     const [startTime, setStartTime] = useState(extractTime(event?.startTime));
//     const [endTime, setEndTime] = useState(extractTime(event?.endTime));

//     console.log("the event is here",event.startDate);


//     const handleSave = () => {

//         const updatedEvent = {
//             title,
//             description,
//             venue,
//             attendanceEmail,
//             startTime: startTime ? `2025-03-18T${startTime}:00Z` : null,
//             endTime: endTime ? `2025-03-18T${endTime}:00Z` : null,
//         };

//         console.log("Sending updated event:", updatedEvent);
//         updateEvent(event.id, updatedEvent);
//         handleClose();

//     console.log("updateEvent event is happen", updateEvent);
//     };

//     return (
//         <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
//             <DialogTitle>Edit Event</DialogTitle>
//             <DialogContent>
//                 <TextField 
//                     fullWidth label="Title" variant="outlined" 
//                     value={title} onChange={(e) => setTitle(e.target.value)} margin="dense"
//                 />
//                 <TextField 
//                     fullWidth label="Description" variant="outlined" 
//                     value={description} onChange={(e) => setDescription(e.target.value)} margin="dense"
//                     multiline rows={2}
//                 />
//                 <TextField 
//                     fullWidth label="Venue" variant="outlined" 
//                     value={venue} onChange={(e) => setVenue(e.target.value)} margin="dense"
//                 />
//                 <TextField 
//                     fullWidth label="Attendance Email" variant="outlined" 
//                     value={attendanceEmail} onChange={(e) => setAttendanceEmail(e.target.value)} margin="dense"
//                 />
//                 <TextField 
//                     fullWidth label="Start Time" type="time" 
//                     value={startTime} onChange={(e) => setStartTime(e.target.value)} margin="dense"
//                     InputLabelProps={{ shrink: true }}
//                 />
//                 <TextField 
//                     fullWidth label="End Time" type="time" 
//                     value={endTime} onChange={(e) => setEndTime(e.target.value)} margin="dense"
//                     InputLabelProps={{ shrink: true }}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
//                 <Button onClick={() => deleteEventById(event.id)} color="error" variant="contained">Delete</Button>
//                 <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
//             </DialogActions>
//         </Dialog>
//     );
// }

import React, { useState } from "react";
import dayjs from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export default function EventActions({ event, handleClose, updateEvent, deleteEventById }) {
    
    const extractTime = (dateTime) => dateTime ? dayjs(dateTime).format("HH:mm") : "";

    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [venue, setVenue] = useState(event?.venue || "");
    const [attendanceEmail, setAttendanceEmail] = useState(event?.attendanceEmail || "");
    const [startTime, setStartTime] = useState(extractTime(event?.startTime));
    const [endTime, setEndTime] = useState(extractTime(event?.endTime));

    // Keep the original start and end date, fallback to current date if not available
    const startDate = event?.startTime ? dayjs(event.startTime).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
    const endDate = event?.endTime ? dayjs(event.endTime).format("YYYY-MM-DD") : startDate; 
    const handleSave = () => {
        const startDateTime = dayjs(`${startDate}T${startTime}`).toISOString(); // Convert to ISO 8601 with timezone
        const endDateTime = dayjs(`${endDate}T${endTime}`).toISOString();
    
        const updatedEvent = {
            title,
            description,
            venue,
            attendanceEmail,
            startTime: startTime ? startDateTime : null,
            endTime: endTime ? endDateTime : null,
        };
    
        console.log("Sending updated event:", updatedEvent);
        updateEvent(event.id, updatedEvent);
        handleClose();
    };
    

    return (
        <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
                <TextField 
                    fullWidth label="Title" variant="outlined" 
                    value={title} onChange={(e) => setTitle(e.target.value)} margin="dense"
                />
                <TextField 
                    fullWidth label="Description" variant="outlined" 
                    value={description} onChange={(e) => setDescription(e.target.value)} margin="dense"
                    multiline rows={2}
                />
                <TextField 
                    fullWidth label="Venue" variant="outlined" 
                    value={venue} onChange={(e) => setVenue(e.target.value)} margin="dense"
                />
                <TextField 
                    fullWidth label="Attendance Email" variant="outlined" 
                    value={attendanceEmail} onChange={(e) => setAttendanceEmail(e.target.value)} margin="dense"
                />
                <TextField 
                    fullWidth label="Start Time" type="time" 
                    value={startTime} onChange={(e) => setStartTime(e.target.value)} margin="dense"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField 
                    fullWidth label="End Time" type="time" 
                    value={endTime} onChange={(e) => setEndTime(e.target.value)} margin="dense"
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
                <Button onClick={() => deleteEventById(event.id)} color="error" variant="contained">Delete</Button>
                <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
