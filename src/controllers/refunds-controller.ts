import { Request, Response } from "express";
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError";

const Categories = z.enum(["food", "services", "transport", "accommodation", "others"])

class RefundsController{
 async create(request: Request, response: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Nome é obrigatório" }),
      category: Categories,
      amount: z.number().positive({message: "O valor deve ser positivo"}),
      filename: z.string().min(20)
    })

    const { name, category, amount, filename} = bodySchema.parse(request.body)

    if(!request.user?.id){
      throw new AppError("Não autorizado", 401)
    }

    const refund = await prisma.refunds.create({
      data: {
         name,
         category,
         amount,
         filename,
         userId: request.user.id
      }
    })

    response.status(201).json(refund)
 }
 async index(request: Request, response: Response){
  const querySchema = z.object({
    name: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1),
    perPage: z.coerce.number().optional().default(10)
  })
  

  const { name, page, perPage } = querySchema.parse(request.query)

  const skip = (page - 1) * perPage

  const filterConditions: any = {
    user: {
      name: {
        contains: name.trim() 
      }
    }
  }

  if(request.user?.role === "employee"){
    filterConditions.user.id = request.user?.id
  }

  const refunds  = await prisma.refunds.findMany({
    skip,
    take: perPage,
    where: filterConditions,
    orderBy: {createdAt: "desc"},
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          createdAt: true,          
          updatedAt: true
        }
      }
    }
  })

  const totalRecords = await prisma.refunds.count({
    where: filterConditions
  })

  const totalPages = Math.ceil(totalRecords / perPage)

   response.json({refunds,
    pagination: {
      page,
      perPage,
      totalRecords,
      totalPages : totalPages > 0 ? totalPages : 1
    }
   })
 }
async show(request: Request, response: Response){
  const paramsSchema = z.object({
    id: z.string().uuid({message: "ID inválido"})
  })

  const { id } = paramsSchema.parse(request.params)

  const refund = await prisma.refunds.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          createdAt: true,          
          updatedAt: true
        }
      }
    }
  })
  response.json(refund)
}
}

export { RefundsController }