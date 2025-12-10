import { Request, Response } from 'express';
import { UserService } from '../services/impl/UserServiceImpl';

const userService = new UserService();

export class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.login(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  getByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserByEmail(req.params.email);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  getByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(updatedUser);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  updatePicture = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await userService.updateProfilePicture(req.params.id, req.body.profileImage);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(updatedUser);
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await userService.deleteUser(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
}