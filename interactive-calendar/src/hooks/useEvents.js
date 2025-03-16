import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc); // Enable UTC support
dayjs.extend(timezone);
 
// const API_BASE_URL = "http://localhost:8080/events";

const API_BASE_URL ="http://calendar-apis-env.eba-exxer2js.us-east-1.elasticbeanstalk.com/"

export default function useEvents() {
    const [events, setEvents] = useState([]);
    const [eventTimes, setEventTimes] = useState([]);
    const [eventMetadata, setEventMetadata] = useState([]);

    

    //Fetch all metadata
    useEffect(() => {
        // axios.get(`${API_BASE_URL}`)
        //     .then(res => setEvents(res.data))
        //     .catch(err => console.error("Error fetching events:", err));

        fetchEvents();
    }, []);

    //fetch all the eventsmetadata
    const fetchEvents = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/getAll-metaData`); // Verify the correct URL
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
        //   console.log("Fetched event metadata:", data);
          setEventMetadata(data);
        } catch (error) {
          console.error("Error fetching events:", error.message);
        }
      };
      
      

    // console.log("setEventMetadata",setEventMetadata);



    //Get event metadata by id
    const getEventMetadataById = async (id) => {
        try {
            console.log(id);
            const response = await axios.get(`${API_BASE_URL}/get-metadata/id/${id}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(`Error fetching metadata for event ID ${id}:`, error);
            return null;
        }
    };

    // Fetch events by date (for calendar booking)
        const getEventsByDate = async (date) => {
            try {
                console.log("Original Date:", date);
        
                // Format date for API request
                const formattedDate = dayjs(date).format("YYYY-MM-DD");
                console.log("Formatted Date:", formattedDate);
        
                const url = `http://localhost:8080/events/by-date/times?date=${formattedDate}`;
                // console.log("Fetching events from:", url);
        
                const response = await axios.get(url);

                console.log("response",response)
        
                // Convert event times from UTC to local time
                const events = response.data.map(event => ({
                    id: event.id,
                    startTime: dayjs.utc(event.startTime).local().format("HH:mm"),
                    endTime: dayjs.utc(event.endTime).local().format("HH:mm"),
                }));
        
                 console.log("Extracted Times:", events);
                setEventTimes(events); // Store extracted times in state
                return events;
            } catch (error) {
                console.error("Error fetching events by date:", error);
                return [];
            }
        };
        
        
        
        


    // Function to create a new eventmetadata
    const createEvent = async (newEvent) => {
        try {
            console.log("newEvent", newEvent);
            const response = await axios.post(`${API_BASE_URL}/create-metadata`, newEvent, {
                headers: { "Content-Type": "application/json" }
            });
            console.log("response",response.data)
       
            setEvents([...events, response.data]); // Add new event to state
            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    // Function to get an event by ID
    const getEventById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getEventById/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching event with ID ${id}:`, error);
            return null;
        }
    };

    // Function to update an event by ID
    const updateEvent = async (id, updatedEvent) => {
        try {
            console.log("id",id, "updatedevent", updateEvent)
            const response = await axios.put(`${API_BASE_URL}/updateEvent/${id}`, updatedEvent, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);

            // Update the local state with the updated event
            setEvents(events.map(event => event.id === id ? response.data : event));
            
        } catch (error) {
            console.error(`Error updating event with ID ${id}:`, error);
        }
    };

    const deleteEventById = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/deleteEvent/${id}`);
            console.log(`Event with ID ${id} deleted successfully`);

            // Remove the deleted event from the local state
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error(`Error deleting event with ID ${id}:`, error);
        }
    };

        // Update Event Metadata
        const updateEventMetadata = async (id, updatedMetadata) => {
            try {
                const response = await axios.put(`${API_BASE_URL}/update-metadata/${id}`, updatedMetadata);
                console.log("update",response.data);
                setEvents((prevEvents) =>
                    prevEvents.map((event) => (event.id === id ? response.data : event))
                );
                fetchEvents();
                return response.data;
            } catch (err) {
                console.error("Error updating event metadata:", err);
                throw err;
            }
        };


        const deleteEventMetadata = async (id) => {
            try {
                await axios.delete(`${API_BASE_URL}/delete-metadata/${id}`);
                console.log(`Event with ID ${id} deleted successfully.`);
                
                // 🔄 Fetch updated events from the backend after deletion
                fetchEvents();
            } catch (err) {
                console.error("Error deleting event metadata:", err);
            }
        };
        
    

    return { events,eventMetadata, eventTimes, getEventsByDate, createEvent, getEventById, updateEvent, deleteEventById, getEventMetadataById, updateEventMetadata, deleteEventMetadata , fetchEvents };
}


