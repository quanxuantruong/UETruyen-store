"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart, { CartOrder } from "@/hooks/use-cart";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface InfoProps {
    data: CartOrder
};

const quantitySchema = z.object({
    quantity: z.string()
})

type InfoFormValues = z.infer<typeof quantitySchema>

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();

    const form = useForm<z.infer<typeof quantitySchema>>({
        resolver: zodResolver(quantitySchema),
        defaultValues: {
            quantity: "1",
        },
    })

    const onAddToCart = async (order: InfoFormValues) => {
        data.orderQuantity = order.quantity;
        await cart.addItem(data);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Author:</h3>
                    <div>
                        {data?.author?.name}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Publisher:</h3>
                    <div>
                        {data?.publisher?.name}
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <h3 className="font-medium font-semibold text-black">Description:</h3>
                    <div className="resize-none">
                        {data.description}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onAddToCart)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-black">Quantity:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-14"
                                            defaultValue={1}
                                            type="number"
                                            min={1}
                                            max={5}
                                            placeholder="quantity" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="flex items-center gap-x-2">
                            Add To Cart
                            <ShoppingCart size={20} />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Info;