"use client"

import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { cn } from "tailwind-merge";

interface Props {
  initialData?: Product[];
}

export default function ProductTable({ initialData = [] }: Props) {
  const [data, setData] = useState<Product[]>(initialData);
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // refresh list when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const json = await res.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div className="rounded-md border overflow-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 border-b">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b last:border-none hover:bg-muted/25">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    in_stock: "bg-gray-100 text-gray-800",
    listed: "bg-blue-100 text-blue-800",
    sold: "bg-green-100 text-green-800",
    shipped: "bg-purple-100 text-purple-800",
    lost: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-0.5 text-xs font-medium capitalize",
        colorMap[status] || "bg-gray-100 text-gray-800"
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
