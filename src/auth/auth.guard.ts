import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core'; // Importar Reflector desde @nestjs/core
import { jwtConstants } from './constants';
import { Request } from 'express';

// Definir el decorador para rutas públicas
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {} // Inyectar Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflectPublicRoute(context);
    if (isPublic) {
      return true; // Permitir acceso si la ruta es pública
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(); // Si no hay token, lanza una excepción
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['admin'] = payload; // Guarda el payload en el request si el token es válido
    } catch {
      throw new UnauthorizedException(); // Si el token es inválido o expiró, lanza una excepción
    }

    return true; // Permite el acceso si todo es válido
  }

  // Función para extraer el token del header de autorización
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined; // Extrae el token si es de tipo Bearer
  }

  // Función para verificar si la ruta es pública
  private reflectPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return true; // El token es válido
    } catch {
      return false; // El token es inválido o expirado
    }
  }
}
