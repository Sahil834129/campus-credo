import { Barchart } from "../../../common/Chart";
import { ReactComponent as Expand } from "../../../assets/img/icons/expand.svg";

export default function ApprovedAcceptedGraph({ applicationApproved, acceptedOffer, labels, hideLabel }) {
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
                    display: true,
                    borderDash: [2, 2],
                },
                title: {
                    display: false,
                    text: "x axis",
                    color: "000000",
                },
                ticks: {
                    autoSkip: false,
                    display: hideLabel,
                }
            },
            y: {
                grid: {
                    display: true
                },
                title: {
                    display: false,
                    text: "y axis",
                    color: "000000",
                },
                suggestedMin: 10,
                suggestedMax: 50,
                min: 0,
                ticks: {
                    callback: function (value) { if (value % 1 === 0) { return value; } },
                    autoSkip: false,
                    display: hideLabel,
                }
            }
        }
    };
    return (
        <div className='metrics-block mb3'>
            <div className="expand-kta-wrap"> {!hideLabel ? <Expand /> : ""}</div>
            <div className='title-area'>
                {!hideLabel ? <h2>Applications Approved Vs Offers Accepted </h2> : ""}
            </div>
            <div className='chart-area'>
                {!hideLabel ?
                    <Barchart
                        option={chartOptionsValue}
                        labelsdata={{
                            labels: labels,
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
                        styling={{ height: '120px', width: '100%' }} /> : <Barchart
                        option={chartOptionsValue}
                        labelsdata={{
                            labels: labels,
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
                        styling={{ height: '400px', width: '100%' }} />}
            </div>
        </div>
    );
}