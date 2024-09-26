import React from 'react';
import { Spin } from 'antd';

const LoaderReport = () => {
    return (
        <div className="d-flex justify-content-center m-2 p-2">
            <Spin tip="Yükleniyor..." />
        </div>
    );
};

export default LoaderReport;
