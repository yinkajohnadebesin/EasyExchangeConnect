const express = require("express");
const router = express.Router();
const { getAllComments, createComment } = require("../controllers/commentController");

router.get("/", getAllComments);
router.post("/", createComment);

module.exports = router;
