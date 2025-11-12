import passport from "passport";

import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";

import { AppDataSource } from "./database";
import { User } from "../entities/user";
import { TokenBlacklist } from "../entities/TokenBlacklist";

const SECRET_KEY = process.env.JWT_SECRET || "sua-chave-secreta-super-segura";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
  passReqToCallback: true, // necessário para capturar o token

};

passport.use(
  new JwtStrategy(options, async (req, payload, done) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return done(null, false);
      }

      // Verificar se o token está na blacklist
      const blacklisted = await AppDataSource.getRepository(
        TokenBlacklist
      ).findOne({
        where: { token },
      });

      if (blacklisted) {
        return done(null, false);
      }

      // Buscar usuário
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: payload.id } });

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
