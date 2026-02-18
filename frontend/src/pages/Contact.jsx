const Contact = () => {
    return (
        <div className="min-h-screen bg-[#f6f5f3] px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>

                <p className="mb-4">
                    Business Name: Whiff
                </p>

                <p className="mb-4">
                    Email:{" "}
                    <a
                        href="mailto:whiffperfumeco@gmail.com"
                        className="hover:text-gray-400 underline"
                    >
                        whiffperfumeco@gmail.com
                    </a>
                </p>

                <p className="mb-4">
                    Phone: +91 79807 15632
                </p>

                <p>
                    Location: Kolkata, India
                </p>
            </div>
        </div>
    );
};

export default Contact;
