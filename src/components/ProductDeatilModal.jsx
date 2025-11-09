import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const ProductDetailModal = ({ open, onClose, product }) => {
    if (!open || !product) return null;

    console.log("product data", product)

    return (
        <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-xl h-[80vh] overflow-auto p-6 rounded-xl shadow-lg relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                    <IoIosCloseCircle size={28} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-4">{product.name}</h2>

                {/* Image */}
                {product?.imageUrls?.length > 0 && (
                    <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg border mb-4"
                    />
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="text-xs text-gray-500">Model No</div>
                        <div className="font-medium">{product.modelNo || "-"}</div>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="text-xs text-gray-500">Category</div>
                        <div className="font-medium">{product.category}</div>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="text-xs text-gray-500">Gender</div>
                        <div className="font-medium">{product.gender}</div>
                    </div>

                    <div className="p-3 bg-gray-100 rounded-lg">
                        <div className="text-xs text-gray-500">Discount</div>
                        <div className="font-medium text-red-600">
                            {product.discount}%
                        </div>
                    </div>
                </div>

                {/* Sizes */}
                {product.size?.length > 0 && (
                    <>
                        <h3 className="mt-5 font-semibold">Sizes</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {product?.size.map((s, idx) => (
                                <div key={idx} className="border p-2 rounded-lg bg-gray-50 text-sm">
                                    <div>Price: {s.price}</div>
                                    <div>Unit: {s.unit}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Variants */}
                {product.variants?.length > 0 && (
                    <>
                        <h3 className="mt-5 font-semibold">Variants</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {product?.variants.map((v, idx) => (
                                <div key={idx} className="border p-2 rounded-lg bg-gray-50 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-4 w-4 rounded-full border"
                                            style={{ backgroundColor: v.color }}
                                        />
                                        <span>{v.color}</span>
                                    </div>
                                    <div>Price: {v.price}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetailModal;