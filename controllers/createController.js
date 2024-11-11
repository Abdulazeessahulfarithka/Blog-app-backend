import createModel from "../models/createModel.js";

export const create = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    
    if (!title || !content || !author) {
      return res.status(400).send({ message: "All fields are required" });
    }

   
    const existing = await createModel.findOne({ title, content, author });
    if (existing) {
      return res.status(200).send({
        success: true,
        message: "Already exists",
      });
    }

    const newDocument = new createModel({
      title,
      content,
      author,
    });

   
    const create = await newDocument.save();

    res.status(201).send({
      success: true,
      message: "New category created",
      create,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
