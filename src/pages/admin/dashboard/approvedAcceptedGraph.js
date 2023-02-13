import { Barchart } from "../../../common/Chart";

export default function ApprovedAcceptedGraph({ applicationApproved, acceptedOffer, labels }) {
    const chartOptionsValue = {
        plugins: {
            legend: {
                position: "top",

            },
            title: {
                display: false,
                text: "Class",

            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: false,
                    text: "x axis",
                    color: "000000",
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: false,
                    text: "y axis",
                    color: "000000",
                },
                ticks: {
                    callback: function (value) { if (value % 1 === 0) { return value; } }
                }
            }
        }
    };
    return (
        <div className='metrics-block mb3'>
            <div className='title-area'>
                <h2>Applications Approved Vs Offers Accepted</h2>
            </div>
            <div className='chart-area'>
                <Barchart
                    option={chartOptionsValue}
                    labelsdata={{
                        labels: 
                        // labels,
                        ["TDD", "PG", "Nur", "LKG", "UKG", "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"],
                        datasets: [
                            {
                                label: "Application Approved",
                                data: applicationApproved,
                                backgroundColor: "#F7C32E",
                                boxWidth: 14,

                            },
                            {
                                label: "Offers Accepted",
                                data: acceptedOffer,
                                backgroundColor: "#4AB900",
                                boxWidth: 14,
                            }]
                    }}
                    styling={{ height: '120px', width: '100%' }} />
            </div>
        </div>
    );
}