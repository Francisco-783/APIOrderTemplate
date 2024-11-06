import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service'; 
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  async signIn(
    name: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminService.findOneAdmin(name);
    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: admin.id, adminname: admin.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  

  getAdminId(req: ExpressRequest) {

    const extractTokenFromHeader = (request: ExpressRequest): string | undefined => {
      const authHeader = request.headers['authorization'];
      const [type, token] = authHeader?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined; // Extrae el token si es de tipo Bearer
    };

    const token = extractTokenFromHeader(req);
    const decodedToken = this.jwtService.decode(token);
    return decodedToken.sub; // Devuelve el token para verificar
  }
}