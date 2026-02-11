import React, { useState, useRef } from 'react';

// IMPORTANT: This export is required to prevent app crash in Dashboard/Detail components
// However, per Chunk 1 instructions, the form does NOT use/update it yet.
export const mockRequests = [];

const PrintRequest = () => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        file: null,
        copies: 1,
        printSide: 'single', // 'single' | 'both'
        deliveryMode: 'take_away', // 'take_away' | 'delivery'
        block: '',
        floor: '',
        roomNumber: '',
        directions: ''
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                file: e.target.files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const file = formData.file ? {
            name: formData.file.name,
            type: formData.file.type,
            previewUrl: URL.createObjectURL(formData.file)
        } : null;

        const newRequest = {
            id: Date.now().toString(), // Helper for dashboard compatibility
            requestId: Date.now().toString(),
            requester: { name: "Mock User", role: "Student" },
            file: file,
            copies: parseInt(formData.copies),
            printSide: formData.printSide,
            deliveryMode: formData.deliveryMode,
            deliveryDetails: formData.deliveryMode === 'delivery' ? {
                block: formData.block,
                floor: formData.floor,
                roomNumber: formData.roomNumber,
                directions: formData.directions
            } : null,
            status: "requested",
            createdAt: new Date().toISOString()
        };

        mockRequests.push(newRequest);

        // Reset Form
        setFormData({
            file: null,
            copies: 1,
            printSide: 'single',
            deliveryMode: 'take_away',
            block: '',
            floor: '',
            roomNumber: '',
            directions: ''
        });

        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        alert("Print Request Submitted!");
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Print Request Form
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    {/* File Upload */}
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Upload File (PDF/Image) <span className="text-meta-1">*</span>
                        </label>
                        <input
                            type="file"
                            name="file"
                            ref={fileInputRef}
                            accept=".pdf,image/*"
                            onChange={handleChange}
                            required
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        />
                    </div>

                    {/* Number of Copies */}
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Number of Copies <span className="text-meta-1">*</span>
                        </label>
                        <input
                            type="number"
                            name="copies"
                            value={formData.copies}
                            onChange={handleChange}
                            min="1"
                            required
                            placeholder="Enter number of copies"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>

                    {/* Print Side */}
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Print Side <span className="text-meta-1">*</span>
                        </label>
                        <div className="flex items-center gap-5">
                            <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                                <input
                                    type="radio"
                                    name="printSide"
                                    value="single"
                                    checked={formData.printSide === 'single'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.printSide === 'single' ? 'border-primary' : 'border-body'}`}>
                                    <span className={`h-2.5 w-2.5 rounded-full bg-primary ${formData.printSide === 'single' ? 'flex' : 'hidden'}`}></span>
                                </span>
                                Single Side
                            </label>

                            <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                                <input
                                    type="radio"
                                    name="printSide"
                                    value="both"
                                    checked={formData.printSide === 'both'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.printSide === 'both' ? 'border-primary' : 'border-body'}`}>
                                    <span className={`h-2.5 w-2.5 rounded-full bg-primary ${formData.printSide === 'both' ? 'flex' : 'hidden'}`}></span>
                                </span>
                                Both Sides
                            </label>
                        </div>
                    </div>

                    {/* Delivery Mode */}
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Delivery Mode <span className="text-meta-1">*</span>
                        </label>
                        <div className="flex items-center gap-5">
                            <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                                <input
                                    type="radio"
                                    name="deliveryMode"
                                    value="take_away"
                                    checked={formData.deliveryMode === 'take_away'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.deliveryMode === 'take_away' ? 'border-primary' : 'border-body'}`}>
                                    <span className={`h-2.5 w-2.5 rounded-full bg-primary ${formData.deliveryMode === 'take_away' ? 'flex' : 'hidden'}`}></span>
                                </span>
                                Take Away
                            </label>

                            <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                                <input
                                    type="radio"
                                    name="deliveryMode"
                                    value="delivery"
                                    checked={formData.deliveryMode === 'delivery'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${formData.deliveryMode === 'delivery' ? 'border-primary' : 'border-body'}`}>
                                    <span className={`h-2.5 w-2.5 rounded-full bg-primary ${formData.deliveryMode === 'delivery' ? 'flex' : 'hidden'}`}></span>
                                </span>
                                Delivery
                            </label>
                        </div>
                    </div>

                    {/* Conditional Delivery Fields */}
                    {formData.deliveryMode === 'delivery' && (
                        <div className="rounded border border-stroke bg-gray-50 p-4 dark:border-strokedark dark:bg-meta-4">
                            <h4 className="mb-4 font-medium text-black dark:text-white">Delivery Details</h4>
                            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-3">
                                <div className="w-full">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Block <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="block"
                                        value={formData.block}
                                        onChange={handleChange}
                                        required={formData.deliveryMode === 'delivery'}
                                        placeholder="Block Name/ID"
                                        className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Floor <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleChange}
                                        required={formData.deliveryMode === 'delivery'}
                                        placeholder="Floor Number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Room Number <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="roomNumber"
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                        required={formData.deliveryMode === 'delivery'}
                                        placeholder="Room Number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Directions / Instructions
                                </label>
                                <textarea
                                    rows={3}
                                    name="directions"
                                    value={formData.directions}
                                    onChange={handleChange}
                                    placeholder="Enter additional instructions..."
                                    className="w-full rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                ></textarea>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-6"
                    >
                        Submit Print Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PrintRequest;
