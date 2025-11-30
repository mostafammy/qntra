"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "@/services/products";
import { Loader2, UploadCloud } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().nonnegative("Stock must be non-negative"),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createProduct({
        ...data,
        images: data.imageUrl ? [data.imageUrl] : [],
        categoryId: null, // For now
      });
      router.push("/app/products");
      router.refresh();
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Add New Product</h1>
        <p className="text-white/60">Create a new item in your catalog.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Product Name</label>
          <input
            {...register("name")}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/20 focus:outline-none"
            placeholder="e.g. Wireless Headphones"
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Price ($)</label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/20 focus:outline-none"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-xs text-red-400">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Stock</label>
            <input
              {...register("stock")}
              type="number"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/20 focus:outline-none"
              placeholder="0"
            />
            {errors.stock && (
              <p className="text-xs text-red-400">{errors.stock.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/20 focus:outline-none"
            placeholder="Describe your product..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Image URL</label>
          <div className="flex gap-2">
            <input
              {...register("imageUrl")}
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/20 focus:outline-none"
              placeholder="https://..."
            />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-white hover:bg-white/5"
            >
              <UploadCloud size={20} />
            </button>
          </div>
          <p className="text-xs text-white/40">
            Enter a direct image URL. Upload functionality coming soon.
          </p>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg px-6 py-2 text-sm font-medium text-white hover:text-white/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
