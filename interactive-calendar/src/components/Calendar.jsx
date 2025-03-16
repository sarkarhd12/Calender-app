
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../context/EventContext";
import useEvents from "../hooks/useEvents";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import EventModal from "./EventModal"; 
import EventActions from "./EventActions";

export default function Calendar({ selectedDate }) {
    const { getEventsByDate, updateEvent, deleteEventById, getEventById } = useEvents();
    const { events, addEvent } = useContext(EventContext);
    const [eventTimes, setEventTimes] = useState([]);
    const [draggingStart, setDraggingStart] = useState(null);
    const [draggingEnd, setDraggingEnd] = useState(null);
    const [tempEvent, setTempEvent] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEventActionsOpen, setIsEventActionsOpen] = useState(false); // Track event popup visibility

    // Define time slots from 00:00 to 23:30 (30-minute intervals)
    const timeSlots = Array.from({ length: 48 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? "00" : "30";
        return `${hour}:${minute}`;
    });

    // // Fetch events when selectedDate changes
    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         const events = await getEventsByDate(selectedDate);
    //         console.log("todyas event",events);

    //         // const formattedEvents = events.map((event) => {
    //         //     const start = dayjs(selectedDate).hour(parseInt(event.startTime.split(":")[0])).minute(parseInt(event.startTime.split(":")[1]));
    //         //     const end = dayjs(selectedDate).hour(parseInt(event.endTime.split(":")[0])).minute(parseInt(event.endTime.split(":")[1]));
            
    //         //     return {
    //         //         ...event,
    //         //         startTime: start,
    //         //         endTime: end
    //         //     };
    //         // });

    //         const formattedEvents = events.map((event) => ({
    //             ...event,
    //             startTime: dayjs(selectedDate)
    //                 .hour(parseInt(event.startTime.split(":")[0]))
    //                 .minute(parseInt(event.startTime.split(":")[1])),
    //             endTime: dayjs(selectedDate)
    //                 .hour(parseInt(event.endTime.split(":")[0]))
    //                 .minute(parseInt(event.endTime.split(":")[1])),
    //         }));

    //         if (JSON.stringify(eventTimes) !== JSON.stringify(formattedEvents)) {
    //             setEventTimes(formattedEvents);
    //         }

    //         console.log("formatted events ", formattedEvents);

    //         // setEventTimes(formattedEvents);
    //     };

    //     fetchEvents();
    // }, [selectedDate]);

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getEventsByDate(selectedDate);
    
            const formattedEvents = events.map((event) => {
                const start = dayjs(selectedDate)
                    .hour(parseInt(event.startTime.split(":")[0]))
                    .minute(parseInt(event.startTime.split(":")[1]));
                const end = dayjs(selectedDate)
                    .hour(parseInt(event.endTime.split(":")[0]))
                    .minute(parseInt(event.endTime.split(":")[1]));
    
                return {
                    ...event,
                    startTime: start,
                    endTime: end,
                };
            });
    
            // Prevent setting duplicate events
            if (JSON.stringify(eventTimes) !== JSON.stringify(formattedEvents)) {
                setEventTimes(formattedEvents);
            }
        };
    
        fetchEvents();
    }, [selectedDate]);  // Ensure it only updates when the date changes
    

    // Handle mouse down to start event drag
    const handleMouseDown = (timeIndex) => {
        setDraggingStart(timeIndex);
        setDraggingEnd(timeIndex);
    };

    // Handle mouse move to update drag selection
    const handleMouseMove = (timeIndex) => {
        if (draggingStart !== null) setDraggingEnd(timeIndex);
    };

    // Handle mouse up to finalize event
    const handleMouseUp = () => {
        if (draggingStart !== null && draggingEnd !== null) {
            const selectedStart = dayjs(selectedDate).hour(Math.floor(draggingStart / 2)).minute(draggingStart % 2 === 0 ? 0 : 30);
            const selectedEnd = dayjs(selectedDate).hour(Math.floor(draggingEnd / 2)).minute(draggingEnd % 2 === 0 ? 0 : 30);

            setTempEvent({
                id: uuidv4(),
                title: "", 
                startTime: selectedStart.format("YYYY-MM-DDTHH:mm"),
                endTime: selectedEnd.format("YYYY-MM-DDTHH:mm"),
            });

            setIsModalOpen(true); 
        }
        setDraggingStart(null);
        setDraggingEnd(null);
    };

    // Handle event click for edit/delete
    const handleEventClick = async(event) => {
        const fullEvent = await getEventById(event.id);
        setSelectedEvent(fullEvent);
        console.log(fullEvent);
        setIsEventActionsOpen(true);
    };

    return (
        <div
        style={{
            flex: 1,
            padding: "10px",
            userSelect: "none",
            overflowY: "auto",
            height: "100vh", 
            maxWidth: "100%",
            boxSizing: "border-box",
        }}
    >
        {timeSlots.map((time, index) => {
            const isDragging = draggingStart !== null && index >= draggingStart && index <= draggingEnd;
            const isBooked = eventTimes.some((event) => {
                const slotTime = dayjs(selectedDate).hour(Math.floor(index / 2)).minute(index % 2 === 0 ? 0 : 30);
                return slotTime.isSame(event.startTime) || (slotTime.isAfter(event.startTime) && slotTime.isBefore(event.endTime));
            });
    
            // const bookedEvent = eventTimes.find((event) => {
            //     const slotStart = dayjs(selectedDate).hour(Math.floor(index / 2)).minute(index % 2 === 0 ? 0 : 30);
            //     return slotStart.isSame(event.startTime) || (slotStart.isAfter(event.startTime) && slotStart.isBefore(event.endTime));
            // });

            const bookedEvent = eventTimes.find((event) => {
                const slotStart = dayjs(selectedDate)
                    .hour(Math.floor(index / 2))
                    .minute(index % 2 === 0 ? 0 : 30);
                return slotStart.isSame(event.startTime) || 
                       (slotStart.isAfter(event.startTime) && slotStart.isBefore(event.endTime));
            });
            

           

            return (
                <div
                    key={time}
                    style={{
                        position: "relative",
                        borderBottom: "1px solid #ddd",
                        height: "50px",
                        padding: "5px",
                        background: isBooked ? "lightgray" : isDragging ? "lightblue" : "transparent",
                        cursor: "pointer",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    onMouseDown={() => !isBooked && handleMouseDown(index)}
                    onMouseMove={() => !isBooked && handleMouseMove(index)}
                    onMouseUp={handleMouseUp}
                    onClick={() => bookedEvent && handleEventClick(bookedEvent)}
                >
                    <strong>{time}</strong>
                    {/* {isBooked && bookedEvent && (
                        <div
                            style={{
                                position: "absolute",
                                backgroundColor: "blue",
                                color: "white",
                                padding: "5px",
                                borderRadius: "5px",
                                top: "5px",
                                left: "50px",
                                width: "60%",
                                maxWidth: "180px",
                                fontSize: "0.9rem",
                            }}
                        >
                            Booked: {bookedEvent.startTime.format("HH:mm")} - {bookedEvent.endTime.format("HH:mm")}
                        </div>
                    )} */}
                    {isBooked && bookedEvent && (
    <div
        style={{
            position: "absolute",
            backgroundColor: "blue",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            top: "5px",
            left: "50px",
            width: "60%",
            maxWidth: "180px",
            fontSize: "0.9rem",
        }}
    >
        Booked: {bookedEvent.startTime.format("HH:mm")} - {bookedEvent.endTime.format("HH:mm")}
    </div>
)}

                </div>
            );
        })}
    
        {/* Event Creation Modal */}
        <EventModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            event={tempEvent}
            addEvent={(event) => {
                addEvent(event);
                setIsModalOpen(false);
            }}
        />
    
        {/* Event Edit/Delete Popup */}
        {isEventActionsOpen && selectedEvent && (
            <EventActions
                event={selectedEvent}
                handleClose={() => setIsEventActionsOpen(false)}
                updateEvent={updateEvent}
                deleteEventById={(id) => {
                    deleteEventById(id);
                    setIsEventActionsOpen(false);
                }}
            />
        )}
    </div>
    
    );
}


