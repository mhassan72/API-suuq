import { Request, Response } from 'express';
import Chat from "../model/Chat"; 


export default class ChatController {
    private Chat: Chat;
  
    constructor() {
      this.Chat = new Chat();
      this.getAll = this.getAll.bind(this);
      this.getDetail = this.getDetail.bind(this);
    }
  
    async getAll(req: Request, res: Response): Promise<void> {
        // res.json({ message: 'Chat controller', body: req.body.userPhone });
      try {
        const chats  = await this.Chat.queryUserChats(`${req.body.userPhone}`)
        res.json(chats);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getDetail(req: Request, res: Response): Promise<void> {
      const chatId = req.params.chat_id;
      try {
        const chat = await this.Chat.findById(chatId);
        res.json({ chat, chatId });
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    }

}
  
export const chatController = new ChatController();