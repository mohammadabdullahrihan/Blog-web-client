import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await fetch("https://blog-web-server-kappa.vercel.app/blogs");
        const data = await response.json();

        const sortedBlogs = data.sort((a, b) => {
          const wordCountA = a.longDescription.split(" ").length;
          const wordCountB = b.longDescription.split(" ").length;
          return wordCountB - wordCountA;
        });

        // Take the top 10 blogs
        setBlogs(sortedBlogs.slice(0, 10));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch featured blogs.");
      }
    };

    fetchFeaturedBlogs();
  }, []);

  // Define columns for the table
  const columns = [
    {
      accessorKey: "index",
      header: "#",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "wordCount",
      header: "Word Count",
      cell: (info) => info.row.original.longDescription.split(" ").length,
    },
    {
      accessorKey: "date",
      header: "Published Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
  ];

  // Set up the table
  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="lg:mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Featured Blogs</h1>
      <div className="overflow-hidden">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => (
                  <th key={header.id} className="border px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-4 py-2 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            table {
              display: block;
            }
            thead {
              display: none;
            }
            tbody tr {
              display: block;
              margin-bottom: 1rem;
            }
            tbody tr td {
              display: flex;
              justify-content: space-between;
              padding: 0.5rem;
              border: 1px solid #d1d5db;
            }
            tbody tr td:before {
              content: attr(data-label);
              font-weight: bold;
              margin-right: 1rem;
              color: #374151;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FeaturedBlogs;
