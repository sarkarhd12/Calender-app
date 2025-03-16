

import { Button, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function Toolbar({ selectedDate, onNavigate }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ddd" }}>
            <div>
                <Button onClick={() => onNavigate(-1)}>◀ Previous</Button>
                <Button onClick={() => onNavigate(0)}>Today</Button>
                <Button onClick={() => onNavigate(1)}>Next ▶</Button>
            </div>
            <Typography variant="h6">{dayjs(selectedDate).format("dddd, MMM D, YYYY")}</Typography>
        </div>
    );
}
