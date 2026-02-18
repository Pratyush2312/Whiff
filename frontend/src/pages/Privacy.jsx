const Privacy = () => {
    return (
        <div className="min-h-screen bg-[#f6f5f3] px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

                <p className="mb-4">
                    We collect basic information such as name, email, phone number and shipping address
                    to process your orders smoothly.
                </p>

                <p className="mb-4">
                    We do not store your payment details. All payments are securely processed
                    through Razorpay.
                </p>

                <p className="mb-4">
                    We do not sell or share your personal information with third parties
                    except as required to fulfill your order.
                </p>
                
                <p>
                    For any privacy related concerns, contact us at:
                </p>
                <br />
                <p className="text-sm">
                    Email:{" "}
                    <a
                        href="mailto:whiffperfumeco@gmail.com"
                        className="hover:text-gray-400 underline"
                    >
                        whiffperfumeco@gmail.com
                    </a>
                </p>

            </div>
        </div>
    );
};

export default Privacy;
