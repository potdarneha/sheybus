const express = require("express");
const app = express();
// const cors = require('cors');
const path = require("path");

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 8000;
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

//static files
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
// const path = require('path');
// if(process.env.NODE_ENV === 'production')
// {
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//     });

// }
// app.use(
//     cors({
//         origin:["http://localhost:3000","http://bus-ticket-booking.vercel.app"],
//         crendentials:true,
//     })
// )

app.listen(port, () => console.log(`Node server listening on port ${port}`));
