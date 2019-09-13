const messageService = require("../services/messageService");

class MessageController {
  async getAllMessages(req, res) {
    const messageList = await messageService.getAllMessageList();
    messageList
      ? res.json(messageList)
      : res.status(500).json({ success: false, msg: `Something went wrong. ` });
  }
  async findMessagesByKeyword(req, res) {
    const { keyword } = req.body;
    console.log("body keyword - ", keyword);

    const list = await messageService.getAllMessageList();
    const listWithKeyword = list.filter(elem => {
      if (elem.keyword === undefined) {
        return false;
      }
      return keyword.indexOf(elem.keyword.toLowerCase()) !== -1;
    });
    console.log("arr - ", listWithKeyword);
    if (listWithKeyword.length === 0) {
      this.createNewMessage(req, res);
    }
    res.status(200).send(listWithKeyword);
  }

  async createNewMessage(req, res) {
    const newRow = await messageService.createNewMessage(req.body.keyword);
    console.log("newRow - ", newRow);
  }
}

module.exports = MessageController;
