const PhoneNumber = require("../models/phoneNumber");

class PhoneNumberService {
  async findPhoneOrCreate({ mobileNumber }) {
    console.log("create or find UNIQUE Phone - ", mobileNumber);

    const phone = await PhoneNumber.findOne({ mobileNumber });
    console.log("phone DATA - ", phone);
    console.log("phone DATA - ", phone._id);

    if (!phone) {
      const newPhone = new PhoneNumber({ mobileNumber });
      await newPhone.save();
      return newPhone;
    }
    return phone;
  }
}

module.exports = PhoneNumberService;
