import React from "react";

const Details = ({ data, description }) => {
    const { requirements = [], updates = [] } = data;


    return (
        <div className="p-4 bg-gray-100 border border-gray-300 my-4">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                {requirements?.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>

            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-6">
                {description}
            </p>

            <h2 className="text-xl font-semibold mb-4">Updates List</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
                {updates.map((update, index) => (
                    <li key={index}>{update}</li>
                ))}
            </ul>

            <p className="text-gray-700">

                {/* Add the rest of the description here */}
            </p>
        </div>
    );
};

export default Details;
