const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
// create user
router.post("/", async (req, res) => {
	const { error } = validate(req.body);  //check for validation
	if (error) return res.status(400).send({ message: error.details[0].message });  // if error is true the error will be thrown

	const user = await User.findOne({ email: req.body.email });   // chk if user already exsist
	if (user)
		return res.status(403).send({ message: "User with given email already Exist!" });   

	const salt = await bcrypt.genSalt(Number(process.env.SALT));   // convert into number from string
	const hashPassword = await bcrypt.hash(req.body.password, salt);  //hash your password
	let newUser = await new User({
		...req.body,
		password: hashPassword,     //save user into dataBase
	}).save();

	newUser.password = undefined;     //this is to not send password to client
	newUser.__v = undefined;
	res.status(200).send({ data: newUser, message: "Account created successfully" });
});
// get user by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findById(req.params.id).select("-password -__v");
	res.status(200).send({ data: user });
});

// update user by id
router.put("/:id", [validateObjectId, auth], async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	).select("-password -__v");
	res.status(200).send({ data: user, message: "Profile updated successfully" });
});

// delete user by id
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Successfully deleted user." });
});

module.exports = router;