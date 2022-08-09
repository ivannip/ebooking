import {Router} from "express";
import {createOneBooking, createNewBooking} from "../controllers/booking.controllers";
import {findAllPlace} from "../controllers/place.controllers";

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