import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
