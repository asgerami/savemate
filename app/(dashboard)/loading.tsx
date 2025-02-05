import React from "react";


function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <div className="spinner" style={{ marginBottom: '20px' }}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <p>Loading dashboard...</p>
            </div>
        </div>
    );
}

export default Loading;