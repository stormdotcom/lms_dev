import React from "react";
import CommonChart from "../../../../../common/components/Charts/CommonChart";

const allEnrollmentData = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1), // Days from 1 to 30
    datasets: [
        {
            label: "Enrollments last 30 days",
            backgroundColor: "rgba(190, 50, 245, 0.2)",
            borderColor: "#be32f5",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(190, 50, 245, 0.4)",
            hoverBorderColor: "#be32f5",
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) // Random data
        },
        {
            label: "Average Rating",
            backgroundColor: "rgba(74, 74, 74, 0.2)",
            borderColor: "#4a4a4a",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(74, 74, 74, 0.4)",
            hoverBorderColor: "#4a4a4a",
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50)) // Random data
        }
    ]
};


const options = {
    maintainAspectRatio: false
};

const EnrollmentUsers = () => {
    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-xl font-bold">Trends</h1>
            <CommonChart chartType="line" data={allEnrollmentData} options={options} />
        </div>
    );
};

export default EnrollmentUsers;
