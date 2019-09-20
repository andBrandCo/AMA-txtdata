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
    const list = await messageService.getAllMessageList();
    const listWithKeyword = list.filter(elem => {
      if (elem.keyword === undefined) {
        return false;
      }
      return keyword.indexOf(elem.keyword.toLowerCase()) !== -1;
    });
    console.log("arr - ", listWithKeyword);
    if (listWithKeyword.length === 0) {
      return res.status(200).send(await this.createNewMessage(req, res));
    }
    res.status(200).send(listWithKeyword[0]);
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

  async addAutoResponse(req, res) {
    await messageService.setAutoResponse(req.body);
    const updatedElement = await messageService.getRowByID(req.body._id);
    res.status(200).send(updatedElement);
  }
  async updateURLSent(req, res) {
    const elem = await messageService.updateURLSent(req.body);
    console.log("URlupdated - ", elem);

    res.status(200).send(elem);
  }
}

module.exports = MessageController;
