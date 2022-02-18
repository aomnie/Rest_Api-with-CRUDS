const router = require("express").Router();
const res = require("express/lib/response");
const Contact = require("../models/Contact");

// creating the contact
// @ post

router.post("/contact/create", async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
    });
    res.status(200).json({
      status: true,
      success: true,
      msg: "Contact created successfully ",
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: "something is wrong " });
  }
});

// getting the contact
// @ get

router.get("/contact/getcontact", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({
      status: true,
      success: true,
      msg: "Contact List ",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

//remove contact
//delete

router.delete("/contact/deletecontact/:id", async (req, res) => {
  const { id } = req.params;
  let contact = await Contact.findById(id);

  try {
    await Contact.findByIdAndDelete(id);

    let contact = await Contact.findById(id);
    res.status(200).json({
      status: true,
      success: true,
      msg: "Contact deleted successfully ",
    });
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

// put methode
//update
router.put("/contact/updatecontact/:id", async (req, err) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone } = req.body;
  let contact = await Contact.findById(id);
  try {
    if (contact) {
      await Contact.findByIdAndUpdate(id, { ...req.body }, { new: true });
      let contact = await Contact.findById(id);
      res.status(200).json({
        status: true,
        msg: "Contact updated successfully ",
        data: contact,
      });
    } else {
      res.status(404).json({ status: true, msg: "contact not found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

module.exports = router;
