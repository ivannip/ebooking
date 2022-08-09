import {Router} from "express";
import { findAllBooking, updateSampleNo, findByMobile } from "../controllers/booking.controllers";


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

router.get("/allbooking", findAllBooking);

router.post("/bookingByMobile", findByMobile);

router.post("/updateSampleNo", updateSampleNo);




export default router;





