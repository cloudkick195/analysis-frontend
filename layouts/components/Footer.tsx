import Link from 'next/link';
import React from 'react';

const FooterLayout = () => {
    return (
        <div className="footer bg-white py-4 d-flex flex-lg-column">
            <div
                className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="text-dark order-2 order-md-1">
                    <span className="text-muted font-weight-bold mr-2">2023©</span>
                    <Link href="https://cat368.com/" target="_blank"
                        className="text-dark-75 text-hover-primary">Cat368</Link>
                </div>
                <div className="nav nav-dark">
                </div>
            </div>
        </div>
    )
}

export default FooterLayout