import { Request, Response } from 'express';
import ProductsDonated from '../models/ProductsDonated';
import User from '../models/User';

class ONGsController {
  async GetAll(req: Request, res: Response) {
    const user = await User.find();
    console.log(user);
    res.status(200).json(user);
  }

  async PostDonation(req: Request, res: Response) {
    try {
      const { products, ONGdestination, UserDonator } = req.body;

      const newDonation = await ProductsDonated.create({
        products,
        ONGdestination,
        UserDonator,
      });

      if (!newDonation) {
        return res.status(400).json({ msg: 'Erro ao registrar doação' });
      }
      return res.status(201).json({ msg: 'Doação registrada com sucesso' });
    } catch (error) {
      console.log(error);
    }
  }
  async GetDonationByuser(req: Request, res: Response) {
    try {
      const { products, ONGdestination, UserDonator } = req.body;

      const newDonation = await ProductsDonated.create({
        products,
        ONGdestination,
        UserDonator,
      });

      if (!newDonation) {
        return res.status(400).json({ msg: 'Erro ao registrar doação' });
      }
      return res.status(201).json({ msg: 'Doação registrada com sucesso' });
    } catch (error) {
      console.log(error);
    }
  }
  async GetDonationOng(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      console.log(userID);

      const donations = await ProductsDonated.find({ ONGdestination: userID });

      // Buscar os dados dos usuários doadores
      const userIDs = donations.map((d) => d.UserDonator); // Lista de IDs únicos
      console.log(userIDs);
      const users = await User.find({ userID: { $in: userIDs } }); // Busca os usuários

      // Mapeia as doações substituindo o UserDonator pelos dados do usuário
      const donationsWithUserData = donations.map((donation) => ({
        ...donation.toObject(),
        UserDonator: users.find(
          (user) => user.userID.toString() === donation.UserDonator,
        ),
      }));

      console.log(donationsWithUserData);
      if (!donations) {
        return res.status(400).json({ msg: 'Erro ao procurar doação' });
      }
      return res.status(200).json(donationsWithUserData);
    } catch (error) {
      console.log(error);
    }
  }
  async GetById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ userID: id });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async Update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async Delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ONGsController();
