import { PrismaClient, UserType, LabType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log ('Iniciando seed...');

    const hashedPassword = await bcrypt.hash('senha123', 10);

    //Criando um lab + user
    const labUser = await prisma.user.create({
        data: {
            name: 'Lab example',
            email: 'lab@example.com',
            password: hashedPassword,
            type: UserType.LAB,
            whatsapp: '11999999999',
            termsAccepted: true,
            language: 'ptBR',
            active: true,
            labProfile: {
                create: {
                    labType: LabType.LABORATORY,
                    paymentMethods: '{}',
                },
            },
        },
    });

    console.log('Lab criado com id:', labUser.id);

    const skills = ['Photoshop', '3D Printing', 'Intraoral Scanning' ];

    for (const skillName of skills) {
        await prisma.skill.upsert({
            where: { name: skillName },
            update: {},
            create: { name: skillName },
        });
    }

    console.log('Skills criadas.');

    console.log('Seed finalizado.');
}

main()
.catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});