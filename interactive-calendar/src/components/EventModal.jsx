

// import { useState, useEffect } from "react";
// import {
//     Modal, Box, TextField, Button, MenuItem, Accordion, AccordionSummary,
//     AccordionDetails, Typography, IconButton, ToggleButtonGroup, ToggleButton
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CloseIcon from "@mui/icons-material/Close";
// import dayjs from "dayjs";
// import useEvents from "../hooks/useEvents";


// export default function EventModal({ open, handleClose, event }) {
//     const { createEvent } = useEvents();

//     const [title, setTitle] = useState("");
//     const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
//     const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
//     const [startTime, setStartTime] = useState(dayjs().format("HH:mm"));
//     const [endTime, setEndTime] = useState(dayjs().add(1, "hour").format("HH:mm"));
//     const [venue, setVenue] = useState("");
//     const [attendeesEmails, setAttendeesEmails] = useState("");
//     const [description, setDescription] = useState("");
//     const [recurrenceType, setRecurrenceType] = useState("");
//     const [repeatDays, setRepeatDays] = useState([]);
//     const [skipDays, setSkipDays] = useState([]);
//     const [showMoreOptions, setShowMoreOptions] = useState(false);
//     const [error, setError] = useState(""); // To store error messages

//     useEffect(() => {
//         if (event) {
//             setTitle(event.title || "");
//             setStartDate(event.startTime ? dayjs(event.startTime).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
//             setStartTime(event.startTime ? dayjs(event.startTime).format("HH:mm") : dayjs().format("HH:mm"));
//             setEndTime(event.endTime ? dayjs(event.endTime).format("HH:mm") : dayjs().add(1, "hour").format("HH:mm"));
//             setVenue(event.venue || "");
//             setAttendeesEmails(event.attendeesEmails || "");
//             setDescription(event.description || "");
//             setRecurrenceType(event.recurrenceType || "");
//             setRepeatDays(event.repeatDays || []);
//             setSkipDays(event.skipDays || []);
//             setEndDate(event.endDate ? dayjs(event.endDate).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
//         }
//     }, [event]);

//     // Ensure only one of Repeat Days or Skip Days is selected
//     const handleRepeatDaysChange = (e, newDays) => {
//         if (newDays.length > 0) setSkipDays([]); // Clear skip days when selecting repeat days
//         setRepeatDays(newDays);
//     };

//     const handleSkipDaysChange = (e, newDays) => {
//         if (newDays.length > 0) setRepeatDays([]); // Clear repeat days when selecting skip days
//         setSkipDays(newDays);
//     };

//     const dayMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     // Validation function
//     const validateForm = () => {
//         if (!title.trim()) {
//             setError("Title is required.");
//             return false;
//         }

//         // Ensure start date is before end date
//         if (dayjs(startDate).isAfter(dayjs(endDate))) {
//             setError("Start date cannot be after end date.");
//             return false;
//         }

//         // Ensure start time is before end time
//         if (dayjs(`${startDate}T${startTime}`).isAfter(dayjs(`${startDate}T${endTime}`))) {
//             setError("Start time cannot be after end time.");
//             return false;
//         }

//         // If recurrence type is not 'NONE', end date should be one day after start date
//         if (recurrenceType !== "NONE" && dayjs(endDate).isBefore(dayjs(startDate).add(1, 'day'))) {
//             setError("For recurrence, end date should be at least one day after the start date.");
//             return false;
//         }

//         // if (recurrenceType === "DAILY" && skipDays.length === 0) {
//         //     setError("Skip days must be selected for daily recurrence.");
//         //     return false;
//         // }

//         if ((recurrenceType === "WEEKLY" || recurrenceType === "MONTHLY") && (repeatDays.length === 0 || !endDate)) {
//             setError("Repeat days and end date must be selected for weekly/monthly recurrence.");
//             return false;
//         }

//         setError(""); // Clear error if all validations pass
//         return true;
//     };

//     const handleSave = async () => {
//         if (!validateForm()) return; // Prevent save if validation fails

//         const formattedStartDate = dayjs(`${startDate}T${startTime}`).toISOString();
//         const formattedEndDate = showMoreOptions
//             ? dayjs(`${endDate}T${endTime}`).toISOString()
//             : dayjs(`${startDate}T${endTime}`).toISOString();

