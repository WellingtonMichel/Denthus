import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User, UserType } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        email: true,
        cpfCnpj: true,
        type: true,
        whatsapp: true,
        termsAccepted: true,
        language: true,
        active: true,
        cadistaId: true,
        labId: true,
        createdAt: true,
        updatedAt: true,
        cadistaProfile: {
          select: {
            id: true,
            rating: true,
            address: true,
            bankDetails: true,
          },
        },
        labProfile: {
          select: {
            id: true,
            labType: true,
            paymentMethods: true,
          },
        },
        password: false,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const { cadistaProfile, labProfile, ...userData } = data;

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpfCnpj: true,
        type: true,
        whatsapp: true,
        termsAccepted: true,
        language: true,
        active: true,
        cadistaId: true,
        labId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user.type === UserType.CADISTA) {
      const cadista = await this.prisma.cadista.create({
        data: {
          userId: user.id,
          rating: 0,
          ...cadistaProfile,
        },
      });

      return this.prisma.user.update({
        where: { id: user.id },
        data: { cadistaId: cadista.id },
        select: {
          id: true,
          name: true,
          email: true,
          cpfCnpj: true,
          type: true,
          whatsapp: true,
          termsAccepted: true,
          language: true,
          active: true,
          cadistaId: true,
          labId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    if (user.type === UserType.LAB) {
      if (!labProfile) {
        throw new Error('labProfile is required for LAB user type');
      }
      const lab = await this.prisma.lab.create({
        data: {
          userId: user.id,
          labType: labProfile.labType,
        },
      });

      return this.prisma.user.update({
        where: { id: user.id },
        data: { labId: lab.id },
        select: {
          id: true,
          name: true,
          email: true,
          cpfCnpj: true,
          type: true,
          whatsapp: true,
          termsAccepted: true,
          language: true,
          active: true,
          cadistaId: true,
          labId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    return user;
  }

  async listUsers(filterType?: UserType): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      where: filterType ? { type: filterType } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        cpfCnpj: true,
        type: true,
        whatsapp: true,
        termsAccepted: true,
        language: true,
        active: true,
        cadistaId: true,
        labId: true,
        createdAt: true,
        updatedAt: true,
        cadistaProfile: {
          select: {
            id: true,
            rating: true,
            address: true,
            bankDetails: true,
          },
        },
        labProfile: {
          select: {
            id: true,
            labType: true,
            paymentMethods: true,
          },
        },
        password: false,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<Omit<User, 'password'>> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
      select: {
        id: true,
        name: true,
        email: true,
        cpfCnpj: true,
        type: true,
        whatsapp: true,
        termsAccepted: true,
        language: true,
        active: true,
        cadistaId: true,
        labId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'>> {
    return this.prisma.user.delete({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        cpfCnpj: true,
        type: true,
        whatsapp: true,
        termsAccepted: true,
        language: true,
        active: true,
        cadistaId: true,
        labId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
