import React from 'react';
import banner from '../..images/bannercm.png';

const Banner = () => {
    return (
        <>
            <section className="">
                <div>
                    <img
                        src={banner}
                        alt="imagen"
                        className="mt-20 br h-auto px-4 py-8 sm:pxlg:px-8 lg:py-16 hidden sm:block"
                    />
                </div>
            </section>
        </>
    )
}

export default Banner