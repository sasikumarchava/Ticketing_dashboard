import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import store from "./redux/Store";
import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
import TicketsPage from "./components/TicketsPage";
import TicketDetails from "./components/TicketDetails";
import AddTicket from "./components/AddTicket";
import LoginForm from "./Authentication/LoginForm";
import ComposeEmail from './components/Email';

const App = () => {
    const [showAddTicket, setShowAddTicket] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [activeView, setActiveView] = useState("Unassigned");
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    const toggleAddTicket = () => {
        setShowAddTicket(!showAddTicket);
        setSelectedTicket(null);
    };

    const [composeEmailOpen, setComposeEmailOpen] = useState(false);

    const onTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowAddTicket(false);
    };

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const handleLogin = () => {
        console.log("User logged in");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    };

    const handleBack = () => {
        setSelectedTicket(null);
    };

    useEffect(() => {
        if (localStorage.getItem("isAuthenticated") !== "true") {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/ticket_dashboard" element={isAuthenticated ? (
                        <div className="h-screen w-full flex">
                            <div className="bg-slate-50 w-[250px] h-full sticky top-0 p-4">
                                <Sidebar 
                                    toggleAddTicket={toggleAddTicket} 
                                    setActiveView={handleViewChange}
                                    setComposeEmailOpen={setComposeEmailOpen}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                {/* <div className="bg-gray-100 p-2 border-b border-gray-300 z-50">
                                <Header />
                                </div> */}
                                 {composeEmailOpen && <ComposeEmail onBackClick={() => setComposeEmailOpen(false)} />}
                                
                                <div className="flex-1 p-2 bg-white mt-0 overflow-y-auto h-[calc(100vh-56px)]">
                                    {showAddTicket ? (
                                        <AddTicket toggleAddTicket={toggleAddTicket} />
                                    ) : selectedTicket ? (
                                        <TicketDetails 
                                            ticket={selectedTicket} 
                                            onBack={handleBack} 
                                        />
                                    ) : (
                                        <TicketsPage 
                                            onTicketClick={onTicketClick} 
                                            activeView={activeView} 
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Navigate to="/login" />
                    )} />

                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/ticket_dashboard" : "/login"} />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
