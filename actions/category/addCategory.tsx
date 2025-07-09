"use server"

import prisma from "@/lib/prisma"
import slugify from "@/lib/slugify"

export default async function addCategory(formData: FormData){
const category = formData.get('category') as string
const slug = slugify(category)

await prisma.category.create({
    data:{
        name : category,
        slug: slug, 
    }
})
}