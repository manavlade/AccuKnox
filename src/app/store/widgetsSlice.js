import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    "categories": [
        {
            id: "cspm",
            name: "CSPM Executive Dashboard",
            widgets: [
                {
                    id: "w1",
                    name: "Cloud Accounts",
                    type: "chart",
                    chartData: {
                        labels: ["connected", "disconnected"],
                        datasets: [
                            {
                                data: [2, 2],
                                backgroundColor: ["#3b82f6", "#e5e7eb"],
                            }
                        ]
                    }
                },
                {
                    id: "w2",
                    name: "Cloud Risk Assessment",
                    type: "chart",
                    chartData: {
                        labels: ["Failed", "Warning", "Not available", "passed"],
                        datasets: [
                            {
                                data: [1689, 681, 360, 7253],
                                backgroundColor: ["#E3242B", "#FFFF00", "#808080", "#008000"],
                            }
                        ]
                    }
                },
            ]
        },
        {
            id: "CWPP",
            name: "CWPP Dashboard",
            widgets: [
                {
                    id: "w3",
                    name: "Top 5 Namesapce Specific Alerts",
                    type: "chart",
                    chartData: {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                backgroundColor: [],
                            }
                        ]
                    }

                },
                {
                    id: "w4",
                    name: "Workload alerts",
                    type: "chart",
                    chartData: {
                        labels: [],
                        datasets: [
                            {
                                data: [],
                                backgroundColor: [],
                            }
                        ]
                    }

                }
            ]
        },
        {
            id: "registry",
            name: "Registry Scan",
            widgets: [
                {
                    id: "w5",
                    name: "Image Risk Assessment",
                    type: "bar",
                    chartData: {
                        labels: [""], // Single row
                        datasets: [
                            {
                                label: "critical",
                                data: [9],
                                backgroundColor: "#E3242B",
                            },
                            {
                                label: "high",
                                data: [150],
                                backgroundColor: "#FA8128",
                            },
                            {
                                label: "medium",
                                data: [3],
                                backgroundColor: "#FFC107",
                            },
                            {
                                label: "low",
                                data: [14],
                                backgroundColor: "#808080",
                            },
                        ],
                    },
                },
                {
                    id: "w6",
                    name: "Image Security Issues",
                    type: "bar",
                    chartData: {
                        labels: [""], 
                        datasets: [
                            {
                                label: "critical",
                                data: [2],
                                backgroundColor: "#990F02",
                            },
                            {
                                label: "high",
                                data: [2],
                                backgroundColor: "#E3242B",
                            },
                            {
                                label: "medium",
                                data: [3],
                                backgroundColor: "#FA8128",
                            },
                            {
                                label: "low",
                                data: [4],
                                backgroundColor: "#808080",
                            },
                        ],
                    },
                }

            ]
        }
    ],
    searchQuery: "",
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        addwidget: (state, action) => {
            const { categoryId, name, type, chartData } = action.payload;
            const category = state.categories.find((c) => c.id === categoryId);

            if (category) {
                category.widgets.push({
                    id: "w" + (category.widgets.length + 1),
                    name: name || "Untitled Widget",
                    type: type || "text",
                    chartData: chartData || {},
                });
            }
        },

        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find((category) => category.id === categoryId);
            if (!category) {
                return;
            }
            if (category) {
                category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
            }
        },

        addCategory: (state, action) => {
            const { name } = action.payload;
            state.categories.push({
                id: "c" + (state.categories.length + 1),
                name: name || "Untitled Category",
                widgets: [],
            })
        },

        removeCategory: (state, action) => {
            const { categoryId } = action.payload;
            state.categories = state.categories.filter((category) => category.id !== categoryId);
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }

});

export const {
    addwidget,
    removeWidget,
    addCategory,
    removeCategory,
    setSearchQuery
} = dashboardSlice.actions;

export default dashboardSlice.reducer;