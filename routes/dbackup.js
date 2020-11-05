// const express = require("express");
// const router = express.Router();
// const Roster = require("../models/Roster");
// const User = require("../models/User");
// const Reservation = require("../models/Reservation");
// const Admin = require("../models/Admin");
// const Blog = require("../models/Blog");
// const Product = require("../models/Product");
// const colors = require("colors");

// // @route   GET  dbackup/rosters
// // @desc    Get all rosters
// // @access  Public
// router.get("/rosters", async (req, res) => {
//   try {
//     const rosters = await Roster.find();
//     res.json(rosters);
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/rosters", async (req, res) => {
//   const rosters = req.body;
//   try {
//     rosters.forEach((roster) => {
//       const newRoster = new Roster({
//         sort: roster.sort,
//         location: roster.location,
//         weekday: roster.weekday,
//         time: roster.time,
//         spots: roster.spots,
//       });
//       newRoster.save();
//     });
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET  dbackup/users
// // @desc    Get all users
// // @access  Public
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/users", async (req, res) => {
//   const users = req.body;
//   try {
//     users.forEach((user) => {
//       const newUser = new User({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//       });
//       newUser.save();
//     });
//     res.json({ msg: "success" });
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET  dbackup/reservations
// // @desc    Get all reservations
// // @access  Public
// router.get("/reservations", async (req, res) => {
//   try {
//     const reservations = await Reservation.find();
//     res.json(reservations);
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/reservations", async (req, res) => {
//   const reservations = req.body;
//   try {
//     reservations.forEach((reservation) => {
//       const newReservation = new Reservation({
//         location: reservation.location,
//         weekday: reservation.weekday,
//         time: reservation.time,
//         sort: reservation.sort,
//         user: reservation.user,
//       });
//       newReservation.save();
//     });
//     res.json({ msg: "success" });
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET  dbackup/blogs
// // @desc    Get all blogs
// // @access  Public
// router.get("/blogs", async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/blogs", async (req, res) => {
//   const blogs = req.body;
//   try {
//     blogs.forEach((blog) => {
//       const newBlog = new Blog({
//         title: blog.title,
//         topic: blog.topic,
//         writtenby: blog.writtenby,
//         text: blog.text,
//         imgheader: blog.imgheader,
//         text2: blog.text2,
//         text3: blog.text3,
//         subtitle: blog.subtitle,
//       });
//       newBlog.save();
//     });
//     res.json({ msg: "success" });
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET  dbackup/admins
// // @desc    Get all admins
// // @access  Public
// router.get("/admins", async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.json(admins);
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/admins", async (req, res) => {
//   const admins = req.body;
//   try {
//     admins.forEach((admin) => {
//       const newAdmin = new Admin({
//         email: admin.email,
//         name: admin.name,
//         password: admin.password,
//       });
//       newAdmin.save();
//     });
//     res.json({ msg: "success" });
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET  dbackup/products
// // @desc    Get all products
// // @access  Public
// router.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/products", async (req, res) => {
//   const products = req.body;
//   try {
//     products.forEach((product) => {
//       const newProduct = new Product({
//         sku: product.sku,
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         img: product.img,
//       });
//       newProduct.save();
//     });
//     res.json({ msg: "success" });
//   } catch (err) {
//     console.error(`${err.message}`.red.bold);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;
