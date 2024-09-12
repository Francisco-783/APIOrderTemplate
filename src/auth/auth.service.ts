import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service'; 
@Injectable()
export class AuthService {
  constructor(private adminService: AdminService) {}

  async signIn(name: string, pass: string): Promise<any> {
    const admin = await this.adminService.findOneAdmin(name);
    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = admin;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}