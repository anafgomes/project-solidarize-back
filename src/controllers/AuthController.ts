import Usuario from '../models/User';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TypeUserData, TypeUserDataDB } from '../@types/userData';
import Role from '../models/ProductsDonated';
// import getRoleById from '../utils/GetRoleByID';

class AuthController {
  async signUp(req: Request, res: Response) {
    const {
      userID,
      typeUser,
      emailUser,
      nameOnwerOng,
      nameOng,
      phoneOnwerOng,
      phoneOng,
      address,
      onboarding_completed,
    } = req.body;
    console.log(req.body);
    console.log(req.body);

    try {
      const existingUser = await Usuario.findOne({ emailUser });

      if (existingUser) {
        return res.status(409).json({ error: 'O usuário já existe' });
      }

      const hashedId = await bcrypt.hash(userID, 10);
      console.log(hashedId);
      const newUser = await Usuario.create(req.body);

      if (!newUser) {
        return res.status(400).json({ msg: 'Erro ao registrar Usuario' });
      }

      res.status(201).json({ msg: 'Usuário registrado com sucesso' });
    } catch (error) {
      res.status(400).json({
        msg: 'Erro ao cadastrar Usuario',
        err: (error as Error).message,
      });
    }
  }

  async signIn(req: Request & { userData?: TypeUserData }, res: Response) {
    const { userName, password } = req.body;
    console.log(req.body);
    try {
      const response: TypeUserDataDB | null = await Usuario.findOne({
        userName: userName,
      });

      if (!response) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, response.password);

      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Credenciais inválidas' });
      }

      if (process.env.SECRET === undefined) {
        return res
          .status(500)
          .json({ msg: 'Variável de ambiente Secret não definida' });
      }

      const token = jwt.sign(
        {
          userId: response._id,
          userName: response.userName,
          role: response.role,
        },
        process.env.SECRET,
      );

      return res.status(201).json({
        userName: response.userName,
        access_token: token,
      });
    } catch (error) {
      res.status(500).json({ msg: 'Erro interno do servidor', err: error });
    }
  }

  async infoUser(req: Request, res: Response) {
    const { userID } = req.params;
    console.log(userID);
    try {
      const response = await Usuario.findOne({ userID });
      if (!response) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: 'Erro interno do servidor', err: error });
    }
  }

  async dataToken(req: Request & { userData?: TypeUserDataDB }, res: Response) {
    if (!req.userData?.role) {
      return res.status(422).json({ msg: 'Role is undefined' });
    }
    return res.status(200).json({
      _id: req.userData._id,
      userName: req.userData.userName,
      role: req.userData.role,
    });
  }
}

export default new AuthController();
