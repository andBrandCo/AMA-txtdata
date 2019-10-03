const messageService = require("../services/messageService");

class MessageController {
  async getAllMessages(req, res) {
    const messageList = await messageService.getAllMessageList();

    messageList
      ? res.json(messageList)
      : res.status(500).json({ success: false, msg: `Something went wrong. ` });
  }

  async findMessagesByKeyword(req, res) {
    let { keyword, mobileNumber } = req.body;
    // keyword = keyword.toUpperCase();
    console.log("req.body in find Message - ", req.body);

    const row = await messageService.findByKeyword(keyword, mobileNumber);
    row ? res.status(200).send(row) : res.status(404).send("Not found");
  }

  async createNewMessage(req, res) {
    try {
      const newRow = await messageService.createNewMessage(req.body.keyword);
      console.log("created row with URL - ", newRow);
      return newRow;
    } catch (e) {
      console.log(e);
    }
  }

  async updateURLSent(req, res) {
    const elem = await messageService.updateURLSent(req.body);
    console.log("URlupdated - ", elem);

    res.status(200).send(elem);
  }

  async updateRow(req, res) {
    const elem = await messageService.updateRow(req);
    console.log("ROW updated - ", elem);

    res.status(200).send(elem);
  }

  async deleteRow(req, res) {
    const elem = await messageService.deleteRow(req);
    console.log("ROW deleted - ", elem);

    res.status(200).send(elem);
  }

  async createRow(req, res) {
    const elem = await messageService.createRow(req);
    console.log("ROW created - ", elem);

    res.status(200).send(elem);
  }
}

module.exports = MessageController;
