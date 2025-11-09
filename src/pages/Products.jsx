import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { getAllProduct } from "../services/product.service";
import ProductDetailModal from "../components/ProductDeatilModal";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(12); // server-side
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const discount = params.get("discount")
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    console.log("discount", typeof JSON.parse(discount))//how to change to boolean
    const fetchData = async () => {
        const response = await getAllProduct(page, limit, category, discount);

        if (response?.data) {
            setProducts(response.data);
            setTotalPages(response.totalPages);
        }
    };

    // ✅ Reset to page 1 when category changes
    useEffect(() => {
        setPage(1);
    }, [category]);

    useEffect(() => {
        fetchData();
    }, [page, category]);

    return (
        <div className="relative">
            <Navbar />

            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">
                    {category ? `Category: ${category}` : "All Products"}
                </h1>

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-4 gap-6">
                    {products.length === 0 ? (
                        <div className="col-span-4 text-gray-500">
                            No products found.
                        </div>
                    ) : (
                        products.map((p) => (
                            <div
                                key={p._id}
                                onClick={() => {
                                    setSelectedProduct(p);
                                    setShowDetail(true);
                                }}
                                className="group relative bg-gradient-to-br from-[#0c0f1a] to-[#101c44]
                                           border border-white/10 rounded-xl p-4 
                                           hover:border-[#dcff6a] hover:shadow-[0_0_20px_rgba(220,255,106,0.3)]
                                           transition-all duration-300 cursor-pointer"
                            >
                                <span className="absolute top-2 z-50 right-2 text-xs px-2 py-1 
                                                 bg-[#dcff6a] text-black rounded-md font-semibold">
                                    {p.category}
                                </span>

                                <div className="w-full h-44 overflow-hidden rounded-lg">
                                    {p.imageUrls?.[0] ? (
                                        <img
                                            src={p.imageUrls[0]}
                                            alt={p.name}
                                            className="w-full h-full object-cover rounded-lg 
                                                       group-hover:scale-110 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 rounded-lg"></div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <div className="text-white text-lg font-semibold truncate">
                                        {p.name}
                                    </div>

                                    <div className="text-gray-400 text-sm">
                                        {p.modelNo}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-[#dcff6a] font-bold text-lg">
                                            {p.price ? `${p.price} Ks` : "—"}
                                        </div>
                                        <div className="text-white bg-white/20 p-2 rounded-xl opacity-60 group-hover:opacity-100 
                                                        transition text-xl">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ✅ SERVER-SIDE PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">

                        {/* Prev */}
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
                        >
                            Prev
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-1 rounded 
                                        ${page === pageNum
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-800 text-white hover:bg-gray-700"
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Next */}
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
                        >
                            Next
                        </button>

                    </div>
                )}

            </div>
            <ProductDetailModal
                open={showDetail}
                onClose={() => setShowDetail(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Products;