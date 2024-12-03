import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
   
    mockAuthService = {
      login: jest.fn(),
      register: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const loginData: loginDto = {
        email: 'test@example.com',
        password: 'validpassword',
      };

      await authController.login(loginData);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
    });
  });

  describe('register', () => {
    it('should call authService.register with correct parameters', async () => {
      const registerData: RegisterDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'validpassword',
      };

      await authController.register(registerData);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerData);
    });
  });
});