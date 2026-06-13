import { Request, Response } from "express"
import { UserRole } from "@prisma/client"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"

class UsersController { 
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(3, {message: "Nome é obrigatório"}),
            email: z.string().trim().email({message: "E-mail inválido"}),
            password: z.string().min(6, {message: "A senha deve conter pelo menos 6 caracteres"}), 
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
            
        })

        const { name, email, password, role } = bodySchema.parse(request.body)

        const userExists = await prisma.user.findFirst({where: {email}})

        if(userExists){
            throw new AppError("-mail já cadastrado.")
        }

        const hashedPassword = await hash(password, 8)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        response.status(201).json({message: "Usuário criado com sucesso"})
    }
}

export { UsersController }