//         const meetingDays = repeatDays.map((dayIndex) => dayMapping[dayIndex]).join(", ");
//         const exceptionDays = skipDays.map((dayIndex) => dayMapping[dayIndex]).join(", ");   

//         const newEvent = {
//             title,
//             startDate: formattedStartDate,
//             startTime: formattedStartDate,
//             endDate: formattedEndDate,
//             endTime: formattedEndDate,
//             venue,
//             attendeesEmails,
//             description,
//             recurrenceType: showMoreOptions ? recurrenceType : "",
//             meetingDays: showMoreOptions ? meetingDays : [],
//             exceptionDays: showMoreOptions ? exceptionDays : [],
//         };

//         try {
//             await createEvent(newEvent);
//             handleClose();
//             window.location.reload(); // Refresh the page after submission
//         } catch (error) {
//             console.error("Error creating event:", error);
//             setError("An error occurred while creating the event. Please try again.");
//         }
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box sx={{
//                 position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//                 width: { xs: "90vw", sm: 420, md: 480 }, // Responsive width
//                 minHeight: showMoreOptions ? { xs: 400, sm: 460 } : { xs: 380, sm: 500 },
//                 maxHeight: "90vh", overflowY: "auto", bgcolor: "#f5f5f5", boxShadow: 24, p: { xs: 2, sm: 3 },
//                 borderRadius: "12px", border: "1px solid #ccc",
//             }}>
//                 {/* Header */}
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                     <Typography variant="h6" fontSize="16px" fontWeight="bold">Create Event</Typography>
//                     <IconButton onClick={handleClose} size="small">
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>

//                 {/* Main Fields */}
//                 <TextField size="small" fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 1.5 }} required />
//                 <Box display="flex" gap={1}>
//                     <TextField size="small" type="date" fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} />
//                     <TextField size="small" type="time" fullWidth value={startTime} onChange={(e) => setStartTime(e.target.value)} InputLabelProps={{ shrink: true }} />
//                     <TextField size="small" type="time" fullWidth value={endTime} onChange={(e) => setEndTime(e.target.value)} InputLabelProps={{ shrink: true }} />
//                 </Box>
//                 <TextField size="small" fullWidth label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} sx={{ mt: 1, mb: 1.5 }} />
//                 <TextField size="small" fullWidth label="Attendees Emails" value={attendeesEmails} onChange={(e) => setAttendeesEmails(e.target.value)} sx={{ mb: 1.5 }} />
//                 <TextField size="small" fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 1 }} multiline rows={2} />

//                 {/* Error message */}
//                 {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}

//                 {/* More Options Toggle */}
//                 <Button variant="text" size="small" onClick={() => setShowMoreOptions(!showMoreOptions)}>
//                     {showMoreOptions ? "Hide More Options" : "More Options"}
//                 </Button>

//                 {/* More Options */}
//                 {showMoreOptions && (
//                     <Accordion expanded sx={{ mb: 1, boxShadow: "none", backgroundColor: "#eeeeee", borderRadius: "8px" }}>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography variant="body2">Recurring & Advanced Settings</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                             {/* Recurrence Type */}
//                             <TextField
//                                 size="small"
//                                 select
//                                 fullWidth
//                                 label="Recurrence Type"
//                                 value={recurrenceType}
//                                 onChange={(e) => setRecurrenceType(e.target.value)}
//                             >
//                                 <MenuItem value="DAILY">Daily</MenuItem>
//                                 <MenuItem value="WEEKLY">Weekly</MenuItem>
//                                 <MenuItem value="MONTHLY">Monthly</MenuItem>
//                             </TextField>

//                             <Box sx={{ mt: 1 }}>
//                                 <TextField
//                                     size="small"
//                                     type="date"
//                                     fullWidth
//                                     label="End Date"
//                                     value={endDate}
//                                     onChange={(e) => setEndDate(e.target.value)}
//                                     InputLabelProps={{ shrink: true }}
//                                     disabled={recurrenceType === "NONE"}
//                                 />
//                             </Box>

//                             {/* Repeat Days */}
//                             {recurrenceType === "WEEKLY" || recurrenceType === "MONTHLY" ? (
//                                 <>
//                                     <Typography variant="body2">Repeat Days:</Typography>
//                                     <ToggleButtonGroup value={repeatDays} onChange={handleRepeatDaysChange} size="small">
//                                         {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//                                             <ToggleButton
//                                                 key={index}
//                                                 value={index}
//                                                 sx={{
//                                                     "&.Mui-selected": { bgcolor: "blue", color: "white" },
//                                                 }}
//                                             >
//                                                 {day}
//                                             </ToggleButton>
//                                         ))}
//                                     </ToggleButtonGroup>
//                                 </>
//                             ) : null}

//                             {/* Skip Days */}
//                             {recurrenceType === "DAILY" ? (
//                                 <>
//                                     <Typography variant="body2" sx={{ mt: 1 }}>Skip Days:</Typography>
//                                     <ToggleButtonGroup value={skipDays} onChange={handleSkipDaysChange} size="small">
//                                         {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//                                             <ToggleButton
//                                                 key={index}
//                                                 value={index}
//                                                 sx={{
//                                                     "&.Mui-selected": { bgcolor: "red", color: "white" },
//                                                 }}
//                                             >
//                                                 {day}
//                                             </ToggleButton>
//                                         ))}
//                                     </ToggleButtonGroup>
//                                 </>
//                             ) : null}
//                         </AccordionDetails>
//                     </Accordion>
//                 )}

//                 {/* Save Button */}
//                 <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
//                     <Button onClick={handleClose} variant="outlined" size="small" sx={{ width: "100%" }}>
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} variant="contained" size="small" sx={{ width: "100%" }}>
//                         Save
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// }





// import { useState, useEffect } from "react";
// import {
//     Modal, Box, TextField, Button, MenuItem, Accordion, AccordionSummary,
//     AccordionDetails, Typography, IconButton, ToggleButtonGroup, ToggleButton
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CloseIcon from "@mui/icons-material/Close";
// import dayjs from "dayjs";
// import useEvents from "../hooks/useEvents";


// export default function EventModal({ open, handleClose, event }) {
//     const { createEvent } = useEvents();

//     const [title, setTitle] = useState("");
//     const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
//     const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
//     const [startTime, setStartTime] = useState(dayjs().format("HH:mm"));
//     const [endTime, setEndTime] = useState(dayjs().add(1, "hour").format("HH:mm"));
//     const [venue, setVenue] = useState("");
//     const [attendeesEmails, setAttendeesEmails] = useState("");
//     const [description, setDescription] = useState("");
//     const [recurrenceType, setRecurrenceType] = useState("");
//     const [repeatDays, setRepeatDays] = useState([]);
//     const [skipDays, setSkipDays] = useState([]);
//     const [showMoreOptions, setShowMoreOptions] = useState(false);
//     const [error, setError] = useState(""); // To store error messages

//     useEffect(() => {
//         if (event) {
//             setTitle(event.title || "");
//             setStartDate(event.startTime ? dayjs(event.startTime).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
//             setStartTime(event.startTime ? dayjs(event.startTime).format("HH:mm") : dayjs().format("HH:mm"));
//             setEndTime(event.endTime ? dayjs(event.endTime).format("HH:mm") : dayjs().add(1, "hour").format("HH:mm"));
//             setVenue(event.venue || "");
//             setAttendeesEmails(event.attendeesEmails || "");
//             setDescription(event.description || "");
//             setRecurrenceType(event.recurrenceType || "");
//             setRepeatDays(event.repeatDays || []);
//             setSkipDays(event.skipDays || []);
//             setEndDate(event.endDate ? dayjs(event.endDate).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
//         }
//     }, [event]);

//     // Ensure only one of Repeat Days or Skip Days is selected
//     const handleRepeatDaysChange = (e, newDays) => {
//         if (newDays.length > 0) setSkipDays([]); // Clear skip days when selecting repeat days
//         setRepeatDays(newDays);
//     };

//     const handleSkipDaysChange = (e, newDays) => {
//         if (newDays.length > 0) setRepeatDays([]); // Clear repeat days when selecting skip days
//         setSkipDays(newDays);
//     };

//     const dayMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     // Validation function
//     const validateForm = () => {
//         if (!title.trim()) {
//             setError("Title is required.");
//             return false;
//         }

//         // Ensure start date is before end date
//         if (dayjs(startDate).isAfter(dayjs(endDate))) {
//             setError("Start date cannot be after end date.");
//             return false;
//         }

//         // Ensure start time is before end time
//         if (dayjs(`${startDate}T${startTime}`).isAfter(dayjs(`${startDate}T${endTime}`))) {
//             setError("Start time cannot be after end time.");
//             return false;
//         }

//         // If recurrence type is not 'NONE', end date should be one day after start date
//         if (recurrenceType && recurrenceType !== "NONE" && dayjs(endDate).isBefore(dayjs(startDate).add(1, 'day'))) {
//             setError("For recurrence, end date should be at least one day after the start date.");
//             return false;
//         }

//         // if (recurrenceType === "DAILY" && skipDays.length === 0) {
//         //     setError("Skip days must be selected for daily recurrence.");
//         //     return false;
//         // }

//         if ((recurrenceType === "WEEKLY" || recurrenceType === "MONTHLY") && (repeatDays.length === 0 || !endDate)) {
//             setError("Repeat days and end date must be selected for weekly/monthly recurrence.");
//             return false;
//         }

//         setError(""); // Clear error if all validations pass
//         return true;
//     };

//     const handleSave = async () => {
//         const finalRecurrenceType = recurrenceType || "NONE"; // Default to "NONE" if not selected

//         console.log(recurrenceType);
    
//         if (!validateForm()) return; // Prevent save if validation fails

//                 if (finalRecurrenceType === "NONE") {
//             setEndDate(startDate);
//         }
    
//         const formattedStartDate = dayjs(`${startDate}T${startTime}`).toISOString();
//         const formattedEndDate = showMoreOptions
//             ? dayjs(`${endDate}T${endTime}`).toISOString()
//             : dayjs(`${startDate}T${endTime}`).toISOString();
    
//             const meetingDays = showMoreOptions ? repeatDays.map((dayIndex) => dayMapping[dayIndex]).join(", ") : "";
//             const exceptionDays = showMoreOptions ? skipDays.map((dayIndex) => dayMapping[dayIndex]).join(", ") : "";
            
//             console.log("formattedStartDate",formattedStartDate,formattedEndDate);
//             console.log(formattedEndDate);
    
//             const newEvent = {
//                 title,
//                 startDate: formattedStartDate,
//                 startTime: formattedStartDate,
//                 endDate: formattedEndDate,
//                 endTime: formattedEndDate,
//                 venue,
//                 attendeesEmails,
//                 description,
//                 recurrenceType: finalRecurrenceType,
//                 meetingDays, // Now a string
//                 exceptionDays, // Now a string
//             };
            
    
//         try {
//             await createEvent(newEvent);
//             handleClose();
//             window.location.reload(); // Refresh the page after submission
//         } catch (error) {
//             console.error("Error creating event:", error);
//             setError("An error occurred while creating the event. Please try again.");
//         }
//     };
    

    

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box sx={{
//                 position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//                 width: { xs: "90vw", sm: 420, md: 480 }, // Responsive width
//                 minHeight: showMoreOptions ? { xs: 400, sm: 460 } : { xs: 380, sm: 500 },
//                 maxHeight: "90vh", overflowY: "auto", bgcolor: "#f5f5f5", boxShadow: 24, p: { xs: 2, sm: 3 },
//                 borderRadius: "12px", border: "1px solid #ccc",
//             }}>
//                 {/* Header */}
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                     <Typography variant="h6" fontSize="16px" fontWeight="bold">Create Event</Typography>
//                     <IconButton onClick={handleClose} size="small">
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>

//                 {/* Main Fields */}
//                 <TextField size="small" fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 1.5 }} required />
//                 <Box display="flex" gap={1}>
//                     <TextField size="small" type="date" fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} />
//                     <TextField size="small" type="time" fullWidth value={startTime} onChange={(e) => setStartTime(e.target.value)} InputLabelProps={{ shrink: true }} />
//                     <TextField size="small" type="time" fullWidth value={endTime} onChange={(e) => setEndTime(e.target.value)} InputLabelProps={{ shrink: true }} />
//                 </Box>
//                 <TextField size="small" fullWidth label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} sx={{ mt: 1, mb: 1.5 }} />
//                 <TextField size="small" fullWidth label="Attendees Emails" value={attendeesEmails} onChange={(e) => setAttendeesEmails(e.target.value)} sx={{ mb: 1.5 }} />
//                 <TextField size="small" fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 1 }} multiline rows={2} />

//                 {/* Error message */}
//                 {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}

//                 {/* More Options Toggle */}
//                 <Button variant="text" size="small" onClick={() => setShowMoreOptions(!showMoreOptions)}>
//                     {showMoreOptions ? "Hide More Options" : "More Options"}
//                 </Button>

//                 {/* More Options */}
//                 {showMoreOptions && (
//                     <Accordion expanded sx={{ mb: 1, boxShadow: "none", backgroundColor: "#eeeeee", borderRadius: "8px" }}>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography variant="body2">Recurring & Advanced Settings</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                             {/* Recurrence Type */}
//                             <TextField
//                                 size="small"
//                                 select
//                                 fullWidth
//                                 label="Recurrence Type"
//                                 value={recurrenceType}
//                                 onChange={(e) => setRecurrenceType(e.target.value)}
//                             >
//                                 <MenuItem value="DAILY">Daily</MenuItem>
//                                 <MenuItem value="WEEKLY">Weekly</MenuItem>
//                                 <MenuItem value="MONTHLY">Monthly</MenuItem>
//                             </TextField>

//                             <Box sx={{ mt: 1 }}>
//                                 <TextField
//                                     size="small"
//                                     type="date"
//                                     fullWidth
//                                     label="End Date"
//                                     value={endDate}
//                                     onChange={(e) => setEndDate(e.target.value)}
//                                     InputLabelProps={{ shrink: true }}
//                                     disabled={recurrenceType === "NONE"}
//                                 />
//                             </Box>

//                             {/* Repeat Days */}
//                             {recurrenceType === "WEEKLY" || recurrenceType === "MONTHLY" ? (
//                                 <>
//                                     <Typography variant="body2">Repeat Days:</Typography>
//                                     <ToggleButtonGroup value={repeatDays} onChange={handleRepeatDaysChange} size="small">
//                                         {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//                                             <ToggleButton
//                                                 key={index}
//                                                 value={index}
//                                                 sx={{
//                                                     "&.Mui-selected": { bgcolor: "blue", color: "white" },
//                                                 }}
//                                             >
//                                                 {day}
//                                             </ToggleButton>
//                                         ))}
//                                     </ToggleButtonGroup>
//                                 </>
//                             ) : null}

//                             {/* Skip Days */}
//                             {recurrenceType === "DAILY" ? (
//                                 <>
//                                     <Typography variant="body2" sx={{ mt: 1 }}>Skip Days:</Typography>
//                                     <ToggleButtonGroup value={skipDays} onChange={handleSkipDaysChange} size="small">
//                                         {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//                                             <ToggleButton
//                                                 key={index}
//                                                 value={index}
//                                                 sx={{
//                                                     "&.Mui-selected": { bgcolor: "red", color: "white" },
//                                                 }}
//                                             >
//                                                 {day}
//                                             </ToggleButton>
//                                         ))}
//                                     </ToggleButtonGroup>
//                                 </>
//                             ) : null}
//                         </AccordionDetails>
//                     </Accordion>
//                 )}

//                 {/* Save Button */}
//                 <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
//                     <Button onClick={handleClose} variant="outlined" size="small" sx={{ width: "100%" }}>
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} variant="contained" size="small" sx={{ width: "100%" }}>
//                         Save
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// }



import { useState, useEffect } from "react";
import {
    Modal, Box, TextField, Button, MenuItem, Accordion, AccordionSummary,
    AccordionDetails, Typography, IconButton, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import useEvents from "../hooks/useEvents";




export default function EventModal({ open, handleClose, event }) {
    const { createEvent } = useEvents();

    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [startTime, setStartTime] = useState(dayjs().format("HH:mm"));
    const [endTime, setEndTime] = useState(dayjs().add(1, "hour").format("HH:mm"));
    const [venue, setVenue] = useState("");
    const [attendeesEmails, setAttendeesEmails] = useState("");
    const [description, setDescription] = useState("");
    const [recurrenceType, setRecurrenceType] = useState("");
    const [repeatDays, setRepeatDays] = useState([]);
    const [skipDays, setSkipDays] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [error, setError] = useState(""); // To store error messages

    useEffect(() => {
        if (event) {
            setTitle(event.title || "");
            setStartDate(event.startTime ? dayjs(event.startTime).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
            setStartTime(event.startTime ? dayjs(event.startTime).format("HH:mm") : dayjs().format("HH:mm"));
            setEndTime(event.endTime ? dayjs(event.endTime).format("HH:mm") : dayjs().add(1, "hour").format("HH:mm"));
            setVenue(event.venue || "");
            setAttendeesEmails(event.attendeesEmails || "");
            setDescription(event.description || "");
            setRecurrenceType(event.recurrenceType || "");
            setRepeatDays(event.repeatDays || []);
            setSkipDays(event.skipDays || []);
            setEndDate(event.endDate ? dayjs(event.endDate).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
        }
    }, [event]);

    // Ensure only one of Repeat Days or Skip Days is selected
    const handleRepeatDaysChange = (e, newDays) => {
        if (newDays.length > 0) setSkipDays([]); // Clear skip days when selecting repeat days
        setRepeatDays(newDays);
    };

    const handleSkipDaysChange = (e, newDays) => {
        if (newDays.length > 0) setRepeatDays([]); // Clear repeat days when selecting skip days
        setSkipDays(newDays);
    };

    const dayMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Validation function
    const validateForm = () => {
        if (!title.trim()) {
            setError("Title is required.");
            return false;
        }

        // Ensure start date is before end date
        if (dayjs(startDate).isAfter(dayjs(endDate))) {
            setError("Start date cannot be after end date.");
            return false;
        }

        // Ensure start time is before end time
        if (dayjs(`${startDate}T${startTime}`).isAfter(dayjs(`${startDate}T${endTime}`))) {
            setError("Start time cannot be after end time.");
            return false;
        }

        // If recurrence type is not 'NONE', end date should be one day after start date
        if (recurrenceType && recurrenceType !== "NONE" && dayjs(endDate).isBefore(dayjs(startDate).add(1, 'day'))) {
            setError("For recurrence, end date should be at least one day after the start date.");
            return false;
        }

        // if (recurrenceType === "DAILY" && skipDays.length === 0) {
        //     setError("Skip days must be selected for daily recurrence.");
        //     return false;
        // }

        if ((recurrenceType === "WEEKLY" || recurrenceType === "MONTHLY") && (repeatDays.length === 0 || !endDate)) {
            setError("Repeat days and end date must be selected for weekly/monthly recurrence.");
            return false;
        }

        setError(""); // Clear error if all validations pass
        return true;
    };

    const handleSave = async () => {
        const finalRecurrenceType = recurrenceType || "NONE"; // Default to "NONE" if not selected
    
        if (!validateForm()) return; // Prevent save if validation fails
    
        // Ensure endDate is properly set
        if (finalRecurrenceType === "NONE") {
            setEndDate(startDate);
        }
    
        // Convert time with local timezone offset before formatting
        const formattedStartDate = dayjs(`${startDate}T${startTime}`).local().format();
        const formattedEndDate = showMoreOptions
            ? dayjs(`${endDate}T${endTime}`).local().format()
            : dayjs(`${startDate}T${endTime}`).local().format();
    
        console.log("formattedStartDate:", formattedStartDate);
        console.log("formattedEndDate:", formattedEndDate);
    
        const meetingDays = showMoreOptions ? repeatDays.map((dayIndex) => dayMapping[dayIndex]).join(", ") : "";
        const exceptionDays = showMoreOptions ? skipDays.map((dayIndex) => dayMapping[dayIndex]).join(", ") : "";
    
        const newEvent = {
            title,
            startDate: formattedStartDate,
            startTime: formattedStartDate,
            endDate: formattedEndDate,
            endTime: formattedEndDate,
            venue,
            attendeesEmails,
            description,
            recurrenceType: finalRecurrenceType,
            meetingDays, // Now a string
            exceptionDays, // Now a string
        };
    
        try {
            await createEvent(newEvent);
            handleClose();
            window.location.reload(); // Refresh the page after submission
        } catch (error) {
            console.error("Error creating event:", error);
            setError("An error occurred while creating the event. Please try again.");
        }
    };
    

 

    

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: { xs: "90vw", sm: 420, md: 480 }, // Responsive width
                minHeight: showMoreOptions ? { xs: 400, sm: 460 } : { xs: 380, sm: 500 },
                maxHeight: "90vh", overflowY: "auto", bgcolor: "#f5f5f5", boxShadow: 24, p: { xs: 2, sm: 3 },
                borderRadius: "12px", border: "1px solid #ccc",
            }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontSize="16px" fontWeight="bold">Create Event</Typography>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Main Fields */}
                <TextField size="small" fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 1.5 }} required />
                <Box display="flex" gap={1}>
                    <TextField size="small" type="date" fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ minWidth: 140 }} />
                    <TextField size="small" type="time" fullWidth value={startTime} onChange={(e) => setStartTime(e.target.value)} InputLabelProps={{ shrink: true }} />
                    <TextField size="small" type="time" fullWidth value={endTime} onChange={(e) => setEndTime(e.target.value)} InputLabelProps={{ shrink: true }} />
                </Box>
                <TextField size="small" fullWidth label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} sx={{ mt: 1, mb: 1.5 }} />
                <TextField size="small" fullWidth label="Attendees Emails" value={attendeesEmails} onChange={(e) => setAttendeesEmails(e.target.value)} sx={{ mb: 1.5 }} />
                <TextField size="small" fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 1 }} multiline rows={2} />

                {/* Error message */}
                {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}

                {/* More Options Toggle */}
                <Button variant="text" size="small" onClick={() => setShowMoreOptions(!showMoreOptions)}>
                    {showMoreOptions ? "Hide More Options" : "More Options"}
                </Button>

                {/* More Options */}
                {showMoreOptions && (
                    <Accordion expanded sx={{ mb: 1, boxShadow: "none", backgroundColor: "#eeeeee", borderRadius: "8px" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body2">Recurring & Advanced Settings</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {/* Recurrence Type */}
                            <TextField
                                size="small"
                                select
                                fullWidth
                                label="Recurrence Type"
                                value={recurrenceType}
                                onChange={(e) => setRecurrenceType(e.target.value)}
                            >
                                <MenuItem value="DAILY">Daily</MenuItem>
                                <MenuItem value="WEEKLY">Weekly</MenuItem>
                                <MenuItem value="MONTHLY">Monthly</MenuItem>
                            </TextField>

                            <Box sx={{ mt: 1 }}>
                                <TextField
                                    size="small"
                                    type="date"
                                    fullWidth
                                    label="End Date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    disabled={recurrenceType === "NONE"}
                                />
                            </Box>

                            {/* Repeat Days */}
                            {recurrenceType === "WEEKLY" || recurrenceType === "MONTHLY" ? (
                                <>
                                    <Typography variant="body2">Repeat Days:</Typography>
                                    <ToggleButtonGroup value={repeatDays} onChange={handleRepeatDaysChange} size="small">
                                        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                            <ToggleButton
                                                key={index}
                                                value={index}
                                                sx={{
                                                    "&.Mui-selected": { bgcolor: "blue", color: "white" },
                                                }}
                                            >
                                                {day}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </>
                            ) : null}

                            {/* Skip Days */}
                            {recurrenceType === "DAILY" ? (
                                <>
                                    <Typography variant="body2" sx={{ mt: 1 }}>Skip Days:</Typography>
                                    <ToggleButtonGroup value={skipDays} onChange={handleSkipDaysChange} size="small">
                                        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                            <ToggleButton
                                                key={index}
                                                value={index}
                                                sx={{
                                                    "&.Mui-selected": { bgcolor: "red", color: "white" },
                                                }}
                                            >
                                                {day}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </>
                            ) : null}
                        </AccordionDetails>
                    </Accordion>
                )}

                {/* Save Button */}
                <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                    <Button onClick={handleClose} variant="outlined" size="small" sx={{ width: "100%" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" size="small" sx={{ width: "100%" }}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}


