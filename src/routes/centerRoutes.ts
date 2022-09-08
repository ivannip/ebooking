import {Router} from "express";
import { findAllBooking, updateSampleNo, findByMobile } from "../controllers/booking.controllers";
import {verifyToken} from "../middlewares/verifyToken.middleware";

const router: Router = Router();

router.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

router.get("/allbooking", verifyToken, findAllBooking);

router.post("/bookingByMobile", verifyToken, findByMobile);

router.post("/updateSampleNo", verifyToken, updateSampleNo);




export default router;





