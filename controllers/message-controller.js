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
