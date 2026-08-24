import asyncHandler from "express-async-handler";
import User from "../model/user.model.js";

// import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;
  let reqbody= req.body
  const userExists = await User.findOne( { email: email });
  if (!userExists) {
    const user = await User.create({  reqbody });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

// function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await User.findOne({
  email 
    }). select( { bookedVisits: true },);

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await User.update(
         { email: email },
       {
          id, date
        },
      );
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await User.findOne(
     { email },
    ).select( { bookedVisits: true });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({
      email: email
     
    }). select( { bookedVisits: true });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await User.updateOne( { email },
        {
          bookedVisits: user.bookedVisits,
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a resd in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await User.findOne({
       email 
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
      email },
     {
          favResidenciesID: 
           user.favResidenciesID.filter((id) => id !== rid),
          
        },
      );

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await User.updateOne({ email },
        {
          favResidenciesID:rid
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findOne({ email },
    ). select ({ favResidenciesID: true });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});
