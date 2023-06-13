import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { User, user } from './user';
import { UserLoginInput } from './user.login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwt(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return of(password);
  }

  comparePassword(password: string, hash: string): Observable<boolean> {
    const isCompare = String(password) === String(hash);
    return of(isCompare);
  }

  decodedToken(token: string): Observable<{ user: User }> {
    return from(
      this.jwtService.verifyAsync<{ user: User }>(token, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    );
  }

  login(input: UserLoginInput): Observable<{ token: string; user: User }> {
    const hashPassword = this.configService.get<string>('ADMIN_PASS');

    return this.comparePassword(input.password, hashPassword).pipe(
      switchMap((passwordMatches) => {
        if (!passwordMatches) {
          throw new HttpException(
            `Не верный пароль`,
            HttpStatus.UNAUTHORIZED,
          );
        }
        return this.generateJwt(user).pipe(map((token) => ({ token, user })));
      }),
    );
  }
}
