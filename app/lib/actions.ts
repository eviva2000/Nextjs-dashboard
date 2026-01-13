'use server';
import {z}from 'zod'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


const FormSchema=z.object({
   id: z.string(),
   customerId:z.string(),
   amount:z.coerce.number(),
   status:z.enum(['pending','paid']),
   date:z.string(),
})
const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formdata: FormData) {
    const {amount, customerId, status} = CreateInvoice.parse({
        customerId: formdata.get('customerId') as string,
        amount: formdata.get('amount') as string,
        status: formdata.get('status') as string,
    })
    const amountInCents =amount * 100;
      const date = new Date().toISOString().split('T')[0];
    

       await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

   revalidatePath('/dashboard/invoices');
   redirect('/dashboard/invoices');
}