import React from 'react'

const Profile = ({ user }) => {
    const formatMemberSince = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">

                <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black text-white
      flex items-center justify-center text-2xl sm:text-3xl font-semibold"
                >
                    {user?.firstname?.[0]}
                </div>

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        {user?.firstname} {user?.lastname}
                    </h2>

                    <p className="text-gray-500 text-sm break-all">
                        {user?.email}
                    </p>

                    <span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
                        Member since {formatMemberSince(user?.createdAt)}
                    </span>
                </div>
            </div>

            {/* PROFILE INFO CARD */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 space-y-4 max-w-xl">

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-gray-600 sm:w-24 text-sm">Name</span>
                    <span className="bg-white px-4 py-2 rounded-lg">
                        {user?.firstname} {user?.lastname}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-gray-600 sm:w-24 text-sm">Email</span>
                    <span className="bg-white px-4 py-2 rounded-lg break-all">
                        {user?.email}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-gray-600 sm:w-24 text-sm">Phone</span>
                    <span className="bg-white px-4 py-2 rounded-lg">
                        {user?.phone}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="text-gray-600 sm:w-24 text-sm">Address</span>
                    <span className="bg-white px-4 py-2 rounded-lg break-words">
                        {user?.address}
                    </span>
                </div>

            </div>

        </div>

    );
};

export default Profile;
