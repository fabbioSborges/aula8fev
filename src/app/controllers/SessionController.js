import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';

class SessionControler {
  async store(req, res) {
    // validar os campos
    const esquema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });
    
    if (!(await esquema.isValid(req.body))) {
      return res.status(400).json({ mensagem: 'Campos invalidos' });
    }

    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario não existe' });
    }

    if (!(await user.checkPassword(senha))) {
      return res.status(401).json({ error: 'Senha errada' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.dataLimite, // expirar em 7 dias
      }), // primeiro parametro payloud, segundo um texto unico, configurações do token
    });
  }
}

export default new SessionControler();
