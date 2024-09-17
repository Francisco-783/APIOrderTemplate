import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service'; 
import { JwtService } from '@nestjs/jwt';

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
}