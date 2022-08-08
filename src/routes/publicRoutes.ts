import {Router} from "express";
// import {createOneBooking, createNewBooking} from "../mysql/controllers/booking.controllers";
// import {findAllPlace} from "../mysql/controllers/place.controllers";
import {createOneBooking, createNewBooking} from "../mongodb/controllers/booking.controllers";
import {findAllPlace} from "../mongodb/controllers/place.controllers";

const router: Router = Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

router.get("/allplace", findAllPlace);

router.post("/createbooking", createOneBooking);

router.post("/savebooking", createNewBooking);

export default router;