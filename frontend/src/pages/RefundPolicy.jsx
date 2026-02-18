const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-[#f6f5f3] px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Refund & Replacement Policy</h1>

                <p className="mb-4">
                    Due to the nature of perfumes and personal care products,
                    returns are not accepted once the product has been opened or used.
                </p>

                <p className="mb-4">
                    Replacements are offered in case of:
                </p>

                <ul className="list-disc ml-6 mb-4">
                    <li>Damaged products during transit</li>
                    <li>Incorrect items received</li>
                </ul>

                <p className="mb-4">
                    To request a replacement, contact us within 24 hours of delivery
                    with clear photos or videos.
                </p>

                <p>
                    Orders are delivered within 7–8 business days.
                </p>
            </div>
        </div>
    );
};

export default RefundPolicy;
